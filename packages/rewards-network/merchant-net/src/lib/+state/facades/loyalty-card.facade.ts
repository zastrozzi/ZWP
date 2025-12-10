import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import {
    LoyaltyCardLocalActions,
    LoyaltyCardRemoteActions,
    LoyaltyCardSchemeLocalActions,
    LoyaltyCardSchemeRemoteActions,
} from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'LoyaltyCardFacade', options: { skipMethodDebugger: true } })
export class LoyaltyCardFacade {
    private store = inject(Store)

    loyaltyCardFilters$ = this.store.pipe(select(Selectors.LoyaltyCardSelectors.selectLoyaltyCardFilters))
    loyaltyCardRemotePagination$ = this.store.pipe(
        select(Selectors.LoyaltyCardSelectors.selectLoyaltyCardRemotePagination)
    )
    loyaltyCardRemoteState$ = this.store.pipe(select(Selectors.LoyaltyCardSelectors.selectLoyaltyCardRemoteState))

    loyaltyCards$ = this.store.pipe(select(Selectors.LoyaltyCardSelectors.selectAllLoyaltyCards))
    selectedLoyaltyCard$ = this.store.pipe(select(Selectors.LoyaltyCardSelectors.selectedLoyaltyCard))
    selectedLoyaltyCardId$ = this.store.pipe(select(Selectors.LoyaltyCardSelectors.selectSelectedLoyaltyCardId))
    loyaltyCardsForSelectedBrand$ = this.store.pipe(
        select(Selectors.LoyaltyCardSelectors.selectLoyaltyCardsForSelectedBrand)
    )
    loyaltyCardsForSelectedEnduser$ = this.store.pipe(
        select(Selectors.LoyaltyCardSelectors.selectLoyaltyCardsForSelectedEnduser)
    )
    loyaltyCardsForSelectedMerchant$ = this.store.pipe(
        select(Selectors.LoyaltyCardSelectors.selectLoyaltyCardsForSelectedMerchant)
    )
    loyaltyCardsForSelectedLoyaltyCardScheme$ = this.store.pipe(
        select(Selectors.LoyaltyCardSelectors.selectLoyaltyCardsForSelectedLoyaltyCardScheme)
    )

    loyaltyCardById$ = (id: string) => this.store.pipe(select(Selectors.LoyaltyCardSelectors.selectLoyaltyCardById(id)))

    // LOYALTY CARD
    createLoyaltyCard(enduserId: string, request: Model.CreateLoyaltyCardRequest) {
        return this.store.dispatch(LoyaltyCardRemoteActions.create.request({ enduserId, request }))
    }

    getLoyaltyCard(loyaltyCardId: string) {
        return this.store.dispatch(LoyaltyCardRemoteActions.get.request({ loyaltyCardId }))
    }

    listLoyaltyCards(
        cardSchemeId: Nullable<string> = null,
        enduserId: Nullable<string> = null,
        brandId: Nullable<string> = null,
        merchantId: Nullable<string> = null,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardResponse>>> = null
    ) {
        return this.store.dispatch(
            LoyaltyCardRemoteActions.list.request({ parent: {
                cardSchemeId,
                enduserId,
                brandId,
                merchantId
            }, pagination })
        )
    }

    selectLoyaltyCard(loyaltyCardId: string) {
        return this.store.dispatch(LoyaltyCardLocalActions.selectLoyaltyCard({ loyaltyCardId }))
    }

    deselectLoyaltyCard() {
        return this.store.dispatch(LoyaltyCardLocalActions.deselectLoyaltyCard())
    }

    updateLoyaltyCard(loyaltyCardId: string, update: Model.UpdateLoyaltyCardRequest) {
        return this.store.dispatch(LoyaltyCardRemoteActions.update.request({ loyaltyCardId, update }))
    }

    deleteLoyaltyCard(loyaltyCardId: string, force: boolean = false) {
        return this.store.dispatch(LoyaltyCardRemoteActions.delete.request({ loyaltyCardId, force }))
    }

    updateLoyaltyCardFilters(filters: Partial<Model.Filters.LoyaltyCardFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(LoyaltyCardLocalActions.updateLoyaltyCardFilters({ filters, triggerRemoteFetch }))
    }

    resetLoyaltyCardFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(LoyaltyCardLocalActions.resetLoyaltyCardFilters({ triggerRemoteFetch }))
    }

    resetLoyaltyCardPagination() {
        return this.store.dispatch(LoyaltyCardLocalActions.resetPagination())
    }
}
