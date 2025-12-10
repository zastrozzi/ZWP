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

const ACCOUNT_CONSENT_ACTION_IDENTIFIERS = [
    Identifiers.FSN_TINK_ACTION_IDENTIFIER,
    Identifiers.ACCOUNT_CONSENT_STATE_FEATURE_KEY,
]

const updateAccountConsentFilters = createAction(
    createActionType(ACCOUNT_CONSENT_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.AccountConsentFilters>>()
)

const resetAccountConsentFilters = createAction(
    createActionType(ACCOUNT_CONSENT_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetAccountConsentState = createAction(
    createActionType(ACCOUNT_CONSENT_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseAccountConsentState = createAction(
    createActionType(ACCOUNT_CONSENT_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectAccountConsent = createAction(
    createActionType(ACCOUNT_CONSENT_ACTION_IDENTIFIERS, 'Select AccountConsent'),
    props<{ accountConsentId: string }>()
)

const deselectAccountConsent = createAction(
    createActionType(ACCOUNT_CONSENT_ACTION_IDENTIFIERS, 'Deselect AccountConsent')
)

const resetPagination = createAction(
    createActionType(ACCOUNT_CONSENT_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const getAccountConsent = createRemoteActionGroup<
    { accountConsentId: string },
    Model.ServerAPIModel.Consent.TinkV1AccountConsentResponse
>('Get AccountConsent', ...ACCOUNT_CONSENT_ACTION_IDENTIFIERS)

const listAccountConsents = createRemoteActionGroup<
    {
        tinkUserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Consent.TinkV1AccountConsentResponse>>>
    },
    PaginatedResponse<Model.ServerAPIModel.Consent.TinkV1AccountConsentResponse>
>('List AccountConsents', ...ACCOUNT_CONSENT_ACTION_IDENTIFIERS)

const deleteAccountConsent = createRemoteActionGroup<
    { accountConsentId: string },
    { accountConsentId: string }
>('Delete AccountConsent', ...ACCOUNT_CONSENT_ACTION_IDENTIFIERS)

export const AccountConsentLocalActions = {
    updateAccountConsentFilters,
    resetAccountConsentFilters,
    resetAccountConsentState,
    initialiseAccountConsentState,
    selectAccountConsent,
    deselectAccountConsent,
    resetPagination
}

export const AccountConsentRemoteActions = createRemoteActionMap(
    ACCOUNT_CONSENT_ACTION_IDENTIFIERS,
    {
        getAccountConsent,
        listAccountConsents,
        deleteAccountConsent
    }
)