import { Injectable, inject } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { EIM32712OccupationLocalActions, EIM32712OccupationRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'EIM32712OccupationFacade', options: { skipMethodDebugger: true } })
export class EIM32712OccupationFacade {
    private store = inject(Store)

    occupationFilters$ = this.store.pipe(select(Selectors.EIM32712OccupationSelectors.selectOccupationFilters))
    occupationIndustryFilters$ = this.store.pipe(select(Selectors.EIM32712OccupationSelectors.selectOccupationIndustryFilters))
    occupationIndustryFiltersInValue$ = this.store.pipe(select(Selectors.EIM32712OccupationSelectors.selectOccupationIndustryFiltersInValue))
    occupationRemotePagination$ = this.store.pipe(select(Selectors.EIM32712OccupationSelectors.selectOccupationRemotePagination))
    occupationRemoteState$ = this.store.pipe(select(Selectors.EIM32712OccupationSelectors.selectOccupationRemoteState))

    occupations$ = this.store.pipe(select(Selectors.EIM32712OccupationSelectors.selectAllOccupations))
    filteredOccupations$ = this.store.pipe(select(Selectors.EIM32712OccupationSelectors.selectFilteredOccupations))
    selectedOccupation$ = this.store.pipe(select(Selectors.EIM32712OccupationSelectors.selectedOccupation))
    selectOccupationById = (id: string) => this.store.pipe(select(Selectors.EIM32712OccupationSelectors.selectOccupationById(id)))

    createOccupation(request: Model.CreateEIM32712OccupationRequest) {
        this.store.dispatch(EIM32712OccupationRemoteActions.createEIM32712Occupation.request(request))
    }

    getOccupation(occupationId: string) {
        this.store.dispatch(EIM32712OccupationRemoteActions.getEIM32712Occupation.request({ occupationId }))
    }

    listOccupations(pagination: Nullable<Partial<PaginatedQueryParams<Model.EIM32712OccupationResponse>>> = null) {
        this.store.dispatch(EIM32712OccupationRemoteActions.listEIM32712Occupations.request({ pagination }))
    }

    updateOccupation(occupationId: string, request: Model.UpdateEIM32712OccupationRequest) {
        this.store.dispatch(EIM32712OccupationRemoteActions.updateEIM32712Occupation.request({ occupationId, request }))
    }

    deleteOccupation(occupationId: string) {
        this.store.dispatch(EIM32712OccupationRemoteActions.deleteEIM32712Occupation.request({ occupationId }))
    }

    updateFilters(filters: Partial<Model.EIM32712OccupationFilters>) {
        this.store.dispatch(EIM32712OccupationLocalActions.updateEIM32712OccupationFilters({ filters }))
    }

    resetFilters() {
        this.store.dispatch(EIM32712OccupationLocalActions.resetEIM32712OccupationFilters())
    }

    addIndustryInValue(industry: Model.EIM32712Industry) {
        this.store.dispatch(EIM32712OccupationLocalActions.addEIM327120OccupationFiltersIndustryInValue({ industry }))
    }

    removeIndustryInValue(industry: Model.EIM32712Industry) {
        this.store.dispatch(EIM32712OccupationLocalActions.removeEIM327120OccupationFiltersIndustryInValue({ industry }))
    }
}