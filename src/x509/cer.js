import {
    asn1_constructed_context,
    asn1_constructed_sequence,
    asn1_null,
    asn1_raw,
    asn1_bit_string,
    asn1_integer,
    asn1_object_identifier,
    asn1_utc_time, asn1_info
} from '../asn1/objects'
import {
    build_pem, check_algorithm,
    export_keys, gen_keypair,
    sha256WithECDsa,
    sha256WithRSAEncryption, sign,
    ExtendKeyUsages,
    KeyUsageForCa,
    KeyUsageNormal, X509Name, SubjectAltNames, import_pkcs8_key, parse_pem, export_public_key, sha1Digest
} from './x509'

import {
    AuthorityKeyIdentifierExtension,
    BasicConstraintsExtension,
    ExtendedKeyUsageExtension,
    extensions,
    KeyUsageExtension,
    SubjectAlternativeNameExtension,
    SubjectKeyIdentifierExtension
} from './x509Extensions'
import { parse_csr } from './csr'

function build_root_data(signatureAlgorithm, subject, publicKey, notBefore, notAfter, x509Extensions, serialNumber, issuer) {
    const root = asn1_constructed_sequence(
        asn1_constructed_context(0,
            asn1_integer(2)
        ),
        asn1_integer(serialNumber),
        asn1_constructed_sequence(
            asn1_object_identifier(signatureAlgorithm === 'ECC' ? sha256WithECDsa : sha256WithRSAEncryption)
        ),
        issuer.encode(),
        asn1_constructed_sequence(
            asn1_utc_time(notBefore),
            asn1_utc_time(notAfter)
        ),
        subject.encode(),
        asn1_raw(publicKey),
        asn1_constructed_context(3, x509Extensions.build())
    )
    const bytes = []
    root.encode(bytes)
    return bytes
}
function build_cer_data(signatureAlgorithm, body, signature) {
    const csr = []

    asn1_constructed_sequence(
        asn1_raw(body),
        asn1_constructed_sequence(
            asn1_object_identifier(signatureAlgorithm === 'ECC' ? sha256WithECDsa : sha256WithRSAEncryption),
            signatureAlgorithm === 'ECC' ? asn1_raw([]) : asn1_null()
        ),
        asn1_bit_string(signature)
    ).encode(csr)
    return csr
}

function generateSerialNumber() {
    const seeds = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    crypto.getRandomValues(seeds)
    seeds[0] = 0x02
    return seeds
}
export async function self_issue(algorithm, algorithmParameters, x509CertificateInfo) {
    check_algorithm(algorithm, algorithmParameters)
    const keypair = await gen_keypair(algorithm, algorithmParameters)

    const { private_key, public_key, public_key_bits } = await export_keys(keypair.privateKey)

    const subjectKeyIdentifier = await sha1Digest(public_key_bits)

    x509CertificateInfo.publicKey(public_key)
    x509CertificateInfo.subjectKeyIdentifier(subjectKeyIdentifier)
    x509CertificateInfo.authorityKeyIdentifier(subjectKeyIdentifier)

    const { cer } = await issue2(x509CertificateInfo, x509CertificateInfo.subject, keypair.privateKey)

    return {
        private_key: build_pem('PRIVATE KEY', private_key),
        public_key: build_pem('PUBLIC KEY', public_key),
        cer: cer
    }
}
export async function self_issue_csr(csr, privateKey, x509CertificateInfo) {
    privateKey = await import_pkcs8_key(parse_pem(privateKey).contents)
    const parsed = parse_pem(csr)
    if (parsed.type !== 'CERTIFICATE REQUEST') throw new Error('csr required')

    // read from csr
    csr = await parse_csr(parsed.contents)
    x509CertificateInfo.reset(csr.subject, csr.subjectAltNames)
    x509CertificateInfo.publicKey(csr.publicKey)

    // calc subjectKeyIdentifier
    const subjectKeyIdentifier = await sha1Digest(csr.publicKeyContents)
    x509CertificateInfo.subjectKeyIdentifier(subjectKeyIdentifier)
    x509CertificateInfo.authorityKeyIdentifier(subjectKeyIdentifier)

    const { cer } = await issue2(x509CertificateInfo, x509CertificateInfo.subject, privateKey)

    return {
        cer: cer
    }
}
export async function issue(csr, x509CertificateInfo, caCertificate, caPrivateKey) {
    caCertificate = parse_cer(parse_pem(caCertificate).contents)
    caPrivateKey = await import_pkcs8_key(parse_pem(caPrivateKey).contents)

    // parse pem contents
    const parsed = parse_pem(csr)

    if (parsed.type === 'CERTIFICATE REQUEST') {
        // read from csr
        csr = await parse_csr(parsed.contents)
        x509CertificateInfo.reset(csr.subject, csr.subjectAltNames)
        x509CertificateInfo.publicKey(csr.publicKey)

        // calc subjectKeyIdentifier
        const subjectKeyIdentifier = await sha1Digest(csr.publicKeyContents)
        x509CertificateInfo.subjectKeyIdentifier(subjectKeyIdentifier)
    } else if (parsed.type === 'PUBLIC KEY') {
        // read from public key
        if (!x509CertificateInfo.subject) throw new Error('subject required fro x509CertificateInfo')

        x509CertificateInfo.publicKey(parsed.contents)

        // calc subjectKeyIdentifier
        const asn1 = asn1_info(parsed.contents)
        const subjectKeyIdentifier = await sha1Digest(asn1[1].bytes())
        x509CertificateInfo.subjectKeyIdentifier(subjectKeyIdentifier)
    } else throw new Error('invalid csr or publicKey')

    const authorityKeyIdentifier = await sha1Digest(caCertificate.publicKeyContents)

    x509CertificateInfo.authorityKeyIdentifier(authorityKeyIdentifier)

    return await issue2(x509CertificateInfo, caCertificate.subject, caPrivateKey)
}

