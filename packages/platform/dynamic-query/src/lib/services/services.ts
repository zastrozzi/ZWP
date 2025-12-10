import { Provider } from '@angular/core'
import { DynamicQueryAPIConfig } from '../config'

import * as LiveServices from './live'
import * as MockServices from './mock'
import * as AbstractServices from './abstract'
import { ModuleAPIState } from '@zwp/platform.common'

export * from './abstract'
export * from './live'
export * from './mock'

export const environmentProviders = (apiConfig: DynamicQueryAPIConfig): Provider[] => [
    { 
        provide: AbstractServices.BOOLEAN_FILTER_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.BooleanFilterLiveAPIService : MockServices.BooleanFilterMockAPIService
    },
    { 
        provide: AbstractServices.DATE_FILTER_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.DateFilterLiveAPIService : MockServices.DateFilterMockAPIService
    },
    { 
        provide: AbstractServices.ENUM_FILTER_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.EnumFilterLiveAPIService : MockServices.EnumFilterMockAPIService
    },
    { 
        provide: AbstractServices.FILTER_GROUP_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.FilterGroupLiveAPIService : MockServices.FilterGroupMockAPIService
    },
    {
        provide: AbstractServices.NUMERIC_FILTER_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.NumericFilterLiveAPIService : MockServices.NumericFilterMockAPIService
    },
    {
        provide: AbstractServices.QUERYABLE_SCHEMA_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.QueryableSchemaLiveAPIService : MockServices.QueryableSchemaMockAPIService
    },
    {
        provide: AbstractServices.STRING_FILTER_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.StringFilterLiveAPIService : MockServices.StringFilterMockAPIService
    },
    {
        provide: AbstractServices.STRUCTURED_QUERY_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.StructuredQueryLiveAPIService : MockServices.StructuredQueryMockAPIService
    },
    {
        provide: AbstractServices.UUID_FILTER_API_SERVICE,
        useExisting: apiConfig.apiState === ModuleAPIState.LIVE ? LiveServices.UUIDFilterLiveAPIService : MockServices.UUIDFilterMockAPIService
    }
]