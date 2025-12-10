import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../../model'
import { EnduserLocalActions, EnduserRemoteActions } from '../../actions'
import { BaseRemoteFeatureState, Nullable, RemotePaginationState, initialBaseRemoteFeatureState, remoteFailureState, remoteRequestState, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess, remoteSuccessState } from '@zwp/platform.common'

export interface EnduserFeatureState extends BaseRemoteFeatureState {
    endusers: EntityState<Model.EnduserResponse>,
    selectedEnduserId: Nullable<string>,
    endusersRemotePagination: RemotePaginationState<Model.EnduserResponse>,
    filters: Model.Filters.EnduserFilters,
    loggedInEnduser: Nullable<Model.EnduserResponse>
}

export const enduserEntityAdapter: EntityAdapter<Model.EnduserResponse> = createEntityAdapter<Model.EnduserResponse>()

export const initialEnduserFeatureState: EnduserFeatureState = {
    ...initialBaseRemoteFeatureState,
    endusers: enduserEntityAdapter.getInitialState(),
    selectedEnduserId: null,
    endusersRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: null,
        total: 0
    },
    filters: Model.Filters.initialEnduserFilters,
    loggedInEnduser: null
}

export const enduserReducer = createReducer(
    initialEnduserFeatureState,
    on(EnduserLocalActions.initialiseEnduserState, () => initialEnduserFeatureState),
    on(EnduserLocalActions.resetEnduserState, () => initialEnduserFeatureState),
    on(EnduserLocalActions.updateEnduserFilters, (state, { filters }) => ({ ...state, filters: { ...state.filters, filters } })),
    on(EnduserLocalActions.resetEnduserFilters, (state) => ({ ...state, filters: initialEnduserFeatureState.filters })),
    on(EnduserLocalActions.selectEnduser, (state, { enduserId }) => ({ ...state, selectedEnduserId: enduserId })),
    on(remoteStateUpdateRequest(EnduserRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(EnduserRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(EnduserRemoteActions.identifiers), (state, { error }) => remoteFailureState(state, error)),
    on(
        EnduserRemoteActions.createEnduser.success,
        (state, { response }) => ({ 
            ...state, 
            endusers: enduserEntityAdapter.setOne(response, state.endusers)
        })
    ),

    on(
        EnduserRemoteActions.getEnduser.success,
        (state, { response }) => ({ 
            ...state, 
            endusers: enduserEntityAdapter.setOne(response, state.endusers),
            selectedEnduserId: response.id
        })
    ),

    on(
        EnduserRemoteActions.listEndusers.request,
        (state, { pagination }) => ({ 
            ...state, 
            endusersRemotePagination: { ...state.endusersRemotePagination, ...pagination }
        })
    ),

    on(
        EnduserRemoteActions.listEndusers.success,
        (state, { response }) => ({ 
            ...state, 
            endusers: enduserEntityAdapter.setMany(response.results, state.endusers),
            endusersRemotePagination: {
                ...state.endusersRemotePagination,
                total: response.total
            }
        })
    ),
    on(
        EnduserRemoteActions.updateEnduser.success,
        (state, { response }) => ({ 
            ...state, 
            endusers: enduserEntityAdapter.updateOne({ id: response.id, changes: response }, state.endusers)
        })
    ),
    on(
        EnduserRemoteActions.deleteEnduser.success,
        (state, { response }) => ({ 
            ...state, 
            endusers: enduserEntityAdapter.removeOne(response.enduserId, state.endusers)
        })
    ),
    on(
        EnduserRemoteActions.loginEnduserEmailPassword.success,
        (state, { response }) => ({ 
            ...state, 
            endusers: enduserEntityAdapter.setOne(response.userData, state.endusers),
            loggedInEnduser: response.userData
        })
    ),
    on(
        EnduserRemoteActions.logoutEnduser.success,
        (state, { response }) => ({ 
            ...state, 
            endusers: enduserEntityAdapter.removeOne(response.enduserId, state.endusers),
            selectedEnduserId: state.selectedEnduserId === response.enduserId ? null : state.selectedEnduserId,
            loggedInEnduser: null
        })
    )
)