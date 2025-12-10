import { DateQueryFilter, EnumQueryFilter, FileExtension, Nullable, StringQueryFilter, BooleanQueryFilter } from "@zwp/platform.common";

export interface BrandTemplateFilters {
    id: Nullable<StringQueryFilter>,
        
    dbCreatedAt?: Nullable<DateQueryFilter>,
    dbUpdatedAt?: Nullable<DateQueryFilter>,
    dbDeletedAt?: Nullable<DateQueryFilter>,
        
    classifier: Nullable<StringQueryFilter>,
    version: Nullable<StringQueryFilter>,
    isActive: Nullable<BooleanQueryFilter>,
    fileList: Nullable<StringQueryFilter>,
        
    brandId: Nullable<StringQueryFilter>
    
}

export const initialBrandTemplateFilters: BrandTemplateFilters = {
    id: null,
        
    dbCreatedAt: null,
    dbUpdatedAt: null,
    dbDeletedAt: null,
        
    classifier: null,
    version: null,
    isActive: null,
    fileList: null,
        
    brandId: null
    
}