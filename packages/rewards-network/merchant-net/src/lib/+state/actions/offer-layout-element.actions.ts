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

const OFFER_LAYOUT_ELEMENT_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
    Identifiers.OFFER_LAYOUT_ELEMENT_STATE_FEATURE_KEY
]

const updateOfferLayoutElementFilters = createAction(
    createActionType(OFFER_LAYOUT_ELEMENT_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.OfferLayoutElementFilters>>()
)

const resetOfferLayoutElementFilters = createAction(
    createActionType(OFFER_LAYOUT_ELEMENT_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetOfferLayoutElementState = createAction(
    createActionType(OFFER_LAYOUT_ELEMENT_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseOfferLayoutElementState = createAction(
    createActionType(OFFER_LAYOUT_ELEMENT_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectOfferLayoutElement = createAction(
    createActionType(OFFER_LAYOUT_ELEMENT_ACTION_IDENTIFIERS, 'Select OfferLayoutElement'),
    props<{ offerLayoutElementId: string }>()
)

const deselectOfferLayoutElement = createAction(
    createActionType(OFFER_LAYOUT_ELEMENT_ACTION_IDENTIFIERS, 'Deselect OfferLayoutElement')
)

const resetPagination = createAction(
    createActionType(OFFER_LAYOUT_ELEMENT_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createOfferLayoutElement = createRemoteActionGroup<
    { offerLayoutId: string; request: Model.CreateOfferLayoutElementRequest },
    Model.OfferLayoutElementResponse
>('Create OfferLayoutElement', ...OFFER_LAYOUT_ELEMENT_ACTION_IDENTIFIERS)

const getOfferLayoutElement = createRemoteActionGroup<
    { offerLayoutElementId: string },
    Model.OfferLayoutElementResponse
>('Get OfferLayoutElement', ...OFFER_LAYOUT_ELEMENT_ACTION_IDENTIFIERS)

const listOfferLayoutElements = createRemoteActionGroup<
    { offerLayoutId: Nullable<string> | 'auto'; pagination: Nullable<Partial<PaginatedQueryParams<Model.OfferLayoutElementResponse>>> },
    PaginatedResponse<Model.OfferLayoutElementResponse>
>('List OfferLayoutElements', ...OFFER_LAYOUT_ELEMENT_ACTION_IDENTIFIERS)

const updateOfferLayoutElement = createRemoteActionGroup<
    { offerLayoutElementId: string; update: Model.UpdateOfferLayoutElementRequest },
    Model.OfferLayoutElementResponse
>('Update OfferLayoutElement', ...OFFER_LAYOUT_ELEMENT_ACTION_IDENTIFIERS)

const deleteOfferLayoutElement = createRemoteActionGroup<
    { offerLayoutElementId: string },
    { offerLayoutElementId: string }
>('Delete OfferLayoutElement', ...OFFER_LAYOUT_ELEMENT_ACTION_IDENTIFIERS)

export const OfferLayoutElementLocalActions = {
    updateOfferLayoutElementFilters,
    resetOfferLayoutElementFilters,
    resetOfferLayoutElementState,
    initialiseOfferLayoutElementState,
    selectOfferLayoutElement,
    deselectOfferLayoutElement,
    resetPagination
}

export const OfferLayoutElementRemoteActions = createRemoteActionCRUDMap(
    OFFER_LAYOUT_ELEMENT_ACTION_IDENTIFIERS,
    {
        create: createOfferLayoutElement,
        get: getOfferLayoutElement,
        list: listOfferLayoutElements,
        update: updateOfferLayoutElement,
        delete: deleteOfferLayoutElement
    }
)