import { HSLAColor, HSLColor, HSVAColor, HSVColor, RGBAColor, RGBColor } from '../model'
import { isNull } from './optional.utils'

// CONVERSIONS

export const HexToRGB = (hex: string): RGBColor => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b
    })
    const fullRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return fullRegex ? { r: parseInt(fullRegex[1], 16), g: parseInt(fullRegex[2], 16), b: parseInt(fullRegex[3], 16) } : { r: 0, g: 0, b: 0 }
}

export const HexToRGBA = (hex: string): RGBAColor => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])$/i
    hex = hex.replace(shorthandRegex, function (m, r, g, b, a) {
        return r + r + g + g + b + b + a + a
    })
    const fullRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return fullRegex ? { r: parseInt(fullRegex[1], 16), g: parseInt(fullRegex[2], 16), b: parseInt(fullRegex[3], 16), a: parseInt(fullRegex[4], 16) / 255 } : { r: 0, g: 0, b: 0, a: 1 }
}

export const HexToHSL = (hex: string): HSLColor => RGBToHSL(HexToRGB(hex))
export const HexToHSLA = (hex: string): HSLAColor => RGBAToHSLA(HexToRGBA(hex))
export const HexToHSV = (hex: string): HSVColor => RGBToHSV(HexToRGB(hex))
export const HexToHSVA = (hex: string): HSVAColor => RGBAToHSVA(HexToRGBA(hex))

export const RGBToHex = (rgb: RGBColor): string => {
    return '#' + (0 | ((1 << 8) + rgb.r)).toString(16).substring(1) + (0 | ((1 << 8) + rgb.g)).toString(16).substring(1) + (0 | ((1 << 8) + rgb.b)).toString(16).substring(1)
}

export const RGBToHSV = (rgb: RGBColor): HSVColor => {
    const r = rgb.r / 255
    const g = rgb.g / 255
    const b = rgb.b / 255

    const v = Math.max(r, g, b)
    const n = v - Math.min(r, g, b)
    const h = n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n
    const hsv: HSVColor = {
        h: 60 * (h < 0 ? h + 6 : h),
        s: v && n / v,
        v: v
    }
    return hsv
}

export const RGBToHSL = (rgb: RGBColor): HSLColor => {
    const r = rgb.r / 255
    const g = rgb.g / 255
    const b = rgb.b / 255

    const l = Math.max(r, g, b)
    const s = l - Math.min(r, g, b)
    const h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0
    const hsl: HSLColor = {
        h: 60 * h < 0 ? 60 * h + 360 : 60 * h,
        s: s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0,
        l: (2 * l - s) / 2
    }
    return hsl
}

export const RGBToRGBA = (rgb: RGBColor): RGBAColor => {
    const rgba: RGBAColor = { r: rgb.r, g: rgb.g, b: rgb.b, a: 1 }
    return rgba
}

export const RGBAToHex = (rgba: RGBAColor): string => {
    return (
        '#' +
        (0 | ((1 << 8) + rgba.r)).toString(16).substring(1) +
        (0 | ((1 << 8) + rgba.g)).toString(16).substring(1) +
        (0 | ((1 << 8) + rgba.b)).toString(16).substring(1) +
        (0 | ((1 << 8) + rgba.a * 255)).toString(16).substring(1)
    )
}

export const RGBAToHSVA = (rgba: RGBAColor): HSVAColor => {
    const r = rgba.r / 255
    const g = rgba.g / 255
    const b = rgba.b / 255

    const v = Math.max(r, g, b)
    const n = v - Math.min(r, g, b)
    const h = n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n
    const hsva: HSVAColor = { h: 60 * (h < 0 ? h + 6 : h), s: v && n / v, v: v, a: rgba.a }
    return hsva
}

export const RGBAToHSLA = (rgba: RGBAColor): HSLAColor => {
    const r = rgba.r / 255
    const g = rgba.g / 255
    const b = rgba.b / 255

    const l = Math.max(r, g, b)
    const s = l - Math.min(r, g, b)
    const h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0
    const hsla: HSLAColor = {
        h: 60 * h < 0 ? 60 * h + 360 : 60 * h,
        s: s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0,
        l: (2 * l - s) / 2,
        a: rgba.a
    }
    return hsla
}

