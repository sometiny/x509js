import {
    generate_asymmetric_keypair,
    KeyUsage,
    ExtendKeyUsages,
    SubjectAltNames,
    X509Name,
    X509CertificateInfo,
    parse_pem, import_pkcs8_key, import_public_key, sign, verify
} from './x509/x509'
import { generate_csr, parse_csr } from './x509/csr'
import { self_issue, issue, parse_cer, self_issue_csr } from './x509/cer'
import { Base64 } from './helpers/base64'
import { UTF8 } from './helpers/utf8'
import Hex from './helpers/hex'

function parse(contents, expect) {
    const pem = parse_pem(contents)
    if (expect && pem.type !== expect) throw new Error('except: ' + expect)

    if (pem.type === 'CERTIFICATE REQUEST') return parse_csr(pem.contents)
    if (pem.type === 'CERTIFICATE') return parse_cer(pem.contents)
    if (pem.type === 'PRIVATE KEY') return import_pkcs8_key(pem.contents)
    if (pem.type === 'PUBLIC KEY') return import_public_key(pem.contents)
    return null
}

export default {
    version: '1.0.1',
    keypair: generate_asymmetric_keypair,
    csr: generate_csr,
    selfSignedCertificate: self_issue,
    selfSignedCertificateWithCSR: self_issue_csr,
    issue,
    parse,
    SubjectAltNames,
    X509Name,
    X509CertificateInfo,
    KeyUsage,
    ExtendKeyUsages,
    encoding: {
        Base64: {
            parse(str) {
                return Base64.decode(str)
            },
            stringify(bytes) {
                return Base64.encode(bytes)
            }
        },
        UTF8: {
            parse(str) {
                return UTF8.getBytes(str)
            },
            stringify(bytes) {
                return UTF8.getString(bytes)
            }
        },
        Hex: {
            parse(str) {
                return Hex.parse(str)
            },
            stringify(bytes) {
                return Hex.stringify(bytes).join('')
            }
        }
    },
    async generateSignature(privateKey, body, returnRaw) {
        const privateKey_ = await parse(privateKey, 'PRIVATE KEY')
        const algorithmType = privateKey_.algorithm.name === 'ECDSA' ? 'ECC' : 'RSA'
        return { algorithm: privateKey_.algorithm, signature: await sign(privateKey_, body, algorithmType, returnRaw) }
    },
    async verifySignature(publicKey, body, signature, rawSignature) {
        const publicKey_ = await parse(publicKey, 'PUBLIC KEY')
        const algorithmType = publicKey_.algorithm.name === 'ECDSA' ? 'ECC' : 'RSA'
        return { algorithm: publicKey_.algorithm, match: await verify(publicKey_, body, signature, algorithmType, rawSignature) }
    }
}
