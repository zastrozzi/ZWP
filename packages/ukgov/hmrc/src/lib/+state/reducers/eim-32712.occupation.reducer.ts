import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { EIM32712OccupationLocalActions, EIM32712OccupationRemoteActions } from '../actions'
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

export interface EIM32712OccupationFeatureState extends BaseRemoteFeatureState {
    occupations: EntityState<Model.EIM32712OccupationResponse>
    selectedOccupationId: Nullable<string>
    occupationsRemotePagination: RemotePaginationState<Model.EIM32712OccupationResponse>
    filters: Model.EIM32712OccupationFilters
}

export const eim32712OccupationAdapter: EntityAdapter<Model.EIM32712OccupationResponse> = createEntityAdapter<Model.EIM32712OccupationResponse>()

export const initialEIM32712OccupationFeatureState: EIM32712OccupationFeatureState = {
    ...initialBaseRemoteFeatureState,
    occupations: eim32712OccupationAdapter.getInitialState(),
    selectedOccupationId: null,
    occupationsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'industry',
        total: 0
    },
    filters: {
        industry: null,
        name: null,
        deduction: null,
        dbCreatedAt: null,
        dbUpdatedAt: null,
        dbDeletedAt: null
    },
}

export const eim32712OccupationReducer = createReducer(
    initialEIM32712OccupationFeatureState,
    on(EIM32712OccupationLocalActions.updateEIM32712OccupationFilters, (state, { filters }) => {
        return {
            ...state,
            filters: {
                ...{
                    industry: state.filters.industry,
                    name: null,
                    deduction: null,
                    dbCreatedAt: null,
                    dbUpdatedAt: null,
                    dbDeletedAt: null
                },
                ...filters
            }
        }
    }),
    on(EIM32712OccupationLocalActions.addEIM327120OccupationFiltersIndustryInValue, (state, { industry }) => {
        return {
            ...state,
            filters: {
                ...state.filters,
                industry: {
                    ...{ in: null, all: null, notIn: null, equalTo: null },
                    ...state.filters.industry,
                    in: [
                        ...(state.filters.industry?.in || []),
                        industry
                    ]
                }
            }
        }
    }),
    on(EIM32712OccupationLocalActions.removeEIM327120OccupationFiltersIndustryInValue, (state, { industry }) => {
        const newInValues = (state.filters.industry?.in || []).filter((i) => i !== industry)
        return {
            ...state,
            filters: {
                ...state.filters,
                industry: {
                    ...{ in: null, all: null, notIn: null, equalTo: null },
                    ...state.filters.industry,
                    in: newInValues.length === 0 ? null : newInValues
                }
            }
        }
    }),
    on(EIM32712OccupationLocalActions.resetEIM32712OccupationFilters, state => {
        return {
            ...state,
            filters: initialEIM32712OccupationFeatureState.filters
        }
    }),
    on(EIM32712OccupationLocalActions.resetEIM32712OccupationState, state => {
        return {
            ...state,
            ...initialEIM32712OccupationFeatureState
        }
    }),
    on(
        EIM32712OccupationLocalActions.initialiseEIM32712OccupationState, 
        () => initialEIM32712OccupationFeatureState
    ),
    on(EIM32712OccupationLocalActions.selectEIM32712Occupation, (state, { id }) => {
        return {
            ...state,
            selectedOccupationId: id
        }
    }),
    on(
        remoteStateUpdateRequest(EIM32712OccupationRemoteActions.identifiers),
        (state) => remoteRequestState(state)
    ),
    on(
        remoteStateUpdateSuccess(EIM32712OccupationRemoteActions.identifiers),
        (state) => remoteSuccessState(state)
    ),
    on(
        remoteStateUpdateFailure(EIM32712OccupationRemoteActions.identifiers),
        (state, { error }) => remoteFailureState(state, error)
    ),
    on(
        EIM32712OccupationRemoteActions.createEIM32712Occupation.success,
        (state, { response }) => ({
            ...state,
            occupations: eim32712OccupationAdapter.setOne(response, state.occupations),
            occupationsRemotePagination: {
                ...state.occupationsRemotePagination,
                total: state.occupationsRemotePagination.total + 1
            }
        })
    ),
    on(
        EIM32712OccupationRemoteActions.getEIM32712Occupation.success,
        (state, { response }) => ({
            ...state,
            occupations: eim32712OccupationAdapter.setOne(response, state.occupations)
        })
    ),
    on(
        EIM32712OccupationRemoteActions.listEIM32712Occupations.success,
        (state, { response }) => ({
            ...state,
            occupations: eim32712OccupationAdapter.setAll(response.results, state.occupations),
            occupationsRemotePagination: {
                ...state.occupationsRemotePagination,
                total: response.total
            }
        })
    ),
    on(
        EIM32712OccupationRemoteActions.updateEIM32712Occupation.success,
        (state, { response }) => ({
            ...state,
            occupations: eim32712OccupationAdapter.setOne(response, state.occupations)
        })
    ),
    on(
        EIM32712OccupationRemoteActions.deleteEIM32712Occupation.success,
        (state, { response }) => ({
            ...state,
            occupations: eim32712OccupationAdapter.removeOne(response.occupationId, state.occupations)
        })
    )
)
