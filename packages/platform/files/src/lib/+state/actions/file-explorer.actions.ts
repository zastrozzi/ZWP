import { Model } from '../../model'
import { Identifiers } from '../identifiers'
import { createActionType, Nullable } from '@zwp/platform.common'
import { createAction, props } from '@ngrx/store'

const FILE_EXPLORER_ACTION_IDENTIFIERS = [
    Identifiers.PLATFORM_FILES_ACTION_IDENTIFIER,
    Identifiers.FILE_EXPLORER_STATE_FEATURE_KEY,
]

const selectFileExplorerItem = createAction(
    createActionType(FILE_EXPLORER_ACTION_IDENTIFIERS, 'Select File Explorer Item'),
    props<{ id: string }>()
)

const selectFileExplorerItems = createAction(
    createActionType(FILE_EXPLORER_ACTION_IDENTIFIERS, 'Select File Explorer Items'),
    props<{ ids: string[] }>()
)

const deselectAllFileExplorerItems = createAction(
    createActionType(FILE_EXPLORER_ACTION_IDENTIFIERS, 'Deselect All File Explorer Items')
)

const addFileExplorerItemToSelection = createAction(
    createActionType(FILE_EXPLORER_ACTION_IDENTIFIERS, 'Add File Explorer Item To Selection'),
    props<{ id: string }>()
)

const removeFileExplorerItemFromSelection = createAction(
    createActionType(FILE_EXPLORER_ACTION_IDENTIFIERS, 'Remove File Explorer Item From Selection'),
    props<{ id: string }>()
)

const addFileExplorerItemsToSelection = createAction(
    createActionType(FILE_EXPLORER_ACTION_IDENTIFIERS, 'Add File Explorer Items To Selection'),
    props<{ ids: string[] }>()
)

const removeFileExplorerItemsFromSelection = createAction(
    createActionType(FILE_EXPLORER_ACTION_IDENTIFIERS, 'Remove File Explorer Items From Selection'),
    props<{ ids: string[] }>()
)

const handleFileExplorerItemSelection = createAction(
    createActionType(FILE_EXPLORER_ACTION_IDENTIFIERS, 'Handle File Explorer Item Selection'),
    props<{ id: string }>()
)

const selectCurrentDirectory = createAction(
    createActionType(FILE_EXPLORER_ACTION_IDENTIFIERS, 'Select Current Directory'),
    props<{ id: Nullable<string> }>()
)

const selectViewMode = createAction(
    createActionType(FILE_EXPLORER_ACTION_IDENTIFIERS, 'Select View Mode'),
    props<{ mode: Model.FileExplorerViewMode }>()
)

const selectGroupingViewMode = createAction(
    createActionType(FILE_EXPLORER_ACTION_IDENTIFIERS, 'Select Grouping View Mode'),
    props<{ mode: Model.FileExplorerGroupingViewMode }>()
)

const handleFileExplorerItemDragStart = createAction(
    createActionType(FILE_EXPLORER_ACTION_IDENTIFIERS, 'Handle File Explorer Item Drag Start'),
    props<{ id: string; isDir: boolean; name: string }>()
)

const handleFileExplorerItemDragStartPreview = createAction(
    createActionType(FILE_EXPLORER_ACTION_IDENTIFIERS, 'Handle File Explorer Item Drag Start Preview'),
    props<{ id: string; isDir: boolean; name: string }>()
)

const setFileExplorerItemDragPreview = createAction(
    createActionType(FILE_EXPLORER_ACTION_IDENTIFIERS, 'Set File Explorer Item Drag Preview'),
    props<{ isMulti: boolean; itemCount: number; icon: string; label: string }>()
)

const handleFileExplorerItemDragDropped = createAction(
    createActionType(FILE_EXPLORER_ACTION_IDENTIFIERS, 'Handle File Explorer Item Drag Dropped'),
    props<{ dropId: string }>()
)

export const FileExplorerActions = {
    selectFileExplorerItem,
    selectFileExplorerItems,
    deselectAllFileExplorerItems,
    addFileExplorerItemToSelection,
    removeFileExplorerItemFromSelection,
    addFileExplorerItemsToSelection,
    removeFileExplorerItemsFromSelection,
    handleFileExplorerItemSelection,

    selectCurrentDirectory,

    selectViewMode,
    selectGroupingViewMode,

    handleFileExplorerItemDragStart,
    handleFileExplorerItemDragStartPreview,
    setFileExplorerItemDragPreview,
    handleFileExplorerItemDragDropped,
}