export const RGBAToRGB = (rgba: RGBAColor): RGBColor => {
    const rgb: RGBColor = { r: rgba.r, g: rgba.g, b: rgba.b }
    return rgb
}

export const HSVToHex = (hsv: HSVColor): string => RGBToHex(HSVToRGB(hsv))

export const HSVToRGB = (hsv: HSVColor): RGBColor => {
    const k = (n: number) => (n + hsv.h / 60) % 6
    const f = (n: number) => hsv.v * (1 - hsv.s * Math.max(0, Math.min(k(n), 4 - k(n), 1)))
    const rgbColor: RGBColor = {
        r: Math.round(255 * f(5)),
        g: Math.round(255 * f(3)),
        b: Math.round(255 * f(1))
    }
    return rgbColor
}

export const HSVToHSL = (hsv: HSVColor): HSLColor => {
    const l = hsv.v - hsv.v * (hsv.s / 2)
    const s = l === 0 || l === 1 ? 0 : (hsv.v - l) / Math.min(l, 1 - l)
    const hsl: HSLColor = { h: hsv.h, s, l }
    return hsl
}

export const HSVAToHex = (hsva: HSVAColor): string => RGBAToHex(HSVAToRGBA(hsva))

export const HSVAToRGBA = (hsva: HSVAColor): RGBAColor => {
    const k = (n: number) => (n + hsva.h / 60) % 6
    const f = (n: number) => hsva.v * (1 - hsva.s * Math.max(0, Math.min(k(n), 4 - k(n), 1)))
    const rgbaColor: RGBAColor = {
        r: Math.round(255 * f(5)),
        g: Math.round(255 * f(3)),
        b: Math.round(255 * f(1)),
        a: hsva.a
    }
    return rgbaColor
}

export const HSVAToHSLA = (hsva: HSVAColor): HSLAColor => {
    const l = hsva.v - hsva.v * (hsva.s / 2)
    const s = l === 0 || l === 1 ? 0 : (hsva.v - l) / Math.min(l, 1 - l)
    const hsla: HSLAColor = { h: hsva.h, s, l, a: hsva.a }
    return hsla
}

export const HSLToHex = (hsl: HSLColor): string => RGBToHex(HSLToRGB(hsl))

export const HSLToRGB = (hsl: HSLColor): RGBColor => {
    const k = (n: number) => (n + hsl.h / 30) % 12
    const t = hsl.s * Math.min(hsl.l, 1 - hsl.l)
    const f = (n: number) => hsl.l - t * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    const rgb: RGBColor = {
        r: Math.round(255 * f(0)),
        g: Math.round(255 * f(8)),
        b: Math.round(255 * f(4))
    }
    return rgb
}

export const HSLToHSV = (hsl: HSLColor): HSVColor => {
    const v = hsl.l + hsl.s * Math.min(hsl.l, 1 - hsl.l)
    const s = v === 0 ? 0 : 2 - 2 * (hsl.l / v)
    const hsv: HSVColor = { h: hsl.h, s, v }
    return hsv
}

export const HSLAToHex = (hsla: HSLAColor): string => RGBAToHex(HSLAToRGBA(hsla))

export const HSLAToRGBA = (hsla: HSLAColor): RGBAColor => {
    const k = (n: number) => (n + hsla.h / 30) % 12
    const t = hsla.s * Math.min(hsla.l, 1 - hsla.l)
    const f = (n: number) => hsla.l - t * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    const rgba: RGBAColor = {
        r: Math.round(255 * f(0)),
        g: Math.round(255 * f(8)),
        b: Math.round(255 * f(4)),
        a: hsla.a
    }
    return rgba
}

export const HSLAToHSVA = (hsla: HSLAColor): HSVAColor => {
    const v = hsla.l + hsla.s * Math.min(hsla.l, 1 - hsla.l)
    const s = v === 0 ? 0 : 2 - 2 * (hsla.l / v)
    const hsva: HSVAColor = { h: hsla.h, s, v, a: hsla.a }
    return hsva
}

// Operations

export const ScaleUpRGB = (rgb: RGBColor, percentage: number) => {
    if (percentage <= 0 || percentage > 100) {
        return rgb
    } else {
        const percentageChange = 1 + percentage / 100
        const lighter: RGBColor = { r: Math.min(rgb.r * percentageChange, 255), g: Math.min(rgb.g * percentageChange, 255), b: Math.min(rgb.b * percentageChange, 255) }
        return lighter
    }
}

