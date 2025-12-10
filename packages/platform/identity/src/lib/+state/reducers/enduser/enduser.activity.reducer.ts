import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { AuditEventFilters, AuditEventResponse, initialAuditEventFilters } from '@zwp/platform.common'
import {
    EnduserActivityLocalActions,
    EnduserActivityRemoteActions,
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

export interface EnduserActivityFeatureState extends BaseRemoteFeatureState {
    enduserActivities: EntityState<AuditEventResponse>
    selectedEnduserActivityId: Nullable<string>
    enduserActivitiesRemotePagination: RemotePaginationState<AuditEventResponse>
    filters: AuditEventFilters
}

export const enduserActivityEntityAdapter: EntityAdapter<AuditEventResponse> =
    createEntityAdapter<AuditEventResponse>()

export const initialEnduserActivityFeatureState: EnduserActivityFeatureState =
    {
        ...initialBaseRemoteFeatureState,
        enduserActivities: enduserActivityEntityAdapter.getInitialState(),
        selectedEnduserActivityId: null,
        enduserActivitiesRemotePagination: {
            limit: 30,
            offset: 0,
            order: 'desc',
            orderBy: 'dbCreatedAt',
            total: 0,
        },
        filters: initialAuditEventFilters
    }

export const enduserActivityReducer = createReducer(
    initialEnduserActivityFeatureState,
    on(
        EnduserActivityLocalActions.initialiseEnduserActivityState,
        () => initialEnduserActivityFeatureState
    ),
    on(
        EnduserActivityLocalActions.resetEnduserActivityState,
        () => initialEnduserActivityFeatureState
    ),
    on(
        EnduserActivityLocalActions.updateEnduserActivityFilters,
        (state, { filters }) => ({
            ...state,
            filters: { ...state.filters, filters },
        })
    ),
    on(
        EnduserActivityLocalActions.resetEnduserActivityFilters,
        (state) => ({
            ...state,
            filters: initialEnduserActivityFeatureState.filters,
        })
    ),

    on(
        remoteStateUpdateRequest(EnduserActivityRemoteActions.identifiers),
        (state) => remoteRequestState(state)
    ),
    on(
        remoteStateUpdateSuccess(EnduserActivityRemoteActions.identifiers),
        (state) => remoteSuccessState(state)
    ),
    on(
        remoteStateUpdateFailure(EnduserActivityRemoteActions.identifiers),
        (state, { error }) => remoteFailureState(state, error)
    ),

    on(
        EnduserActivityRemoteActions.listEnduserActivity.request,
        (state, { pagination }) => ({
            ...state,
            enduserActivitiesRemotePagination: {
                ...state.enduserActivitiesRemotePagination,
                ...pagination,
            },
        })
    ),

    on(
        EnduserActivityRemoteActions.listEnduserActivity.success,
        (state, { response }) => ({
            ...state,
            enduserActivities: enduserActivityEntityAdapter.setMany(
                response.results,
                state.enduserActivities
            ),
            enduserActivitiesRemotePagination: {
                ...state.enduserActivitiesRemotePagination,
                total: response.total,
            },
        })
    )
)
