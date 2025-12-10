import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionGroup,
    createRemoteActionMap,
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const PARTNER_TYPE_ASSIGNMENT_ACTION_IDENTIFIERS = [
    Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER,
    Identifiers.PARTNER_TYPE_ASSIGNMENT_STATE_FEATURE_KEY,
]

const updatePartnerTypeAssignmentFilters = createAction(
    createActionType(PARTNER_TYPE_ASSIGNMENT_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.PartnerTypeAssignmentFilters>>()
)

const resetPartnerTypeAssignmentFilters = createAction(
    createActionType(PARTNER_TYPE_ASSIGNMENT_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetPartnerTypeAssignmentState = createAction(
    createActionType(PARTNER_TYPE_ASSIGNMENT_ACTION_IDENTIFIERS, 'Reset State')
)

const initialisePartnerTypeAssignmentState = createAction(
    createActionType(PARTNER_TYPE_ASSIGNMENT_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectPartnerTypeAssignment = createAction(
    createActionType(PARTNER_TYPE_ASSIGNMENT_ACTION_IDENTIFIERS, 'Select PartnerTypeAssignment'),
    props<{ partnerTypeAssignmentId: string }>()
)

const deselectPartnerTypeAssignment = createAction(
    createActionType(PARTNER_TYPE_ASSIGNMENT_ACTION_IDENTIFIERS, 'Deselect PartnerTypeAssignment')
)

const resetPagination = createAction(
    createActionType(PARTNER_TYPE_ASSIGNMENT_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const addPartner = createRemoteActionGroup<
    { partnerId: string, partnerTypeId: string },
    Model.PartnerTypeAssignmentResponse
>('Add PartnerType to Partner', ...PARTNER_TYPE_ASSIGNMENT_ACTION_IDENTIFIERS)

const removePartner = createRemoteActionGroup<
    { parentId: string, partnerTypeId: string },
    { partnerTypeAssignmentId: string }
>('Remove PartnerType from Partner', ...PARTNER_TYPE_ASSIGNMENT_ACTION_IDENTIFIERS)

const getPartnerTypeAssignment = createRemoteActionGroup<
    { partnerTypeAssignmentId: string },
    Model.PartnerTypeAssignmentResponse
>('Get PartnerTypeAssignment', ...PARTNER_TYPE_ASSIGNMENT_ACTION_IDENTIFIERS)

const listPartnerTypeAssignments = createRemoteActionGroup<
    {
        parentId: Nullable<string> | 'auto'
        parentType: 'partner' | 'partnerType' | 'none'
        pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerTypeAssignmentResponse>>>
    },
    PaginatedResponse<Model.PartnerTypeAssignmentResponse>
>('List PartnerTypeAssignments', ...PARTNER_TYPE_ASSIGNMENT_ACTION_IDENTIFIERS)

const deletePartnerTypeAssignment = createRemoteActionGroup<
    { partnerTypeAssignmentId: string, force: boolean },
    { partnerTypeAssignmentId: string }
>('Delete PartnerTypeAssignment', ...PARTNER_TYPE_ASSIGNMENT_ACTION_IDENTIFIERS)

export const PartnerTypeAssignmentLocalActions = {
    updatePartnerTypeAssignmentFilters,
    resetPartnerTypeAssignmentFilters,
    resetPartnerTypeAssignmentState,
    initialisePartnerTypeAssignmentState,
    selectPartnerTypeAssignment,
    deselectPartnerTypeAssignment,
    resetPagination,
}

export const PartnerTypeAssignmentRemoteActions = createRemoteActionMap(
    PARTNER_TYPE_ASSIGNMENT_ACTION_IDENTIFIERS,
    {
        add: addPartner,
        remove: removePartner,
        get: getPartnerTypeAssignment,
        list: listPartnerTypeAssignments,
        delete: deletePartnerTypeAssignment,
    }
)
