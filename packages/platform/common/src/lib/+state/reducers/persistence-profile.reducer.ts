import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { PersistenceProfileEntity, PersistentState } from '../../model'
import { PersistenceProfileActions } from '../actions'

export interface PersistenceProfileFeatureState extends EntityState<PersistenceProfileEntity> {
    selectedId: string | null
}

export const persistentPersistenceProfileState: PersistentState<PersistenceProfileFeatureState> = {
    ids: true,
    entities: true
    // selectedId: true
}

export const persistenceProfileEntityAdapter: EntityAdapter<PersistenceProfileEntity> = createEntityAdapter<PersistenceProfileEntity>()

export const initialPersistenceProfileFeatureState: PersistenceProfileFeatureState = persistenceProfileEntityAdapter.getInitialState({
    selectedId: null
})

export const persistenceProfileReducer = createReducer(
    initialPersistenceProfileFeatureState,
    on(PersistenceProfileActions.setSelected, (state, { id }) => ({ ...state, selectedId: id })),
    on(PersistenceProfileActions.create, (state, { persistenceProfile }) => persistenceProfileEntityAdapter.setOne(persistenceProfile, state)),
    on(PersistenceProfileActions.remove, (state, { id }) => persistenceProfileEntityAdapter.removeOne(id, state)),
    on(PersistenceProfileActions.removeAllSuccess, (state) => persistenceProfileEntityAdapter.removeAll(state))
)