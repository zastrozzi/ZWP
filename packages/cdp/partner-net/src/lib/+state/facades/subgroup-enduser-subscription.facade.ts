import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { SubgroupEnduserSubscriptionLocalActions, SubgroupEnduserSubscriptionRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({
    serviceName: 'PartnerNetSubgroupEnduserSubscriptionFacade',
    options: { skipMethodDebugger: true },
})
export class PartnerNetSubgroupEnduserSubscriptionFacade {
    private store = inject(Store)

    subgroupSubscriptionFilters$ = this.store.pipe(
        select(Selectors.SubgroupEnduserSubscriptionSelectors.selectSubgroupEnduserSubscriptionFilters)
    )
    subgroupSubscriptionRemotePagination$ = this.store.pipe(
        select(Selectors.SubgroupEnduserSubscriptionSelectors.selectSubgroupEnduserSubscriptionRemotePagination)
    )
    subgroupSubscriptionRemoteState$ = this.store.pipe(
        select(Selectors.SubgroupEnduserSubscriptionSelectors.selectSubgroupEnduserSubscriptionRemoteState)
    )

    subgroupSubscriptions$ = this.store.pipe(
        select(Selectors.SubgroupEnduserSubscriptionSelectors.selectAllSubgroupEnduserSubscriptions)
    )
    paginatedFilteredEnduserSubscriptions$ = this.store.pipe(
        select(Selectors.SubgroupEnduserSubscriptionSelectors.selectPaginatedFilteredSubgroupEnduserSubscriptions)
    )
    subgroupSubscriptionsForSelectedSubgroup$ = this.store.pipe(
        select(Selectors.SubgroupEnduserSubscriptionSelectors.selectSubgroupEnduserSubscriptionsForSelectedSubgroup)
    )
    subgroupSubscriptionsForSelectedEnduser$ = this.store.pipe(
        select(Selectors.SubgroupEnduserSubscriptionSelectors.selectSubgroupEnduserSubscriptionsForSelectedEnduser)
    )
    selectedEnduserSubscription$ = this.store.pipe(
        select(Selectors.SubgroupEnduserSubscriptionSelectors.selectedSubgroupEnduserSubscription)
    )
    selectedEnduserSubscriptionId$ = this.store.pipe(
        select(Selectors.SubgroupEnduserSubscriptionSelectors.selectSelectedSubgroupEnduserSubscriptionId)
    )

    subgroupSubscriptionById$ = (id: string) =>
        this.store.pipe(select(Selectors.SubgroupEnduserSubscriptionSelectors.selectSubgroupEnduserSubscriptionById(id)))
    
    subgroupSubscriptionsForSubgroup$ = (subgroupId: string) =>
        this.store.pipe(
            select(Selectors.SubgroupEnduserSubscriptionSelectors.selectSubgroupEnduserSubscriptionsForSubgroup(subgroupId))
        )
    
    subgroupSubscriptionsForEnduser$ = (enduserId: string) =>
        this.store.pipe(
            select(Selectors.SubgroupEnduserSubscriptionSelectors.selectSubgroupEnduserSubscriptionsForEnduser(enduserId))
        )

    addEnduserToSubgroup(enduserId: string, subgroupId: string, request: Model.CreateSubscriptionRequest) {
        return this.store.dispatch(
            SubgroupEnduserSubscriptionRemoteActions.add.request({ enduserId, subgroupId, request })
        )
    }

    removeEnduserFromSubgroup(enduserId: string, subgroupId: string) {
        return this.store.dispatch(SubgroupEnduserSubscriptionRemoteActions.remove.request({ enduserId, subgroupId }))
    }

    getSubgroupSubscription(subgroupSubscriptionId: string) {
        return this.store.dispatch(
            SubgroupEnduserSubscriptionRemoteActions.get.request({ subgroupEnduserSubscriptionId: subgroupSubscriptionId })
        )
    }

    listSubgroupSubscriptions(
        parentId: Nullable<string>,
        parentType: 'subgroup' | 'enduser' | 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.SubgroupSubscriptionResponse>>> = null
    ) {
        return this.store.dispatch(
            SubgroupEnduserSubscriptionRemoteActions.list.request({ parentId, parentType, pagination })
        )
    }

    updateSubgroupSubscription(subgroupSubscriptionId: string, update: Model.UpdateSubscriptionRequest) {
        return this.store.dispatch(
            SubgroupEnduserSubscriptionRemoteActions.update.request({
                subgroupEnduserSubscriptionId: subgroupSubscriptionId,
                request: update,
            })
        )
    }

    deleteSubgroupSubscription(subgroupSubscriptionId: string, force: boolean = false) {
        return this.store.dispatch(
            SubgroupEnduserSubscriptionRemoteActions.delete.request({
                subgroupEnduserSubscriptionId: subgroupSubscriptionId,
                force,
            })
        )
    }

    selectSubgroupSubscription(subgroupSubscriptionId: string) {
        return this.store.dispatch(
            SubgroupEnduserSubscriptionLocalActions.selectSubgroupEnduserSubscription({
                subgroupEnduserSubscriptionId: subgroupSubscriptionId,
            })
        )
    }

    deselectSubgroupSubscription() {
        return this.store.dispatch(SubgroupEnduserSubscriptionLocalActions.deselectSubgroupEnduserSubscription())
    }

    updateSubgroupSubscriptionFilters(
        filters: Partial<Model.SubgroupSubscriptionFilters>,
        triggerRemoteFetch: boolean = true
    ) {
        return this.store.dispatch(
            SubgroupEnduserSubscriptionLocalActions.updateSubgroupEnduserSubscriptionFilters({
                filters,
                triggerRemoteFetch,
            })
        )
    }

    resetSubgroupSubscriptionFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(
            SubgroupEnduserSubscriptionLocalActions.resetSubgroupEnduserSubscriptionFilters({ triggerRemoteFetch })
        )
    }
}
