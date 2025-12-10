import { RFC4648Encoding, RFC4648ParseOptions, RFC4648StringifyOptions, RFC4648_BASE16_ENCODING, RFC4648_BASE32HEX_ENCODING, RFC4648_BASE32_ENCODING, RFC4648_BASE64URL_ENCODING, RFC4648_BASE64_ENCODING } from '../../model'
import { isUndefined } from '../optional.utils'
import { coerceBoolean } from '../primitive-type.utils'

export const parseRFC4648 = (input: string, encoding: RFC4648Encoding, options: RFC4648ParseOptions = {}): Uint8Array => {
    if (isUndefined(encoding.codes)) {
        encoding.codes = {}
        for (let i = 0; i < encoding.chars.length; i++) {
            encoding.codes[encoding.chars[i]] = i
        }
    }

    if (!coerceBoolean(options.loose, false) && (input.length * encoding.bits) & 7) { throw new SyntaxError('Invalid input length') }

    let end = input.length
    while (input[end - 1] === '=') {
        end--
        if (!coerceBoolean(options.loose, false) && !(((input.length - end) * encoding.bits) & 7)) { throw new SyntaxError('Invalid input length') }
    }

    const result = new (options.out ?? Uint8Array)(((end * encoding.bits) / 8) | 0) as Uint8Array
    let bits = 0
    let buffer = 0
    let written = 0
    for (let i = 0; i < end; i++) {
        const val = encoding.codes[input[i]]
        if (isUndefined(val)) { throw new SyntaxError('Invalid character' + input[i]) }
        buffer = (buffer << encoding.bits) | val
        bits += encoding.bits

        if (bits >= 8) {
            bits -= 8
            result[written++] = (buffer >> bits) & 0xff
        }
    }

    if (bits >= encoding.bits || (buffer << (8 - bits)) & 0xff) { throw new SyntaxError('Unexpected end of data') }
    return result
}

export const stringifyRFC4648 = (input: ArrayLike<number>, encoding: RFC4648Encoding, options: RFC4648StringifyOptions = {}): string => {
    const pad = coerceBoolean(options.pad, true)
    const mask = (1 << encoding.bits) - 1
    let result = ''

    let bits = 0
    let buffer = 0
    for (let i = 0; i < input.length; i++) {
        buffer = (buffer << 8) | input[i]
        bits += 8

        while (bits >= encoding.bits) {
            bits -= encoding.bits
            result += encoding.chars[(buffer >> bits) & mask]
        }
    }

    if (bits) { result += encoding.chars[(buffer << (encoding.bits - bits)) & mask] }

    if (pad) {
        while ((result.length * encoding.bits) & 7) { result += '=' }
    }

    return result
}

export const parseRFC4648Base16 = (input: string, options: RFC4648ParseOptions = {}): Uint8Array => parseRFC4648(input.toUpperCase(), RFC4648_BASE16_ENCODING, options)
export const stringifyRFC4648Base16 = (input: ArrayLike<number>, options: RFC4648StringifyOptions = {}): string => stringifyRFC4648(input, RFC4648_BASE16_ENCODING, options)

export const parseRFC4648Base32 = (input: string, options: RFC4648ParseOptions = {}): Uint8Array => parseRFC4648(
    coerceBoolean(options.loose, false) ? input.toUpperCase().replace(/0/g, 'O').replace(/1/g, 'L').replace(/8/g, 'B') : input, 
    RFC4648_BASE32_ENCODING, 
    options
)
export const stringifyRFC4648Base32 = (input: ArrayLike<number>, options: RFC4648StringifyOptions = {}): string => stringifyRFC4648(input, RFC4648_BASE32_ENCODING, options)

export const parseRFC4648Base32Hex = (input: string, options: RFC4648ParseOptions = {}): Uint8Array => parseRFC4648(input, RFC4648_BASE32HEX_ENCODING, options)
export const stringifyRFC4648Base32Hex = (input: ArrayLike<number>, options: RFC4648StringifyOptions = {}): string => stringifyRFC4648(input, RFC4648_BASE32HEX_ENCODING, options)

export const parseRFC4648Base64 = (input: string, options: RFC4648ParseOptions = {}): Uint8Array => parseRFC4648(input, RFC4648_BASE64_ENCODING, options)
export const stringifyRFC4648Base64 = (input: ArrayLike<number>, options: RFC4648StringifyOptions = {}): string => stringifyRFC4648(input, RFC4648_BASE64_ENCODING, options)

export const parseRFC4648Base64URL = (input: string, options: RFC4648ParseOptions = {}): Uint8Array => parseRFC4648(input, RFC4648_BASE64URL_ENCODING, options)
export const stringifyRFC4648Base64URL = (input: ArrayLike<number>, options: RFC4648StringifyOptions = {}): string => stringifyRFC4648(input, RFC4648_BASE64URL_ENCODING, options)