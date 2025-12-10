import { inject, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from "@zwp/platform.common";
import { SectorLocalActions, SectorRemoteActions } from '../actions';
import { Selectors } from '../selectors'
import { Model } from "../../model";

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'AWinSectorFacade', options: { skipMethodDebugger: true } })
export class AWinSectorFacade {
    private store = inject(Store)
    
    sectorFilters$ = this.store.pipe(select(Selectors.SectorSelectors.selectSectorFilters))
    sectorRemotePagination$ = this.store.pipe(select(Selectors.SectorSelectors.selectSectorRemotePagination))
    subsectorRemotePagination$ = this.store.pipe(select(Selectors.SectorSelectors.selectSubsectorRemotePagination))
    sectorRemoteState$ = this.store.pipe(select(Selectors.SectorSelectors.selectSectorRemoteState))

    sectors$ = this.store.pipe(select(Selectors.SectorSelectors.selectAllSectors))
    topLevelSectors$ = this.store.pipe(select(Selectors.SectorSelectors.selectTopLevelSectors))
    paginatedFilteredSectors$ = this.store.pipe(select(Selectors.SectorSelectors.selectPaginatedFilteredSectors))
    topLevelFilteredSectors$ = this.store.pipe(select(Selectors.SectorSelectors.selectTopLevelFilteredSectors))
    topLevelPaginatedFilteredSectors$ = this.store.pipe(select(Selectors.SectorSelectors.selectTopLevelPaginatedFilteredSectors))
    topLevelPaginatedFilteredSectorsWithSubsectorsNested$ = this.store.pipe(select(Selectors.SectorSelectors.selectTopLevelPaginatedFilteredSectorsWithSubsectorsNested))
    selectedSector$ = this.store.pipe(select(Selectors.SectorSelectors.selectedSector))
    selectedSectorId$ = this.store.pipe(select(Selectors.SectorSelectors.selectSelectedSectorId))

    sectorById$ = (id: string) => this.store.pipe(select(Selectors.SectorSelectors.selectSectorById(id)))
    subsectorsForSector$ = (sectorId: string) => this.store.pipe(select(Selectors.SectorSelectors.selectSubsectorsForSector(sectorId)))
    subsectorsForSectorNested$ = (sectorId: string) => this.store.pipe(select(Selectors.SectorSelectors.selectSubsectorsForSectorNested(sectorId)))
    
    createSector(parentId: Nullable<string>, request: Model.CreateSectorRequest) {
        return this.store.dispatch(SectorRemoteActions.create.request({ parentId, request }))
    }

    getSector(sectorId: string) {
        return this.store.dispatch(SectorRemoteActions.get.request({ sectorId }))
    }

    listSectors(
        parent: {
            sectorId: Nullable<string>,
            brandId: Nullable<string>,
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.SectorResponse>>> = null
    ) {
        return this.store.dispatch(SectorRemoteActions.list.request({ parent: parent, pagination: pagination }))
    }

    listSubsectors(
        sectorId: string,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.SectorResponse>>> = null
    ) {
        return this.store.dispatch(SectorRemoteActions.listSubsectors.request({ sectorId, pagination: pagination }))
    }

    selectSector(sectorId: string) {
        return this.store.dispatch(SectorLocalActions.selectSector({ sectorId }))
    }

    deselectSector() {
        return this.store.dispatch(SectorLocalActions.deselectSector())
    }

    updateSector(sectorId: string, update: Model.UpdateSectorRequest) {
        return this.store.dispatch(SectorRemoteActions.update.request({ sectorId, update }))
    }

    deleteSector(sectorId: string) {
        return this.store.dispatch(SectorRemoteActions.delete.request({ sectorId }))
    }

    updateSectorFilters(filters: Partial<Model.Filters.SectorFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(SectorLocalActions.updateSectorFilters({ filters, triggerRemoteFetch }))
    }

    resetSectorFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(SectorLocalActions.resetSectorFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(SectorLocalActions.resetPagination())
    }
}