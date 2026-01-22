import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { FileDataActions } from '../actions'
import { PersistentState } from '@zwp/platform.common'

export interface FileDataFeatureState {
    items: EntityState<Model.FileDataItem>
}

export const persistentFileData: PersistentState<FileDataFeatureState> = {
    items: true
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
    on(FileDataActions.update, (state, { itemId, update }) => ({
        ...state,
        items: fileDataItemEntityAdapter.updateOne(
            {
                id: itemId,
                changes: {
                    ...update,
                    updatedAt: new Date()
                }
            },
            state.items
        )
    })),
    on(FileDataActions.remove, (state, { id }) => ({
        ...state,
        items: fileDataItemEntityAdapter.removeOne(id, state.items),
    })),
    on(FileDataActions.updateParent, (state, { itemId, parentId }) => ({
        ...state,
        items: fileDataItemEntityAdapter.updateOne(
            { id: itemId, changes: { 
                parentFileDataItemId: parentId ?? undefined,
                updatedAt: new Date()
            } },
            state.items
        ),
    })),
    on(FileDataActions.updateParents, (state, { updates }) => ({
        ...state,
        items: fileDataItemEntityAdapter.updateMany(
            updates.map((update) => ({
                id: update.itemId,
                changes: { 
                    parentFileDataItemId: update.parentId ?? undefined,
                    updatedAt: new Date()
                },
            })),
            state.items
        ),
    }))
)
