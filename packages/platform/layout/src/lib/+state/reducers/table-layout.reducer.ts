import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { TableLayoutEntity } from '../../model'
import { Nullable } from '@zwp/platform.common'
import { createReducer, on } from '@ngrx/store'
import { TableLayoutActions } from '../actions'

export interface TableLayoutFeatureState {
    tables: EntityState<TableLayoutEntity>
}

export const tableLayoutEntityAdapter: EntityAdapter<TableLayoutEntity> = createEntityAdapter<TableLayoutEntity>()
export const initialTableLayoutFeatureState: TableLayoutFeatureState = {
    tables: tableLayoutEntityAdapter.getInitialState(),
}
export const tableLayoutReducer = createReducer(
    initialTableLayoutFeatureState,
    on(TableLayoutActions.resetTableLayoutState, () => initialTableLayoutFeatureState),
    on(TableLayoutActions.initialiseTableLayoutState, () => initialTableLayoutFeatureState)
)