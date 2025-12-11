export const randomFromArray = <T>(array: T[]): T | null => {
    if (array.length === 0) { return null }
    return array[Math.floor(Math.random() * array.length)]
}