const ws = [
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
]
const ms = [
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''],
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', '']
]
const CB = function(diff) {
    const dt = this
    switch (diff) {
        case 'dddd' :
            return ws[0][dt.getDay()]
        case 'ddd' :
            return ws[1][dt.getDay()]
        case 'MMMM' :
            return ms[0][dt.getMonth()]
        case 'MMM' :
            return ms[1][dt.getMonth()]
        case 'yyyy' :
            return dt.getFullYear()
        case 'yy' :
            return dt.getFullYear() % 2
        case 'M' :
            return dt.getMonth() + 1
        case 'MM' :
            return ('0' + (dt.getMonth() + 1)).slice(-2)
        case 'd' :
            return dt.getDate()
        case 'dd' :
            return ('0' + dt.getDate()).slice(-2)
        case 'HH' :
            return ('0' + dt.getHours()).slice(-2)
        case 'h' :
            return dt.getHours()
        case 'm' :
            return dt.getMinutes()
        case 'mm' :
            return ('0' + dt.getMinutes()).slice(-2)
        case 's' :
            return dt.getSeconds()
        case 'ss' :
            return ('0' + dt.getSeconds()).slice(-2)
        case 'tttt' :
            return dt.getMilliseconds()
        default :
            return diff
    }
}
const CB_UTC = function(diff) {
    const dt = this
    switch (diff) {
        case 'dddd' :
            return ws[0][dt.getUTCDay()]
        case 'ddd' :
            return ws[1][dt.getUTCDay()]
        case 'MMMM' :
            return ms[0][dt.getUTCMonth()]
        case 'MMM' :
            return ms[1][dt.getUTCMonth()]
        case 'yyyy' :
            return dt.getUTCFullYear()
        case 'yy' :
            return dt.getUTCFullYear() % 100
        case 'M' :
            return dt.getUTCMonth() + 1
        case 'MM' :
            return ('0' + (dt.getUTCMonth() + 1)).slice(-2)
        case 'd' :
            return dt.getUTCDate()
        case 'dd' :
            return ('0' + dt.getUTCDate()).slice(-2)
        case 'HH' :
            return ('0' + dt.getUTCHours()).slice(-2)
        case 'h' :
            return dt.getUTCHours()
        case 'm' :
            return dt.getUTCMinutes()
        case 'mm' :
            return ('0' + dt.getUTCMinutes()).slice(-2)
        case 's' :
            return dt.getUTCSeconds()
        case 'ss' :
            return ('0' + dt.getUTCSeconds()).slice(-2)
        case 'tttt' :
            return dt.getUTCMilliseconds()
        default :
            return diff
    }
}

export default function(format, dateTime, isUtc) {
    if (dateTime && !(dateTime instanceof Date)) return dateTime
    dateTime = dateTime || new Date()

    const cb = isUtc === true ? CB_UTC : CB

    return format.replace(/(yyyy|yy|mmmm|mmm|mm|dddd|ddd|dd|hh|ss|tttt|m|d|h|s)/ig, diff => cb.call(dateTime, diff))
}
