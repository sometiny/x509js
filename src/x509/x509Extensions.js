import {
    asn1_bit_string,
    asn1_boolean,
    asn1_constructed_sequence, asn1_context, asn1_integer,
    asn1_object_identifier,
    asn1_octet_string,
    asn1_raw
} from '../asn1/objects'

export function SubjectAlternativeNameExtension(names) {
    names = names.encode ? names.encode() : names
    return {
        identifier: x509Extensions.SubjectAlternativeName,
        value: names,
        critical: false
    }
}
export function SubjectKeyIdentifierExtension(digest) {
    return {
        identifier: x509Extensions.SubjectKeyIdentifier,
        value: asn1_octet_string(digest).encode(),
        critical: false
    }
}
export function AuthorityKeyIdentifierExtension(digest) {
    return {
        identifier: x509Extensions.AuthorityKeyIdentifier,
        value: asn1_constructed_sequence(
            asn1_context(0, digest)
        ).encode(),
        critical: false
    }
}
export function KeyUsageExtension(keyUsage) {
    return {
        identifier: x509Extensions.KeyUsage,
        value: asn1_bit_string(keyUsage).encode([]),
        critical: true
    }
}
export function BasicConstraintsExtension(isCa, pathLenConstraint) {
    return {
        identifier: x509Extensions.BasicConstraints,
        value: asn1_constructed_sequence(
            isCa ? asn1_boolean(true) : null,
            (pathLenConstraint !== undefined && pathLenConstraint > 0) ? asn1_integer(pathLenConstraint) : null
        ).encode(),
        critical: true
    }
}
export function ExtendedKeyUsageExtension(usages) {
    return {
        identifier: x509Extensions.ExtendedKeyUsage,
        value: asn1_constructed_sequence(children => {
            usages.forEach(t => children.push(asn1_object_identifier(t)))
        }
        ).encode(),
        critical: true
    }
}

export function extensions() {
    const extensions = []

    function add(identifier, value, critical) {
        if (!identifier) return
        if (typeof identifier === 'object' && identifier.identifier) {
            extensions.push(identifier)
            return
        }
        extensions.push({
            identifier,
            value,
            critical: critical === true
        })
    }
    function build() {
        return asn1_constructed_sequence((children) => {
            extensions.forEach(extension => {
                children.push(
                    asn1_constructed_sequence(
                        asn1_object_identifier(extension.identifier),
                        extension.critical ? asn1_boolean(true) : asn1_raw([]),
                        asn1_octet_string(extension.value)
                    )
                )
            })
        })
    }

    return {
        add,
        build
    }
}
const x509Extensions = {
    /**
     * Subject Directory Attributes
     */
    SubjectDirectoryAttributes: '2.5.29.9',

    /**
     * Subject Key Identifier
     */
    SubjectKeyIdentifier: '2.5.29.14',

    /**
     * Key Usage
     */
    KeyUsage: '2.5.29.15',

    /**
     * Private Key Usage Period
     */
    PrivateKeyUsagePeriod: '2.5.29.16',

    /**
     * Subject Alternative Name
     */
    SubjectAlternativeName: '2.5.29.17',

    /**
     * Issuer Alternative Name
     */
    IssuerAlternativeName: '2.5.29.18',

    /**
     * Basic Constraints
     */
    BasicConstraints: '2.5.29.19',

    /**
     * CRL Number
     */
    CrlNumber: '2.5.29.20',

    /**
     * Reason code
     */
    ReasonCode: '2.5.29.21',

    /**
     * Hold Instruction Code
     */
    InstructionCode: '2.5.29.23',

    /**
     * Invalidity Date
     */
    InvalidityDate: '2.5.29.24',

    /**
     * Delta CRL indicator
     */
    DeltaCrlIndicator: '2.5.29.27',

    /**
     * Issuing Distribution Point
     */
    IssuingDistributionPoint: '2.5.29.28',

    /**
     * Certificate Issuer
     */
    CertificateIssuer: '2.5.29.29',

    /**
     * Name Constraints
     */
    NameConstraints: '2.5.29.30',

    /**
     * CRL Distribution Points
     */
    CrlDistributionPoints: '2.5.29.31',

    /**
     * Certificate Policies
     */
    CertificatePolicies: '2.5.29.32',

    /**
     * Policy Mappings
     */
    PolicyMappings: '2.5.29.33',

    /**
     * Authority Key Identifier
     */
    AuthorityKeyIdentifier: '2.5.29.35',

    /**
     * Policy Constraints
     */
    PolicyConstraints: '2.5.29.36',

    /**
     * Extended Key Usage
     */
    ExtendedKeyUsage: '2.5.29.37',

    /**
     * Freshest CRL
     */
    FreshestCrl: '2.5.29.46',

    /**
     * Inhibit Any Policy
     */
    InhibitAnyPolicy: '2.5.29.54',

    /**
     * Authority Info Access
     */
    AuthorityInfoAccess: '1.3.6.1.5.5.7.1.1',

    /**
     * Subject Info Access
     */
    SubjectInfoAccess: '1.3.6.1.5.5.7.1.11',

    /**
     * Logo Type
     */
    LogoType: '1.3.6.1.5.5.7.1.12',

    /**
     * BiometricInfo
     */
    BiometricInfo: '1.3.6.1.5.5.7.1.2',

    /**
     * QCStatements
     */
    QCStatements: '1.3.6.1.5.5.7.1.3',

    /**
     * Audit identity extension in attribute certificates.
     */
    AuditIdentity: '1.3.6.1.5.5.7.1.4',

    /**
     * NoRevAvail extension in attribute certificates.
     */
    NoRevAvail: '2.5.29.56',

    /**
     * TargetInformation extension in attribute certificates.
     */
    TargetInformation: '2.5.29.55',

    /**
     * Expired Certificates on CRL extension
     */
    ExpiredCertsOnCrl: '2.5.29.60',

    SignedCertificateTimestampList: '1.3.6.1.4.1.11129.2.4.2'
}

export default x509Extensions
