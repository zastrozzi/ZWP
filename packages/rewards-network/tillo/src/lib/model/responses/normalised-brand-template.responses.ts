export interface NormalisedBrandResponse {
    classifier: string,
    version: string,
    isActive: boolean,
    fileList?: string[],
    rawData?: Uint8Array[],
    brandId: string
}