export const ScaleDownRGB = (rgb: RGBColor, percentage: number) => {
    if (percentage <= 0 || percentage > 100) {
        return rgb
    } else {
        const percentageChange = 1 - percentage / 100
        const darker: RGBColor = { r: Math.max(rgb.r * percentageChange, 0), g: Math.max(rgb.g * percentageChange, 0), b: Math.max(rgb.b * percentageChange, 0) }
        return darker
    }
}

export const ScaleUpRGBA = (rgba: RGBAColor, percentage: number) => {
    if (percentage <= 0 || percentage > 100) {
        return rgba
    } else {
        const percentageChange = 1 + percentage / 100
        const lighter: RGBAColor = { r: Math.min(rgba.r * percentageChange, 255), g: Math.min(rgba.g * percentageChange, 255), b: Math.min(rgba.b * percentageChange, 255), a: rgba.a }
        return lighter
    }
}

export const ScaleDownRGBA = (rgba: RGBAColor, percentage: number) => {
    if (percentage <= 0 || percentage > 100) {
        return rgba
    } else {
        const percentageChange = 1 - percentage / 100
        const darker: RGBAColor = { r: Math.max(rgba.r * percentageChange, 0), g: Math.max(rgba.g * percentageChange, 0), b: Math.max(rgba.b * percentageChange, 0), a: rgba.a }
        // console.log(rgba, darker)
        return darker
    }
}

export const scaleUpHexColor = (hexColor: string, percentage: number) => {
    if (hexColor.length === 9) {
        const rgba = HexToRGBA(hexColor)
        return isNull(rgba) ? hexColor : RGBAToHex(ScaleUpRGBA(rgba, percentage))
    } else if (hexColor.length === 7 || hexColor.length === 5) {
        const rgb = HexToRGB(hexColor)
        return isNull(rgb) ? hexColor : RGBToHex(ScaleUpRGB(rgb, percentage))
    } else {
        return hexColor
    }
}

export const scaleDownHexColor = (hexColor: string, percentage: number) => {
    if (hexColor.length === 9) {
        const rgba = HexToRGBA(hexColor)
        return isNull(rgba) ? hexColor : RGBAToHex(ScaleDownRGBA(rgba, percentage))
    } else if (hexColor.length === 7 || hexColor.length === 5) {
        const rgb = HexToRGB(hexColor)
        return isNull(rgb) ? hexColor : RGBToHex(ScaleDownRGB(rgb, percentage))
    } else {
        return hexColor
    }
}

export const LightenHex = (hexColor: string, percentage: number) => {
    const absPercentage = percentage >= 100 ? 100 : percentage <= 0 ? 0 : percentage
    if (absPercentage === 0) {
        return hexColor
    }
    if (hexColor.length === 9) {
        const hsla = HexToHSLA(hexColor)
        hsla.l = Math.min(1, hsla.l + absPercentage / 100)
        return HSLAToHex(hsla)
    } else if (hexColor.length === 7 || hexColor.length === 4) {
        const hsl = HexToHSL(hexColor)
        hsl.l = Math.min(1, hsl.l + absPercentage / 100)
        return HSLToHex(hsl)
    } else {
        return hexColor
    }
}

export const DarkenHex = (hexColor: string, percentage: number) => {
    const absPercentage = percentage >= 100 ? 100 : percentage <= 0 ? 0 : percentage
    if (absPercentage === 0) {
        return hexColor
    }
    if (hexColor.length === 9) {
        const hsla = HexToHSLA(hexColor)
        hsla.l = Math.max(0, hsla.l - absPercentage / 100)
        return HSLAToHex(hsla)
    } else if (hexColor.length === 7 || hexColor.length === 4) {
        const hsl = HexToHSL(hexColor)
        hsl.l = Math.max(0, hsl.l - absPercentage / 100)
        return HSLToHex(hsl)
    } else {
        return hexColor
    }
}

