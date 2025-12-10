import { EnvironmentProviders } from '@angular/core'
import { BooleanFilterEffects } from './boolean-filter.effects'
import { DateFilterEffects } from './date-filter.effects'
import { EnumFilterEffects } from './enum-filter.effects'
import { FilterGroupEffects } from './filter-group.effects'
import { NumericFilterEffects } from './numeric-filter.effects'
import { StringFilterEffects } from './string-filter.effects'
import { StructuredQueryEffects } from './structured-query.effects'
import { UUIDFilterEffects } from './uuid-filter.effects'
import { provideEffects } from '@ngrx/effects'
import { QueryableSchemaColumnEffects } from './queryable-schema.column.effects'
import { QueryableSchemaTableEffects } from './queryable-schema.table.effects'
import { QueryableSchemaRelationshipEffects } from './queryable-schema.relationship.effects'

export const environmentProviders: EnvironmentProviders[] = [
    provideEffects(
        BooleanFilterEffects,
        DateFilterEffects,
        EnumFilterEffects,
        FilterGroupEffects,
        NumericFilterEffects,
        QueryableSchemaColumnEffects,
        QueryableSchemaRelationshipEffects,
        QueryableSchemaTableEffects,
        StringFilterEffects,
        StructuredQueryEffects,
        UUIDFilterEffects
    )
]