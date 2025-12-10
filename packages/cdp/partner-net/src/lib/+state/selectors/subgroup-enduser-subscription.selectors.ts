import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import {
    createNamespacedFeatureKey,
    selectFilteredElements,
    selectPaginatedElements,
    selectRemoteState,
} from '@zwp/platform.common'
import { Model } from '../../model'
import { SubgroupSelectors } from './subgroup.selectors'
import { CDPUsers } from '@zwp/cdp.users'

const selectSubgroupEnduserSubscriptionState = createFeatureSelector<Reducers.SubgroupEnduserSubscriptionFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER,
        Identifiers.SUBGROUP_ENDUSER_SUBSCRIPTION_STATE_FEATURE_KEY
    )
)

const selectSubgroupEnduserSubscriptionFilters = createSelector(
    selectSubgroupEnduserSubscriptionState,
    (state) => state.filters
)
const selectSubgroupEnduserSubscriptionRemotePagination = createSelector(
    selectSubgroupEnduserSubscriptionState,
    (state) => state.subgroupEnduserSubscriptionsRemotePagination
)
const selectSubgroupEnduserSubscriptionRemoteState = createSelector(
    selectSubgroupEnduserSubscriptionState,
    selectRemoteState
)

const selectSelectedSubgroupEnduserSubscriptionId = createSelector(
    selectSubgroupEnduserSubscriptionState,
    (state) => state.selectedSubgroupEnduserSubscriptionId
)

const subgroupEnduserSubscriptionEntitySelectors = Reducers.subgroupEnduserSubscriptionEntityAdapter.getSelectors()
const selectSubgroupEnduserSubscriptionEntityState = createSelector(
    selectSubgroupEnduserSubscriptionState,
    (state) => state.subgroupEnduserSubscriptions
)
const selectSubgroupEnduserSubscriptionIds = createSelector(
    selectSubgroupEnduserSubscriptionEntityState,
    subgroupEnduserSubscriptionEntitySelectors.selectIds
)
const selectSubgroupEnduserSubscriptionEntities = createSelector(
    selectSubgroupEnduserSubscriptionEntityState,
    subgroupEnduserSubscriptionEntitySelectors.selectEntities
)
const selectAllSubgroupEnduserSubscriptions = createSelector(
    selectSubgroupEnduserSubscriptionEntityState,
    subgroupEnduserSubscriptionEntitySelectors.selectAll
)
const selectSubgroupEnduserSubscriptionTotal = createSelector(
    selectSubgroupEnduserSubscriptionEntityState,
    subgroupEnduserSubscriptionEntitySelectors.selectTotal
)
const selectSubgroupEnduserSubscriptionById = (id: string) =>
    createSelector(selectSubgroupEnduserSubscriptionEntities, (entities) => entities[id])

