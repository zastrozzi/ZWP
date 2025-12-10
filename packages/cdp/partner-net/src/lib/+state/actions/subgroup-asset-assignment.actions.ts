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

const SUBGROUP_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS = [
    Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER,
    Identifiers.SUBGROUP_ASSET_ASSIGNMENT_STATE_FEATURE_KEY,
]

const updateSubgroupAssetAssignmentFilters = createAction(
    createActionType(SUBGROUP_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.SubgroupAssetAssignmentFilters>>()
)

const resetSubgroupAssetAssignmentFilters = createAction(
    createActionType(SUBGROUP_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetSubgroupAssetAssignmentState = createAction(
    createActionType(SUBGROUP_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseSubgroupAssetAssignmentState = createAction(
    createActionType(SUBGROUP_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectSubgroupAssetAssignment = createAction(
    createActionType(SUBGROUP_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS, 'Select SubgroupAssetAssignment'),
    props<{ subgroupAssetAssignmentId: string }>()
)

const deselectSubgroupAssetAssignment = createAction(
    createActionType(SUBGROUP_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS, 'Deselect SubgroupAssetAssignment')
)

const resetPagination = createAction(
    createActionType(SUBGROUP_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const addAsset = createRemoteActionGroup<
    { subgroupId: string, assetId: string, request: Model.CreateAssetAssignmentRequest },
    Model.SubgroupAssetAssignmentResponse
>('Add Asset to Subgroup', ...SUBGROUP_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS)

const removeAsset = createRemoteActionGroup<
    { subgroupId: string, assetId: string },
    { subgroupAssetAssignmentId: string }
>('Remove Asset from Subgroup', ...SUBGROUP_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS)

const getSubgroupAssetAssignment = createRemoteActionGroup<
    { subgroupAssetAssignmentId: string },
    Model.SubgroupAssetAssignmentResponse
>('Get SubgroupAssetAssignment', ...SUBGROUP_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS)

const listSubgroupAssetAssignments = createRemoteActionGroup<
    {
        parentId: Nullable<string> | 'auto'
        parentType: 'subgroup' | 'asset' | 'none'
        pagination: Nullable<Partial<PaginatedQueryParams<Model.SubgroupAssetAssignmentResponse>>>
    },
    PaginatedResponse<Model.SubgroupAssetAssignmentResponse>
>('List SubgroupAssetAssignments', ...SUBGROUP_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS)

const updateSubgroupAssetAssignment = createRemoteActionGroup<
    { subgroupAssetAssignmentId: string, request: Model.UpdateAssetAssignmentRequest },
    Model.SubgroupAssetAssignmentResponse
>('Update SubgroupAssetAssignment', ...SUBGROUP_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS)


const deleteSubgroupAssetAssignment = createRemoteActionGroup<
    { subgroupAssetAssignmentId: string, force: boolean },
    { subgroupAssetAssignmentId: string }
>('Delete SubgroupAssetAssignment', ...SUBGROUP_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS)

export const SubgroupAssetAssignmentLocalActions = {
    updateSubgroupAssetAssignmentFilters,
    resetSubgroupAssetAssignmentFilters,
    resetSubgroupAssetAssignmentState,
    initialiseSubgroupAssetAssignmentState,
    selectSubgroupAssetAssignment,
    deselectSubgroupAssetAssignment,
    resetPagination,
}

export const SubgroupAssetAssignmentRemoteActions = createRemoteActionMap(
    SUBGROUP_ASSET_ASSIGNMENT_ACTION_IDENTIFIERS,
    {
        add: addAsset,
        remove: removeAsset,
        get: getSubgroupAssetAssignment,
        list: listSubgroupAssetAssignments,
        update: updateSubgroupAssetAssignment,
        delete: deleteSubgroupAssetAssignment,
    }
)
