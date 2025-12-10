import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionCRUDMap,
    createRemoteActionGroup,
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const PARTNER_ACTION_IDENTIFIERS = [
    Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER,
    Identifiers.PARTNER_STATE_FEATURE_KEY,
]

const updatePartnerFilters = createAction(
    createActionType(PARTNER_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.PartnerFilters>>()
)

const resetPartnerFilters = createAction(
    createActionType(PARTNER_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetPartnerState = createAction(
    createActionType(PARTNER_ACTION_IDENTIFIERS, 'Reset State')
)

const initialisePartnerState = createAction(
    createActionType(PARTNER_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectPartner = createAction(
    createActionType(PARTNER_ACTION_IDENTIFIERS, 'Select Partner'),
    props<{ partnerId: string }>()
)

const deselectPartner = createAction(
    createActionType(PARTNER_ACTION_IDENTIFIERS, 'Deselect Partner')
)

const resetPagination = createAction(
    createActionType(PARTNER_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createPartner = createRemoteActionGroup<
    { request: Model.CreatePartnerRequest },
    Model.PartnerResponse
>('Create Partner', ...PARTNER_ACTION_IDENTIFIERS)

const getPartner = createRemoteActionGroup<
    { partnerId: string },
    Model.PartnerResponse
>('Get Partner', ...PARTNER_ACTION_IDENTIFIERS)

const listPartners = createRemoteActionGroup<
    {
        parentId: Nullable<string> | 'auto'
        parentType: 'partnerType' | 'asset' | 'enduser' | 'none'
        pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerResponse>>>
    },
    PaginatedResponse<Model.PartnerResponse>
>('List Partners', ...PARTNER_ACTION_IDENTIFIERS)

const updatePartner = createRemoteActionGroup<
    { partnerId: string; update: Model.UpdatePartnerRequest },
    Model.PartnerResponse
>('Update Partner', ...PARTNER_ACTION_IDENTIFIERS)

const deletePartner = createRemoteActionGroup<
    { partnerId: string, force: boolean },
    { partnerId: string }
>('Delete Partner', ...PARTNER_ACTION_IDENTIFIERS)

export const PartnerLocalActions = {
    updatePartnerFilters,
    resetPartnerFilters,
    resetPartnerState,
    initialisePartnerState,
    selectPartner,
    deselectPartner,
    resetPagination,
}

export const PartnerRemoteActions = createRemoteActionCRUDMap(
    PARTNER_ACTION_IDENTIFIERS,
    {
        create: createPartner,
        get: getPartner,
        list: listPartners,
        update: updatePartner,
        delete: deletePartner,
    }
)
