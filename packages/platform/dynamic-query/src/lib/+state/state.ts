import { EnvironmentProviders } from '@angular/core'
import { provideState } from '@ngrx/store'
import { Identifiers } from './identifiers'
import { Reducers } from './reducers'
import { Effects } from './effects'
import { createNamespacedFeatureKey } from '@zwp/platform.common'

export * from './actions'
export * from './facades'
export * from './reducers'
export * from './selectors'
export * from './identifiers'

export const environmentProviders: EnvironmentProviders[] = [
    provideState(
        createNamespacedFeatureKey(Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER, Identifiers.BOOLEAN_FILTER_STATE_FEATURE_KEY),
        Reducers.booleanFilterReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER, Identifiers.DATE_FILTER_STATE_FEATURE_KEY),
        Reducers.dateFilterReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER, Identifiers.ENUM_FILTER_STATE_FEATURE_KEY),
        Reducers.enumFilterReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER, Identifiers.FILTER_GROUP_STATE_FEATURE_KEY),
        Reducers.filterGroupReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER, Identifiers.NUMERIC_FILTER_STATE_FEATURE_KEY),
        Reducers.numericFilterReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER, Identifiers.QUERYABLE_SCHEMA_COLUMN_STATE_FEATURE_KEY),
        Reducers.queryableSchemaColumnReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER, Identifiers.QUERYABLE_SCHEMA_RELATIONSHIP_STATE_FEATURE_KEY),
        Reducers.queryableSchemaRelationshipReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER, Identifiers.QUERYABLE_SCHEMA_TABLE_STATE_FEATURE_KEY),
        Reducers.queryableSchemaTableReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER, Identifiers.STRING_FILTER_STATE_FEATURE_KEY),
        Reducers.stringFilterReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER, Identifiers.STRUCTURED_QUERY_STATE_FEATURE_KEY),
        Reducers.structuredQueryReducer
    ),
    provideState(
        createNamespacedFeatureKey(Identifiers.PLATFORM_DYNAMIC_QUERY_ACTION_IDENTIFIER, Identifiers.UUID_FILTER_STATE_FEATURE_KEY),
        Reducers.uuidFilterReducer
    ),
    ...Effects.environmentProviders
]