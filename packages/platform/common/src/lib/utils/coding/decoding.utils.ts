export const padBase64String = (input: string): string => {
    const segmentLength = 4
    const stringLength = input.length
    const diff = stringLength % segmentLength

    if (!diff) { return input }

    let pos = stringLength
    let padLength = segmentLength - diff
    const paddedStringLength = stringLength + padLength
    const buffer = Buffer.alloc(paddedStringLength)

    buffer.write(input)

    while (padLength--) { buffer.write('=', pos++) }
    return buffer.toString()
}

export const base64URLToBase64 = (encoded: string | Buffer): string => {
    return padBase64String(encoded.toString()).replace(/-/g, '+').replace(/_/g, '/')
}

export const decodeBase64URL = (encoded: string, stringEncoding: BufferEncoding = 'utf8'): string => {
    return Buffer.from(base64URLToBase64(encoded), 'base64').toString(stringEncoding)
}

// export const decimalToHex = (decimal: number): string => {
//     return decimal.toString(16)
// }