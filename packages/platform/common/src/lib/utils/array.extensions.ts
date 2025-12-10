// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import "@zwp/platform.common/extensions/array"

export const provideArrayExtensions = () => {
    if (!Array.prototype.compactMap) {
        Object.defineProperty(
            Array.prototype, 
            'compactMap', 
            {
                enumerable: false,
                writable: false,
                configurable: false,
                value: function<T, U>(this: T[], callbackFn: (value: T, index: number, array: T[]) => U): U extends null | undefined ? never : U[] {
                    return this.map(callbackFn).filter(Boolean) as U extends null | undefined ? never : U[]
                }
            })
    }
}