export const BrightenHex = (hexColor: string, percentage: number) => {
    const absPercentage = percentage >= 100 ? 100 : percentage <= 0 ? 0 : percentage
    if (absPercentage === 0) {
        return hexColor
    }
    if (hexColor.length === 9) {
        const hsva = HexToHSVA(hexColor)
        hsva.v = Math.min(1, hsva.v + absPercentage / 100)
        return HSVAToHex(hsva)
    } else if (hexColor.length === 7 || hexColor.length === 4) {
        const hsv = HexToHSV(hexColor)
        hsv.v = Math.min(1, hsv.v + absPercentage / 100)
        return HSVToHex(hsv)
    } else {
        return hexColor
    }
}

export const DimHex = (hexColor: string, percentage: number) => {
    const absPercentage = percentage >= 100 ? 100 : percentage <= 0 ? 0 : percentage
    if (absPercentage === 0) {
        return hexColor
    }
    if (hexColor.length === 9) {
        const hsva = HexToHSVA(hexColor)
        hsva.v = Math.max(0, hsva.v - absPercentage / 100)
        return HSVAToHex(hsva)
    } else if (hexColor.length === 7 || hexColor.length === 4) {
        const hsv = HexToHSV(hexColor)
        hsv.v = Math.max(0, hsv.v - absPercentage / 100)
        return HSVToHex(hsv)
    } else {
        return hexColor
    }
}

export const MakeHexWithLightness = (hexColor: string, lightness: number) => {
    const absLightness = lightness >= 1000 ? 1000 : lightness <= 0 ? 0 : lightness
    if (hexColor.length === 9) {
        const hsla = HexToHSLA(hexColor)
        hsla.l = absLightness === 0 ? 0 : absLightness / 1000
        return HSLAToHex(hsla)
    } else if (hexColor.length === 7 || hexColor.length === 4) {
        const hsl = HexToHSL(hexColor)
        hsl.l = absLightness === 0 ? 0 : absLightness / 1000
        return HSLToHex(hsl)
    } else {
        return hexColor
    }
}

export const MakeHexWithBrightness = (hexColor: string, brightness: number) => {
    const absBrightness = brightness >= 100 ? 100 : brightness <= 0 ? 0 : brightness
    if (hexColor.length === 9) {
        const hsva = HexToHSVA(hexColor)
        hsva.v = absBrightness === 0 ? 0 : absBrightness / 100
        return HSVAToHex(hsva)
    } else if (hexColor.length === 7 || hexColor.length === 4) {
        const hsv = HexToHSV(hexColor)
        hsv.v = absBrightness === 0 ? 0 : absBrightness / 100
        return HSVToHex(hsv)
    } else {
        return hexColor
    }
}

export const MakeHexWithHSLSaturation = (hexColor: string, saturation: number) => {
    const absSaturation = saturation >= 100 ? 100 : saturation <= 0 ? 0 : saturation
    if (hexColor.length === 9) {
        const hsla = HexToHSLA(hexColor)
        hsla.s = absSaturation === 0 ? 0 : absSaturation / 100
        return HSLAToHex(hsla)
    } else if (hexColor.length === 7 || hexColor.length === 4) {
        const hsl = HexToHSL(hexColor)
        hsl.s = absSaturation === 0 ? 0 : absSaturation / 100
        return HSLToHex(hsl)
    } else {
        return hexColor
    }
}

export const MakeHexWithHSVSaturation = (hexColor: string, saturation: number) => {
    const absSaturation = saturation >= 100 ? 100 : saturation <= 0 ? 0 : saturation
    if (hexColor.length === 9) {
        const hsva = HexToHSVA(hexColor)
        hsva.s = absSaturation === 0 ? 0 : absSaturation / 100
        return HSVAToHex(hsva)
    } else if (hexColor.length === 7 || hexColor.length === 4) {
        const hsv = HexToHSV(hexColor)
        hsv.s = absSaturation === 0 ? 0 : absSaturation / 100
        return HSVToHex(hsv)
    } else {
        return hexColor
    }
}

export const MakeHexWithOpacity = (hexColor: string, opacity: number) => {
    const absOpacity = opacity >= 1 ? 1 : opacity <= 0 ? 0 : opacity
    if (hexColor.length === 9) {
        const rgba = HexToRGBA(hexColor)
        rgba.a = absOpacity
        return RGBAToHex(rgba)
    } else if (hexColor.length === 7 || hexColor.length === 4) {
        const rgb = HexToRGB(hexColor)
        const rgba = RGBToRGBA(rgb)
        rgba.a = absOpacity
        return RGBAToHex(rgba)
    } else {
        return hexColor
    }
}