import { Base64, UrlSafeBase64 } from '../helpers/base64'
import {
    asn1_context,
    asn1_constructed_context,
    asn1_constructed_sequence,
    asn1_constructed_set,
    asn1_null,
    asn1_bit_string,
    asn1_ia5_string,
    asn1_integer,
    asn1_object_identifier,
    asn1_octet_string,
    asn1_printable_string,
    asn1_utf8_string, asn1_info
} from '../asn1/objects'
import UTF8String from '../helpers/utf8'
import oid from '../asn1/oid'
import DerTag from '../asn1/tags'
import { linesClear } from '../helpers/utils'

const ExportFormat = {
    Raw: 0,
    Pem: 1
}
export const ecc_curves = {
    P256: 'P-256',
    P384: 'P-384',
    P521: 'P-521'
}
export const ecc_curves_oid = {
    'P-256': '1.2.840.10045.3.1.7',
    'P-384': '1.3.132.0.34',
    'P-521': '1.3.132.0.35'
}
export const ecc_curves_oid_name = {
    '1.2.840.10045.3.1.7': 'P-256',
    '1.3.132.0.34': 'P-384',
    '1.3.132.0.35': 'P-521'
}
export const X509Names = {
    CN: '2.5.4.3',
    O: '2.5.4.10',
    OU: '2.5.4.11',
    C: '2.5.4.6',
    ST: '2.5.4.8',
    L: '2.5.4.7',
    Street: '2.5.4.9',
    E: '1.2.840.113549.1.9.1'
}
export const X509OID2Names = {
    '2.5.4.3': 'CN',
    '2.5.4.10': 'O',
    '2.5.4.11': 'OU',
    '2.5.4.6': 'C',
    '2.5.4.8': 'ST',
    '2.5.4.7': 'L',
    '2.5.4.9': 'Street',
    '1.2.840.113549.1.9.1': 'E'
}
export const X509NamesHandler = {
    CN: asn1_utf8_string,
    O: asn1_utf8_string,
    OU: asn1_utf8_string,
    C: asn1_printable_string,
    ST: asn1_utf8_string,
    L: asn1_utf8_string,
    Street: asn1_utf8_string,
    E: asn1_ia5_string
}

export const ExtendKeyUsages = {
    ServerAuth: '1.3.6.1.5.5.7.3.1',
    ClientAuth: '1.3.6.1.5.5.7.3.2',
    CodeSigning: '1.3.6.1.5.5.7.3.3',
    EmailProtection: '1.3.6.1.5.5.7.3.4',
    IpsecEndSystem: '1.3.6.1.5.5.7.3.5',
    IpsecTunnel: '1.3.6.1.5.5.7.3.6',
    IpsecUser: '1.3.6.1.5.5.7.3.7',
    TimeStamping: '1.3.6.1.5.5.7.3.8',
    OCSPSigning: '1.3.6.1.5.5.7.3.9',
    Wireless: '1.3.6.1.5.5.7.3.19'
}

export const KeyUsage = {
    DigitalSignature: (1 << 7),
    NonRepudiation: (1 << 6),
    KeyEncipherment: (1 << 5),
    DataEncipherment: (1 << 4),
    KeyAgreement: (1 << 3),
    KeyCertSign: (1 << 2),
    CrlSign: (1 << 1),
    EncipherOnly: (1 << 0),
    DecipherOnly: (1 << 15)
}
export const KeyUsageForCa =
    KeyUsage.DigitalSignature |
    KeyUsage.CrlSign |
    KeyUsage.KeyCertSign

export const KeyUsageNormal =
    KeyUsage.DigitalSignature |
    KeyUsage.KeyEncipherment |
    KeyUsage.DataEncipherment
export const sha256WithECDsa = '1.2.840.10045.4.3.2'
export const sha256WithRSAEncryption = '1.2.840.113549.1.1.11'

export function generate_rsa_keypair(modulusLength) {
    return crypto.subtle.generateKey({
        name: 'RSASSA-PKCS1-v1_5',
        publicExponent: new Uint8Array([1, 0, 1]),
        modulusLength,
        hash: 'SHA-256'
    }, true, ['sign', 'verify'])
}

