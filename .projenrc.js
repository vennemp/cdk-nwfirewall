const { awscdk } = require('projen');
const { AwsCdkDeps } = require('projen/lib/awscdk');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Matthew Venne',
  authorAddress: 'vennemp@gmail.com',
  cdkVersion: '2.1.0',
  docgen: true,
  keywords: ['aws', 'awscdk', 'aws-cdk', 'cdk', 'firewall', 'network-automation', 'network-security'],
  AwsCdkDeps: ['@aws-cdk/core', '@aws-cdk/aws-ec2', '@aws-cdk/aws-iam', '@aws-cdk/aws-lambda', '@aws-cdk/aws-logs', '@aws-cdk/aws-networkfirewall'],
  defaultReleaseBranch: 'main',
  deps: ['@aws-cdk/aws-iam', '@aws-cdk/aws-ec2', '@aws-cdk/aws-lambda', '@aws-cdk/aws-logs', '@aws-cdk/aws-networkfirewall', '@aws-cdk/core'],
  peerDeps: ['@aws-cdk/aws-iam', '@aws-cdk/aws-ec2', '@aws-cdk/aws-lambda', '@aws-cdk/aws-logs', '@aws-cdk/aws-networkfirewall', '@aws-cdk/core'],
  name: 'cdk-nwfirewall',
  repositoryUrl: 'https://github.com/vennemp/cdk-nwfirewall.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();