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

const PARTNER_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS = [
    Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER,
    Identifiers.PARTNER_ENDUSER_SUBSCRIPTION_STATE_FEATURE_KEY,
]

const updatePartnerEnduserSubscriptionFilters = createAction(
    createActionType(PARTNER_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.PartnerSubscriptionFilters>>()
)

const resetPartnerEnduserSubscriptionFilters = createAction(
    createActionType(PARTNER_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetPartnerEnduserSubscriptionState = createAction(
    createActionType(PARTNER_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS, 'Reset State')
)

const initialisePartnerEnduserSubscriptionState = createAction(
    createActionType(PARTNER_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectPartnerEnduserSubscription = createAction(
    createActionType(PARTNER_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS, 'Select PartnerEnduserSubscription'),
    props<{ partnerEnduserSubscriptionId: string }>()
)

const deselectPartnerEnduserSubscription = createAction(
    createActionType(PARTNER_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS, 'Deselect PartnerEnduserSubscription')
)

const resetPagination = createAction(
    createActionType(PARTNER_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const addEnduser = createRemoteActionGroup<
    { partnerId: string, enduserId: string, request: Model.CreateSubscriptionRequest },
    Model.PartnerSubscriptionResponse
>('Add Enduser to Partner', ...PARTNER_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS)

const removeEnduser = createRemoteActionGroup<
    { partnerId: string, enduserId: string },
    { partnerEnduserSubscriptionId: string }
>('Remove Enduser from Partner', ...PARTNER_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS)

const getPartnerEnduserSubscription = createRemoteActionGroup<
    { partnerEnduserSubscriptionId: string },
    Model.PartnerSubscriptionResponse
>('Get PartnerEnduserSubscription', ...PARTNER_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS)

const listPartnerEnduserSubscriptions = createRemoteActionGroup<
    {
        parentId: Nullable<string> | 'auto'
        parentType: 'partner' | 'enduser' | 'none'
        pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerSubscriptionResponse>>>
    },
    PaginatedResponse<Model.PartnerSubscriptionResponse>
>('List PartnerEnduserSubscriptions', ...PARTNER_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS)

const updatePartnerEnduserSubscription = createRemoteActionGroup<
    { partnerEnduserSubscriptionId: string, request: Model.UpdateSubscriptionRequest },
    Model.PartnerSubscriptionResponse
>('Update PartnerEnduserSubscription', ...PARTNER_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS)

const deletePartnerEnduserSubscription = createRemoteActionGroup<
    { partnerEnduserSubscriptionId: string, force: boolean },
    { partnerEnduserSubscriptionId: string }
>('Delete PartnerEnduserSubscription', ...PARTNER_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS)

export const PartnerEnduserSubscriptionLocalActions = {
    updatePartnerEnduserSubscriptionFilters,
    resetPartnerEnduserSubscriptionFilters,
    resetPartnerEnduserSubscriptionState,
    initialisePartnerEnduserSubscriptionState,
    selectPartnerEnduserSubscription,
    deselectPartnerEnduserSubscription,
    resetPagination,
}

export const PartnerEnduserSubscriptionRemoteActions = createRemoteActionMap(
    PARTNER_ENDUSER_SUBSCRIPTION_ACTION_IDENTIFIERS,
    {
        add: addEnduser,
        remove: removeEnduser,
        get: getPartnerEnduserSubscription,
        list: listPartnerEnduserSubscriptions,
        update: updatePartnerEnduserSubscription,
        delete: deletePartnerEnduserSubscription,
    }
)
