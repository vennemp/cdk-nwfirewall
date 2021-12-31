# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="constructs"></a>

### FirewallStack <a name="cdk-nwfirewall.FirewallStack" id="cdknwfirewallfirewallstack"></a>

#### Initializers <a name="cdk-nwfirewall.FirewallStack.Initializer" id="cdknwfirewallfirewallstackinitializer"></a>

```typescript
import { FirewallStack } from 'cdk-nwfirewall'

new FirewallStack(scope: Construct, id: string, fwprops: FWVPCProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#cdknwfirewallfirewallstackparameterscope)<span title="Required">*</span> | [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct) | *No description.* |
| [`id`](#cdknwfirewallfirewallstackparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`fwprops`](#cdknwfirewallfirewallstackparameterfwprops)<span title="Required">*</span> | [`cdk-nwfirewall.FWVPCProps`](#cdk-nwfirewall.FWVPCProps) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="cdk-nwfirewall.FirewallStack.parameter.scope" id="cdknwfirewallfirewallstackparameterscope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="cdk-nwfirewall.FirewallStack.parameter.id" id="cdknwfirewallfirewallstackparameterid"></a>

- *Type:* `string`

---

##### `fwprops`<sup>Required</sup> <a name="cdk-nwfirewall.FirewallStack.parameter.fwprops" id="cdknwfirewallfirewallstackparameterfwprops"></a>

- *Type:* [`cdk-nwfirewall.FWVPCProps`](#cdk-nwfirewall.FWVPCProps)

---






## Classes <a name="Classes" id="classes"></a>

### FWVPCProps <a name="cdk-nwfirewall.FWVPCProps" id="cdknwfirewallfwvpcprops"></a>

#### Initializers <a name="cdk-nwfirewall.FWVPCProps.Initializer" id="cdknwfirewallfwvpcpropsinitializer"></a>

```typescript
import { FWVPCProps } from 'cdk-nwfirewall'

new FWVPCProps()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---



#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
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


### Hello <a name="cdk-nwfirewall.Hello" id="cdknwfirewallhello"></a>

#### Initializers <a name="cdk-nwfirewall.Hello.Initializer" id="cdknwfirewallhelloinitializer"></a>

```typescript
import { Hello } from 'cdk-nwfirewall'

new Hello()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`sayHello`](#cdknwfirewallhellosayhello) | *No description.* |

---

##### `sayHello` <a name="cdk-nwfirewall.Hello.sayHello" id="cdknwfirewallhellosayhello"></a>

```typescript
public sayHello()
```





