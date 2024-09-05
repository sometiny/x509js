
const numeric2hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
const numeric2hex_upper = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
const hex2numeric = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15,
    'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15 }

function hex2bin(hex) {
    if (hex.length % 2 !== 0) throw new Error('invalid hex data, length error')

    const result = []
    for (let i = 0; i < hex.length; i += 2) {
        const high = hex2numeric[hex.substr(i, 1)]
        const low = hex2numeric[hex.substr(i + 1, 1)]
        if (high === undefined || low === undefined) throw new Error('invalid hex data, char error')
        result.push((high << 4) | low)
    }
    return result
}

function bin2hex(bin, upper) {
    const result = []

    const mapper = upper === true ? numeric2hex_upper : numeric2hex

    for (let i = 0; i < bin.length; i++) {
        result.push(mapper[bin[i] >> 4] + mapper[bin[i] & 0xf])
    }

    return result
}
const Hex = {
    parse: hex2bin,
    stringify: bin2hex,
    transfer: function(chr) {
        return numeric2hex[chr >> 4] + numeric2hex[chr & 0xf]
    }
}
export default Hex
