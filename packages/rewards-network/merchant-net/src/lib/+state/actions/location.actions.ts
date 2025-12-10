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

const LOCATION_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
    Identifiers.LOCATION_STATE_FEATURE_KEY
]

const updateLocationFilters = createAction(
    createActionType(LOCATION_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.LocationFilters>>()
)

const resetLocationFilters = createAction(
    createActionType(LOCATION_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetLocationState = createAction(
    createActionType(LOCATION_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseLocationState = createAction(
    createActionType(LOCATION_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectLocation = createAction(
    createActionType(LOCATION_ACTION_IDENTIFIERS, 'Select Location'),
    props<{ locationId: string }>()
)

const deselectLocation = createAction(
    createActionType(LOCATION_ACTION_IDENTIFIERS, 'Deselect Location')
)

const resetPagination = createAction(
    createActionType(LOCATION_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createLocation = createRemoteActionGroup<
    { brandId: Nullable<string>; merchantId: Nullable<string>; request: Model.CreateLocationRequest },
    Model.LocationResponse
>('Create Location', ...LOCATION_ACTION_IDENTIFIERS)

const getLocation = createRemoteActionGroup<
    { locationId: string },
    Model.LocationResponse
>('Get Location', ...LOCATION_ACTION_IDENTIFIERS)

const listLocations = createRemoteActionGroup<
    { brandId: Nullable<string> | 'auto'; merchantId: Nullable<string> | 'auto'; pagination: Nullable<Partial<PaginatedQueryParams<Model.LocationResponse>>> },
    PaginatedResponse<Model.LocationResponse>
>('List Locations', ...LOCATION_ACTION_IDENTIFIERS)

const updateLocation = createRemoteActionGroup<
    { locationId: string; update: Model.UpdateLocationRequest },
    Model.LocationResponse
>('Update Location', ...LOCATION_ACTION_IDENTIFIERS)

const deleteLocation = createRemoteActionGroup<
    { locationId: string },
    { locationId: string }
>('Delete Location', ...LOCATION_ACTION_IDENTIFIERS)

export const LocationLocalActions = {
    updateLocationFilters,
    resetLocationFilters,
    resetLocationState,
    initialiseLocationState,
    selectLocation,
    deselectLocation,
    resetPagination
}

export const LocationRemoteActions = createRemoteActionCRUDMap(
    LOCATION_ACTION_IDENTIFIERS,
    {
        create: createLocation,
        get: getLocation,
        list: listLocations,
        update: updateLocation,
        delete: deleteLocation
    }
)