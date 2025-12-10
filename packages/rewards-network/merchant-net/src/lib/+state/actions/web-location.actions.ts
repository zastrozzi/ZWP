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

const WEB_LOCATION_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
    Identifiers.WEB_LOCATION_STATE_FEATURE_KEY
]

const updateWebLocationFilters = createAction(
    createActionType(WEB_LOCATION_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.WebLocationFilters>>()
)

const resetWebLocationFilters = createAction(
    createActionType(WEB_LOCATION_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetWebLocationState = createAction(
    createActionType(WEB_LOCATION_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseWebLocationState = createAction(
    createActionType(WEB_LOCATION_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectWebLocation = createAction(
    createActionType(WEB_LOCATION_ACTION_IDENTIFIERS, 'Select Web Location'),
    props<{ webLocationId: string }>()
)

const deselectWebLocation = createAction(
    createActionType(WEB_LOCATION_ACTION_IDENTIFIERS, 'Deselect Web Location')
)

const resetPagination = createAction(
    createActionType(WEB_LOCATION_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createWebLocation = createRemoteActionGroup<
    { brandId: Nullable<string>; merchantId: Nullable<string>; request: Model.CreateWebLocationRequest },
    Model.WebLocationResponse
>('Create Web Location', ...WEB_LOCATION_ACTION_IDENTIFIERS)

const getWebLocation = createRemoteActionGroup<
    { webLocationId: string },
    Model.WebLocationResponse
>('Get Web Location', ...WEB_LOCATION_ACTION_IDENTIFIERS)

const listWebLocations = createRemoteActionGroup<
    { brandId: Nullable<string> | 'auto'; merchantId: Nullable<string> | 'auto'; pagination: Nullable<Partial<PaginatedQueryParams<Model.WebLocationResponse>>> },
    PaginatedResponse<Model.WebLocationResponse>
>('List Web Locations', ...WEB_LOCATION_ACTION_IDENTIFIERS)

const updateWebLocation = createRemoteActionGroup<
    { webLocationId: string; update: Model.UpdateWebLocationRequest },
    Model.WebLocationResponse
>('Update Web Location', ...WEB_LOCATION_ACTION_IDENTIFIERS)

const deleteWebLocation = createRemoteActionGroup<
    { webLocationId: string },
    { webLocationId: string }
>('Delete Web Location', ...WEB_LOCATION_ACTION_IDENTIFIERS)

export const WebLocationLocalActions = {
    updateWebLocationFilters,
    resetWebLocationFilters,
    resetWebLocationState,
    initialiseWebLocationState,
    selectWebLocation,
    deselectWebLocation,
    resetPagination
}

export const WebLocationRemoteActions = createRemoteActionCRUDMap(
    WEB_LOCATION_ACTION_IDENTIFIERS,
    {
        create: createWebLocation,
        get: getWebLocation,
        list: listWebLocations,
        update: updateWebLocation,
        delete: deleteWebLocation
    }
)