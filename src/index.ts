import * as ec2 from '@aws-cdk/aws-ec2';
import { CfnRoute } from '@aws-cdk/aws-ec2';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import { Code } from '@aws-cdk/aws-lambda';
import * as logs from '@aws-cdk/aws-logs';
import * as fw from '@aws-cdk/aws-networkfirewall';
//import * as cr from '@aws-cdk/custom-resources';
import * as cdk from '@aws-cdk/core';
import { CustomResource } from '@aws-cdk/core';

export class Test {
  public sayHello() {
    return 'hello, world!';
  }
}

export class FWVPCProps {
  readonly cidr?: string;
  /**
   * CIDR block for the VPC - would recommend using at least a /24
   *
   */
  readonly maxAzs?: number;
  /**
   * Maximum number of AZs to iterate thru
   */
  readonly firewallsubnetname?: string;
  /**
   * Name of subnets hosting AWS NFW
   */
  readonly publicsubnetname?: string;
  /**
   * Name of public subnets - where NAT GW and resources requiring public IPs
   */
  readonly privatesubnetname?: string;
  /**
   * Name of private subnets that require NAT to reach internet - if you are using the firewall as an egress VPC with TGW, this is where tgw-attachment would go.
   */
  readonly firewallmask?: number;
  /**
   * CIDR mask of firewall subnets - e.g. 28
   */
  readonly publicmask?: number;
  /**
   * CIDR mask of public subnets - e.g. 28
   */
  readonly privatemask?: number;
  /**
   * CIDR mask of private subnets - e.g. 28
   */
  readonly domainlist?: string[];
  /**
   * provide a list of domains you wish to whitelist, this is optional as a list of commonly used domains for patching is included.
   */
}

export class FirewallStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, fwprops: FWVPCProps) {
    super(scope, id );

    // The code that defines your stack goes here
    const logGroup = new logs.LogGroup(this, '/aws/vpc/flowlogs');
    const fwlog = new logs.LogGroup(this, '/aws/vpc/networkfirewall');

    const role = new iam.Role(this, 'flow-logs-role', {
      assumedBy: new iam.ServicePrincipal('vpc-flow-logs.amazonaws.com'),
    });
    const vpc = new ec2.Vpc(this, 'firewall-vpc', {
      cidr: fwprops.cidr ?? '10.0.0.0/24',
      maxAzs: fwprops.maxAzs ?? 3,
      subnetConfiguration: [
        {
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
          name: fwprops.firewallsubnetname ?? 'firewall',
          cidrMask: fwprops.firewallmask ?? 28,
        },
        {
          cidrMask: fwprops.publicmask ?? 28,
          name: fwprops.publicsubnetname ?? 'public',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: fwprops.privatemask ?? 28,
          name: fwprops.privatesubnetname ?? 'private',
          subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
        },
      ],
    },
    );
    //const igw = new CfnInternetGateway(this, 'igw', {})
    new ec2.FlowLog(this, 'FlowLog', {
      resourceType: ec2.FlowLogResourceType.fromVpc(vpc),
      destination: ec2.FlowLogDestination.toCloudWatchLogs(logGroup, role),
    });

    const igw = vpc.internetGatewayId;