export function generate_ecc_keypair(namedCurve) {
    return crypto.subtle.generateKey({
        name: 'ECDSA',
        namedCurve
    }, true, ['sign', 'verify']
    )
}

function generate_ecc_private_key(jwt) {
    const bytes = []
    asn1_constructed_sequence(
        asn1_integer(1),
        asn1_octet_string(UrlSafeBase64.decode(jwt.d)),
        asn1_constructed_context(0,
            asn1_object_identifier(ecc_curves_oid[jwt.crv])
        ),
        asn1_constructed_context(1,
            asn1_bit_string([0x04, ...UrlSafeBase64.decode(jwt.x), ...UrlSafeBase64.decode(jwt.y)])
        )
    ).encode(bytes)
    return bytes
}

function generate_rsa_private_key(jwt) {
    const bytes = []
    asn1_constructed_sequence(
        asn1_integer(0),
        asn1_integer(UrlSafeBase64.decode(jwt.n)),
        asn1_integer(UrlSafeBase64.decode(jwt.e)),
        asn1_integer(UrlSafeBase64.decode(jwt.d)),
        asn1_integer(UrlSafeBase64.decode(jwt.p)),
        asn1_integer(UrlSafeBase64.decode(jwt.q)),
        asn1_integer(UrlSafeBase64.decode(jwt.dp)),
        asn1_integer(UrlSafeBase64.decode(jwt.dq)),
        asn1_integer(UrlSafeBase64.decode(jwt.qi))
    ).encode(bytes)
    return bytes
}

function generate_pkcs8_key(jwt) {
    const isECC = jwt.kty === 'EC'
    const bytes = []
    asn1_constructed_sequence(
        asn1_integer(0),
        asn1_constructed_sequence(
            asn1_object_identifier(isECC ? '1.2.840.10045.2.1' : '1.2.840.113549.1.1.1'),
            isECC ? asn1_object_identifier(ecc_curves_oid[jwt.crv]) : asn1_null()
        ),
        asn1_octet_string(isECC ? generate_ecc_private_key(jwt) : generate_rsa_private_key(jwt))
    ).encode(bytes)
    return bytes
}
/**
 * import 'pkcs8' formatted private key
 * @param asn1
 * @returns {Promise<CryptoKey>}
 */
export function import_pkcs8_key(asn1) {
    if (asn1 instanceof Array) asn1 = asn1_info(asn1)
    const algorithmIdentifier = getAlgorithmIdentifier(asn1[1])

    const publicKeyAlgorithm = getPublicKeyAlgorithm(algorithmIdentifier)
    return crypto.subtle.importKey(
        'pkcs8',
        new Uint8Array(asn1.all()),
        publicKeyAlgorithm,
        true,
        ['sign']
    )
}

function generate_ecc_public_key(jwt) {
    return [0x04, ...UrlSafeBase64.decode(jwt.x), ...UrlSafeBase64.decode(jwt.y)]
}

function generate_rsa_public_key(jwt) {
    const bytes = []
    asn1_constructed_sequence(
        asn1_integer(UrlSafeBase64.decode(jwt.n)),
        asn1_integer(UrlSafeBase64.decode(jwt.e))
    ).encode(bytes)
    return bytes
}

function generate_public_key(jwt) {
    const isECC = jwt.kty === 'EC'
    const bytes = []
    const key_bits = generate_public_key_bits(jwt)
    asn1_constructed_sequence(
        asn1_constructed_sequence(
            asn1_object_identifier(isECC ? '1.2.840.10045.2.1' : '1.2.840.113549.1.1.1'),
            isECC ? asn1_object_identifier(ecc_curves_oid[jwt.crv]) : asn1_null(),
        ),
        asn1_bit_string(key_bits)
    ).encode(bytes)
    return bytes
}
function generate_public_key_bits(jwt) {
    return jwt.kty === 'EC' ? generate_ecc_public_key(jwt) : generate_rsa_public_key(jwt)
}

