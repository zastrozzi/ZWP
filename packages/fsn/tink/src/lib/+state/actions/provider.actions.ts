import { Model } from '../../model'
import {
    DateQueryFilter,
    ZWPISO3166Alpha2,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionCRUDMap,
    createRemoteActionGroup,
    createRemoteActionMap,
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const PROVIDER_ACTION_IDENTIFIERS = [
    Identifiers.FSN_TINK_ACTION_IDENTIFIER,
    Identifiers.PROVIDER_STATE_FEATURE_KEY,
]

const updateProviderFilters = createAction(
    createActionType(PROVIDER_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.ProviderFilters>>()
)

const resetProviderFilters = createAction(
    createActionType(PROVIDER_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetProviderState = createAction(
    createActionType(PROVIDER_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseProviderState = createAction(
    createActionType(PROVIDER_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectProvider = createAction(
    createActionType(PROVIDER_ACTION_IDENTIFIERS, 'Select Provider'),
    props<{ providerId: string }>()
)

const deselectProvider = createAction(
    createActionType(PROVIDER_ACTION_IDENTIFIERS, 'Deselect Provider')
)

const resetPagination = createAction(
    createActionType(PROVIDER_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const getProvider = createRemoteActionGroup<
    { providerId: string },
    Model.ServerAPIModel.Provider.TinkV1ProviderResponse
>('Get Provider', ...PROVIDER_ACTION_IDENTIFIERS)

const listProviders = createRemoteActionGroup<
    {
        tinkUserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Provider.TinkV1ProviderResponse>>>
    },
    PaginatedResponse<Model.ServerAPIModel.Provider.TinkV1ProviderResponse>
>('List Providers', ...PROVIDER_ACTION_IDENTIFIERS)

const deleteProvider = createRemoteActionGroup<
    { providerId: string },
    { providerId: string }
>('Delete Provider', ...PROVIDER_ACTION_IDENTIFIERS)

const refreshProviders = createRemoteActionGroup<
    { 
        market: Nullable<ZWPISO3166Alpha2>
    },
    {
        market: Nullable<ZWPISO3166Alpha2>
    }
>('Refresh Providers', ...PROVIDER_ACTION_IDENTIFIERS)

export const ProviderLocalActions = {
    updateProviderFilters,
    resetProviderFilters,
    resetProviderState,
    initialiseProviderState,
    selectProvider,
    deselectProvider,
    resetPagination
}

export const ProviderRemoteActions = createRemoteActionMap(
    PROVIDER_ACTION_IDENTIFIERS,
    {
        getProvider,
        listProviders,
        deleteProvider,
        refreshProviders
    }
)