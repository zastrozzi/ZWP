export interface HTTPMediaType {
    type: string
    subtype: string
    parameters?: {[key: string]: string}
}