import { arrayDistinctRemove, arrayDistinctUpsert, Nullable } from '@zwp/platform.common'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { FileExplorerActions } from '../actions'

export interface FileExplorerFeatureState {
    selectedItemIds: string[]
    currentDirectoryId: Nullable<string>
    viewMode: Model.FileExplorerViewMode
    groupingViewMode: Model.FileExplorerGroupingViewMode
    dragPreviewIsMulti: boolean
    dragPreviewItemCount: number
    dragPreviewIcon: string
    dragPreviewLabel: string
}

const initialFileExplorerFeatureState: FileExplorerFeatureState = {
    selectedItemIds: [],
    currentDirectoryId: null,
    viewMode: Model.FileExplorerViewMode.grid,
    groupingViewMode: Model.FileExplorerGroupingViewMode.itemType,
    dragPreviewIsMulti: false,
    dragPreviewItemCount: 0,
    dragPreviewIcon: 'folder',
    dragPreviewLabel: '',
}

export const fileExplorerReducer = createReducer(
    initialFileExplorerFeatureState,
    on(FileExplorerActions.selectFileExplorerItem, (state, { id }) => ({ ...state, selectedItemIds: [id] })),
    on(FileExplorerActions.selectFileExplorerItems, (state, { ids }) => ({ ...state, selectedItemIds: ids })),
    on(FileExplorerActions.deselectAllFileExplorerItems, (state) => ({ ...state, selectedItemIds: [] })),
    on(FileExplorerActions.addFileExplorerItemToSelection, (state, { id }) => ({
        ...state,
        selectedItemIds: arrayDistinctUpsert(state.selectedItemIds, id),
    })),
    on(FileExplorerActions.removeFileExplorerItemFromSelection, (state, { id }) => ({
        ...state,
        selectedItemIds: arrayDistinctRemove(state.selectedItemIds, id),
    })),
    on(FileExplorerActions.addFileExplorerItemsToSelection, (state, { ids }) => ({
        ...state,
        selectedItemIds: arrayDistinctUpsert(state.selectedItemIds, ...ids),
    })),
    on(FileExplorerActions.removeFileExplorerItemsFromSelection, (state, { ids }) => ({
        ...state,
        selectedItemIds: arrayDistinctRemove(state.selectedItemIds, ...ids),
    })),

    on(FileExplorerActions.selectCurrentDirectory, (state, { id }) => ({ ...state, currentDirectoryId: id })),
    on(FileExplorerActions.selectViewMode, (state, { mode }) => ({ ...state, viewMode: mode })),
    on(FileExplorerActions.selectGroupingViewMode, (state, { mode }) => ({ ...state, groupingViewMode: mode })),

    on(FileExplorerActions.setFileExplorerItemDragPreview, (state, { isMulti, itemCount, icon, label }) => ({
        ...state,
        dragPreviewIsMulti: isMulti,
        dragPreviewItemCount: itemCount,
        dragPreviewIcon: icon,
        dragPreviewLabel: label,
    }))
)
