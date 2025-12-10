export interface RFC4648Encoding {
    bits: number
    chars: string
    codes?: { [code: string]: number }
}

export const RFC4648_BASE16_ENCODING: RFC4648Encoding = {
    bits: 4,
    chars: '0123456789ABCDEF'
}

export const RFC4648_BASE32_ENCODING: RFC4648Encoding = {
    bits: 5,
    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
}

export const RFC4648_BASE32HEX_ENCODING: RFC4648Encoding = {
    bits: 5,
    chars: '0123456789ABCDEFGHIJKLMNOPQRSTUV'
}

export const RFC4648_BASE64_ENCODING: RFC4648Encoding = {
    bits: 6,
    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
}

export const RFC4648_BASE64URL_ENCODING: RFC4648Encoding = {
    bits: 6,
    chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
}