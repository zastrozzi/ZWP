export interface GeometryBoundingRectangle {
    top: number
    bottom: number
    left: number
    right: number
    height?: number
    width?: number
    scrollTop?: number
    scrollLeft?: number
    [key: string]: number | undefined
}