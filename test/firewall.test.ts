import { CfnNatGateway } from '@aws-cdk/aws-ec2';
import * as cdk from '@aws-cdk/core';
import { FirewallStack } from '../src';
import '@aws-cdk/assert/jest';

test('run firewall test', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  const firewall = new FirewallStack(stack, 'firewall', {});
  //test one of the methods to see if returns a valid subnet

  const pubsub = firewall.listPublicSubnets()[0].subnetId;
  new CfnNatGateway(stack, 'nat-gw', {
    subnetId: pubsub,
  });
  //test to see if it creates some of the expected resources
  expect(firewall).toHaveResource('AWS::NetworkFirewall::Firewall');
  expect(firewall).toHaveResource('AWS::EC2::Route', {
    DestinationCidrBlock: '0.0.0.0/0',
  });
},

);
