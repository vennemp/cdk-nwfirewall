# AWS Network Firewall Accelerator

This CDK app takes a few optional parameters and creates a VPC with AWS Network Firewall.  This includes the proper Edge Route Table routes and the proper VPC Endpoint of the GWLB.  It also includes a default set of stateless rules to only allow 80/tcp, 443/tcp, 123/udp, and 53/ip out.  Also has a default set of white listed domains - mainly for common software updates.  

![Architecture Diagram](https://docs.aws.amazon.com/network-firewall/latest/developerguide/images/arch-igw-natgw.png)


Supported Parameters:
```
  cidr?: string
  maxAzs?: number
  firewallsubnetname?: string
  publicsubnetname?: string
  privatesubnetname?: string
  firewallmask?: number
  publicmask?: number
  privatemask?: number
  domainlist?: string[]
```


Example for deploying

```typescript
#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { FirewallStack, FWVPCProps } from '../lib/firewall-stack';

const app = new cdk.App();
new FirewallStack(app, 'FirewallStack', {}, {cidr: '192.168.0.0/24', privatesubnetname: 'tgw-attach'});
```

Example of method for extracting values from construct.
```typescript
  new ec2.CfnNatGateway(this, 'nat-gw', {
    subnetId: firewall.listPublicSubnets().subnets[0].subnetId,
  });
```

Blog: https://medium.com/@matthewvenne/cdk-once-more-unto-the-breach-f2673cf219a6