const selectedSubgroupEnduserSubscription = createSelector(
    selectSubgroupEnduserSubscriptionEntities,
    selectSelectedSubgroupEnduserSubscriptionId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectSubgroupEnduserSubscriptionsForSelectedSubgroup = createSelector(
    SubgroupSelectors.selectSelectedSubgroupId,
    selectAllSubgroupEnduserSubscriptions,
    (selectedSubgroupId, subgroupEnduserSubscriptions) =>
        subgroupEnduserSubscriptions.filter(
            (subgroupEnduserSubscription) => subgroupEnduserSubscription.subgroupId === selectedSubgroupId
        )
)

const selectSubgroupEnduserSubscriptionsForSubgroup = (subgroupId: string) =>
    createSelector(selectAllSubgroupEnduserSubscriptions, (subgroupEnduserSubscriptions) =>
        subgroupEnduserSubscriptions.filter(
            (subgroupEnduserSubscription) => subgroupEnduserSubscription.subgroupId === subgroupId
        )
    )

const selectSubgroupEnduserSubscriptionsForSelectedEnduser = createSelector(
    CDPUsers.State.Selectors.EnduserSelectors.selectSelectedEnduserId,
    selectAllSubgroupEnduserSubscriptions,
    (selectedEnduserId, subgroupEnduserSubscriptions) =>
        subgroupEnduserSubscriptions.filter(
            (subgroupEnduserSubscription) => subgroupEnduserSubscription.enduserId === selectedEnduserId
        )
)

const selectSubgroupEnduserSubscriptionsForEnduser = (enduserId: string) =>
    createSelector(selectAllSubgroupEnduserSubscriptions, (subgroupEnduserSubscriptions) =>
        subgroupEnduserSubscriptions.filter(
            (subgroupEnduserSubscription) => subgroupEnduserSubscription.enduserId === enduserId
        )
    )

const selectEndusersForSelectedSubgroup = createSelector(
    SubgroupSelectors.selectSelectedSubgroupId,
    selectAllSubgroupEnduserSubscriptions,
    CDPUsers.State.Selectors.EnduserSelectors.selectAllEndusers,
    (selectedSubgroupId, subgroupEnduserSubscriptions, endusers) => {
        const enduserIds = subgroupEnduserSubscriptions
            .filter((subscription) => subscription.subgroupId === selectedSubgroupId)
            .map((subgroupEnduserSubscription) => subgroupEnduserSubscription.enduserId)
        return endusers.filter((enduser) => enduserIds.includes(enduser.id))
    }
)

const selectEndusersForSubgroup = (subgroupId: string) =>
    createSelector(
        selectAllSubgroupEnduserSubscriptions,
        CDPUsers.State.Selectors.EnduserSelectors.selectAllEndusers,
        (subgroupEnduserSubscriptions, endusers) => {
            const enduserIds = subgroupEnduserSubscriptions
                .filter((subscription) => subscription.subgroupId === subgroupId)
                .map((subgroupEnduserSubscription) => subgroupEnduserSubscription.enduserId)
            return endusers.filter((enduser) => enduserIds.includes(enduser.id))
        }
    )

const selectSubgroupsForSelectedEnduser = createSelector(
    CDPUsers.State.Selectors.EnduserSelectors.selectSelectedEnduserId,
    selectAllSubgroupEnduserSubscriptions,
    SubgroupSelectors.selectAllSubgroups,
    (selectedEnduserId, subgroupEnduserSubscriptions, subgroups) => {
        const subgroupIds = subgroupEnduserSubscriptions
            .filter((subscription) => subscription.enduserId === selectedEnduserId)
            .map((subgroupEnduserSubscription) => subgroupEnduserSubscription.subgroupId)
        return subgroups.filter((subgroup) => subgroupIds.includes(subgroup.id))
    }
)

const selectSubgroupsForEnduser = (enduserId: string) =>
    createSelector(
        selectAllSubgroupEnduserSubscriptions,
        SubgroupSelectors.selectAllSubgroups,
        (subgroupEnduserSubscriptions, subgroups) => {
            const subgroupIds = subgroupEnduserSubscriptions
                .filter((subscription) => subscription.enduserId === enduserId)
                .map((subgroupEnduserSubscription) => subgroupEnduserSubscription.subgroupId)
            return subgroups.filter((subgroup) => subgroupIds.includes(subgroup.id))
        }
    )

const selectFilteredSubgroupEnduserSubscriptions = createSelector(
    selectAllSubgroupEnduserSubscriptions,
    selectSubgroupEnduserSubscriptionFilters,
    (subgroupEnduserSubscriptions, filters) =>
        selectFilteredElements(subgroupEnduserSubscriptions, filters, Model.subgroupSubscriptionFilterEntityMap)
)

const selectPaginatedSubgroupEnduserSubscriptions = createSelector(
    selectAllSubgroupEnduserSubscriptions,
    selectSubgroupEnduserSubscriptionRemotePagination,
    (subgroupEnduserSubscriptions, pagination) => selectPaginatedElements(subgroupEnduserSubscriptions, pagination)
)

const selectPaginatedFilteredSubgroupEnduserSubscriptions = createSelector(
    selectFilteredSubgroupEnduserSubscriptions,
    selectSubgroupEnduserSubscriptionRemotePagination,
    (subgroupEnduserSubscriptions, pagination) => selectPaginatedElements(subgroupEnduserSubscriptions, pagination)
)

export const SubgroupEnduserSubscriptionSelectors = {
    selectSubgroupEnduserSubscriptionState,
    selectSubgroupEnduserSubscriptionFilters,
    selectSubgroupEnduserSubscriptionRemotePagination,
    selectSubgroupEnduserSubscriptionRemoteState,

    selectSelectedSubgroupEnduserSubscriptionId,

    subgroupEnduserSubscriptionEntitySelectors,
    selectSubgroupEnduserSubscriptionEntityState,
    selectSubgroupEnduserSubscriptionIds,
    selectSubgroupEnduserSubscriptionEntities,
    selectAllSubgroupEnduserSubscriptions,
    selectSubgroupEnduserSubscriptionTotal,
    selectSubgroupEnduserSubscriptionById,
    selectedSubgroupEnduserSubscription,
    selectSubgroupEnduserSubscriptionsForSelectedSubgroup,
    selectSubgroupEnduserSubscriptionsForSubgroup,
    selectSubgroupEnduserSubscriptionsForSelectedEnduser,
    selectSubgroupEnduserSubscriptionsForEnduser,

    selectEndusersForSelectedSubgroup,
    selectEndusersForSubgroup,
    selectSubgroupsForSelectedEnduser,
    selectSubgroupsForEnduser,

    selectFilteredSubgroupEnduserSubscriptions,
    selectPaginatedSubgroupEnduserSubscriptions,
    selectPaginatedFilteredSubgroupEnduserSubscriptions,
}
