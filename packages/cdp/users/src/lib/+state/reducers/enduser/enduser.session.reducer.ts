import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../../model'
import {
    EnduserSessionLocalActions,
    EnduserSessionRemoteActions,
} from '../../actions'
import {
    BaseRemoteFeatureState,
    Nullable,
    RemotePaginationState,
    initialBaseRemoteFeatureState,
    remoteFailureState,
    remoteRequestState,
    remoteStateUpdateFailure,
    remoteStateUpdateRequest,
    remoteStateUpdateSuccess,
    remoteSuccessState,
} from '@zwp/platform.common'

export interface EnduserSessionFeatureState extends BaseRemoteFeatureState {
    enduserSessions: EntityState<Model.EnduserSessionResponse>
    selectedEnduserSessionId: Nullable<string>
    enduserSessionsRemotePagination: RemotePaginationState<Model.EnduserSessionResponse>
    filters: Model.EnduserSessionFilters
}

export const enduserSessionEntityAdapter: EntityAdapter<Model.EnduserSessionResponse> =
    createEntityAdapter<Model.EnduserSessionResponse>()

export const initialEnduserSessionFeatureState: EnduserSessionFeatureState = {
    ...initialBaseRemoteFeatureState,
    enduserSessions: enduserSessionEntityAdapter.getInitialState(),
    selectedEnduserSessionId: null,
    enduserSessionsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: null,
        total: 0,
    },
    filters: {
        enduserId: null,
    },
}

export const enduserSessionReducer = createReducer(
    initialEnduserSessionFeatureState,
    on(
        EnduserSessionLocalActions.initialiseEnduserSessionState,
        () => initialEnduserSessionFeatureState
    ),
    on(
        EnduserSessionLocalActions.resetEnduserSessionState,
        () => initialEnduserSessionFeatureState
    ),
    on(
        EnduserSessionLocalActions.updateEnduserSessionFilters,
        (state, { filters }) => ({
            ...state,
            filters: {
                ...state.filters,
                ...filters,
            },
        })
    ),
    on(
        EnduserSessionLocalActions.resetEnduserSessionFilters,
        (state) => ({
            ...state,
            filters: initialEnduserSessionFeatureState.filters,
        })
    ),
    on(
        remoteStateUpdateRequest(EnduserSessionRemoteActions.identifiers),
        (state) => remoteRequestState(state)
    ),
    on(
        remoteStateUpdateSuccess(EnduserSessionRemoteActions.identifiers),
        (state) => remoteSuccessState(state)
    ),

    on(
        remoteStateUpdateFailure(EnduserSessionRemoteActions.identifiers),
        (state, { error }) => remoteFailureState(state, error)
    ),

    on(
        EnduserSessionRemoteActions.getEnduserSession.success,
        (state, { response }) => ({
            ...state,
            enduserSessions: enduserSessionEntityAdapter.setOne(
                response,
                state.enduserSessions
            ),
        })
    ),

    on(
        EnduserSessionRemoteActions.listEnduserSessions.request,
        (state, { pagination }) => ({
            ...state,
            enduserSessionsRemotePagination: {
                ...state.enduserSessionsRemotePagination,
                ...pagination,
            },
        })
    ),

    on(
        EnduserSessionRemoteActions.listEnduserSessions.success,
        (state, { response }) => ({
            ...state,
            enduserSessions: enduserSessionEntityAdapter.setAll(
                response.results,
                state.enduserSessions
            ),
            enduserSessionsRemotePagination: {
                ...state.enduserSessionsRemotePagination,
                total: response.total,
            },
        })
    ),

    on(
        EnduserSessionRemoteActions.invalidateEnduserSession.success,
        (state, { response }) => ({
            ...state,
            enduserSessions: enduserSessionEntityAdapter.updateOne(
                { id: response.id, changes: response },
                state.enduserSessions
            ),
        })
    )
)