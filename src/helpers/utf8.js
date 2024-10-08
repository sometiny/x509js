
function getUtf8BytesArray(str) {
    const result = []

    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i)
        if (code <= 0x7F) {
            result.push(code)
            continue
        }

        if (code <= 0x7FF) {
            result.push((code >> 6) | 192, (code & 63) | 128)
            continue
        }

        if (code <= 0xFFFF) {
            result.push((code >> 12) | 224, ((code >> 6) & 63) | 128, (code & 63) | 128)
            continue
        }

        result.push((code >> 18) | 240, ((code >> 12) & 63) | 128, ((code >> 6) & 63) | 128, (code & 63) | 128)
    }

    return result
}
export default function UTF8String(bytes, offset, length) {
    let originString = null
    if (typeof bytes === 'string') {
        if (offset !== undefined) {
            throw new Error('expect \'undefined\' for argument offset')
        }
        originString = bytes
        bytes = getUtf8BytesArray(originString)
        offset = 0
        length = bytes.length
    }

    if (offset + length > bytes.length) {
        throw new Error('offset out of range')
    }
    if (offset === undefined) offset = 0
    if (length === undefined) length = bytes.length
    const originPosition = offset
    const originLength = length
    let position = offset
    const endPosition = offset + length

    function peekLength() {
        const code = bytes[position]
        if (code < 128) return 1
        if (code < 224) return 2
        if (code < 240) return 3
        return 4
    }

    function readChar() {
        const code = bytes[position++]
        if (code < 128) return code

        const code2 = bytes[position++]
        if (code < 224) return ((code & 31) << 6) | (code2 & 63)

        const code3 = bytes[position++]
        if (code < 240) return ((code & 15) << 12) | ((code2 & 63) << 6) | (code3 & 63)

        const code4 = bytes[position++]
        return ((code & 7) << 18) | ((code2 & 63) << 12) | ((code3 & 63) << 6) | (code4 & 63)
    }

    function toString() {
        if (originString !== null) return originString
        const result = []
        while (position < endPosition) {
            const length = peekLength()
            if (position + length > endPosition) {
                throw new Error('unformed utf8 bytes array')
            }
            result.push(readChar())
        }
        return originString = String.fromCharCode.apply(null, result)
    }

    return {
        toString,
        getBytesArray() {
            return bytes.slice(originPosition, originPosition + originLength)
        }
    }
}
export const UTF8 = {
    getString(bytes) {
        return UTF8String(bytes).toString()
    },
    getBytes(str) {
        return UTF8String(str).getBytesArray()
    }
}