export function export_pkcs8_private_key(privateKey, format) {
    if (ExportFormat.Pem !== format) format = ExportFormat.Raw
    return crypto.subtle.exportKey('jwk', privateKey).then(info => {
        const privateKeyBytes = generate_pkcs8_key(info)

        return format === ExportFormat.Pem ? build_pem('PRIVATE KEY', privateKeyBytes) : privateKeyBytes
    })
}

export function export_public_key(publicKey, format) {
    if (ExportFormat.Pem !== format) format = ExportFormat.Raw
    return crypto.subtle.exportKey('jwk', publicKey).then(info => {
        const publicKeyBytes = generate_public_key(info)

        return format === ExportFormat.Pem ? build_pem('PUBLIC KEY', publicKeyBytes) : publicKeyBytes
    })
}

function getPublicKeyAlgorithm(algorithmIdentifier) {
    if (algorithmIdentifier.algorithm === '1.2.840.113549.1.1.1') {
        return {
            name: 'RSASSA-PKCS1-v1_5',
            hash: 'SHA-256'
        }
    }
    return {
        name: 'ECDSA',
        namedCurve: ecc_curves_oid_name[algorithmIdentifier.parameters]
    }
}
export function getAlgorithmIdentifier(asn1) {
    const algorithm = asn1[0].objectIdentifier()

    let parameters = null
    if (asn1[1].tag.type === DerTag.ObjectIdentifier) {
        parameters = asn1[1].objectIdentifier()
    } else if (asn1[1].tag.type !== DerTag.Null) {
        parameters = asn1[1].contents()
    }
    return {
        algorithm, parameters
    }
}
/**
 * import 'spki' formatted public key
 * @param asn1
 * @returns {Promise<CryptoKey>}
 */
export function import_public_key(asn1) {
    if (asn1 instanceof Array) asn1 = asn1_info(asn1)
    const algorithmIdentifier = getAlgorithmIdentifier(asn1[0])

    const publicKeyAlgorithm = getPublicKeyAlgorithm(algorithmIdentifier)
    return crypto.subtle.importKey(
        'spki',
        new Uint8Array(asn1.all()),
        publicKeyAlgorithm,
        true,
        ['verify']
    )
}
export async function export_keys(privateKey) {
    const info = await crypto.subtle.exportKey('jwk', privateKey)
    return {
        private_key: generate_pkcs8_key(info),
        public_key: generate_public_key(info),
        public_key_bits: generate_public_key_bits(info)
    }
}

function getSignAlgorithm(algorithm) {
    return algorithm === 'RSA' ? {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256'
    } : {
        name: 'ECDSA',
        hash: 'SHA-256'
    }
}
export function sign(key, body, algorithmType, returnRaw) {
    const algorithm = getSignAlgorithm(algorithmType)
    return crypto.subtle.sign(algorithm, key, new Uint8Array(body)).then(res => {
        const bytes = new Uint8Array(res)
        if (algorithm.name !== 'ECDSA' || returnRaw === true) return bytes

        const result = []

        asn1_constructed_sequence(
            asn1_integer(bytes.slice(0, bytes.length / 2)),
            asn1_integer(bytes.slice(bytes.length / 2))
        ).encode(result)
        return result
    })
}
export function verify(key, body, signature, algorithmType, rawSignature) {
    const algorithm = getSignAlgorithm(algorithmType)

    if (algorithm.name === 'ECDSA' && rawSignature !== true) {
        const asn1 = asn1_info(signature)

        const r = asn1[0].bigInteger()
        const s = asn1[1].bigInteger()

        signature = [...r, ...s]
    }
    return crypto.subtle.verify(algorithm, key, new Uint8Array(signature), new Uint8Array(body))
}
export function build_pem(type, bytes) {
    return '-----BEGIN ' + type + '-----\r\n' +
        Base64.encode(bytes, null, 64) +
        '\r\n-----END ' + type + '-----\r\n'
}
export function parse_pem(contents) {
    let index = contents.indexOf('-----BEGIN ')
    if (index === -1) throw new Error('invalid pem contents: begin_not_found')
    index += 11

    let beginEnd = contents.indexOf('-----', index)
    if (beginEnd === -1 || beginEnd === index) throw new Error('invalid pem contents: type_not_found')

    const type = contents.substring(index, beginEnd)

    beginEnd += 5

    const endStart = contents.indexOf('-----END ' + type + '-----', beginEnd)
    if (endStart === -1) throw new Error('invalid pem contents: end_not_found')

    return {
        type,
        contents: Base64.decode(linesClear(contents.substring(beginEnd, endStart)))
    }
}

