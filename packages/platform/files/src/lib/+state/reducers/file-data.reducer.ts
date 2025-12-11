import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { FileDataActions } from '../actions'

export interface FileDataFeatureState {
    items: EntityState<Model.FileDataItem>
}

export const fileDataItemEntityAdapter: EntityAdapter<Model.FileDataItem> = createEntityAdapter<Model.FileDataItem>()

const initialFileDataFeatureState: FileDataFeatureState = {
    items: fileDataItemEntityAdapter.getInitialState(),
}

export const fileDataReducer = createReducer(
    initialFileDataFeatureState,
    on(FileDataActions.create, (state, { item }) => ({
        ...state,
        items: fileDataItemEntityAdapter.setOne(item, state.items),
    })),
    on(FileDataActions.createMany, (state, { items }) => ({
        ...state,
        items: fileDataItemEntityAdapter.setMany(items, state.items),
    })),
    on(FileDataActions.remove, (state, { id }) => ({
        ...state,
        items: fileDataItemEntityAdapter.removeOne(id, state.items),
    })),
    on(FileDataActions.updateParent, (state, { itemId, parentId }) => ({
        ...state,
        items: fileDataItemEntityAdapter.updateOne(
            { id: itemId, changes: { parentFileDataItemId: parentId ?? undefined } },
            state.items
        ),
    })),
    on(FileDataActions.updateParents, (state, { updates }) => ({
        ...state,
        items: fileDataItemEntityAdapter.updateMany(
            updates.map((update) => ({
                id: update.itemId,
                changes: { parentFileDataItemId: update.parentId ?? undefined },
            })),
            state.items
        ),
    }))
)
