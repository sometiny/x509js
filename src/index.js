import {
    generate_asymmetric_keypair,
    KeyUsage,
    ExtendKeyUsages,
    SubjectAltNames,
    X509Name,
    X509CertificateInfo,
    parse_pem, import_pkcs8_key, import_public_key
} from './x509/x509'
import { generate_csr, parse_csr } from './x509/csr'
import { self_issue, issue, parse_cer } from './x509/cer'

function parse(contents) {
    const pem = parse_pem(contents)
    if (pem.type === 'CERTIFICATE REQUEST') return parse_csr(pem.contents)
    if (pem.type === 'CERTIFICATE') return parse_cer(pem.contents)
    if (pem.type === 'PRIVATE KEY') return import_pkcs8_key(pem.contents)
    if (pem.type === 'PUBLIC KEY') return import_public_key(pem.contents)
    return null
}

export default {
    keypair: generate_asymmetric_keypair,
    csr: generate_csr,
    selfSignedCertificate: self_issue,
    issue,
    parse,
    SubjectAltNames,
    X509Name,
    X509CertificateInfo,
    KeyUsage,
    ExtendKeyUsages
}
