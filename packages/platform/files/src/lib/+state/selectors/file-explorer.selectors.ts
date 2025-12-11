import { createNamespacedFeatureKey, isNil, isNull, isUndefined } from '@zwp/platform.common'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Model } from '../../model'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { FileDataSelectors } from './file-data.selectors'

const fileExplorerState = createFeatureSelector<Reducers.FileExplorerFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.PLATFORM_FILES_ACTION_IDENTIFIER,
        Identifiers.FILE_EXPLORER_STATE_FEATURE_KEY
    )
)

const selectedItemIds = createSelector(fileExplorerState, (s) => s.selectedItemIds)
const currentDirectoryId = createSelector(fileExplorerState, (s) => s.currentDirectoryId)
const viewMode = createSelector(fileExplorerState, (s) => s.viewMode)
const groupingViewMode = createSelector(fileExplorerState, (s) => s.groupingViewMode)
const dragPreviewIsMulti = createSelector(fileExplorerState, (s) => s.dragPreviewIsMulti)
const dragPreviewItemCount = createSelector(fileExplorerState, (s) => s.dragPreviewItemCount)
const dragPreviewIcon = createSelector(fileExplorerState, (s) => s.dragPreviewIcon)
const dragPreviewLabel = createSelector(fileExplorerState, (s) => s.dragPreviewLabel)

const dragPreview = createSelector(
    dragPreviewIsMulti,
    dragPreviewItemCount,
    dragPreviewIcon,
    dragPreviewLabel,
    (isMulti, itemCount, icon, label) => ({ isMulti, itemCount, icon, label })
)

const selectedItemCount = createSelector(selectedItemIds, (ids) => ids.length)
const hasSelectedItems = createSelector(selectedItemCount, (count) => count > 0)
const hasCurrentDirectoryId = createSelector(currentDirectoryId, (id) => id !== null)

const selectedItems = createSelector(selectedItemIds, FileDataSelectors.fileDataItemEntities, (ids, dict) =>
    ids.compactMap((id) => dict[id])
)

const currentDirectory = createSelector(currentDirectoryId, FileDataSelectors.fileDataItemEntities, (id, dict) =>
    isNull(id) ? null : dict[id] ?? null
)

// const currentDirectoryWithChildCount = createSelector(
//     currentDirectory,
//     FileDataSelectors.childIdsByParent,
//     (curr, childIdsDict) => isNull(curr) ? null : ({...curr, childFileDataEntitiesCount: childIdsDict[curr.id]?.length})
// )

const hasCurrentDirectory = createSelector(currentDirectory, (directory) => directory !== null)

const currentDirectoryWithChildren = createSelector(
    currentDirectory,
    FileDataSelectors.fileDataItemChildIdsByParent,
    FileDataSelectors.fileDataItemEntities,
    (curr, childIdsDict, itemsDict) =>
        isNull(curr)
            ? null
            : ({
                  ...curr,
                  childFileDataItems: childIdsDict[curr.id]?.compactMap((id) => itemsDict[id]),
                  childFileDataItemsCount: childIdsDict[curr.id]?.length,
              } as Model.FileDataItem)
)

const currentDirectoryChildrenWithChildCounts = createSelector(
    currentDirectoryWithChildren,
    FileDataSelectors.fileDataItemChildIdsByParent,
    (curr, childIdsDict) =>
        isNull(curr) || isNil(curr.childFileDataItems)
            ? []
            : curr.childFileDataItems.compactMap(
                  (child) =>
                      ({
                          ...child,
                          childFileDataItemsCount: childIdsDict[child.id]?.length,
                      } as Model.FileDataItem)
              )
)

const rootDirectories = createSelector(FileDataSelectors.allFileDataItems, (allFileDataItems) =>
    allFileDataItems.filter((e) => (isUndefined(e) ? undefined : isUndefined(e.parentFileDataItemId ?? undefined)))
)

const rootDirectoriesWithChildCounts = createSelector(
    rootDirectories,
    FileDataSelectors.fileDataItemChildIdsByParent,
    (root, childIdsDict) =>
        root.compactMap(
            (rootEntity) =>
                ({
                    ...rootEntity,
                    childFileDataItemsCount: childIdsDict[rootEntity.id]?.length,
                } as Model.FileDataItem)
        )
)

const explorerAllChildren = createSelector(
    hasCurrentDirectoryId,
    rootDirectoriesWithChildCounts,
    currentDirectoryChildrenWithChildCounts,
    (hasCurrentId, root, current) => (hasCurrentId === false ? root : current)
)

const explorerAllFiles = createSelector(explorerAllChildren, (all) => all.filter((e) => e.isDir === false))

const explorerAllDirectories = createSelector(explorerAllChildren, (all) => all.filter((e) => e.isDir === true))

const explorerAllChildrenCount = createSelector(explorerAllChildren, (all) => all.length)
const explorerAllFilesCount = createSelector(explorerAllFiles, (all) => all.length)
const explorerAllDirectoriesCount = createSelector(explorerAllDirectories, (all) => all.length)

const explorerItemIsSelected = (id: string) => createSelector(selectedItemIds, (ids) => ids.includes(id))

export const FileExplorerSelectors = {
    // fileExplorerState,
    selectedItemIds,
    currentDirectoryId,
    viewMode,
    groupingViewMode,
    dragPreview,

    selectedItemCount,
    hasSelectedItems,
    hasCurrentDirectory,
    currentDirectory,
    selectedItems,
    // currentDirectoryChildren,
    // currentDirectorySelector,
    // directory,
    // directoryChildren,
    currentDirectoryWithChildren,
    // currentDirectoryWithGrandchildren,
    // currentDirectoryChildren,
    // rootDirectoriesWithChildren,

    explorerAllChildren,
    explorerAllFiles,
    explorerAllDirectories,
    explorerAllChildrenCount,
    explorerAllFilesCount,
    explorerAllDirectoriesCount,

    explorerItemIsSelected,
    // selectedItemsAlt
}
