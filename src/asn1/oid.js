function decode(data, position, count) {
    position = position === undefined ? 0 : position
    count = count === undefined ? data.length : count
    let builder = ''
    const num2 = data[position]
    const num3 = Math.floor(num2 / 40)
    const num4 = num2 % 40
    builder += num3 + '.' + num4

    let flag = true
    let integer = 0
    let num6
    let num7
    for (let i = 1; i < count; i++) {
        num6 = data[position + i]
        num7 = num6 & 0x7f
        if (flag) {
            builder += '.'
            flag = false
        }
        integer = integer << 7
        integer += num7
        if (num6 === num7) {
            builder += integer
            integer = 0
            flag = true
        }
    }
    return builder
}

function encode(oidString) {
    const parts = oidString.split('.').map(t => parseInt(t))
    const bytes = []
    bytes.push(parts[0] * 40 + parts[1])

    for (let i = 2; i < parts.length; i++) {
        let value = parts[i]
        if (value <= 127) {
            bytes.push(value)
            continue
        }
        const sub_bytes = []
        let flag = false
        while (value > 0) {
            let num7 = (value & 0x7f)
            if (flag) num7 = 0x80 | num7
            sub_bytes.unshift(num7)
            value >>= 7
            if (!flag) flag = true
        }
        Array.prototype.push.apply(bytes, sub_bytes)
    }

    return bytes
}
const ObjectIdentifier = {
    decode,
    encode
}
export default ObjectIdentifier
