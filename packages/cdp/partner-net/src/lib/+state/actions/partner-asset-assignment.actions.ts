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

const PARTNER_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS = [
    Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER,
    Identifiers.PARTNER_ASSET_ASSIGNMENT_STATE_FEATURE_KEY,
]

const updatePartnerAssetAssignmentFilters = createAction(
    createActionType(PARTNER_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.PartnerAssetAssignmentFilters>>()
)

const resetPartnerAssetAssignmentFilters = createAction(
    createActionType(PARTNER_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetPartnerAssetAssignmentState = createAction(
    createActionType(PARTNER_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS, 'Reset State')
)

const initialisePartnerAssetAssignmentState = createAction(
    createActionType(PARTNER_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectPartnerAssetAssignment = createAction(
    createActionType(PARTNER_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS, 'Select PartnerAssetAssignment'),
    props<{ partnerAssetAssignmentId: string }>()
)

const deselectPartnerAssetAssignment = createAction(
    createActionType(PARTNER_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS, 'Deselect PartnerAssetAssignment')
)

const resetPagination = createAction(
    createActionType(PARTNER_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const addAsset = createRemoteActionGroup<
    { partnerId: string, assetId: string, request: Model.CreateAssetAssignmentRequest },
    Model.PartnerAssetAssignmentResponse
>('Add Asset to Partner', ...PARTNER_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS)

const removeAsset = createRemoteActionGroup<
    { partnerId: string, assetId: string },
    { partnerAssetAssignmentId: string }
>('Remove Asset from Partner', ...PARTNER_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS)

const getPartnerAssetAssignment = createRemoteActionGroup<
    { partnerAssetAssignmentId: string },
    Model.PartnerAssetAssignmentResponse
>('Get PartnerAssetAssignment', ...PARTNER_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS)

const listPartnerAssetAssignments = createRemoteActionGroup<
    {
        parentId: Nullable<string> | 'auto'
        parentType: 'partner' | 'asset' | 'none'
        pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerAssetAssignmentResponse>>>
    },
    PaginatedResponse<Model.PartnerAssetAssignmentResponse>
>('List PartnerAssetAssignments', ...PARTNER_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS)

const updatePartnerAssetAssignment = createRemoteActionGroup<
    { partnerAssetAssignmentId: string, request: Model.UpdateAssetAssignmentRequest },
    Model.PartnerAssetAssignmentResponse
>('Update PartnerAssetAssignment', ...PARTNER_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS)

const deletePartnerAssetAssignment = createRemoteActionGroup<
    { partnerAssetAssignmentId: string, force: boolean },
    { partnerAssetAssignmentId: string }
>('Delete PartnerAssetAssignment', ...PARTNER_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS)

export const PartnerAssetAssignmentLocalActions = {
    updatePartnerAssetAssignmentFilters,
    resetPartnerAssetAssignmentFilters,
    resetPartnerAssetAssignmentState,
    initialisePartnerAssetAssignmentState,
    selectPartnerAssetAssignment,
    deselectPartnerAssetAssignment,
    resetPagination,
}

export const PartnerAssetAssignmentRemoteActions = createRemoteActionMap(
    PARTNER_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS,
    {
        add: addAsset,
        remove: removeAsset,
        get: getPartnerAssetAssignment,
        list: listPartnerAssetAssignments,
        update: updatePartnerAssetAssignment,
        delete: deletePartnerAssetAssignment,
    }
)
