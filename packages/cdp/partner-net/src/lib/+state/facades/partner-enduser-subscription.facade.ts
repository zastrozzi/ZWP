import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { PartnerEnduserSubscriptionLocalActions, PartnerEnduserSubscriptionRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({
    serviceName: 'PartnerNetPartnerEnduserSubscriptionFacade',
    options: { skipMethodDebugger: true },
})
export class PartnerNetPartnerEnduserSubscriptionFacade {
    private store = inject(Store)

    partnerSubscriptionFilters$ = this.store.pipe(
        select(Selectors.PartnerEnduserSubscriptionSelectors.selectPartnerEnduserSubscriptionFilters)
    )
    partnerSubscriptionRemotePagination$ = this.store.pipe(
        select(Selectors.PartnerEnduserSubscriptionSelectors.selectPartnerEnduserSubscriptionRemotePagination)
    )
    partnerSubscriptionRemoteState$ = this.store.pipe(
        select(Selectors.PartnerEnduserSubscriptionSelectors.selectPartnerEnduserSubscriptionRemoteState)
    )

    partnerSubscriptions$ = this.store.pipe(
        select(Selectors.PartnerEnduserSubscriptionSelectors.selectAllPartnerEnduserSubscriptions)
    )
    paginatedFilteredEnduserSubscriptions$ = this.store.pipe(
        select(Selectors.PartnerEnduserSubscriptionSelectors.selectPaginatedFilteredPartnerEnduserSubscriptions)
    )
    partnerSubscriptionsForSelectedPartner$ = this.store.pipe(
        select(Selectors.PartnerEnduserSubscriptionSelectors.selectPartnerEnduserSubscriptionsForSelectedPartner)
    )
    partnerSubscriptionsForSelectedEnduser$ = this.store.pipe(
        select(Selectors.PartnerEnduserSubscriptionSelectors.selectPartnerEnduserSubscriptionsForSelectedEnduser)
    )
    selectedEnduserSubscription$ = this.store.pipe(
        select(Selectors.PartnerEnduserSubscriptionSelectors.selectedPartnerEnduserSubscription)
    )
    selectedEnduserSubscriptionId$ = this.store.pipe(
        select(Selectors.PartnerEnduserSubscriptionSelectors.selectSelectedPartnerEnduserSubscriptionId)
    )

    partnerSubscriptionById$ = (id: string) =>
        this.store.pipe(select(Selectors.PartnerEnduserSubscriptionSelectors.selectPartnerEnduserSubscriptionById(id)))
    partnerSubscriptionsForPartner$ = (partnerId: string) =>
        this.store.pipe(
            select(Selectors.PartnerEnduserSubscriptionSelectors.selectPartnerEnduserSubscriptionsForPartner(partnerId))
        )
    partnerSubscriptionsForEnduser$ = (enduserId: string) =>
        this.store.pipe(
            select(Selectors.PartnerEnduserSubscriptionSelectors.selectPartnerEnduserSubscriptionsForEnduser(enduserId))
        )

    addEnduserToPartner(enduserId: string, partnerId: string, request: Model.CreateSubscriptionRequest) {
        return this.store.dispatch(
            PartnerEnduserSubscriptionRemoteActions.add.request({ enduserId, partnerId, request })
        )
    }

    removeEnduserFromPartner(enduserId: string, partnerId: string) {
        return this.store.dispatch(PartnerEnduserSubscriptionRemoteActions.remove.request({ enduserId, partnerId }))
    }

    getPartnerSubscription(partnerSubscriptionId: string) {
        return this.store.dispatch(
            PartnerEnduserSubscriptionRemoteActions.get.request({ partnerEnduserSubscriptionId: partnerSubscriptionId })
        )
    }

    listPartnerSubscriptions(
        parentId: Nullable<string>,
        parentType: 'partner' | 'enduser' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.PartnerSubscriptionResponse>>> = null
    ) {
        return this.store.dispatch(
            PartnerEnduserSubscriptionRemoteActions.list.request({ parentId, parentType, pagination })
        )
    }

    updatePartnerSubscription(partnerSubscriptionId: string, update: Model.UpdateSubscriptionRequest) {
        return this.store.dispatch(
            PartnerEnduserSubscriptionRemoteActions.update.request({
                partnerEnduserSubscriptionId: partnerSubscriptionId,
                request: update,
            })
        )
    }

    deletePartnerSubscription(partnerSubscriptionId: string, force: boolean = false) {
        return this.store.dispatch(
            PartnerEnduserSubscriptionRemoteActions.delete.request({
                partnerEnduserSubscriptionId: partnerSubscriptionId,
                force,
            })
        )
    }

    selectPartnerSubscription(partnerSubscriptionId: string) {
        return this.store.dispatch(
            PartnerEnduserSubscriptionLocalActions.selectPartnerEnduserSubscription({
                partnerEnduserSubscriptionId: partnerSubscriptionId,
            })
        )
    }

    deselectPartnerSubscription() {
        return this.store.dispatch(PartnerEnduserSubscriptionLocalActions.deselectPartnerEnduserSubscription())
    }

    updatePartnerSubscriptionFilters(
        filters: Partial<Model.PartnerSubscriptionFilters>,
        triggerRemoteFetch: boolean = true
    ) {
        return this.store.dispatch(
            PartnerEnduserSubscriptionLocalActions.updatePartnerEnduserSubscriptionFilters({
                filters,
                triggerRemoteFetch,
            })
        )
    }

    resetPartnerSubscriptionFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(
            PartnerEnduserSubscriptionLocalActions.resetPartnerEnduserSubscriptionFilters({ triggerRemoteFetch })
        )
    }
}
