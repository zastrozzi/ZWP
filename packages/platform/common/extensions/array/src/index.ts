export {}

declare global {
    interface Array<T> {
        compactMap<U>(callbackFn: (value: T, index: number, array: T[]) => U): U extends null | undefined ? never : U[]
    }
}