    const fwsubnets = vpc.selectSubnets({
      subnetGroupName: fwprops.firewallsubnetname ?? 'firewall',
    });
    const pubsubnets = vpc.selectSubnets({
      subnetGroupName: fwprops.publicsubnetname ??'public',
    });
    const domainallowlist = new fw.CfnRuleGroup(this, 'domain-allowlist', {
      capacity: 1000,
      ruleGroupName: 'domain-allowlist',
      type: 'STATEFUL',
      ruleGroup: {
        rulesSource: {
          rulesSourceList: {
            generatedRulesType: 'ALLOWLIST',
            targets: fwprops.domainlist ?? [
              '.docker.com',
              '.microsoft.com',
              '.amazonaws.com',
              '.aws.amazon.com',
              '.fedoraproject.org',
              'rhui3.us-east-1.aws.ce.redhat.com',
              '.download.windowsupdate.com',
              '.update.microsoft.com',
              '.windowsupdate.microsoft.com',
              '.slack.com',
              '.windows.com',
              '.duosecurity.com',
              '.okta.com',
              '.oktacdn.com',
              '.splunk.com',
              '.trendmicro.com',
              'idp.login.splunk.com',
              'manage.trendmicro.com',
              'crl3.digicert.com',
              'crl.godaddy.com',
              'certificate.godaddy.com',
              'ocsp.godaddy.com',
              'crl4.digicert.com',
              '.digicert.com',
              '.rootca1.amazontrust.com',
              '.rootg2.amazontrust.com',
              '.amazontrust.com',
              '.sca1a.amazontrust.com',
              '.sca1b.amazontrust.com',
              'powershellgallery.com',
            ],
            targetTypes: ['TLS_SNI', 'HTTP_HOST'],
          },
        },
      },
    });
    const allowedports = new fw.CfnRuleGroup(this, 'allowed-ports', {
      capacity: 1000,
      ruleGroupName: 'allowed-ports',
      type: 'STATELESS',
      ruleGroup: {
        rulesSource: {
          statelessRulesAndCustomActions: {
            statelessRules: [{
              priority: 100,
              ruleDefinition: {
                actions: ['aws:forward_to_sfe'],
                matchAttributes: {
                  destinations: [{
                    addressDefinition: '0.0.0.0/0',
                  }],
                  sources: [{
                    addressDefinition: '0.0.0.0/0',
                  }],
                  protocols: [6],
                  destinationPorts: [
                    {
                      fromPort: 443,
                      toPort: 443,
                    },
                  ],
                },
              },
            },
            {
              priority: 200,
              ruleDefinition: {
                actions: ['aws:forward_to_sfe'],
                matchAttributes: {
                  destinations: [{
                    addressDefinition: '0.0.0.0/0',
                  }],
                  sources: [{
                    addressDefinition: '0.0.0.0/0',
                  }],
                  protocols: [17],
                  destinationPorts: [
                    {
                      fromPort: 123,
                      toPort: 123,
                    },
                  ],
                },
              },
            },
            {
              priority: 300,
              ruleDefinition: {
                actions: ['aws:forward_to_sfe'],
                matchAttributes: {
                  destinations: [{
                    addressDefinition: '0.0.0.0/0',
                  }],
                  sources: [{
                    addressDefinition: '0.0.0.0/0',
                  }],
                  protocols: [6],
                  destinationPorts: [
                    {
                      fromPort: 80,
                      toPort: 80,
                    },
                  ],
                },
              },
            },
            {
              priority: 400,
              ruleDefinition: {
                actions: ['aws:forward_to_sfe'],
                matchAttributes: {
                  destinations: [{
                    addressDefinition: '0.0.0.0/0',
                  }],
                  sources: [{
                    addressDefinition: '0.0.0.0/0',
                  }],
                  protocols: [6, 17],
                  destinationPorts: [
                    {
                      fromPort: 53,
                      toPort: 53,
                    },
                  ],
                },
              },
            }],
          },
        },
      },
    });
    const fw_policy = new fw.CfnFirewallPolicy(this, 'fw_policy', {
      firewallPolicyName: 'network-firewall-policy',
      firewallPolicy: {
        statelessDefaultActions: ['aws:forward_to_sfe'],
        statelessFragmentDefaultActions: ['aws:pass'],
        statelessRuleGroupReferences: [{
          priority: 100,
          resourceArn: allowedports.ref,
        }],
        statefulRuleGroupReferences: [{
          resourceArn: domainallowlist.ref,
        }],
      },
    });
    const subnetList= [];

