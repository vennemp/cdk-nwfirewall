//import * as ec2 from '@aws-cdk/aws-ec2';
import * as cdk from '@aws-cdk/core';
import { FirewallStack } from '../src';
import '@aws-cdk/assert/jest';

test('run firewall test', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  const firewall = new FirewallStack(stack, 'firewall', {});
  firewall.listPublicSubnets();
  expect(firewall).toHaveResource('AWS::NetworkFirewall::Firewall');
  expect(firewall).toHaveResource('AWS::EC2::Route', {
    DestinationCidrBlock: '0.0.0.0/0',
  });
},

);
