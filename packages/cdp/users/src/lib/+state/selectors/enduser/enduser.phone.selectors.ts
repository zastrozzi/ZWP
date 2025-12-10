import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../../identifiers'
import { Reducers } from '../../reducers'
import { createNamespacedFeatureKey, selectRemoteState } from '@zwp/platform.common'

const selectEnduserPhoneState = createFeatureSelector<Reducers.EnduserPhoneFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.CDP_USERS_ACTION_IDENTIFIER,
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
    (phones, filters) => phones.filter(phone => {
        let include = true
        if (filters.enduserId) {
            include = include && phone.enduserId === filters.enduserId
        }
        return include
    })
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
    selectedEnduserPhone
}