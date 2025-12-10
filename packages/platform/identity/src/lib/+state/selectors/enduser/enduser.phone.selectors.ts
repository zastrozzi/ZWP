import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../../model'
import { EnduserSelectors } from './enduser.selectors'

const selectEnduserPhoneState = createFeatureSelector<Reducers.EnduserPhoneFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_IDENTITY_ACTION_IDENTIFIER,
        Identifiers.ENDUSER_PHONE_STATE_FEATURE_KEY
    )
)
const selectEnduserPhoneEntityState = createSelector(selectEnduserPhoneState, (state) => state.enduserPhones)
const selectEnduserPhoneFilters = createSelector(selectEnduserPhoneState, (state) => state.filters)
const selectEnduserPhoneRemotePagination = createSelector(selectEnduserPhoneState, (state) => state.enduserPhonesRemotePagination)
const selectEnduserPhoneRemoteState = createSelector(selectEnduserPhoneState, selectRemoteState)
const selectSelectedEnduserPhoneId = createSelector(selectEnduserPhoneState, (state) => state.selectedEnduserPhoneId)
const enduserPhoneEntitySelectors = Reducers.enduserPhoneEntityAdapter.getSelectors()

const selectEnduserPhoneIds = createSelector(selectEnduserPhoneEntityState, enduserPhoneEntitySelectors.selectIds)
const selectEnduserPhoneEntities = createSelector(selectEnduserPhoneEntityState, enduserPhoneEntitySelectors.selectEntities)
const selectAllEnduserPhones = createSelector(selectEnduserPhoneEntityState, enduserPhoneEntitySelectors.selectAll)
const selectEnduserPhoneTotal = createSelector(selectEnduserPhoneEntityState, enduserPhoneEntitySelectors.selectTotal)
const selectEnduserPhoneById = (id: string) => createSelector(selectEnduserPhoneEntities, (entities) => entities[id])

const selectFilteredEnduserPhones = createSelector(
    selectAllEnduserPhones,
    selectEnduserPhoneFilters,
    (phones, filters) => selectFilteredElements(phones, filters, Model.Filters.enduserPhoneFilterEntityMap)
)

const selectPaginatedEnduserPhones = createSelector(
    selectAllEnduserPhones,
    selectEnduserPhoneRemotePagination,
    (phones, pagination) => selectPaginatedElements(phones, pagination)
)

const selectPaginatedFilteredEnduserPhones = createSelector(
    selectFilteredEnduserPhones,
    selectEnduserPhoneRemotePagination,
    (phones, pagination) => selectPaginatedElements(phones, pagination)
)

const selectEnduserPhonesForSelectedEnduser = createSelector(
    EnduserSelectors.selectSelectedEnduserId,
    selectAllEnduserPhones,
    (selectedEnduserId, phones) => phones.filter(phone => phone.enduserId === selectedEnduserId)
)

const selectEnduserPhonesForEnduser = (enduserId: string) => createSelector(
    selectAllEnduserPhones,
    (phones) => phones.filter(phone => phone.enduserId === enduserId)
)

const selectFilteredEnduserPhonesForSelectedEnduser = createSelector(
    selectEnduserPhonesForSelectedEnduser,
    selectEnduserPhoneFilters,
    (phones, filters) => selectFilteredElements(phones, filters, Model.Filters.enduserPhoneFilterEntityMap)
)

const selectPaginatedEnduserPhonesForSelectedEnduser = createSelector(
    selectEnduserPhonesForSelectedEnduser,
    selectEnduserPhoneRemotePagination,
    (phones, pagination) => selectPaginatedElements(phones, pagination)
)

const selectPaginatedFilteredEnduserPhonesForSelectedEnduser = createSelector(
    selectFilteredEnduserPhonesForSelectedEnduser,
    selectEnduserPhoneRemotePagination,
    (phones, pagination) => selectPaginatedElements(phones, pagination)
)

const selectedEnduserPhone = createSelector(
    selectEnduserPhoneEntities,
    selectSelectedEnduserPhoneId,
    (entities, selectedId) => selectedId && entities[selectedId]
)

export const EnduserPhoneSelectors = {
    selectEnduserPhoneState,
    selectEnduserPhoneEntityState,
    selectEnduserPhoneFilters,
    selectEnduserPhoneRemotePagination,
    selectEnduserPhoneRemoteState,
    selectSelectedEnduserPhoneId,
    enduserPhoneEntitySelectors,
    selectEnduserPhoneIds,
    selectEnduserPhoneEntities,
    selectAllEnduserPhones,
    selectEnduserPhoneTotal,
    selectEnduserPhoneById,
    selectFilteredEnduserPhones,
    selectPaginatedEnduserPhones,
    selectPaginatedFilteredEnduserPhones,
    selectEnduserPhonesForSelectedEnduser,
    selectEnduserPhonesForEnduser,
    selectFilteredEnduserPhonesForSelectedEnduser,
    selectPaginatedEnduserPhonesForSelectedEnduser,
    selectPaginatedFilteredEnduserPhonesForSelectedEnduser,
    selectedEnduserPhone
}