import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../../model'
import { EnduserAddressLocalActions, EnduserAddressRemoteActions } from '../../actions'
import { BaseRemoteFeatureState, Nullable, RemotePaginationState, initialBaseRemoteFeatureState, remoteFailureState, remoteRequestState, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess, remoteSuccessState } from '@zwp/platform.common'

export interface EnduserAddressFeatureState extends BaseRemoteFeatureState {
    enduserAddresses: EntityState<Model.EnduserAddressResponse>,
    selectedEnduserAddressId: Nullable<string>,
    enduserAddressesRemotePagination: RemotePaginationState<Model.EnduserAddressResponse>,
    filters: Model.EnduserAddressFilters
}

export const enduserAddressEntityAdapter: EntityAdapter<Model.EnduserAddressResponse> = createEntityAdapter<Model.EnduserAddressResponse>()

export const initialEnduserAddressFeatureState: EnduserAddressFeatureState = {
    ...initialBaseRemoteFeatureState,
    enduserAddresses: enduserAddressEntityAdapter.getInitialState(),
    selectedEnduserAddressId: null,
    enduserAddressesRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: null,
        total: 0
    },
    filters: {
        enduserId: null
    }
}

export const enduserAddressReducer = createReducer(
    initialEnduserAddressFeatureState,
    on(EnduserAddressLocalActions.initialiseEnduserAddressState, () => initialEnduserAddressFeatureState),
    on(EnduserAddressLocalActions.resetEnduserAddressState, () => initialEnduserAddressFeatureState),
    on(EnduserAddressLocalActions.updateEnduserAddressFilters, (state, { filters }) => ({ ...state, filters: { ...state.filters, filters } })),
    on(EnduserAddressLocalActions.resetEnduserAddressFilters, (state) => ({ ...state, filters: initialEnduserAddressFeatureState.filters })),
    
    on(remoteStateUpdateRequest(EnduserAddressRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(EnduserAddressRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(EnduserAddressRemoteActions.identifiers), (state, { error }) => remoteFailureState(state, error)),
    on(
        EnduserAddressRemoteActions.createEnduserAddress.success,
        (state, { response }) => ({ 
            ...state, 
            enduserAddresses: enduserAddressEntityAdapter.setOne(response, state.enduserAddresses)
        })
    ),

    on(
        EnduserAddressRemoteActions.getEnduserAddress.success,
        (state, { response }) => ({ 
            ...state, 
            enduserAddresses: enduserAddressEntityAdapter.setOne(response, state.enduserAddresses),
            selectedEnduserAddressId: response.id
        })
    ),

    on(
        EnduserAddressRemoteActions.listEnduserAddresses.request,
        (state, { pagination }) => ({ 
            ...state, 
            enduserAddressesRemotePagination: { ...state.enduserAddressesRemotePagination, ...pagination }
        })
    ),

    on(
        EnduserAddressRemoteActions.listEnduserAddresses.success,
        (state, { response }) => ({ 
            ...state, 
            enduserAddresses: enduserAddressEntityAdapter.setAll(response.results, state.enduserAddresses),
            enduserAddressesRemotePagination: { ...state.enduserAddressesRemotePagination, total: response.total }
        })
    ),
    on(
        EnduserAddressRemoteActions.updateEnduserAddress.success,
        (state, { response }) => ({ 
            ...state, 
            enduserAddresses: enduserAddressEntityAdapter.updateOne({ id: response.id, changes: response }, state.enduserAddresses)
        })
    ),
    on(
        EnduserAddressRemoteActions.deleteEnduserAddress.success,
        (state, { response }) => ({ 
            ...state, 
            enduserAddresses: enduserAddressEntityAdapter.removeOne(response.enduserAddressId, state.enduserAddresses),
            selectedEnduserAddressId: state.selectedEnduserAddressId === response.enduserAddressId ? null : state.selectedEnduserAddressId
        })
    )
)