import { Nullable } from '../model'

const trimLeft = /^\s+/
const trimRight = /\s+$/
const tinyCounter = 0
const mathRound = Math.round
const mathMin = Math.min
const mathMax = Math.max
const mathRandom = Math.random

export const NUMERIC_REGEX = /[^0-9]/g
export const MAX_RGB = 255
export const MIN_RGB = 0

export const BASIC_COLORS = [
    '#ffffff',
    '#ffff00',
    '#ff00ff',
    '#ff0000',
    '#c0c0c0',
    '#808080',
    '#808000',
    '#800080',
    '#800000',
    '#00ffff',
    '#00ff00',
    '#008080',
    '#008000',
    '#0000ff',
    '#000080',
    '#000000',
]

export function getColorAtPosition(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number
): { r: number; g: number; b: number } {
    const imageData: Uint8ClampedArray = ctx.getImageData(x, y, 1, 1).data
    return { r: imageData[0], g: imageData[1], b: imageData[2] }
}

export function rgbaToHex(r: number, g: number, b: number, a: number, allow4Char?: boolean): string {
    const hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16)),
        pad2(convertDecimalToHex(a)),
    ]

    if (
        allow4Char &&
        hex[0].charAt(0) == hex[0].charAt(1) &&
        hex[1].charAt(0) == hex[1].charAt(1) &&
        hex[2].charAt(0) == hex[2].charAt(1) &&
        hex[3].charAt(0) == hex[3].charAt(1)
    ) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0)
    }

    return hex.join('')
}

export function pad2(c: string): string {
    return c.length == 1 ? '0' + c : '' + c
}

export function convertDecimalToHex(d: string | number) {
    if (typeof d === 'number') {
        d = d.toString()
    }
    return Math.round(parseFloat(d) * 255).toString(16)
}

function convertHexToDecimal(h: string) {
    return parseIntFromHex(h) / 255
}

function parseIntFromHex(val: string) {
    return parseInt(val, 16)
}

export function rgbToHex(r: number, g: number, b: number, allow3Char?: boolean) {
    const hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))]

    if (
        allow3Char &&
        hex[0].charAt(0) == hex[0].charAt(1) &&
        hex[1].charAt(0) == hex[1].charAt(1) &&
        hex[2].charAt(0) == hex[2].charAt(1)
    ) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0)
    }

    return hex.join('')
}

const CSS_INTEGER = '[-\\+]?\\d+%?'
const CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?'
const CSS_UNIT = '(?:' + CSS_NUMBER + ')|(?:' + CSS_INTEGER + ')'
const PERMISSIVE_MATCH3 = '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?'
const PERMISSIVE_MATCH4 =
    '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?'

export const matchers = {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
    rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
    hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
    hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
    hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
    hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
}

export function stringInputToObject(color: string): Nullable<{ r: number; g: number; b: number; a: number }> {
    color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase()

    let match
    let obj
    if ((match = matchers.rgb.exec(color))) {
        return { 
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: 1 
        }
    }
    if ((match = matchers.rgba.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
        }
    }

    if ((match = matchers.hex8.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
        }
    }
    if ((match = matchers.hex6.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: 1,
        }
    }
    if ((match = matchers.hex4.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            a: convertHexToDecimal(match[4] + '' + match[4]),
        }
    }
    if ((match = matchers.hex3.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            a: 1,
        }
    }

    return null
}

export function createMissingDateImplError(provider: string) {
    return Error(
        `NgxMatColorPicker: No provider found for ${provider}. You must define MAT_COLOR_FORMATS in your module`
    )
}
