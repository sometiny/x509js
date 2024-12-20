项目：[https://github.com/sometiny/x509js](https://github.com/sometiny/x509js)

示例：[https://x509js.sometiny.iploc.cc/dist/](https://x509js.sometiny.iploc.cc/dist/)

#### 基本功能
依赖于现代浏览器的安全API：crypto.subtle，对x509相关文件标准的实现。

纯浏览器端，无任何对外网网络请求，降低私钥等敏感信息的泄露风险。

* 支持RSA/ECC算法
* 密钥对生成
* CSR生成
* 自签名证书，支持生成根CA证书和中级CA证书
* 证书签名（使用CA对第三方CSR/公钥签名）
* RSA/ECC签名验签


#### 例如生成密钥对
```javascript
const keypair = await X509.keypair('ECC')
console.log(keypair.private_key)
console.log(keypair.public_key)

/**
-----BEGIN PRIVATE KEY-----
MIG/AgEAMBAGByqGSM49AgEGBSuBBAAiBIGnMIGkAgEBBDCFf0WeXpl5TSU8+sK2
UpJZcfNFu8X0HzJwAXBZOK/wy4PsQRqtri/JjgarmtD9N9+gBwYFK4EEACKhZANi
AARC6NScZIRjcO4BGUvNIF29DUsjC7NymGCHdl1r8dQ9VwZnytzmGH1VbGRGVihg
l9R1uRk0cVC1ejlH23FuUJwBMKd/Qe5SxUuyx9nZOa7R5FFkDa4IENi9YokWpovU
AfE=
-----END PRIVATE KEY-----

-----BEGIN PUBLIC KEY-----
MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEQujUnGSEY3DuARlLzSBdvQ1LIwuzcphg
h3Zda/HUPVcGZ8rc5hh9VWxkRlYoYJfUdbkZNHFQtXo5R9txblCcATCnf0HuUsVL
ssfZ2Tmu0eRRZA2uCBDYvWKJFqaL1AHx
-----END PUBLIC KEY-----
*/
```
#### 例如生成CSR
```javascript
const subject = X509.X509Name('name.com');
const response = await X509.csr('ECC', 'P-384', subject, null)

console.log(response.csr)
console.log(response.private_key)
console.log(response.public_key)

/**
-----BEGIN CERTIFICATE REQUEST-----
MIIBCjCBkAIBADATMREwDwYDVQQDDAhuYW1lLmNvbTB2MBAGByqGSM49AgEGBSuB
BAAiA2IABKt6ZhC8Wm2vnUHTj6hq/AdSrPsu6TIUA/V8J4MijXPQA97s/eeWWSPb
aocYjFmfBptDGHKFcgjxT5u0W8jx8V0KrxtLKuah904YheMZr1cMwRDx4Ko8iCVL
48YVTfIJVTAKBggqhkjOPQQDAgNpADBmAjEA5agr642TPRjBbarkX2/V52CKVe0B
p0zuvZH1Jb+IOOj+slUGY6IdekroY+Nhm2iyAjEA9Ab45+J1ZHS2vBF8VGQmYdPH
hbfMpeFIrfAtBg3Q+a9xfy0vR8nNL00P76uRT7F9
-----END CERTIFICATE REQUEST-----

-----BEGIN PRIVATE KEY-----
MIG/AgEAMBAGByqGSM49AgEGBSuBBAAiBIGnMIGkAgEBBDCIbFAazhcPz4SIXgfi
Wq8sv87o8uZVsucE4YLFFClQ5z0RidMVdcRNcwnTwrzJVW6gBwYFK4EEACKhZANi
AASremYQvFptr51B04+oavwHUqz7LukyFAP1fCeDIo1z0APe7P3nllkj22qHGIxZ
nwabQxhyhXII8U+btFvI8fFdCq8bSyrmofdOGIXjGa9XDMEQ8eCqPIglS+PGFU3y
CVU=
-----END PRIVATE KEY-----

-----BEGIN PUBLIC KEY-----
MHYwEAYHKoZIzj0CAQYFK4EEACIDYgAEq3pmELxaba+dQdOPqGr8B1Ks+y7pMhQD
9XwngyKNc9AD3uz955ZZI9tqhxiMWZ8Gm0MYcoVyCPFPm7RbyPHxXQqvG0sq5qH3
ThiF4xmvVwzBEPHgqjyIJUvjxhVN8glV
-----END PUBLIC KEY-----
*/
```

### 支持算法 ###
algorithmType: RSA, algorithmParameters: 2048/4096

algorithmType: ECC, algorithmParameters: P-256/P-384/P-521
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
使用指定的算法和参数，生成非对称加密密钥对。
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
用于构造使用者(subject)或颁发者(issuer)信息，commonName是必须的。
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
构造SAN信息，用于签发多域名证书。
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
构造证书前发信息，默认不签发为CA证书，证书有效期365天，可自行设置。
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
    .days(90);
```

### 生成CSR ###
使用指定算法和参数生成证书签发请求(CSR)，至少要提供subject，可提供subjectAltNames。
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
### 解析CSR ###
解析CSR内容，返回subject、subjectAltNames和publicKey。
#### 方法 `####`
```
X509.parse(contents: String, expect: String = undefined) : Promise<CSRDetail>

CSRDetail {
    subject: X509Name,
    subjectAltNames: SubjectAltNames,
    publicKeyPem: String
}
```
#### 示例 ####
```javascript
const result = await X509.parse(`-----BEGIN CERTIFICATE REQUEST-----
MIIBCjCBkAIBADATMREwDwYDVQQDDAhuYW1lLmNvbTB2MBAGByqGSM49AgEGBSuB
BAAiA2IABKt6ZhC8Wm2vnUHTj6hq/AdSrPsu6TIUA/V8J4MijXPQA97s/eeWWSPb
aocYjFmfBptDGHKFcgjxT5u0W8jx8V0KrxtLKuah904YheMZr1cMwRDx4Ko8iCVL
48YVTfIJVTAKBggqhkjOPQQDAgNpADBmAjEA5agr642TPRjBbarkX2/V52CKVe0B
p0zuvZH1Jb+IOOj+slUGY6IdekroY+Nhm2iyAjEA9Ab45+J1ZHS2vBF8VGQmYdPH
hbfMpeFIrfAtBg3Q+a9xfy0vR8nNL00P76uRT7F9
-----END CERTIFICATE REQUEST-----`)
```


### 解析SSL证书 ###
解析SSL证书内容，返回subject、subjectAltNames和publicKey等信息。
#### 方法 `####`
```
X509.parse(contents: String, expect: String = undefined) : Promise<CERDetail>

CERDetail {
    subject: X509Name,
    issuer: X509Name,
    notBefore: String,
    notAfter: String,
    subjectAltNames: SubjectAltNames,
    publicKeyPem: String
}
```
#### 示例 ####
```javascript
const result = await X509.parse(`-----BEGIN CERTIFICATE-----
MIICIjCCAaigAwIBAgIQAqQUXiI4NzMU9vYfGu7zTTAKBggqhkjOPQQDAjAaMRgw
FgYDVQQDDA95b3VyLWRvbWFpbi5jb20wHhcNMjQxMjIwMDgxNjE4WhcNMjUxMjIw
MDgxNjE4WjAaMRgwFgYDVQQDDA95b3VyLWRvbWFpbi5jb20wdjAQBgcqhkjOPQIB
BgUrgQQAIgNiAASZoQbRE9tUzV82GqBSJWS9UXYDrk3IhfUSNu8aEe/FPiSZ5nqn
lOIyRG0EnHWq0HI+vK3NI+IvOBdfxUgbGF5ej/wWT59+a3clRF8N/OZh15rj5qga
dQVg7hPY1WtNH8ejgbIwga8wLQYDVR0RBCYwJIIPeW91ci1kb21haW4uY29tghEq
LnlvdXItZG9tYWluLmNvbTAdBgNVHQ4EFgQU0l3d+AF0JRbiwIlobMy/gFE3Xu8w
HwYDVR0jBBgwFoAU0l3d+AF0JRbiwIlobMy/gFE3Xu8wDgYDVR0PAQEBBAQDAgSw
MAwGA1UdEwEBAQQCMAAwIAYDVR0lAQEBBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMC
MAoGCCqGSM49BAMCA2gAMGUCMDUY5LNHdzKlfdFnc7F2iPD8heJBlpBhD+umWQEd
m201z7GJG0oWVyfJi4kWEy1E7QIxAOtWz92ziLTpiwFWr0RvaRLwpHln47cSHhd2
IVaIsdXT1cFvdyWSpyh7dhQoT1TRzA==
-----END CERTIFICATE-----
`)
```
### 自签名证书 ###
使用指定算法和参数生成签发自签名证书(Self-Signed-Certificate)。
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
    .isCa(false)  //设置为true可签发为CA证书，CA证书可以对其他CSR或公钥进行签发
    .days(days)

const response = await X509.selfSignedCertificate('ECC', 'P-384', certificateInfo)

console.log(response)
```

### 颁发证书 ###
使用CA证书和CA私钥，对CSR或者公钥进行签发。
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
    extendedKeyUsage(value: Array | undefined): X509CertificateInfo | Array,
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
