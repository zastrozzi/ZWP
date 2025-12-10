import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../model'
import { PartnerSelectors } from './partner.selectors'
import { CDPUsers } from '@zwp/cdp.users'

const selectPartnerEnduserSubscriptionState = createFeatureSelector<Reducers.PartnerEnduserSubscriptionFeatureState>(
    createNamespacedFeatureKey(Identifiers.CDP_PARTNER_NET_ACTION_IDENTIFIER, Identifiers.PARTNER_ENDUSER_SUBSCRIPTION_STATE_FEATURE_KEY)
)

const selectPartnerEnduserSubscriptionFilters = createSelector(selectPartnerEnduserSubscriptionState, (state) => state.filters)
const selectPartnerEnduserSubscriptionRemotePagination = createSelector(selectPartnerEnduserSubscriptionState, (state) => state.partnerEnduserSubscriptionsRemotePagination)
const selectPartnerEnduserSubscriptionRemoteState = createSelector(selectPartnerEnduserSubscriptionState, selectRemoteState)

const selectSelectedPartnerEnduserSubscriptionId = createSelector(selectPartnerEnduserSubscriptionState, (state) => state.selectedPartnerEnduserSubscriptionId)

const partnerEnduserSubscriptionEntitySelectors = Reducers.partnerEnduserSubscriptionEntityAdapter.getSelectors()
const selectPartnerEnduserSubscriptionEntityState = createSelector(selectPartnerEnduserSubscriptionState, (state) => state.partnerEnduserSubscriptions)
const selectPartnerEnduserSubscriptionIds = createSelector(selectPartnerEnduserSubscriptionEntityState, partnerEnduserSubscriptionEntitySelectors.selectIds)
const selectPartnerEnduserSubscriptionEntities = createSelector(selectPartnerEnduserSubscriptionEntityState, partnerEnduserSubscriptionEntitySelectors.selectEntities)
const selectAllPartnerEnduserSubscriptions = createSelector(selectPartnerEnduserSubscriptionEntityState, partnerEnduserSubscriptionEntitySelectors.selectAll)
const selectPartnerEnduserSubscriptionTotal = createSelector(selectPartnerEnduserSubscriptionEntityState, partnerEnduserSubscriptionEntitySelectors.selectTotal)
const selectPartnerEnduserSubscriptionById = (id: string) => createSelector(selectPartnerEnduserSubscriptionEntities, (entities) => entities[id])

