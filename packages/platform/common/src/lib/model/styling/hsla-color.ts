/**
 * Defines colors using the Hue Saturation Lightness Alpha model (HSLA)
 * @property h - Hue values should be between 0 and 360
 * @property s - Saturation values should be between 0 and 1
 * @property l - Lightness values should be between 0 and 1
 * @property a - Alpha values should be between 0 and 1
 * */
export interface HSLAColor {
    h: number
    s: number
    l: number
    a: number
}
