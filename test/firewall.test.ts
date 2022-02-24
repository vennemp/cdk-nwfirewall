import { CfnVPCEndpoint } from '@aws-cdk/aws-ec2';
import * as cdk from '@aws-cdk/core';
import { FirewallStack } from '../src';
import '@aws-cdk/assert/jest';

test('run firewall test', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  const fw = new FirewallStack(stack, 'firewall', {});
  new CfnVPCEndpoint(this, 'vpce', {
    serviceName: 'ec2.amazonaws.com',
    vpcId: fw.vpcId.toString(),
    subnetIds: [fw.listPublicSubnets()[0].subnetId.toString()],
  });
},

);