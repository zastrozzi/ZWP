export interface RFC4648ParseOptions {
    loose?: boolean
    out?: new (size: number) => {[index: number]: number}
}