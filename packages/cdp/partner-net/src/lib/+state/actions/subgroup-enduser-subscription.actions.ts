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

const SUBGROUP_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS = [
    Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER,
    Identifiers.SUBGROUP_ENDUSER_SUBSCRIPTION_STATE_FEATURE_KEY,
]

const updateSubgroupEnduserSubscriptionFilters = createAction(
    createActionType(SUBGROUP_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.SubgroupSubscriptionFilters>>()
)

const resetSubgroupEnduserSubscriptionFilters = createAction(
    createActionType(SUBGROUP_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetSubgroupEnduserSubscriptionState = createAction(
    createActionType(SUBGROUP_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseSubgroupEnduserSubscriptionState = createAction(
    createActionType(SUBGROUP_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectSubgroupEnduserSubscription = createAction(
    createActionType(SUBGROUP_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS, 'Select SubgroupEnduserSubscription'),
    props<{ subgroupEnduserSubscriptionId: string }>()
)

const deselectSubgroupEnduserSubscription = createAction(
    createActionType(SUBGROUP_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS, 'Deselect SubgroupEnduserSubscription')
)

const resetPagination = createAction(
    createActionType(SUBGROUP_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const addEnduser = createRemoteActionGroup<
    { subgroupId: string, enduserId: string, request: Model.CreateSubscriptionRequest },
    Model.SubgroupSubscriptionResponse
>('Add Enduser to Subgroup', ...SUBGROUP_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS)

const removeEnduser = createRemoteActionGroup<
    { subgroupId: string, enduserId: string },
    { subgroupEnduserSubscriptionId: string }
>('Remove Enduser from Subgroup', ...SUBGROUP_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS)

const getSubgroupEnduserSubscription = createRemoteActionGroup<
    { subgroupEnduserSubscriptionId: string },
    Model.SubgroupSubscriptionResponse
>('Get SubgroupEnduserSubscription', ...SUBGROUP_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS)

const listSubgroupEnduserSubscriptions = createRemoteActionGroup<
    {
        parentId: Nullable<string> | 'auto'
        parentType: 'subgroup' | 'enduser' | 'none'
        pagination: Nullable<Partial<PaginatedQueryParams<Model.SubgroupSubscriptionResponse>>>
    },
    PaginatedResponse<Model.SubgroupSubscriptionResponse>
>('List SubgroupEnduserSubscriptions', ...SUBGROUP_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS)

const updateSubgroupEnduserSubscription = createRemoteActionGroup<
    { subgroupEnduserSubscriptionId: string, request: Model.UpdateSubscriptionRequest },
    Model.SubgroupSubscriptionResponse
>('Update SubgroupEnduserSubscription', ...SUBGROUP_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS)

const deleteSubgroupEnduserSubscription = createRemoteActionGroup<
    { subgroupEnduserSubscriptionId: string, force: boolean },
    { subgroupEnduserSubscriptionId: string }
>('Delete SubgroupEnduserSubscription', ...SUBGROUP_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS)

export const SubgroupEnduserSubscriptionLocalActions = {
    updateSubgroupEnduserSubscriptionFilters,
    resetSubgroupEnduserSubscriptionFilters,
    resetSubgroupEnduserSubscriptionState,
    initialiseSubgroupEnduserSubscriptionState,
    selectSubgroupEnduserSubscription,
    deselectSubgroupEnduserSubscription,
    resetPagination,
}

export const SubgroupEnduserSubscriptionRemoteActions = createRemoteActionMap(
    SUBGROUP_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS,
    {
        add: addEnduser,
        remove: removeEnduser,
        get: getSubgroupEnduserSubscription,
        list: listSubgroupEnduserSubscriptions,
        update: updateSubgroupEnduserSubscription,
        delete: deleteSubgroupEnduserSubscription,
    }
)
