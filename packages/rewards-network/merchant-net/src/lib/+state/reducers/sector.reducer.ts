import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { SectorLocalActions, SectorRemoteActions } from '../actions'
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

export interface SectorFeatureState extends BaseRemoteFeatureState {
    sectors: EntityState<Model.SectorResponse>
    selectedSectorId: Nullable<string>
    sectorsRemotePagination: RemotePaginationState<Model.SectorResponse>
    subsectorsRemotePagination: RemotePaginationState<Model.SectorResponse>
    filters: Model.Filters.SectorFilters
}

export const sectorEntityAdapter: EntityAdapter<Model.SectorResponse> =
    createEntityAdapter<Model.SectorResponse>()

export const initialSectorFeatureState: SectorFeatureState = {
    ...initialBaseRemoteFeatureState,
    sectors: sectorEntityAdapter.getInitialState(),
    selectedSectorId: null,
    sectorsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'name',
        total: 0,
    },
    subsectorsRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'name',
        total: 0,
    },
    filters: Model.Filters.initialSectorFilters
}

export const sectorReducer = createReducer(
    initialSectorFeatureState,
    on(SectorLocalActions.resetSectorState, () => initialSectorFeatureState),
    on(SectorLocalActions.initialiseSectorState, () => initialSectorFeatureState),
    on(SectorLocalActions.updateSectorFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(SectorLocalActions.resetSectorFilters, (state) => ({ ...state, filters: Model.Filters.initialSectorFilters })),
    on(SectorLocalActions.selectSector, (state, { sectorId }) => ({ ...state, selectedSectorId: sectorId })),
    on(SectorLocalActions.deselectSector, (state) => ({ ...state, selectedSectorId: null })),
    on(SectorLocalActions.resetPagination, (state) => ({
        ...state,
        sectorsRemotePagination: { ...state.sectorsRemotePagination, offset: 0 },
        subsectorsRemotePagination: { ...state.subsectorsRemotePagination, offset: 0 }
    })),
    on(remoteStateUpdateRequest(SectorRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(SectorRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(SectorRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(SectorRemoteActions.create.success, (state, { response }) => ({
        ...state,
        sectors: sectorEntityAdapter.setOne(response, state.sectors)
    })),
    on(SectorRemoteActions.get.success, (state, { response }) => ({
        ...state,
        sectors: sectorEntityAdapter.setOne(response, state.sectors),
        selectedSectorId: response.id
    })),
    on(SectorRemoteActions.list.request, (state, { pagination }) => ({
        ...state,
        sectorsRemotePagination: {
            ...state.sectorsRemotePagination,
            ...pagination
        }
    })),
    on(SectorRemoteActions.list.success, (state, { response }) => ({
        ...state,
        sectors: sectorEntityAdapter.setMany(response.results, state.sectors),
        sectorsRemotePagination: {
            ...state.sectorsRemotePagination,
            total: response.total,
        },
    })),
    on(SectorRemoteActions.listSubsectors.request, (state, { pagination }) => ({
            ...state,
            subsectorsRemotePagination: {
                ...state.subsectorsRemotePagination,
                ...pagination
            }
        })),
        on(SectorRemoteActions.listSubsectors.success, (state, { response }) => ({
            ...state,
            sectors: sectorEntityAdapter.setMany(response.results, state.sectors),
            subsectorsRemotePagination: {
                ...state.subsectorsRemotePagination,
                total: response.total,
            },
        })),
    on(SectorRemoteActions.update.success, (state, { response }) => ({
        ...state,
        sectors: sectorEntityAdapter.updateOne({ id: response.id, changes: response }, state.sectors)
    })),
    on(SectorRemoteActions.delete.success, (state, { sectorId }) => ({
        ...state,
        sectors: sectorEntityAdapter.removeOne(sectorId, state.sectors),
        selectedSectorId: state.selectedSectorId === sectorId ? null : state.selectedSectorId,
    }))
)