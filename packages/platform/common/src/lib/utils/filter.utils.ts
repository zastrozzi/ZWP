import { DateQueryFilter, EnumQueryFilter, FilterChipEvent, ZWPFilterChipInputType, Nullable, NumberQueryFilter, StringQueryFilter } from '../model'

export const handleFilterChipEvent = <ModelFilters>(filterChipEvent: FilterChipEvent): Partial<ModelFilters> => {
    const updateObj: Partial<ModelFilters> = {}
    const filter = filterChipEvent.filter
    switch (filter.type) {
        case ZWPFilterChipInputType.DATE:
            (updateObj[filter.name as keyof ModelFilters] as Nullable<DateQueryFilter>) = filterChipEvent.action === 'add' ? filter.dateFilter : null
            break
        case ZWPFilterChipInputType.STRING:
            (updateObj[filter.name as keyof ModelFilters] as Nullable<StringQueryFilter>) = filterChipEvent.action === 'add' ? filter.stringFilter : null
            break
        case ZWPFilterChipInputType.ENUM:
            (updateObj[filter.name as keyof ModelFilters] as Nullable<EnumQueryFilter<unknown>>) = filterChipEvent.action === 'add' ? filter.enumFilter : null
            break
        case ZWPFilterChipInputType.NUMBER:
            (updateObj[filter.name as keyof ModelFilters] as Nullable<NumberQueryFilter>) = filterChipEvent.action === 'add' ? filter.numberFilter : null
            break
    }
    return updateObj
}