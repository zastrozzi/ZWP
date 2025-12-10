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

const PROVIDER_CONSENT_ACTION_IDENTIFIERS = [
    Identifiers.FSN_TINK_ACTION_IDENTIFIER,
    Identifiers.PROVIDER_CONSENT_STATE_FEATURE_KEY,
]

const updateProviderConsentFilters = createAction(
    createActionType(PROVIDER_CONSENT_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.ProviderConsentFilters>>()
)

const resetProviderConsentFilters = createAction(
    createActionType(PROVIDER_CONSENT_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetProviderConsentState = createAction(
    createActionType(PROVIDER_CONSENT_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseProviderConsentState = createAction(
    createActionType(PROVIDER_CONSENT_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectProviderConsent = createAction(
    createActionType(PROVIDER_CONSENT_ACTION_IDENTIFIERS, 'Select ProviderConsent'),
    props<{ providerConsentId: string }>()
)

const deselectProviderConsent = createAction(
    createActionType(PROVIDER_CONSENT_ACTION_IDENTIFIERS, 'Deselect ProviderConsent')
)

const resetPagination = createAction(
    createActionType(PROVIDER_CONSENT_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const getProviderConsent = createRemoteActionGroup<
    { providerConsentId: string },
    Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse
>('Get ProviderConsent', ...PROVIDER_CONSENT_ACTION_IDENTIFIERS)

const listProviderConsents = createRemoteActionGroup<
    {
        tinkUserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse>>>
    },
    PaginatedResponse<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse>
>('List ProviderConsents', ...PROVIDER_CONSENT_ACTION_IDENTIFIERS)

const deleteProviderConsent = createRemoteActionGroup<
    { providerConsentId: string },
    { providerConsentId: string }
>('Delete ProviderConsent', ...PROVIDER_CONSENT_ACTION_IDENTIFIERS)

const refreshProviderConsent = createRemoteActionGroup<
    { providerConsentId: string },
    { providerConsentId: string }
>('Refresh ProviderConsent', ...PROVIDER_CONSENT_ACTION_IDENTIFIERS)

const refreshProviderConsents = createRemoteActionGroup<
    { tinkUserId: string },
    { tinkUserId: string }
>('Refresh ProviderConsents', ...PROVIDER_CONSENT_ACTION_IDENTIFIERS)

const extendProviderConsent = createRemoteActionGroup<
    { providerConsentId: string },
    Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse
>('Extend ProviderConsent', ...PROVIDER_CONSENT_ACTION_IDENTIFIERS)

export const ProviderConsentLocalActions = {
    updateProviderConsentFilters,
    resetProviderConsentFilters,
    resetProviderConsentState,
    initialiseProviderConsentState,
    selectProviderConsent,
    deselectProviderConsent,
    resetPagination
}

export const ProviderConsentRemoteActions = createRemoteActionMap(
    PROVIDER_CONSENT_ACTION_IDENTIFIERS,
    {
        getProviderConsent,
        listProviderConsents,
        deleteProviderConsent,
        refreshProviderConsent,
        refreshProviderConsents,
        extendProviderConsent
    }
)