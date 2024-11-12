/**
 * !Org.BouncyCastle.Asn1.X509.GeneralName
 * !Org.BouncyCastle.Utilities.Net.IPAddress
 */

export function IsValidIPv4(address) {
    if (!address || address.length === 0) return false

    let octets = 0
    const temp = address + '.'

    let pos
    let start = 0
    while (start < temp.length && (pos = temp.indexOf('.', start)) > start) {
        if (octets === 4) return false

        const octetStr = temp.substr(start, pos - start)
        const octet = parseInt(octetStr)

        if (octet < 0 || octet > 255) return false

        start = pos + 1
        octets++
    }

    return octets === 4
}

export function IsValidIPv4WithNetmask(address) {
    const index = address.indexOf('/')
    const mask = address.substr(index + 1)

    return (index > 0) && IsValidIPv4(address.substr(0, index)) &&
		(IsValidIPv4(mask) || IsIpV4MaskValue(mask))
}

function IsIpV4MaskValue(component) {
    const maskVal = parseInt(component)
    return maskVal >= 0 && maskVal <= 32
}
function IsIpV6MaskValue(component) {
    const maskVal = parseInt(component)
    return maskVal >= 0 && maskVal <= 128
}

export function IsValidIPv6(address) {
    if (!address || address.length === 0) return false

    let octets = 0

    const temp = address + ':'
    let doubleColonFound = false
    let pos
    let start = 0
    while (start < temp.length && (pos = temp.indexOf(':', start)) >= start) {
        if (octets === 8) return false

        if (start !== pos) {
            const value = temp.substr(start, pos - start)

            if (pos === (temp.length - 1) && value.indexOf('.') > 0) {
                if (!IsValidIPv4(value)) return false

                octets++
            } else {
                const octetStr = temp.substr(start, pos - start)
                const octet = parseInt(octetStr, 16)

                if (octet < 0 || octet > 0xffff) return false
            }
        } else {
            if (pos !== 1 && pos !== temp.length - 1 && doubleColonFound) return false

            doubleColonFound = true
        }
        start = pos + 1
        octets++
    }

    return octets === 8 || doubleColonFound
}
export function IsValidIPv6WithNetmask(address) {
    const index = address.indexOf('/')
    const mask = address.substr(index + 1)

    return (index > 0) && (IsValidIPv6(address.substr(0, index)) &&
		(IsValidIPv6(mask) || IsIpV6MaskValue(mask)))
}

export function ParseIpV4(address, output, offset) {
    address.split('.').map(t => parseInt(t)).forEach(t => {
        output[offset++] = t
    })
}

export function ParseIpV4Mask(mask, output, offset) {
    const maskVal = parseInt(mask)

    for (let i = 0; i !== maskVal; i++) {
        output[Math.floor(i / 8) + offset] |= (1 << (i % 8)) & 0xff
    }
}
export function ParseIpV6Mask(mask) {
    const res = [0, 0, 0, 0, 0, 0, 0, 0]
    const maskVal = parseInt(mask)

    for (let i = 0; i !== maskVal; i++) {
        res[Math.floor(i / 16)] |= 1 << (i % 16)
    }
    return res
}

function CopyWord(parsedIp, output, offset) {
    for (let i = 0; i !== parsedIp.length; i++) {
        output[(i * 2) + offset] = (parsedIp[i] >> 8) & 0xff
        output[(i * 2 + 1) + offset] = parsedIp[i] & 0xff
    }
}

export function ParseIpV6(ip) {
    if (ip.indexOf('::') === 0) ip = ip.substr(1)
    else if (ip.lastIndexOf('::') === ip.length - 2) ip = ip.substr(0, ip.length - 1)

    const components = ip.split(':')

    let index = 0
    const val = [0, 0, 0, 0, 0, 0, 0, 0]

    let doubleColon = -1

    while (components.length > 0) {
        const e = components.shift()

        if (e.length === 0) {
            doubleColon = index
            val[index++] = 0
        } else {
            if (e.indexOf('.') < 0) {
                val[index++] = parseInt(e, 16)
            } else {
                const tokens = e.split('.')

                val[index++] = (parseInt(tokens[0]) << 8) | parseInt(tokens[1])
                val[index++] = (parseInt(tokens[2]) << 8) | parseInt(tokens[3])
            }
        }
    }

    if (index !== val.length) {
        for (let i = doubleColon; i < index; i++) {
            val[val.length - index + i] = val[i]
        }
        for (let i = doubleColon; i !== val.length - (index - doubleColon); i++) {
            val[i] = 0
        }
    }

    return val
}

export function ToGeneralNameEncoding(ip) {
    if (IsValidIPv6WithNetmask(ip) || IsValidIPv6(ip)) {
        const slashIndex = ip.indexOf('/')

        if (slashIndex < 0) {
            const addr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            const parsedIp = ParseIpV6(ip)
            CopyWord(parsedIp, addr, 0)
            return addr
        }
        const addr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let parsedIp = ParseIpV6(ip.substring(0, slashIndex))
        CopyWord(parsedIp, addr, 0)
        const mask = ip.substring(slashIndex + 1)

        parsedIp = mask.indexOf(':') > 0 ? ParseIpV6(mask) : ParseIpV6Mask(mask)

        CopyWord(parsedIp, addr, 16)

        return addr
    }

    if (IsValidIPv4WithNetmask(ip) || IsValidIPv4(ip)) {
        const slashIndex = ip.indexOf('/')

        if (slashIndex < 0) {
            const addr = [0, 0, 0, 0]

            ParseIpV4(ip, addr, 0)

            return addr
        }
        const addr = [0, 0, 0, 0, 0, 0, 0, 0]

        ParseIpV4(ip.substring(0, slashIndex), addr, 0)

        const mask = ip.substring(slashIndex + 1)
        if (mask.indexOf('.') > 0) {
            ParseIpV4(mask, addr, 4)
        } else {
            ParseIpV4Mask(mask, addr, 4)
        }

        return addr
    }

    return null
}
export function IsValid(ip) {
    return IsValidIPv6(ip) || IsValidIPv4(ip)
}
export function IsValidGeneralName(ip) {
    return IsValidIPv6WithNetmask(ip) || IsValidIPv6(ip) || IsValidIPv4WithNetmask(ip) || IsValidIPv4(ip)
}
