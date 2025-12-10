import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../../model'
import { EnduserEmailLocalActions, EnduserEmailRemoteActions } from '../../actions'
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
    remoteSuccessState 
} from '@zwp/platform.common'

export interface EnduserEmailFeatureState extends BaseRemoteFeatureState {
    enduserEmails: EntityState<Model.EnduserEmailResponse>,
    selectedEnduserEmailId: Nullable<string>,
    enduserEmailsRemotePagination: RemotePaginationState<Model.EnduserEmailResponse>,
    filters: Model.EnduserEmailFilters
}

export const enduserEmailEntityAdapter: EntityAdapter<Model.EnduserEmailResponse> = createEntityAdapter<Model.EnduserEmailResponse>()

export const initialEnduserEmailFeatureState: EnduserEmailFeatureState = {
    ...initialBaseRemoteFeatureState,
    enduserEmails: enduserEmailEntityAdapter.getInitialState(),
    selectedEnduserEmailId: null,
    enduserEmailsRemotePagination: {
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

export const enduserEmailReducer = createReducer(
    initialEnduserEmailFeatureState,
    on(EnduserEmailLocalActions.initialiseEnduserEmailState, () => initialEnduserEmailFeatureState),
    on(EnduserEmailLocalActions.resetEnduserEmailState, () => initialEnduserEmailFeatureState),
    on(EnduserEmailLocalActions.updateEnduserEmailFilters, (state, { filters }) => ({ ...state, filters: { ...state.filters, filters } })),
    on(EnduserEmailLocalActions.resetEnduserEmailFilters, (state) => ({ ...state, filters: initialEnduserEmailFeatureState.filters })),
    on(remoteStateUpdateRequest(EnduserEmailRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(EnduserEmailRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(EnduserEmailRemoteActions.identifiers), (state, { error }) => remoteFailureState(state, error)),
    on(
        EnduserEmailRemoteActions.createEnduserEmail.success,
        (state, { response }) => ({ 
            ...state,
            enduserEmails: enduserEmailEntityAdapter.setOne(response, state.enduserEmails)
        })
    ),

    on(
        EnduserEmailRemoteActions.getEnduserEmail.success,
        (state, { response }) => ({ 
            ...state,
            enduserEmails: enduserEmailEntityAdapter.setOne(response, state.enduserEmails),
            selectedEnduserEmailId: response.id
        })
    ),

    on(
        EnduserEmailRemoteActions.listEnduserEmails.request,
        (state, { pagination }) => ({ 
            ...state,
            enduserEmailsRemotePagination: { ...state.enduserEmailsRemotePagination, ...pagination }
        })
    ),

    on(
        EnduserEmailRemoteActions.listEnduserEmails.success,
        (state, { response }) => ({ 
            ...state,
            enduserEmails: enduserEmailEntityAdapter.setAll(response.results, state.enduserEmails),
            enduserEmailsRemotePagination: { ...state.enduserEmailsRemotePagination, total: response.total }
        })
    ),

    on(
        EnduserEmailRemoteActions.updateEnduserEmail.success,
        (state, { response }) => ({ 
            ...state,
            enduserEmails: enduserEmailEntityAdapter.updateOne({ id: response.id, changes: response }, state.enduserEmails)
        })
    ),

    on(
        EnduserEmailRemoteActions.deleteEnduserEmail.success,
        (state, { response }) => ({ 
            ...state,
            enduserEmails: enduserEmailEntityAdapter.removeOne(response.enduserEmailId, state.enduserEmails),
            selectedEnduserEmailId: state.selectedEnduserEmailId === response.enduserEmailId ? null : state.selectedEnduserEmailId
        })
    )
)