const str_to_code = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/', '=']
const code_to_str = []
const str_to_code_safe = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '_', '=']
const code_to_str_safe = []

for (let i = 0; i < str_to_code.length; i++) {
    code_to_str[str_to_code[i].charCodeAt(0)] = i
    code_to_str_safe[str_to_code_safe[i].charCodeAt(0)] = i
}

const d = function(t, f, breakAt) {
    f = f || str_to_code
    let s = ''
    let g
    let h
    let j = ''
    let k
    let m
    let n
    let o = ''
    let p = 0
    const q = t.length
    const r = q - q % 3
    let idx = 0
    while (p < r) {
        g = t[p++]
        h = t[p++]
        j = t[p++]
        k = g >> 2
        m = ((g & 3) << 4) | (h >> 4)
        n = ((h & 15) << 2) | (j >> 6)
        o = j & 63
        s += f[k] + f[m] + f[n] + f[o]
        idx += 4
        if (breakAt > 0 && idx % breakAt === 0) s += '\r\n'
    }
    if (q - r === 2) {
        g = t[p++]
        h = t[p++]
        s += f[g >> 2] + f[((g & 3) << 4) | (h >> 4)] + f[((h & 15) << 2)] + '='
    } else {
        if (q - r === 1) {
            g = t[p++]
            s += f[g >> 2] + f[((g & 3) << 4)] + '=='
        }
    }
    if (s.charAt(s.length - 1) === '\n') s = s.substr(0, s.length - 2)
    return s
}
const c = function(t, e) {
    e = e || code_to_str
    t = t.replace(/\s/g, '')
    if (t === '') {
        return []
    }
    const s = []
    let g
    let h
    let j = ''
    let k
    let m
    let n
    let o = ''
    let p = 0
    const q = t.length
    let r = q
    if (t.slice(-1) === '=') {
        r = q - 4
    }
    while (p < r) {
        k = e[t.charCodeAt(p++)]
        m = e[t.charCodeAt(p++)]
        n = e[t.charCodeAt(p++)]
        o = e[t.charCodeAt(p++)]
        g = (k << 2) | (m >> 4)
        h = ((m & 15) << 4) | (n >> 2)
        j = ((n & 3) << 6) | o
        s.push(g, h, j)
    }
    if (q !== r) {
        k = e[t.charCodeAt(p++)]
        m = e[t.charCodeAt(p++)]
        if (t.slice(-2) === '==') {
            s.push((k << 2) | (m >> 4))
        } else {
            if (t.slice(-1) === '=') {
                n = e[t.charCodeAt(p++)]
                s.push((k << 2) | (m >> 4), ((m & 15) << 4) | (n >> 2))
            }
        }
    }
    return s
}
export const Base64 = {
    encode: d,
    decode: c
}
export const UrlSafeBase64 = {
    encode: function(bytes, breakAt) {
        return d(bytes, str_to_code_safe, breakAt).replace(/=+$/, '')
    },
    decode: function(str) {
        while (str.length % 4 !== 0) str += '='
        return c(str, code_to_str_safe)
    }
}