    for (let i = 0; i < vpc.availabilityZones.length ; i++) {
      const subnetMapping: fw.CfnFirewall.SubnetMappingProperty = { subnetId: fwsubnets.subnetIds[i] };
      subnetList.push(subnetMapping);
    }
    const firewall = new fw.CfnFirewall(this, 'network-firewall', {
      firewallName: 'network-firewall',
      firewallPolicyArn: fw_policy.attrFirewallPolicyArn,
      subnetMappings: subnetList,
      vpcId: vpc.vpcId,
      deleteProtection: false,
      description: 'AWS Network Firewall to centrally control egress traffic',
      firewallPolicyChangeProtection: false,
      subnetChangeProtection: true,
    });
    new fw.CfnLoggingConfiguration(this, 'nfw-logging-config', {
      firewallArn: firewall.ref,
      loggingConfiguration: {
        logDestinationConfigs: [{
          logDestination: {
            logGroup: fwlog.logGroupName,
          },
          logDestinationType: 'CloudWatchLogs',
          logType: 'FLOW',
        }],
      },
    });
    const edgeroutetable = new ec2.CfnRouteTable(this, 'edge-route-table', {
      vpcId: vpc.vpcId,
      tags: [{
        key: 'Name',
        value: 'edge-route-table',
      }],
    });
    const fweplookup_lambda_policydoc = new iam.PolicyDocument({
      statements: [new iam.PolicyStatement({
        actions: [
          'ec2:DescribeVpcEndpoints',
          'ec2:DescribeSubnets',
          'logs:CreateLogGroup',
          'logs:CreateLogStream',
          'logs:PutLogEvents',
        ],
        resources: ['*'],
      })],
    });
    const deleteroute_lambda_policydoc = new iam.PolicyDocument({
      statements: [new iam.PolicyStatement({
        actions: [
          'ec2:DeleteRoute',
          'logs:CreateLogGroup',
          'logs:CreateLogStream',
          'logs:PutLogEvents',
        ],
        resources: ['*'],
      })],
    });
    const deleteroute_lambda_role = new iam.Role(this, 'deleteroute_lambda_role', {
      roleName: 'DeleteIGWRouteLambdaRole',
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });
    new iam.Policy(this, 'deleteroute_lambda_policy', {
      document: deleteroute_lambda_policydoc,
      policyName: 'DeleteIGWRouteLambdaPolicy',
      roles: [deleteroute_lambda_role],
    });
    const deleteroute_lambda = new lambda.Function(this, 'deleteroute-lambda', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'index.lambda_handler',
      role: deleteroute_lambda_role,
      timeout: cdk.Duration.seconds(30),
      memorySize: 128,
      architecture: lambda.Architecture.ARM_64,
      code: Code.fromInline(`
from __future__ import print_function
import json
import boto3
import urllib
import os
import cfnresponse

ec2=boto3.client('ec2')

def deleteroute(routetable):
    deletion = ec2.delete_route(
      DestinationCidrBlock='0.0.0.0/0',
      RouteTableId=routetable
    )
def lambda_handler(event, context):
    responseData={}
    try:
        if event['RequestType'] == 'Delete':
            print("Request Type:",event['RequestType'])
            print("Delete Request - No Physical resources to delete")
        elif event['RequestType'] == 'Create':
            print("Request Type:",event['RequestType'])
            deleteroute(event['ResourceProperties']['RouteTable'])
            responseData={'Route Deleted'}
            print("Sending response to custom resource")
        elif event['RequestType'] == 'Update':
            print("Request Type:",event['RequestType'])
            deleteroute(event['ResourceProperties']['RouteTable'])
            responseData={'Status': 'Updated'}
            print("Sending response to custom resource")
        responseStatus = 'SUCCESS'
    except Exception as e:
        print('Failed to process:', e)
        responseStatus = 'FAILURE'
        responseData = {'Failure': 'Something bad happened.'}
    cfnresponse.send(event, context, cfnresponse.SUCCESS, responseData, "CustomResourcePhysicalID")
          `),
    });
    const fweplookup_lambda_role = new iam.Role(this, 'fweplookup_lambda_role', {
      roleName: 'FirewallEndpointLambdaRole',
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });
    new iam.Policy(this, 'fweplookup_lambda_policy', {
      document: fweplookup_lambda_policydoc,
      policyName: 'fweplookup_lambda_policy',
      roles: [fweplookup_lambda_role],
    });
    const fweplookup_lambda = new lambda.Function(this, 'fwep_lookup', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'index.lambda_handler',
      role: fweplookup_lambda_role,
      timeout: cdk.Duration.seconds(30),
      memorySize: 128,
      architecture: lambda.Architecture.ARM_64,
      code: Code.fromInline(`
from __future__ import print_function
import json
import boto3
import urllib
import os
import cfnresponse

ec2=boto3.client('ec2')

def fwep_look_up(pubsubnet):
    endpoints = ec2.describe_vpc_endpoints(
        Filters=[
        {
            'Name': 'vpc-endpoint-type',
            'Values': [
                'GatewayLoadBalancer',
            ]
        },
    ]
    )
    pubaz=ec2.describe_subnets(SubnetIds=[pubsubnet])['Subnets'][0]['AvailabilityZone']
    print("Public AZ "  + pubaz)
    for fwep in endpoints['VpcEndpoints']:
        for subnet in fwep['SubnetIds']:
            az=ec2.describe_subnets(SubnetIds=[subnet])['Subnets'][0]['AvailabilityZone']
            if pubaz == az:
                validendpoint=fwep['VpcEndpointId']
    return validendpoint

def lambda_handler(event, context):
    responseData={}
    try:
        if event['RequestType'] == 'Delete':
            print("Request Type:",event['RequestType'])
            print("Delete Request - No Physical resources to delete")
        elif event['RequestType'] == 'Create':
            print("Request Type:",event['RequestType'])
            fwep=fwep_look_up(event['ResourceProperties']['PubSubnet'])
            responseData={'FWEP': fwep}
            print("Sending response to custom resource")
        elif event['RequestType'] == 'Update':
            print("Request Type:",event['RequestType'])
            fwep=fwep_look_up(event['ResourceProperties']['PubSubnet'])
            responseData={'Status': 'Updated'}
            print("Sending response to custom resource")
        responseStatus = 'SUCCESS'
    except Exception as e:
        print('Failed to process:', e)
        responseStatus = 'FAILURE'
        responseData = {'Failure': 'Something bad happened.'}
    cfnresponse.send(event, context, cfnresponse.SUCCESS, responseData, "CustomResourcePhysicalID")
        `),
    });

    if (igw) {
      new ec2.CfnGatewayRouteTableAssociation(this, 'edge-route-table-assoc', {
        gatewayId: igw,
        routeTableId: edgeroutetable.attrRouteTableId,
      });
    }
    //const fw_ep_array = []
    // For Loop to loop thru all the AZs
    for (let i = 0; i < vpc.availabilityZones.length ; i++) {
    //invokes the custom resource to look up the vpc endpoint to use for az i
      const fw_ep_az = new CustomResource(this, 'fweplookup_cr_az'+i, {
        serviceToken: fweplookup_lambda.functionArn,
        properties: {
          PubSubnet: pubsubnets.subnets[i].subnetId,
        },
      });
      fw_ep_az.node.addDependency(firewall);
      //adds the route the edge route table with proper az mapping from custom resources
      new ec2.CfnRoute(this, 'edge-ingress-route-az'+i, {
        routeTableId: edgeroutetable.attrRouteTableId,
        destinationCidrBlock: pubsubnets.subnets[i].ipv4CidrBlock,
        vpcEndpointId: fw_ep_az.getAtt('FWEP').toString(),
      });
      // creates default route to vpce
      const createVPCERoutePublicRouteTable = new ec2.CfnRoute(this, 'vpcePublicRoute'+i, {
        routeTableId: pubsubnets.subnets[i].routeTable.routeTableId,
        destinationCidrBlock: '0.0.0.0/0',
        vpcEndpointId: fw_ep_az.getAtt('FWEP').toString(),
      },
      );
      //deletes igw route - adds dependency so deletion occurs prior to adding the route to vpce
      const deleteroute = new CustomResource(this, 'deleteroute'+i, {
        serviceToken: deleteroute_lambda.functionArn,
        properties: {
          RouteTable: pubsubnets.subnets[i].routeTable.routeTableId,
        },
      });
      createVPCERoutePublicRouteTable.node.addDependency(deleteroute);
      deleteroute.node.addDependency(vpc);
      new CfnRoute(this, 'igwroute'+i, {
        routeTableId: fwsubnets.subnets[i].routeTable.routeTableId,
        destinationCidrBlock: '0.0.0.0/0',
        gatewayId: igw,
      });
    }
    //adds default route to igw for all firewall endpoint subnets

    //  for (let subnet of vpc.isolatedSubnets) {
    //   new CfnRoute(this, subnet.node.addr, {
    //      routeTableId: subnet.routeTable.routeTableId,
    //      destinationCidrBlock: "0.0.0.0/0",
    //      gatewayId: igw
    //    })
    //  }
  }
}