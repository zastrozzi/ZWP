export interface NumberGeneratorOptions {
    min?: number
    max?: number
    decimalPlaces?: number
    step?: number
}

export const generateRandomNumber = ({
    min = 0,
    max = 100,
    decimalPlaces = 0,
    step = 1,
}: NumberGeneratorOptions = {}): number => {
    const minVal = Math.ceil(min / step) * step
    const maxVal = Math.floor(max / step) * step
    const range = (maxVal - minVal) / step
    const randomValue = minVal + Math.floor(Math.random() * (range + 1)) * step

    return Number(randomValue.toFixed(decimalPlaces))
}
