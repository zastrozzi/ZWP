import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../../model'
import { EnduserCredentialLocalActions, EnduserCredentialRemoteActions } from '../../actions'
import { BaseRemoteFeatureState, Nullable, RemotePaginationState, initialBaseRemoteFeatureState, remoteFailureState, remoteRequestState, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess, remoteSuccessState } from '@zwp/platform.common'

export interface EnduserCredentialFeatureState extends BaseRemoteFeatureState {
    enduserCredentials: EntityState<Model.EnduserCredentialResponse>,
    selectedEnduserCredentialId: Nullable<string>,
    enduserCredentialsRemotePagination: RemotePaginationState<Model.EnduserCredentialResponse>,
    filters: Model.EnduserCredentialFilters
}

export const enduserCredentialEntityAdapter: EntityAdapter<Model.EnduserCredentialResponse> = createEntityAdapter<Model.EnduserCredentialResponse>()

export const initialEnduserCredentialFeatureState: EnduserCredentialFeatureState = {
    ...initialBaseRemoteFeatureState,
    enduserCredentials: enduserCredentialEntityAdapter.getInitialState(),
    selectedEnduserCredentialId: null,
    enduserCredentialsRemotePagination: {
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

export const enduserCredentialReducer = createReducer(
    initialEnduserCredentialFeatureState,
    on(EnduserCredentialLocalActions.initialiseEnduserCredentialState, () => initialEnduserCredentialFeatureState),
    on(EnduserCredentialLocalActions.resetEnduserCredentialState, () => initialEnduserCredentialFeatureState),
    on(EnduserCredentialLocalActions.updateEnduserCredentialFilters, (state, { filters }) => ({ ...state, filters: { ...state.filters, filters } })),
    on(EnduserCredentialLocalActions.resetEnduserCredentialFilters, (state) => ({ ...state, filters: initialEnduserCredentialFeatureState.filters })),
    
    on(remoteStateUpdateRequest(EnduserCredentialRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(EnduserCredentialRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(EnduserCredentialRemoteActions.identifiers), (state, { error }) => remoteFailureState(state, error)),
    on(
        EnduserCredentialRemoteActions.createEnduserCredential.success,
        (state, { response }) => ({ 
            ...state, 
            enduserCredentials: enduserCredentialEntityAdapter.setOne(response, state.enduserCredentials)
        })
    ),

    on(
        EnduserCredentialRemoteActions.getEnduserCredential.success,
        (state, { response }) => ({ 
            ...state, 
            enduserCredentials: enduserCredentialEntityAdapter.setOne(response, state.enduserCredentials),
            selectedEnduserCredentialId: response.id
        })
    ),

    on(
        EnduserCredentialRemoteActions.listEnduserCredentials.request,
        (state, { pagination }) => ({ 
            ...state, 
            enduserCredentialsRemotePagination: { ...state.enduserCredentialsRemotePagination, ...pagination }
        })
    ),

    on(
        EnduserCredentialRemoteActions.listEnduserCredentials.success,
        (state, { response }) => ({ 
            ...state, 
            enduserCredentials: enduserCredentialEntityAdapter.setAll(response.results, state.enduserCredentials),
            enduserCredentialsRemotePagination: { ...state.enduserCredentialsRemotePagination, total: response.total }
        })
    ),

    on(
        EnduserCredentialRemoteActions.updateEnduserCredential.success,
        (state, { response }) => ({ 
            ...state, 
            enduserCredentials: enduserCredentialEntityAdapter.updateOne({ id: response.id, changes: response }, state.enduserCredentials)
        })
    ),

    on(
        EnduserCredentialRemoteActions.deleteEnduserCredential.success,
        (state, { response }) => ({ 
            ...state, 
            enduserCredentials: enduserCredentialEntityAdapter.removeOne(response.enduserCredentialId, state.enduserCredentials),
            selectedEnduserCredentialId: state.selectedEnduserCredentialId === response.enduserCredentialId ? null : state.selectedEnduserCredentialId
        })
    )
)