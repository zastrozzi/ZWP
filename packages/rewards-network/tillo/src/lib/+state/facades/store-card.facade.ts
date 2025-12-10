import { Injectable, inject } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { StoreCardLocalActions, StoreCardRemoteActions } from '../actions';
import { Selectors } from '../selectors';
import { Model } from '../../model';

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'TilloStoreCardFacade', options: { skipMethodDebugger: true }})
export class TilloStoreCardFacade {
    private store = inject(Store)

    storeCardFilters$ = this.store.pipe(select(Selectors.StoreCardSelectors.selectStoreCardFilters))
    storeCardRemotePagination$ = this.store.pipe(select(Selectors.StoreCardSelectors.selectStoreCardRemotePagination))
    storeCardRemoteState$ = this.store.pipe(select(Selectors.StoreCardSelectors.selectStoreCardRemoteState))

    storeCards$ = this.store.pipe(select(Selectors.StoreCardSelectors.selectAllStoreCards))

    paginatedFilteredStoreCards$ = this.store.pipe(select(Selectors.StoreCardSelectors.selectPaginatedFilteredStoreCards))

    selectedStoreCard$ = this.store.pipe(select(Selectors.StoreCardSelectors.selectedStoreCard))
    selectedStoreCardId$ = this.store.pipe(select(Selectors.StoreCardSelectors.selectSelectedStoreCardId))
    storeCardsForSelectedTilloBrand$ = this.store.pipe(select(Selectors.StoreCardSelectors.selectStoreCardsForSelectedTilloBrand))

    storeCardById$ = (id: string) => this.store.pipe(select(Selectors.StoreCardSelectors.selectStoreCardById(id)))

    getStoreCard(storeCardId: string) {
        return this.store.dispatch(StoreCardRemoteActions.getStoreCard.request({storeCardId}))
    }

    listStoreCards(brandId: Nullable<string> = null, enduserId: Nullable<string> = null, pagination: Nullable<Partial<PaginatedQueryParams<Model.StoreCardResponse>>> = null) {
        return this.store.dispatch(StoreCardRemoteActions.listStoreCards.request({brandId, enduserId, pagination }))
    }

    selectStoreCard(storeCardId: string) {
        return this.store.dispatch(StoreCardLocalActions.selectStoreCard({storeCardId}))
    }

    deselectStoreCard() {
        return this.store.dispatch(StoreCardLocalActions.deselectStoreCard())
    }

    deleteStoreCard(storeCardId: string) {
        return this.store.dispatch(StoreCardRemoteActions.deleteStoreCard.request({storeCardId}))
    }

    updateStoreCardFilters(filters: Partial<Model.Filters.StoreCardFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(StoreCardLocalActions.updateStoreCardFilters({filters, triggerRemoteFetch}))
    }

    resetStoreCardFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(StoreCardLocalActions.resetStoreCardFilters({triggerRemoteFetch}))
    }

    resetPagination() {
        return this.store.dispatch(StoreCardLocalActions.resetPagination())
    }
}