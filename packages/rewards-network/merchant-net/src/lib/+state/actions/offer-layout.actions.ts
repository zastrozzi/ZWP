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
    createRemoteActionMap,
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const OFFER_LAYOUT_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
    Identifiers.OFFER_LAYOUT_STATE_FEATURE_KEY
]

const updateOfferLayoutFilters = createAction(
    createActionType(OFFER_LAYOUT_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.OfferLayoutFilters>>()
)

const resetOfferLayoutFilters = createAction(
    createActionType(OFFER_LAYOUT_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetOfferLayoutState = createAction(
    createActionType(OFFER_LAYOUT_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseOfferLayoutState = createAction(
    createActionType(OFFER_LAYOUT_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectOfferLayout = createAction(
    createActionType(OFFER_LAYOUT_ACTION_IDENTIFIERS, 'Select OfferLayout'),
    props<{ offerLayoutId: string }>()
)

const deselectOfferLayout = createAction(
    createActionType(OFFER_LAYOUT_ACTION_IDENTIFIERS, 'Deselect OfferLayout')
)

const resetPagination = createAction(
    createActionType(OFFER_LAYOUT_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createOfferLayout = createRemoteActionGroup<
    { offerId: string; request: Model.CreateOfferLayoutRequest },
    Model.OfferLayoutResponse
>('Create OfferLayout', ...OFFER_LAYOUT_ACTION_IDENTIFIERS)

const getOfferLayout = createRemoteActionGroup<
    { offerLayoutId: string },
    Model.OfferLayoutResponse
>('Get OfferLayout', ...OFFER_LAYOUT_ACTION_IDENTIFIERS)

const listOfferLayouts = createRemoteActionGroup<
    { offerId: Nullable<string> | 'auto'; pagination: Nullable<Partial<PaginatedQueryParams<Model.OfferLayoutResponse>>> },
    PaginatedResponse<Model.OfferLayoutResponse>
>('List OfferLayouts', ...OFFER_LAYOUT_ACTION_IDENTIFIERS)

const updateOfferLayout = createRemoteActionGroup<
    { offerLayoutId: string; update: Model.UpdateOfferLayoutRequest },
    Model.OfferLayoutResponse
>('Update OfferLayout', ...OFFER_LAYOUT_ACTION_IDENTIFIERS)

const deleteOfferLayout = createRemoteActionGroup<
    { offerLayoutId: string },
    { offerLayoutId: string }
>('Delete OfferLayout', ...OFFER_LAYOUT_ACTION_IDENTIFIERS)

export const OfferLayoutLocalActions = {
    updateOfferLayoutFilters,
    resetOfferLayoutFilters,
    resetOfferLayoutState,
    initialiseOfferLayoutState,
    selectOfferLayout,
    deselectOfferLayout,
    resetPagination
}

export const OfferLayoutRemoteActions = createRemoteActionCRUDMap(
    OFFER_LAYOUT_ACTION_IDENTIFIERS,
    {
        create: createOfferLayout,
        get: getOfferLayout,
        list: listOfferLayouts,
        update: updateOfferLayout,
        delete: deleteOfferLayout
    }
)