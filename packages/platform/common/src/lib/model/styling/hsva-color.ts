/**
 * Defines colors using the Hue Saturation Value Alpha model (HSVA)
 * @property h - Hue values should be between 0 and 360
 * @property s - Saturation values should be between 0 and 1
 * @property v - Value values should be between 0 and 1
 * @property a - Alpha values should be between 0 and 1
 * */
export interface HSVAColor {
    h: number
    s: number
    v: number
    a: number
}
