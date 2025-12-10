import { Model } from '../../../model'
import { createAction, props } from '@ngrx/store'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    createActionType,
    createRemoteActionGroup,
    createRemoteActionMap,
} from '@zwp/platform.common'
import { Identifiers } from '../../identifiers'

const ENDUSER_ADDRESS_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
    Identifiers.ENDUSER_ADDRESS_STATE_FEATURE_KEY,
]

const updateEnduserAddressFilters = createAction(
    createActionType(ENDUSER_ADDRESS_ACTION_IDENTIFIERS, 'Update Filters'),
    props<{ filters: Partial<Model.Filters.EnduserAddressFilters> }>()
)
const resetEnduserAddressFilters = createAction(
    createActionType(ENDUSER_ADDRESS_ACTION_IDENTIFIERS, 'Reset Filters')
)
const resetEnduserAddressState = createAction(
    createActionType(ENDUSER_ADDRESS_ACTION_IDENTIFIERS, 'Reset State')
)
const initialiseEnduserAddressState = createAction(
    createActionType(ENDUSER_ADDRESS_ACTION_IDENTIFIERS, 'Initialise State')
)

const createEnduserAddress = createRemoteActionGroup<
    { enduserId: string; request: Model.CreateEnduserAddressRequest },
    Model.EnduserAddressResponse
>('Create Enduser Address', ...ENDUSER_ADDRESS_ACTION_IDENTIFIERS)

const getEnduserAddress = createRemoteActionGroup<
    { enduserAddressId: string },
    Model.EnduserAddressResponse
>('Get Enduser Address', ...ENDUSER_ADDRESS_ACTION_IDENTIFIERS)

const listEnduserAddresses = createRemoteActionGroup<
    {
        enduserId: Nullable<string>
        pagination: Nullable<Partial<PaginatedQueryParams<Model.EnduserAddressResponse>>>
    },
    PaginatedResponse<Model.EnduserAddressResponse>
>('List Enduser Addresses', ...ENDUSER_ADDRESS_ACTION_IDENTIFIERS)

const updateEnduserAddress = createRemoteActionGroup<
    { enduserAddressId: string; update: Model.UpdateEnduserAddressRequest },
    Model.EnduserAddressResponse
>('Update Enduser Address', ...ENDUSER_ADDRESS_ACTION_IDENTIFIERS)

const deleteEnduserAddress = createRemoteActionGroup<
    { enduserAddressId: string },
    { enduserAddressId: string }
>('Delete Enduser Address', ...ENDUSER_ADDRESS_ACTION_IDENTIFIERS)

export const EnduserAddressLocalActions = {
    updateEnduserAddressFilters,
    resetEnduserAddressFilters,
    resetEnduserAddressState,
    initialiseEnduserAddressState,
}

export const EnduserAddressRemoteActions = createRemoteActionMap(
    ENDUSER_ADDRESS_ACTION_IDENTIFIERS,
    {
        createEnduserAddress,
        getEnduserAddress,
        listEnduserAddresses,
        updateEnduserAddress,
        deleteEnduserAddress,
    }
)
