import {
    asn1_constructed_sequence,
    asn1_null,
    asn1_raw,
    asn1_bit_string,
    asn1_integer,
    asn1_object_identifier,
    asn1_info
} from '../asn1/objects'
import {
    build_pem, check_algorithm,
    export_keys, gen_keypair, import_public_key,
    sha256WithECDsa,
    sha256WithRSAEncryption,
    sign, SubjectAltNames, verify, X509Name
} from './x509'

function build_root(x509Names, subjectAltNames, publicKey) {
    const root = asn1_constructed_sequence(
        asn1_integer(0),
        x509Names.encode(),
        asn1_raw(publicKey),
        subjectAltNames ? subjectAltNames.encodeCsrExtension() : null
    )
    const bytes = []
    root.encode(bytes)
    return bytes
}

function build_csr(algorithm, body, signature) {
    const csr = []

    asn1_constructed_sequence(
        asn1_raw(body),
        asn1_constructed_sequence(
            asn1_object_identifier(algorithm === 'ECC' ? sha256WithECDsa : sha256WithRSAEncryption),
            algorithm === 'ECC' ? asn1_raw([]) : asn1_null()
        ),
        asn1_bit_string(signature)
    ).encode(csr)
    return csr
}

export async function generate_csr(algorithm, parameters, x509Names, subjectAltNames) {
    check_algorithm(algorithm, parameters)

    if (x509Names instanceof Array) {
        subjectAltNames = SubjectAltNames(x509Names)
        x509Names = X509Name(x509Names[0])
    } else {
        if (typeof x509Names === 'string') x509Names = X509Name(x509Names)
        if (subjectAltNames instanceof Array) subjectAltNames = SubjectAltNames(subjectAltNames)
    }

    const keypair = await gen_keypair(algorithm, parameters)

    const keys = await export_keys(keypair.privateKey)

    const bytes = build_root(x509Names, subjectAltNames, keys.public_key)

    const signature = await sign(keypair.privateKey, bytes, algorithm)

    const csr = build_csr(algorithm, bytes, signature)

    return {
        private_key: build_pem('PRIVATE KEY', keys.private_key),
        public_key: build_pem('PUBLIC KEY', keys.public_key),
        csr: build_pem('CERTIFICATE REQUEST', csr)
    }
}
export async function parse_csr(contents) {
    const asn1 = asn1_info(contents)

    const body = asn1[0]
    const signature = asn1[2].bytes()

    const signature_algorithm_identifier = asn1[1][0].objectIdentifier()

    const public_key_info = body[2]

    const public_key = await import_public_key(public_key_info)

    const result = await verify(public_key, body.all(), signature, signature_algorithm_identifier === '1.2.840.113549.1.1.11' ? 'RSA' : 'ECC')
    if (!result) throw new Error('csr verify failed')

    const subject = X509Name('')
    subject.decode(body[1])

    const san = SubjectAltNames()
    if (body[3]) {
        san.decodeCsrExtension(asn1[0][3])
    }

    const public_key_bits = asn1[0][2][1].bytes()

    return {
        subject,
        subjectAltNames: san,
        publicKey: public_key_info.all(),
        publicKeyContents: public_key_bits
    }
}