async function issue2(x509CertificateInfo, issuer, issuerPrivateKey) {
    const subject = x509CertificateInfo.subject
    const serialNumber = x509CertificateInfo.serialNumber() || generateSerialNumber()
    const days = x509CertificateInfo.days()
    const isCa = x509CertificateInfo.isCa()
    const keyUsage = x509CertificateInfo.keyUsage()
    const extendedKeyUsage = x509CertificateInfo.extendedKeyUsage() || [
        ExtendKeyUsages.ClientAuth,
        ExtendKeyUsages.ServerAuth
    ]
    const subjectAltNames = x509CertificateInfo.subjectAltNames

    const algorithmType = issuerPrivateKey.algorithm.name === 'ECDSA' ? 'ECC' : 'RSA'

    const now = +new Date()
    const notBefore = new Date(now)
    const notAfter = new Date(now + days * 86400 * 1000)

    const extensions_ = extensions()

    if (subjectAltNames != null && !subjectAltNames.isEmpty()) {
        extensions_.add(SubjectAlternativeNameExtension(subjectAltNames))
    }

    extensions_.add(SubjectKeyIdentifierExtension(new Uint8Array(x509CertificateInfo.subjectKeyIdentifier())))
    extensions_.add(AuthorityKeyIdentifierExtension(new Uint8Array(x509CertificateInfo.authorityKeyIdentifier())))

    extensions_.add(KeyUsageExtension(keyUsage || (isCa ? KeyUsageForCa : KeyUsageNormal)))
    extensions_.add(BasicConstraintsExtension(isCa))

    if (extendedKeyUsage.length > 0) {
        extensions_.add(ExtendedKeyUsageExtension(extendedKeyUsage))
    }

    const bytes = build_root_data(algorithmType, subject, x509CertificateInfo.publicKey(), notBefore, notAfter, extensions_, serialNumber, issuer)

    const signature = await sign(issuerPrivateKey, bytes, algorithmType)

    const cer = build_cer_data(algorithmType, bytes, signature)

    return {
        cer: build_pem('CERTIFICATE', cer)
    }
}

export function parse_cer(contents) {
    const asn1 = asn1_info(contents)

    const body = asn1[0]
    const signature = asn1[2].bytes()

    const signature_algorithm = asn1[1][0].objectIdentifier()

    const public_key_info = body[6]

    const issuer = X509Name('')
    issuer.decode(body[3])

    const subject = X509Name('')
    subject.decode(body[5])

    const san = SubjectAltNames()
    if (body[7]) {
        san.decodeCerExtension(body[7][0])
    }
    return {
        subject,
        issuer,
        notBefore: body[4][0].string(),
        notAfter: body[4][1].string(),
        subjectAltNames: san,
        publicKey: public_key_info.all(),
        publicKeyContents: public_key_info[1].bytes(),
        signatureAlgorithm: signature_algorithm,
        signature
    }
}
