import DerTag from './tags'
import ObjectIdentifier from './oid'
import UTF8String from './../helpers/utf8'
import format_datetime from '../helpers/format_datetime'
import oid from './oid'

const bitLengthTable = [
    0, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8
]
function getBitLen(w) {
    let t = w >> 24
    if (t !== 0) return 24 + bitLengthTable[t]
    t = w >> 16
    if (t !== 0) return 16 + bitLengthTable[t]
    t = w >> 8
    if (t !== 0) return 8 + bitLengthTable[t]
    return bitLengthTable[w]
}

function number2bit_string(value) {
    const bits = getBitLen(value)
    const bytes = Math.floor((bits + 7) / 8)
    if (bytes <= 0 || bytes > 4) throw new Error('invalid bit string value')

    const data = []
    for (let i = 0; i <= bytes; i++) data.push(0)

    for (let i = 1; i < bytes; i++) {
        data[i] = value & 0xff
        value >>= 8
    }

    if ((value & 0xff) === 0) throw new Error('invalid bit string value')
    data[bytes] = value & 0xff

    let padBits = 0
    while ((value & (1 << padBits)) === 0) {
        ++padBits
    }

    if (padBits >= 8) throw new Error('invalid bit string value')
    data[0] = padBits & 0xff
    return data
}

