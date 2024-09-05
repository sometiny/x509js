### 支持算法 ###
algorithmType: RSA/ECC

algorithmParameters: 2048/4096/P-256/P-384/P-521
### 枚举 ###
```javascript
X509.KeyUsage = {
    DigitalSignature: 0x80,
    NonRepudiation: 0x40,
    KeyEncipherment: 0x20,
    DataEncipherment: 0x10,
    KeyAgreement: 0x8,
    KeyCertSign: 0x4,
    CrlSign: 0x2,
    EncipherOnly: 0x1,
    DecipherOnly: 0x8000,
}

X509.ExtendKeyUsages  = {
    ServerAuth: "1.3.6.1.5.5.7.3.1",
    ClientAuth: "1.3.6.1.5.5.7.3.2",
    CodeSigning: "1.3.6.1.5.5.7.3.3",
    EmailProtection: "1.3.6.1.5.5.7.3.4",
    IpsecEndSystem: "1.3.6.1.5.5.7.3.5",
    IpsecTunnel: "1.3.6.1.5.5.7.3.6",
    IpsecUser: "1.3.6.1.5.5.7.3.7",
    TimeStamping: "1.3.6.1.5.5.7.3.8",
    OCSPSigning: "1.3.6.1.5.5.7.3.9",
    Wireless: "1.3.6.1.5.5.7.3.19",
}
```
### 生成密钥对 ###
```
X509.keypair(
    algorithmType: String, 
    algorithmParameters: String | Integer
) : Promise<KeyPair>
```
```javascript
const response = await X509.keypair('ECC')

console.log(response)
```
### 构造X509Name ###
#### 方法 ####
```
X509.X509Name(commonName: String) : X509Name
```
#### 示例 ####
```javascript
const subject = X509.X509Name('name.com');

//extend field
subject.org('orgname')
    .org_unit('Unit')
    .email('test@gm.com')
    .state('State')
    .country('CN')
    .location('City');
```

### 构造SubjectAltNames ###
#### 方法 ####
```
X509.SubjectAltNames(values: Array = []) : SubjectAltNames
```
#### 示例 ####
```javascript
const subjectAltNames = X509
    .SubjectAltNames()
    .add('name.com')
    .add('*.name.com')
    .add(['*.loc.name.com', '*.sev.name.com'])

const subjectAltNames = X509.SubjectAltNames(['*.loc.name.com', '*.sev.name.com'])

const subjectAltNames = X509.SubjectAltNames(['*.loc.name.com', '*.sev.name.com'])
    .add('*.name.com')
```

### 构造证书签发信息 ###
#### 方法 ####
```
X509.X509CertificateInfo(
    subject: X509Name | null, 
    subjectAltNames: SubjectAltNames | null
) : X509CertificateInfo
```
#### 示例 ####
```javascript
const certificateInfo = X509.X509CertificateInfo(subject, subjectAltNames)
    .isCa(false)
    .days(days)
```

### 生成CSR ###

#### 方法 ####
```
X509.csr(
    algorithmType: String, 
    algorithmParameters: String | Integer, 
    subject: X509Name, 
    subjectAltNames: SubjectAltNames | null
) : Promise<CSRResponse>
```
#### 示例 ####
```javascript
//CSR with CommonName only
const subject = X509.X509Name('name.com');
const response = await X509.csr('ECC', 'P-384', subject, null)

console.log(response)


//CSR with CommonName, SAN and other fields

const subjectAltNames = X509.SubjectAltNames();
subjectAltNames.add('name.com')
    .add('*.name.com')
    .add(['*.loc.name.com', '*.sev.name.com'])

const response = await X509.csr('ECC', 'P-384', subject, subjectAltNames)

console.log(response)
```

### 自签名证书 ###

#### 方法 ####
```
X509.selfSignedCertificate(
    algorithmType: String, 
    algorithmParameters: String | Integer, 
    x509CertificateInfo: X509CertificateInfo
): Promise<SignResponse>
```

#### 示例 ####
```javascript
const certificateInfo = X509.X509CertificateInfo(subject, subjectAltNames)
    .isCa(false)
    .days(days)

const response = await X509.selfSignedCertificate('ECC', 'P-384', certificateInfo)

console.log(response)
```

### 颁发证书 ###
#### 方法 ####
```
X509.issue(
    csrOrPublicKey: String, 
    x509CertificateInfo: X509CertificateInfo,
    caCertificate: String, 
    caPrivateKey: String
): Promise<IssueResponse>
```

csrOrPublicKey/caCertificate/caPrivateKey 值均为PEM格式：
```
-----BEGIN xxxx-----
内容
-----END xxxx-----
```
csrOrPublicKey支持`csr`或`publicKey`

csrOrPublicKey为`publicKey`时，`x509CertificateInfo`需要提供`subject`

csrOrPublicKey为`csr`时，`x509CertificateInfo`自动从`csr`获取`subject`,`subjectAltNames`以及`publicKey`
#### 示例 ####
```javascript
const certificateInfo = X509.X509CertificateInfo()
    .isCa(false)
    .days(days)

const response = await X509.issue(csr, certificateInfo, caCertificate, caPrivateKey)

console.log(response)
```

## 常用对象 ##
```
KeyPair {
    private_key: string,
    public_key: string
}

X509Name {
    org(org:string) : X509Name,
    org_unit(unit:string) : X509Name,
    country(countryCode:string) : X509Name,
    state(stateName:string) : X509Name,
    location(locationName:string) : X509Name,
    street(streetName:string) : X509Name,
    email(emailAddress:string) : X509Name,
    all(): Object
}

SubjectAltNames {
    add(name: string): SubjectAltNames,
    clear(): SubjectAltNames,
    isEmpty(): Boolean,
    all(): Object
}

CSRResponse {
    csr: sring,
    private_key: sring,
    public_key: sring,
}

X509CertificateInfo {
    isCa(value: Boolean | undefined): X509CertificateInfo | Boolean,
    serialNumber(value: Array | Uint8Array | undefined): X509CertificateInfo | Array,
    keyUsage(value: KeyUsage | undefined): X509CertificateInfo | KeyUsage,
    extendedKeyUsage(value: Array<ExtendKeyUsages> | undefined): X509CertificateInfo | Array<ExtendKeyUsages>,
    days(value: Integer | undefined): X509CertificateInfo | Integer,
    subject: X509Name | null,
    subjectAltNames: SubjectAltNames | null
}

SignResponse {
    cer: sring,
    private_key: sring,
    public_key: sring,
}

IssueResponse {
    cer: sring
}
```
