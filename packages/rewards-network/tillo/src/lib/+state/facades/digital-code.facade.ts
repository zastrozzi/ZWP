import { Injectable, inject } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { DigitalCodeLocalActions, DigitalCodeRemoteActions } from '../actions';
import { Selectors } from '../selectors';
import { Model } from '../../model';

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'TilloDigitalCodeFacade', options: { skipMethodDebugger: true } })
export class TilloDigitalCodeFacade {
    private store = inject(Store)

    digitalCodeFilters$ = this.store.pipe(select(Selectors.DigitalCodeSelectors.selectDigitalCodeFilters))
    digitalCodeRemotePagination$ = this.store.pipe(select(Selectors.DigitalCodeSelectors.selectDigitalCodeRemotePagination))
    digitalCodeRemoteState$ = this.store.pipe(select(Selectors.DigitalCodeSelectors.selectDigitalCodeRemoteState))

    digitalCodes$ = this.store.pipe(select(Selectors.DigitalCodeSelectors.selectAllDigitalCodes))
    selectedDigitalCode$ = this.store.pipe(select(Selectors.DigitalCodeSelectors.selectedDigitalCode))
    selectedDigitialCodeId$ = this.store.pipe(select(Selectors.DigitalCodeSelectors.selectSelectedDigitalCodeId))

    paginatedFilteredDigitalCodes$ = this.store.pipe(select(Selectors.DigitalCodeSelectors.selectPaginatedFilteredDigitalCodes))


    digitalCodeById$ = (id: string) => this.store.pipe(select(Selectors.DigitalCodeSelectors.selectDigitalCodeById(id)))

    orderDigitalCode(brandId: string, request: Model.OrderCodeRequest) {
        return this.store.dispatch(DigitalCodeRemoteActions.orderDigitalCode.request({ brandId, request }))
    }

    issueDigitalCode(brandId: string, request: Model.IssueCodeRequest) {
        return this.store.dispatch(DigitalCodeRemoteActions.issueDigitalCode.request({ brandId, request }))
    }

    getDigitalCode(digitalCodeId: string) {
        return this.store.dispatch(DigitalCodeRemoteActions.getDigitalCode.request({ digitalCodeId }))
    }

    listDigitalCode(
        digitalCodeId: Nullable<string> = null,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.DigitalGiftCodeResponse>>> = null
    ) {
        return this.store.dispatch(DigitalCodeRemoteActions.listDigitalCodes.request({digitalCodeId, pagination}))
    }

    selectDigitalCode(digitalCodeId: string) {
        return this.store.dispatch(DigitalCodeLocalActions.selectDigitalCode({ digitalCodeId }))
    }

    deselectDigitalCode() {
        return this.store.dispatch(DigitalCodeLocalActions.deselectDigitalCode())
    }

    topupDigitalCode(digitalCodeId: string) {
        return this.store.dispatch(DigitalCodeRemoteActions.topupDigitalCode.request({digitalCodeId}))
    }

    cancelDigitalCode(digitalCodeId: string) {
        return this.store.dispatch(DigitalCodeRemoteActions.cancelDigitalCode.request({digitalCodeId}))
    }

    cancelDigitalCodeURL(digitalCodeId: string) {
        return this.store.dispatch(DigitalCodeRemoteActions.cancelDigitalCodeURL.request({digitalCodeId}))
    }

    deleteDigitalCode(digitalCodeId: string) {
        return this.store.dispatch(DigitalCodeRemoteActions.deleteDigitalCode.request({digitalCodeId}))
    }

    updateDigitalCodeFilters(filters: Partial<Model.Filters.DigitalCodeFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(DigitalCodeLocalActions.updateDigitalCodeFilters({filters, triggerRemoteFetch}))
    }

    resetDigitalCodeFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(DigitalCodeLocalActions.resetDigitalCodeFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(DigitalCodeLocalActions.resetPagination())
    }
}