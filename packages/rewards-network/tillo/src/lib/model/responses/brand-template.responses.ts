export interface BrandTemplateResponse {
    id: string,
        
    dbCreatedAt?: Date,
    dbUpdatedAt?: Date,
    dbDeletedAt?: Date,
        
    classifier: string,
    version: string,
    isActive: boolean,
    fileList: string[],
        
    brandId: string
        
}