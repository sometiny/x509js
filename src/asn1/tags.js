
const DerTag = {
    Boolean: 0x01, Integer: 0x02,
    BitString: 0x03, OctetString: 0x04,
    Null: 0x05, ObjectIdentifier: 0x06,
    Enumerated: 0x0a, Sequence: 0x10, Set: 0x11,
    UTF8String: 0x0c, NumericString: 0x12, PrintableString: 0x13, T61String: 0x14, IA5String: 0x16,
    UTCTime: 0x17, GeneralizedTime: 0x18,
    VisibleString: 0x1a, GeneralString: 0x1b, BMPString: 0x1e,
    TagNumberMask: 0x1f,
    ConstructedFlag: 0x20,
    ConstructedSequence: 0x30,
    ConstructedSet: 0x31,
    ContextSpecificTagFlag: 0x80,
    ContextSpecificConstructedTag0: 0xa0,
    ContextSpecificConstructedTag1: 0xa1,
    ContextSpecificConstructedTag2: 0xa2,
    ContextSpecificConstructedTag3: 0xa3,
    TagClassMask: 0xc0,

    VALUE_NAME_MAP: {
        0x10: 'SEQUENCE',
        0x11: 'SET',
        0x30: 'SEQUENCE',
        0x31: 'SET',
        0x06: 'OBJECT IDENTIFIER',
        0x02: 'INTEGER',
        0x01: 'BOOLEAN',
        0x03: 'BIT STRING',
        0x04: 'OCTET STRING',
        0x05: 'NULL'
    }
}

for (const name in DerTag) {
    if (!DerTag.hasOwnProperty(name) || name === 'VALUE_NAME_MAP' || DerTag.VALUE_NAME_MAP.hasOwnProperty(DerTag[name])) continue

    DerTag.VALUE_NAME_MAP[DerTag[name]] = name
}
export default DerTag
