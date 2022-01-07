import * as cdk from '@aws-cdk/core';
import { FirewallStack } from '../src';
import '@aws-cdk/assert/jest';


test('create test firewall', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  new FirewallStack(stack, 'firewall', {});
  expect(stack).toHaveResource('AWS::NetworkFirewall::Firewall');
  expect(stack).toHaveResource('AWS::EC2::Route', {
    DestinationCidrBlock: '0.0.0.0/0',
  });
},

);