function peek(data, offset, end) {
    if (offset >= end) throw new Error('Argument_Out_Of_Range')

    const num = data[offset]
    if (num < 0x80) {
        if (num > ((end - offset) - 1)) throw new Error('Content_Length_Out_Of_Range')

        return { length: num, consumed: 1 }
    }
    const num2 = num & 0x7f
    if (num2 > 4 || num2 === 0) throw new Error('Content_Length_Mask_Error')

    const bytesConsumed = 1 + num2
    if (bytesConsumed > (end - offset)) throw new Error('Content_Length_Out_Of_Range')

    const num3 = offset + bytesConsumed
    let num4 = 0
    for (let i = offset + 1; i < num3; i++) {
        num4 = num4 << 8
        num4 |= data[i]
    }
    if (num4 < 0 || num4 > ((end - offset) - bytesConsumed)) throw new Error('Content_Length_Out_Of_Range')

    return { length: num4, consumed: bytesConsumed }
}
export const push = function(target, source) {
    if (source instanceof Uint8Array) {
        const value_ = []
        source.forEach(v => {
            value_.push(v)
        })
        source = value_
    }
    Array.prototype.push.apply(target, source)
}
export function asn1_object(tag, contents) {
    contents = contents || []
    return {
        encode(bytes) {
            if (bytes === undefined) bytes = []
            if (typeof contents === 'function') contents = contents()
            if (typeof contents === 'string') contents = contents.split('').map(t => t.charCodeAt(0))

            encode_tag_header(tag, contents.length, bytes)
            push(bytes, contents)
            return bytes
        }
    }
}
export function asn1_sequence(tag, ...children) {
    if (children.length === 1 && typeof children[0] === 'function') {
        const children_ = []
        children[0](children_)
        children = children_
    }
    return {
        child(item) {
            if (item instanceof Array) push(children, item)
            else children.push(item)
            return this
        },
        encode(bytes) {
            if (bytes === undefined) bytes = []
            const sub_bytes = []
            children.forEach(t => t && t.encode(sub_bytes))

            encode_contents(tag, sub_bytes, bytes)
            return bytes
        }
    }
}
export function asn1_tag(tag) {
    const classification = (tag >> 6) & 0x3
    return {
        tag,
        classification,
        isPrimitive: ((tag >> 5) & 0x1) === 0,
        isConstructed: ((tag >> 5) & 0x1) === 1,
        type: tag & 0x1f,
        isUniversal: classification === 0,
        isApplication: classification === 1,
        isContextSpecific: classification === 2,
        isPrivate: classification === 3
    }
}
export function asn1_info_get_contents(info, contents) {
    return contents.slice(info.offset, info.end)
}
export function asn1_info_get_all_contents(info, contents) {
    return contents.slice(info.tagOffset, info.end)
}
export function asn1_info(contents, offset, end) {
    if (contents &&
        typeof contents === 'object' &&
        contents.hasOwnProperty('tag')) return contents

    offset = offset || 0
    end = end || (contents.length - offset)

    /**
     * just process short form
     */
    const tag = asn1_tag(contents[offset])
    const peeked = peek(contents, offset + 1, end)
    const start = offset + 1 + peeked.consumed
    const length = peeked.length
    const end_ = start + length

    const instance = {
        tag,
        tagOffset: offset,
        offset: start,
        end: end_,
        all: () => (offset === 0 && end_ === contents.length) ? contents : contents.slice(offset, end_),
        contents: () => contents.slice(start, end_),
        string: () => tag.type === DerTag.UTF8String
            ? UTF8String(contents, start, end_ - start).toString()
            : String.fromCharCode(...contents.slice(start, end_)),
        objectIdentifier() {
            if (tag.type !== DerTag.ObjectIdentifier) throw new Error('invalid tag type, expect \'ObjectIdentifier\'')
            return oid.decode(contents, start, end_ - start)
        },
        bytes() {
            if (end_ - start === 0) return []
            if (tag.type === DerTag.BitString) {
                if (contents[start] !== 0) throw new Error('invalid \'BitString\'')
                return contents.slice(start + 1, end_)
            }
            return contents.slice(start, end_)
        },
        bigInteger() {
            if (tag.type !== DerTag.Integer) throw new Error('invalid tag type, expect \'Integer\'')
            return contents.slice(contents[start] === 0 ? start + 1 : start, end_)
        }
    }
    if (tag.isConstructed) {
        instance.length = 0
        let next = start
        while (next < end_) {
            const item = asn1_info(contents, next, end_)
            next = item.end
            instance[instance.length++] = item
        }
    }

    return instance
}
export function encode_length(length, bytes) {
    if (length < 0x80) {
        bytes.push(length)
        return
    }
    const sub_bytes = []
    let idx = 0
    while (length > 0) {
        sub_bytes.unshift(length & 0xff)
        length >>= 8
        idx++
    }
    sub_bytes.unshift(0x80 | idx)

    push(bytes, sub_bytes)
}
export function encode_tag_header(tag, length, bytes) {
    bytes.push(tag)
    encode_length(length, bytes)
}
export function encode_contents(tag, contents, bytes) {
    encode_tag_header(tag, contents.length, bytes)
    push(bytes, contents)
}
export function asn1_context(flag, contents) {
    return asn1_object(flag | DerTag.ContextSpecificTagFlag, contents)
}
export function asn1_constructed_context(flag, ...children) {
    return asn1_sequence(DerTag.ContextSpecificTagFlag | DerTag.ConstructedFlag | flag, ...children)
}
export function asn1_constructed_sequence(...children) {
    return asn1_sequence(DerTag.Sequence | DerTag.ConstructedFlag, ...children)
}
export function asn1_constructed_set(...children) {
    return asn1_sequence(DerTag.Set | DerTag.ConstructedFlag, ...children)
}
export function asn1_null() {
    return asn1_object(DerTag.Null)
}
export function asn1_raw(contents) {
    return {
        encode(bytes) {
            push(bytes, contents)
        }
    }
}
export function asn1_bmp_string(contents) {
    return asn1_object(DerTag.BMPString, contents)
}
export function asn1_bit_string(contents) {
    if (contents.constructor === Number) {
        contents = number2bit_string(contents & 0xffffffff)
        return {
            encode(bytes) {
                encode_tag_header(DerTag.BitString, contents.length, bytes)
                push(bytes, contents)
                return bytes
            }
        }
    }
    return {
        encode(bytes) {
            encode_tag_header(DerTag.BitString, contents.length + 1, bytes)
            bytes.push(0)
            push(bytes, contents)
            return bytes
        }
    }
}
export function asn1_boolean(value) {
    return asn1_object(DerTag.Boolean, [value ? 1 : 0])
}
export function asn1_general_string(contents) {
    return asn1_object(DerTag.GeneralString, contents)
}
export function asn1_generalized_time(contents) {
    return asn1_object(DerTag.GeneralizedTime, contents)
}
export function asn1_utc_time(contents) {
    if (contents instanceof Date) {
        contents = format_datetime('yyMMddHHmmssZ', contents, true)
    }
    return asn1_object(DerTag.UTCTime, contents)
}
export function asn1_ia5_string(contents) {
    return asn1_object(DerTag.IA5String, contents)
}
export function asn1_numeric_string(contents) {
    return asn1_object(DerTag.NumericString, contents)
}
export function asn1_integer(value, isLittle) {
    let contents = []
    if (value instanceof Uint8Array) {
        const value_ = []
        value.forEach(v => {
            value_.push(v)
        })
        value = value_
    }
    if (value instanceof Array) {
        contents = value
        if (isLittle === true) contents.reverse()

        while (contents[0] === 0) contents.shift()
        if ((contents[0] & 0x80) > 0) {
            contents.unshift(0)
        }
    } else if (typeof value === 'number') {
        while (value > 0xff) {
            contents.unshift(value & 0xff)
            value >>= 8
        }
        contents.unshift(value)
        if ((value & 0x80) > 0) contents.unshift(0)
    }

    return asn1_object(DerTag.Integer, contents)
}
export function asn1_object_identifier(oid) {
    if (typeof oid === 'string') oid = ObjectIdentifier.encode(oid)
    return asn1_object(DerTag.ObjectIdentifier, oid)
}
export function asn1_octet_string(contents) {
    return asn1_object(DerTag.OctetString, contents)
}
export function asn1_printable_string(contents) {
    return asn1_object(DerTag.PrintableString, contents)
}
export function asn1_t61_string(contents) {
    return asn1_object(DerTag.T61String, contents)
}
export function asn1_utf8_string(contents) {
    return asn1_object(DerTag.UTF8String, UTF8String(contents).getBytesArray())
}
export function asn1_visible_string(contents) {
    return asn1_object(DerTag.VisibleString, contents)
}
