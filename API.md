# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="constructs"></a>

### FirewallStack <a name="cdk-nwfirewall.FirewallStack" id="cdknwfirewallfirewallstack"></a>

#### Initializers <a name="cdk-nwfirewall.FirewallStack.Initializer" id="cdknwfirewallfirewallstackinitializer"></a>

```typescript
import { FirewallStack } from 'cdk-nwfirewall'

new FirewallStack(scope: Stack, id: string, fwprops: FWVPCProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#cdknwfirewallfirewallstackparameterscope)<span title="Required">*</span> | [`@aws-cdk/core.Stack`](#@aws-cdk/core.Stack) | *No description.* |
| [`id`](#cdknwfirewallfirewallstackparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`fwprops`](#cdknwfirewallfirewallstackparameterfwprops)<span title="Required">*</span> | [`cdk-nwfirewall.FWVPCProps`](#cdk-nwfirewall.FWVPCProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="cdk-nwfirewall.FirewallStack.parameter.scope" id="cdknwfirewallfirewallstackparameterscope"></a>

- *Type:* [`@aws-cdk/core.Stack`](#@aws-cdk/core.Stack)

---

##### `id`<sup>Required</sup> <a name="cdk-nwfirewall.FirewallStack.parameter.id" id="cdknwfirewallfirewallstackparameterid"></a>

- *Type:* `string`

---

##### `fwprops`<sup>Required</sup> <a name="cdk-nwfirewall.FirewallStack.parameter.fwprops" id="cdknwfirewallfirewallstackparameterfwprops"></a>

- *Type:* [`cdk-nwfirewall.FWVPCProps`](#cdk-nwfirewall.FWVPCProps)

---

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`listFirewallSubnets`](#cdknwfirewallfirewallstacklistfirewallsubnets) | Use only if used default subnet names. |
| [`listPrivateSubnets`](#cdknwfirewallfirewallstacklistprivatesubnets) | Use only if used default subnet names. |
| [`listPublicSubnets`](#cdknwfirewallfirewallstacklistpublicsubnets) | *No description.* |
| [`vpcId`](#cdknwfirewallfirewallstackvpcid) | *No description.* |
| [`vpcObj`](#cdknwfirewallfirewallstackvpcobj) | *No description.* |

---

##### `listFirewallSubnets` <a name="cdk-nwfirewall.FirewallStack.listFirewallSubnets" id="cdknwfirewallfirewallstacklistfirewallsubnets"></a>

```typescript
public listFirewallSubnets()
```

##### `listPrivateSubnets` <a name="cdk-nwfirewall.FirewallStack.listPrivateSubnets" id="cdknwfirewallfirewallstacklistprivatesubnets"></a>

```typescript
public listPrivateSubnets()
```

##### `listPublicSubnets` <a name="cdk-nwfirewall.FirewallStack.listPublicSubnets" id="cdknwfirewallfirewallstacklistpublicsubnets"></a>

```typescript
public listPublicSubnets()
```

##### `vpcId` <a name="cdk-nwfirewall.FirewallStack.vpcId" id="cdknwfirewallfirewallstackvpcid"></a>

```typescript
public vpcId()
```

##### `vpcObj` <a name="cdk-nwfirewall.FirewallStack.vpcObj" id="cdknwfirewallfirewallstackvpcobj"></a>

```typescript
public vpcObj()
```




## Structs <a name="Structs" id="structs"></a>

### FWVPCProps <a name="cdk-nwfirewall.FWVPCProps" id="cdknwfirewallfwvpcprops"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { FWVPCProps } from 'cdk-nwfirewall'

const fWVPCProps: FWVPCProps = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`appenddomains`](#cdknwfirewallfwvpcpropspropertyappenddomains) | `boolean` | provide a list of domains you wish to whitelist, this is optional as a list of commonly used domains for patching is included. |
| [`cidr`](#cdknwfirewallfwvpcpropspropertycidr) | `string` | *No description.* |
| [`domainlist`](#cdknwfirewallfwvpcpropspropertydomainlist) | `string`[] | CIDR mask of private subnets - e.g. 28. |
| [`firewallmask`](#cdknwfirewallfwvpcpropspropertyfirewallmask) | `number` | Name of private subnets that require NAT to reach internet - if you are using the firewall as an egress VPC with TGW, this is where tgw-attachment would go. |
| [`firewallsubnetname`](#cdknwfirewallfwvpcpropspropertyfirewallsubnetname) | `string` | Maximum number of AZs to iterate thru. |
| [`maxAzs`](#cdknwfirewallfwvpcpropspropertymaxazs) | `number` | CIDR block for the VPC - would recommend using at least a /24. |
| [`privatemask`](#cdknwfirewallfwvpcpropspropertyprivatemask) | `number` | CIDR mask of public subnets - e.g. 28. |
| [`privatesubnetname`](#cdknwfirewallfwvpcpropspropertyprivatesubnetname) | `string` | Name of public subnets - where NAT GW and resources requiring public IPs. |
| [`publicmask`](#cdknwfirewallfwvpcpropspropertypublicmask) | `number` | CIDR mask of firewall subnets - e.g. 28. |
| [`publicsubnetname`](#cdknwfirewallfwvpcpropspropertypublicsubnetname) | `string` | Name of subnets hosting AWS NFW. |

---

##### `appenddomains`<sup>Optional</sup> <a name="cdk-nwfirewall.FWVPCProps.property.appenddomains" id="cdknwfirewallfwvpcpropspropertyappenddomains"></a>

```typescript
public readonly appenddomains: boolean;
```

- *Type:* `boolean`

provide a list of domains you wish to whitelist, this is optional as a list of commonly used domains for patching is included.

---

##### `cidr`<sup>Optional</sup> <a name="cdk-nwfirewall.FWVPCProps.property.cidr" id="cdknwfirewallfwvpcpropspropertycidr"></a>

```typescript
public readonly cidr: string;
```

- *Type:* `string`

---

##### `domainlist`<sup>Optional</sup> <a name="cdk-nwfirewall.FWVPCProps.property.domainlist" id="cdknwfirewallfwvpcpropspropertydomainlist"></a>

```typescript
public readonly domainlist: string[];
```

- *Type:* `string`[]

CIDR mask of private subnets - e.g. 28.

---

##### `firewallmask`<sup>Optional</sup> <a name="cdk-nwfirewall.FWVPCProps.property.firewallmask" id="cdknwfirewallfwvpcpropspropertyfirewallmask"></a>

```typescript
public readonly firewallmask: number;
```

- *Type:* `number`

Name of private subnets that require NAT to reach internet - if you are using the firewall as an egress VPC with TGW, this is where tgw-attachment would go.

---

##### `firewallsubnetname`<sup>Optional</sup> <a name="cdk-nwfirewall.FWVPCProps.property.firewallsubnetname" id="cdknwfirewallfwvpcpropspropertyfirewallsubnetname"></a>

```typescript
public readonly firewallsubnetname: string;
```

- *Type:* `string`

Maximum number of AZs to iterate thru.

---

##### `maxAzs`<sup>Optional</sup> <a name="cdk-nwfirewall.FWVPCProps.property.maxAzs" id="cdknwfirewallfwvpcpropspropertymaxazs"></a>

```typescript
public readonly maxAzs: number;
```

- *Type:* `number`

CIDR block for the VPC - would recommend using at least a /24.

---

##### `privatemask`<sup>Optional</sup> <a name="cdk-nwfirewall.FWVPCProps.property.privatemask" id="cdknwfirewallfwvpcpropspropertyprivatemask"></a>

```typescript
public readonly privatemask: number;
```

- *Type:* `number`

CIDR mask of public subnets - e.g. 28.

---

##### `privatesubnetname`<sup>Optional</sup> <a name="cdk-nwfirewall.FWVPCProps.property.privatesubnetname" id="cdknwfirewallfwvpcpropspropertyprivatesubnetname"></a>

```typescript
public readonly privatesubnetname: string;
```

- *Type:* `string`

Name of public subnets - where NAT GW and resources requiring public IPs.

---

##### `publicmask`<sup>Optional</sup> <a name="cdk-nwfirewall.FWVPCProps.property.publicmask" id="cdknwfirewallfwvpcpropspropertypublicmask"></a>

```typescript
public readonly publicmask: number;
```

- *Type:* `number`

CIDR mask of firewall subnets - e.g. 28.

---

##### `publicsubnetname`<sup>Optional</sup> <a name="cdk-nwfirewall.FWVPCProps.property.publicsubnetname" id="cdknwfirewallfwvpcpropspropertypublicsubnetname"></a>

```typescript
public readonly publicsubnetname: string;
```

- *Type:* `string`

Name of subnets hosting AWS NFW.

---



