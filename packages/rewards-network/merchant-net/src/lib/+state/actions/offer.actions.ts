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

const OFFER_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
    Identifiers.OFFER_STATE_FEATURE_KEY
]

const updateOfferFilters = createAction(
    createActionType(OFFER_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.OfferFilters>>()
)

const resetOfferFilters = createAction(
    createActionType(OFFER_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetOfferState = createAction(
    createActionType(OFFER_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseOfferState = createAction(
    createActionType(OFFER_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectOffer = createAction(
    createActionType(OFFER_ACTION_IDENTIFIERS, 'Select Offer'),
    props<{ offerId: string }>()
)

const deselectOffer = createAction(
    createActionType(OFFER_ACTION_IDENTIFIERS, 'Deselect Offer')
)

const resetPagination = createAction(
    createActionType(OFFER_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createOffer = createRemoteActionGroup<
    { brandId: Nullable<string>; merchantId: Nullable<string>; request: Model.CreateOfferRequest },
    Model.OfferResponse
>('Create Offer', ...OFFER_ACTION_IDENTIFIERS)

const getOffer = createRemoteActionGroup<
    { offerId: string },
    Model.OfferResponse
>('Get Offer', ...OFFER_ACTION_IDENTIFIERS)

const listOffers = createRemoteActionGroup<
    { brandId: Nullable<string> | 'auto'; merchantId: Nullable<string> | 'auto'; pagination: Nullable<Partial<PaginatedQueryParams<Model.OfferResponse>>> },
    PaginatedResponse<Model.OfferResponse>
>('List Offers', ...OFFER_ACTION_IDENTIFIERS)

const updateOffer = createRemoteActionGroup<
    { offerId: string; update: Model.UpdateOfferRequest },
    Model.OfferResponse
>('Update Offer', ...OFFER_ACTION_IDENTIFIERS)

const deleteOffer = createRemoteActionGroup<
    { offerId: string },
    { offerId: string }
>('Delete Offer', ...OFFER_ACTION_IDENTIFIERS)

export const OfferLocalActions = {
    updateOfferFilters,
    resetOfferFilters,
    resetOfferState,
    initialiseOfferState,
    selectOffer,
    deselectOffer,
    resetPagination
}

export const OfferRemoteActions = createRemoteActionCRUDMap(
    OFFER_ACTION_IDENTIFIERS,
    {
        create: createOffer,
        get: getOffer,
        list: listOffers,
        update: updateOffer,
        delete: deleteOffer
    }
)