const selectedPartnerEnduserSubscription = createSelector(
    selectPartnerEnduserSubscriptionEntities,
    selectSelectedPartnerEnduserSubscriptionId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectPartnerEnduserSubscriptionsForSelectedPartner = createSelector(
    PartnerSelectors.selectSelectedPartnerId,
    selectAllPartnerEnduserSubscriptions,
    (selectedPartnerId, partnerEnduserSubscriptions) => partnerEnduserSubscriptions.filter(partnerEnduserSubscription => partnerEnduserSubscription.partnerId === selectedPartnerId)
)

const selectPartnerEnduserSubscriptionsForPartner = (partnerId: string) => createSelector(
    selectAllPartnerEnduserSubscriptions,
    (partnerEnduserSubscriptions) => partnerEnduserSubscriptions.filter(partnerEnduserSubscription => partnerEnduserSubscription.partnerId === partnerId)
)

const selectPartnerEnduserSubscriptionsForSelectedEnduser = createSelector(
    CDPUsers.State.Selectors.EnduserSelectors.selectSelectedEnduserId,
    selectAllPartnerEnduserSubscriptions,
    (selectedEnduserId, partnerEnduserSubscriptions) => partnerEnduserSubscriptions.filter(partnerEnduserSubscription => partnerEnduserSubscription.enduserId === selectedEnduserId)
)

const selectPartnerEnduserSubscriptionsForEnduser = (enduserId: string) => createSelector(
    selectAllPartnerEnduserSubscriptions,
    (partnerEnduserSubscriptions) => partnerEnduserSubscriptions.filter(partnerEnduserSubscription => partnerEnduserSubscription.enduserId === enduserId)
)


const selectEndusersForSelectedPartner = createSelector(
    PartnerSelectors.selectSelectedPartnerId,
    selectAllPartnerEnduserSubscriptions,
    CDPUsers.State.Selectors.EnduserSelectors.selectAllEndusers,
    (selectedPartnerId, partnerEnduserSubscriptions, endusers) => {
        const enduserIds = partnerEnduserSubscriptions
            .filter(subscription => subscription.partnerId  === selectedPartnerId)
            .map(partnerEnduserSubscription => partnerEnduserSubscription.enduserId)
        return endusers.filter(enduser => enduserIds.includes(enduser.id))
    }
)

const selectEndusersForPartner = (partnerId: string) => createSelector(
    selectAllPartnerEnduserSubscriptions,
    CDPUsers.State.Selectors.EnduserSelectors.selectAllEndusers,
    (partnerEnduserSubscriptions, endusers) => {
        const enduserIds = partnerEnduserSubscriptions
            .filter(subscription => subscription.partnerId  === partnerId)
            .map(partnerEnduserSubscription => partnerEnduserSubscription.enduserId)
        return endusers.filter(enduser => enduserIds.includes(enduser.id))
    }
)

const selectPartnersForSelectedEnduser = createSelector(
    CDPUsers.State.Selectors.EnduserSelectors.selectSelectedEnduserId,
    selectAllPartnerEnduserSubscriptions,
    PartnerSelectors.selectAllPartners,
    (selectedEnduserId, partnerEnduserSubscriptions, partners) => {
        const partnerIds = partnerEnduserSubscriptions
            .filter(subscription => subscription.enduserId  === selectedEnduserId)
            .map(partnerEnduserSubscription => partnerEnduserSubscription.partnerId)
        return partners.filter(partner => partnerIds.includes(partner.id))
    }
)

const selectPartnersForEnduser = (enduserId: string) => createSelector(
    selectAllPartnerEnduserSubscriptions,
    PartnerSelectors.selectAllPartners,
    (partnerEnduserSubscriptions, partners) => {
        const partnerIds = partnerEnduserSubscriptions
            .filter(subscription => subscription.enduserId  === enduserId)
            .map(partnerEnduserSubscription => partnerEnduserSubscription.partnerId)
        return partners.filter(partner => partnerIds.includes(partner.id))
    }
)

const selectFilteredPartnerEnduserSubscriptions = createSelector(
    selectAllPartnerEnduserSubscriptions,
    selectPartnerEnduserSubscriptionFilters,
    (partnerEnduserSubscriptions, filters) => selectFilteredElements(partnerEnduserSubscriptions, filters, Model.partnerSubscriptionFilterEntityMap)
)

const selectPaginatedPartnerEnduserSubscriptions = createSelector(
    selectAllPartnerEnduserSubscriptions,
    selectPartnerEnduserSubscriptionRemotePagination,
    (partnerEnduserSubscriptions, pagination) => selectPaginatedElements(partnerEnduserSubscriptions, pagination)
)

const selectPaginatedFilteredPartnerEnduserSubscriptions = createSelector(
    selectFilteredPartnerEnduserSubscriptions,
    selectPartnerEnduserSubscriptionRemotePagination,
    (partnerEnduserSubscriptions, pagination) => selectPaginatedElements(partnerEnduserSubscriptions, pagination)
)

export const PartnerEnduserSubscriptionSelectors = {
    selectPartnerEnduserSubscriptionState,
    selectPartnerEnduserSubscriptionFilters,
    selectPartnerEnduserSubscriptionRemotePagination,
    selectPartnerEnduserSubscriptionRemoteState,

    selectSelectedPartnerEnduserSubscriptionId,

    partnerEnduserSubscriptionEntitySelectors,
    selectPartnerEnduserSubscriptionEntityState,
    selectPartnerEnduserSubscriptionIds,
    selectPartnerEnduserSubscriptionEntities,
    selectAllPartnerEnduserSubscriptions,
    selectPartnerEnduserSubscriptionTotal,
    selectPartnerEnduserSubscriptionById,
    selectedPartnerEnduserSubscription,
    selectPartnerEnduserSubscriptionsForSelectedPartner,
    selectPartnerEnduserSubscriptionsForPartner,
    selectPartnerEnduserSubscriptionsForSelectedEnduser,
    selectPartnerEnduserSubscriptionsForEnduser,

    selectEndusersForSelectedPartner,
    selectEndusersForPartner,
    selectPartnersForSelectedEnduser,
    selectPartnersForEnduser,

    selectFilteredPartnerEnduserSubscriptions,
    selectPaginatedPartnerEnduserSubscriptions,
    selectPaginatedFilteredPartnerEnduserSubscriptions
}