export function gen_keypair(algorithm, parameters) {
    return algorithm === 'ECC'
        ? generate_ecc_keypair(parameters || 'P-384')
        : generate_rsa_keypair(parameters || 2048)
}

export function check_algorithm(algorithm, parameters) {
    if (algorithm !== 'ECC' && algorithm !== 'RSA') {
        throw new Error('only support: ECC/RSA')
    }

    if (algorithm === 'ECC' && parameters !== 'P-256' && parameters !== 'P-384' && parameters !== 'P-521' && parameters !== undefined) {
        throw new Error('only support: P-256/P-384/P-521, default: P-384')
    }

    if (algorithm === 'RSA' && parameters !== 2048 && parameters !== 4096 && parameters !== undefined) {
        throw new Error('only support: 2048/4096, default: 2048')
    }
}
export async function generate_asymmetric_keypair(algorithm, parameters) {
    check_algorithm(algorithm, parameters)

    const keypair = await gen_keypair(algorithm, parameters)

    const keys = await export_keys(keypair.privateKey)
    return {
        private_key: build_pem('PRIVATE KEY', keys.private_key),
        public_key: build_pem('PUBLIC KEY', keys.public_key)
    }
}

export function build_x509name(key, x509Names) {
    if (!x509Names[key]) return null
    return asn1_constructed_set(
        asn1_constructed_sequence(
            asn1_object_identifier(X509Names[key]),
            X509NamesHandler[key](x509Names[key])
        )
    )
}
export function X509Name(commonName) {
    const names = {
        'CN': commonName
    }
    function set_get(name, value) {
        if (value === undefined) return names[name]
        names[name] = value
        return instance
    }

    const instance = {
        setKey: (key, value) => set_get(key, value),
        org: (value) => set_get('O', value),
        org_unit: (value) => set_get('OU', value),
        country: (value) => set_get('C', value),
        state: (value) => set_get('ST', value),
        location: (value) => set_get('L', value),
        street: (value) => set_get('Street', value),
        email: (value) => set_get('E', value),
        all: () => names,
        encode() {
            return asn1_constructed_sequence(
                build_x509name('CN', names),
                build_x509name('O', names),
                build_x509name('OU', names),
                build_x509name('C', names),
                build_x509name('ST', names),
                build_x509name('L', names),
                build_x509name('Street', names),
                build_x509name('E', names)
            )
        },
        decode(asn1) {
            for (let i = 0; i < asn1.length; i++) {
                const identifier = oid.decode(asn1[i][0][0].contents())
                const value = asn1[i][0][1].string()

                set_get(X509OID2Names[identifier] || identifier, value)
            }
        }
    }
    return instance
}

