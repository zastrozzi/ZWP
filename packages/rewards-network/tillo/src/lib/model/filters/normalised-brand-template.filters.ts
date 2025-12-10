import { DateQueryFilter, EnumQueryFilter, Nullable, StringQueryFilter, BooleanQueryFilter, NumberQueryFilter } from "@zwp/platform.common";

export interface NormalisedBrandTemplateFilters {
    classifier: Nullable<StringQueryFilter>,
    version: Nullable<StringQueryFilter>,
    isActive: Nullable<BooleanQueryFilter>,
    fileList?: Nullable<StringQueryFilter>,
    rawData?: Nullable<Uint8Array>,
    brandId: Nullable<StringQueryFilter>
}


export const initialNormalisedBrandTemplateFilters: NormalisedBrandTemplateFilters = {
    classifier: null,
    version: null,
    isActive: null,
    fileList: null,
    rawData: null,
    brandId: null
}