import { createFeatureSelector, createSelector } from "@ngrx/store"
import { PersistenceProfileEntity } from "../../model"
import { createNamespacedFeatureKey, SelectedEntity } from "../../utils"
import { Identifiers } from "../identifiers"
import { PersistenceProfileFeatureState, persistenceProfileEntityAdapter } from "../reducers"

const persistenceProfileState = createFeatureSelector<PersistenceProfileFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.ZWP_ACTION_IDENTIFIER,
        Identifiers.PERSISTENCE_PROFILE_STATE_FEATURE_KEY
    )
)
const persistenceProfileEntitySelectors = persistenceProfileEntityAdapter.getSelectors()

const persistenceProfileIds = createSelector(persistenceProfileState, (state) => persistenceProfileEntitySelectors.selectIds(state))
const persistenceProfileEntities = createSelector(persistenceProfileState, (state) => persistenceProfileEntitySelectors.selectEntities(state))
const allPersistenceProfiles = createSelector(persistenceProfileState, (state) => persistenceProfileEntitySelectors.selectAll(state))
const totalPersistenceProfiles = createSelector(persistenceProfileState, (state) => persistenceProfileEntitySelectors.selectTotal(state))

const selectedPersistenceProfileId = createSelector(persistenceProfileState, (state) => state.selectedId)
const selectedPersistenceProfile = createSelector(selectedPersistenceProfileId, persistenceProfileEntities, (id, entities) => id && entities && entities[id])

const allPersistenceProfilesWithSelection = createSelector(allPersistenceProfiles, selectedPersistenceProfileId, (allProfiles, id) => {
    return allProfiles.map((profile): SelectedEntity<PersistenceProfileEntity> => ({...profile, isSelected: profile.id === id}))
})

export const PersistenceProfileSelectors = {
    persistenceProfileIds,
    persistenceProfileEntities,
    allPersistenceProfiles,
    totalPersistenceProfiles,
    selectedPersistenceProfileId,
    selectedPersistenceProfile,
    allPersistenceProfilesWithSelection
}