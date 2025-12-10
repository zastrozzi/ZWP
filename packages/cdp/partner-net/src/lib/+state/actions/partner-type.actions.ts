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

const PARTNER_TYPE_ACTION_IDENTIFIERS = [
    Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER,
    Identifiers.PARTNER_TYPE_STATE_FEATURE_KEY,
]

const updatePartnerTypeFilters = createAction(
    createActionType(PARTNER_TYPE_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.PartnerTypeFilters>>()
)

const resetPartnerTypeFilters = createAction(
    createActionType(PARTNER_TYPE_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetPartnerTypeState = createAction(
    createActionType(PARTNER_TYPE_ACTION_IDENTIFIERS, 'Reset State')
)

const initialisePartnerTypeState = createAction(
    createActionType(PARTNER_TYPE_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectPartnerType = createAction(
    createActionType(PARTNER_TYPE_ACTION_IDENTIFIERS, 'Select PartnerType'),
    props<{ partnerTypeId: string }>()
)

const deselectPartnerType = createAction(
    createActionType(PARTNER_TYPE_ACTION_IDENTIFIERS, 'Deselect PartnerType')
)

const resetPagination = createAction(
    createActionType(PARTNER_TYPE_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createPartnerType = createRemoteActionGroup<
    { request: Model.CreatePartnerTypeRequest },
    Model.PartnerTypeResponse
>('Create PartnerType', ...PARTNER_TYPE_ACTION_IDENTIFIERS)

const getPartnerType = createRemoteActionGroup<
    { partnerTypeId: string },
    Model.PartnerTypeResponse
>('Get PartnerType', ...PARTNER_TYPE_ACTION_IDENTIFIERS)

const listPartnerTypes = createRemoteActionGroup<
    {
        parentId: Nullable<string> | 'auto'
        parentType: 'partner' | 'none'
        pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerTypeResponse>>>
    },
    PaginatedResponse<Model.PartnerTypeResponse>
>('List PartnerTypes', ...PARTNER_TYPE_ACTION_IDENTIFIERS)

const updatePartnerType = createRemoteActionGroup<
    { partnerTypeId: string; update: Model.UpdatePartnerTypeRequest },
    Model.PartnerTypeResponse
>('Update PartnerType', ...PARTNER_TYPE_ACTION_IDENTIFIERS)

const deletePartnerType = createRemoteActionGroup<
    { partnerTypeId: string, force: boolean },
    { partnerTypeId: string }
>('Delete PartnerType', ...PARTNER_TYPE_ACTION_IDENTIFIERS)

export const PartnerTypeLocalActions = {
    updatePartnerTypeFilters,
    resetPartnerTypeFilters,
    resetPartnerTypeState,
    initialisePartnerTypeState,
    selectPartnerType,
    deselectPartnerType,
    resetPagination,
}

export const PartnerTypeRemoteActions = createRemoteActionCRUDMap(
    PARTNER_TYPE_ACTION_IDENTIFIERS,
    {
        create: createPartnerType,
        get: getPartnerType,
        list: listPartnerTypes,
        update: updatePartnerType,
        delete: deletePartnerType,
    }
)