export function SubjectAltNames(values) {
    if (values && !(values instanceof Array)) throw new Error('invalid san values')
    const san = values || []

    function encode() {
        const bytes = []
        asn1_constructed_sequence(function(children) {
            san.forEach(t => {
                children.push(asn1_context(2, UTF8String(t).getBytesArray()))
            })
        }).encode(bytes)
        return bytes
    }
    function decode(contents) {
        const asn1 = asn1_info(contents)
        for (let i = 0; i < asn1.length; i++) {
            san.push(asn1[i].string())
        }
    }
    function encodeCsrExtension() {
        if (san.length === 0) return null
        return asn1_constructed_context(0,
            asn1_constructed_sequence(
                asn1_object_identifier('1.2.840.113549.1.9.14'),
                asn1_constructed_set(
                    asn1_constructed_sequence(
                        asn1_constructed_sequence(
                            asn1_object_identifier('2.5.29.17'),
                            asn1_octet_string(encode())
                        )
                    )
                )
            )
        )
    }
    function generate_algorithm_identifier(salt, iv){
        return asn1_constructed_sequence(
            asn1_object_identifier('1.2.840.113549.1.5.13'), //pkcs5PBES2
            asn1_constructed_sequence(
                asn1_constructed_sequence(
                    asn1_object_identifier('1.2.840.113549.1.5.12'), //pBKDF2
                    asn1_constructed_sequence(
                        asn1_octet_string(salt),
                        asn1_integer(4),
                        asn1_constructed_sequence(
                            asn1_object_identifier('1.2.840.113549.2.9'), //hmacWithSHA256
                            asn1_null()
                        )
                    )
                ),
                asn1_constructed_sequence(
                    asn1_object_identifier('2.16.840.1.101.3.4.1.42'), //aes256-CBC
                    asn1_octet_string(iv)
                )
            )
        )
    }

    function generate_encrypted_private_key(encrypted, salt, iv){
        return asn1_constructed_sequence(
            generate_algorithm_identifier(salt, iv),
            asn1_octet_string(encrypted)
        );
    }
    function findExtension(asn1) {
        for (let i = 0; i < asn1.length; i++) {
            const attribute = asn1[i]
            if (attribute.length < 2) throw new Error('invalid csr attribute')
            const attributeId = oid.decode(attribute[0].contents())
            if (attributeId === '1.2.840.113549.1.9.14') return attribute
        }
        return null
    }
    function findSANExtension(attribute) {
        for (let m = 1; m < attribute.length; m++) {
            const value = attribute[m]
            const extensionId = oid.decode(value[0][0][0].contents())
            if (extensionId === '2.5.29.17') return value[0][0]
        }
        return null
    }
    function decodeCsrExtension(asn1) {
        const attribute = findExtension(asn1)
        if (attribute == null) return
        const extension = findSANExtension(attribute)
        if (extension == null) return
        decode(extension[1].contents())
    }
    function decodeCerExtension(asn1) {
        for (let i = 0; i < asn1.length; i++) {
            const extension = asn1[i]
            const extensionId = extension[0].objectIdentifier()
            if (extensionId !== '2.5.29.17') continue
            decode(extension[1].bytes())
        }
    }
    function add(name) {
        if (!(name instanceof Array)) name = [name]
        name.forEach(name => {
            if (name && san.indexOf(name) === -1) san.push(name)
        })
        return instance
    }
    function clear() {
        san.length = 0
        return instance
    }
    const instance = {
        add,
        clear,
        isEmpty: () => san.length === 0,
        all: () => san,
        encode,
        encodeCsrExtension,
        decodeCsrExtension,
        decodeCerExtension
    }
    return instance
}

export function X509CertificateInfo(subject, subjectAltNames) {
    let subject_ = subject; let subjectAltNames_ = subjectAltNames || SubjectAltNames()

    const properties = {
        days: 365
    }

    function set_get(name, value) {
        if (value === undefined) return properties[name]
        properties[name] = value
        return instance
    }
    const instance = {
        isCa: (value) => set_get('isCa', value),
        serialNumber: (value) => set_get('serialNumber', value),
        keyUsage: (value) => set_get('keyUsage', value),
        extendedKeyUsage: (value) => set_get('extendedKeyUsage', value),
        days: (value) => set_get('days', value),
        subjectKeyIdentifier: (value) => set_get('subjectKeyIdentifier', value),
        authorityKeyIdentifier: (value) => set_get('authorityKeyIdentifier', value),
        publicKey: (value) => set_get('publicKey', value),
        subject: subject_,
        subjectAltNames: subjectAltNames_,
        reset(subject, subjectAltNames) {
            instance.subject = subject_ = subject
            instance.subjectAltNames = subjectAltNames_ = subjectAltNames || SubjectAltNames()
        }
    }
    return instance
}

export function sha1Digest(contents) {
    return crypto.subtle.digest('SHA-1', contents instanceof Uint8Array ? contents : new Uint8Array(contents))
}
