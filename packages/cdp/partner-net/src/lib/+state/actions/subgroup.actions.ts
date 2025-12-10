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

const SUBGROUP_ACTION_IDENTIFIERS = [
    Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER,
    Identifiers.SUBGROUP_STATE_FEATURE_KEY,
]

const updateSubgroupFilters = createAction(
    createActionType(SUBGROUP_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.SubgroupFilters>>()
)

const resetSubgroupFilters = createAction(
    createActionType(SUBGROUP_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetSubgroupState = createAction(
    createActionType(SUBGROUP_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseSubgroupState = createAction(
    createActionType(SUBGROUP_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectSubgroup = createAction(
    createActionType(SUBGROUP_ACTION_IDENTIFIERS, 'Select Subgroup'),
    props<{ subgroupId: string }>()
)

const deselectSubgroup = createAction(
    createActionType(SUBGROUP_ACTION_IDENTIFIERS, 'Deselect Subgroup')
)

const resetPagination = createAction(
    createActionType(SUBGROUP_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createSubgroup = createRemoteActionGroup<
    { partnerId: string, request: Model.CreatePartnerSubgroupRequest },
    Model.SubgroupResponse
>('Create Subgroup', ...SUBGROUP_ACTION_IDENTIFIERS)

const getSubgroup = createRemoteActionGroup<
    { subgroupId: string },
    Model.SubgroupResponse
>('Get Subgroup', ...SUBGROUP_ACTION_IDENTIFIERS)

const listSubgroups = createRemoteActionGroup<
    {
        parentId: Nullable<string> | 'auto'
        parentType: 'partner' | 'asset' | 'enduser' | 'none'
        pagination: Nullable<Partial<PaginatedQueryParams<Model.SubgroupResponse>>>
    },
    PaginatedResponse<Model.SubgroupResponse>
>('List Subgroups', ...SUBGROUP_ACTION_IDENTIFIERS)

const updateSubgroup = createRemoteActionGroup<
    { subgroupId: string; update: Model.UpdatePartnerSubgroupRequest },
    Model.SubgroupResponse
>('Update Subgroup', ...SUBGROUP_ACTION_IDENTIFIERS)

const deleteSubgroup = createRemoteActionGroup<
    { subgroupId: string, force: boolean },
    { subgroupId: string }
>('Delete Subgroup', ...SUBGROUP_ACTION_IDENTIFIERS)

export const SubgroupLocalActions = {
    updateSubgroupFilters,
    resetSubgroupFilters,
    resetSubgroupState,
    initialiseSubgroupState,
    selectSubgroup,
    deselectSubgroup,
    resetPagination,
}

export const SubgroupRemoteActions = createRemoteActionCRUDMap(
    SUBGROUP_ACTION_IDENTIFIERS,
    {
        create: createSubgroup,
        get: getSubgroup,
        list: listSubgroups,
        update: updateSubgroup,
        delete: deleteSubgroup,
    }
)
