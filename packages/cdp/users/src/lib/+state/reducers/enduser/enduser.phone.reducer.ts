import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../../model'
import { EnduserPhoneLocalActions, EnduserPhoneRemoteActions } from '../../actions'
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

export interface EnduserPhoneFeatureState extends BaseRemoteFeatureState {
    enduserPhones: EntityState<Model.EnduserPhoneResponse>,
    selectedEnduserPhoneId: Nullable<string>,
    enduserPhonesRemotePagination: RemotePaginationState<Model.EnduserPhoneResponse>,
    filters: Model.EnduserPhoneFilters
}

export const enduserPhoneEntityAdapter: EntityAdapter<Model.EnduserPhoneResponse> = createEntityAdapter<Model.EnduserPhoneResponse>()

export const initialEnduserPhoneFeatureState: EnduserPhoneFeatureState = {
    ...initialBaseRemoteFeatureState,
    enduserPhones: enduserPhoneEntityAdapter.getInitialState(),
    selectedEnduserPhoneId: null,
    enduserPhonesRemotePagination: {
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

export const enduserPhoneReducer = createReducer(
    initialEnduserPhoneFeatureState,
    on(EnduserPhoneLocalActions.initialiseEnduserPhoneState, () => initialEnduserPhoneFeatureState),
    on(EnduserPhoneLocalActions.resetEnduserPhoneState, () => initialEnduserPhoneFeatureState),
    on(EnduserPhoneLocalActions.updateEnduserPhoneFilters, (state, { filters }) => ({ ...state, filters: { ...state.filters, filters } })),
    on(EnduserPhoneLocalActions.resetEnduserPhoneFilters, (state) => ({ ...state, filters: initialEnduserPhoneFeatureState.filters })),
    on(remoteStateUpdateRequest(EnduserPhoneRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(EnduserPhoneRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(EnduserPhoneRemoteActions.identifiers), (state, { error }) => remoteFailureState(state, error)),
    on(
        EnduserPhoneRemoteActions.createEnduserPhone.success,
        (state, { response }) => ({ 
            ...state,
            enduserPhones: enduserPhoneEntityAdapter.setOne(response, state.enduserPhones)
        })
    ),

    on(
        EnduserPhoneRemoteActions.getEnduserPhone.success,
        (state, { response }) => ({ 
            ...state,
            enduserPhones: enduserPhoneEntityAdapter.setOne(response, state.enduserPhones),
            selectedEnduserPhoneId: response.id
        })
    ),

    on(
        EnduserPhoneRemoteActions.listEnduserPhones.request,
        (state, { pagination }) => ({ 
            ...state,
            enduserPhonesRemotePagination: { ...state.enduserPhonesRemotePagination, ...pagination }
        })
    ),

    on(
        EnduserPhoneRemoteActions.listEnduserPhones.success,
        (state, { response }) => ({ 
            ...state,
            enduserPhones: enduserPhoneEntityAdapter.setAll(response.results, state.enduserPhones),
            enduserPhonesRemotePagination: { ...state.enduserPhonesRemotePagination, total: response.total }
        })
    ),

    on(
        EnduserPhoneRemoteActions.updateEnduserPhone.success,
        (state, { response }) => ({ 
            ...state,
            enduserPhones: enduserPhoneEntityAdapter.updateOne({ id: response.id, changes: response }, state.enduserPhones)
        })
    ),

    on(
        EnduserPhoneRemoteActions.deleteEnduserPhone.success,
        (state, { response }) => ({ 
            ...state,
            enduserPhones: enduserPhoneEntityAdapter.removeOne(response.enduserPhoneId, state.enduserPhones),
            selectedEnduserPhoneId: state.selectedEnduserPhoneId === response.enduserPhoneId ? null : state.selectedEnduserPhoneId
        })
    )
)