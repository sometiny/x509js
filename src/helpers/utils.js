
export function linesOf(contents) {
    return contents.replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .split('\n')
        .filter(t => !!t)
}
export function linesFormat(contents) {
    return contents.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
}
export function linesClear(contents) {
    return contents.replace(/\r\n/g, '').replace(/\r/g, '').replace(/\n/g, '')
}
