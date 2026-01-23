import {
    filterDictionary,
    isNil,
    isUndefined,
    ZWPDictionary,
    reduceDictionary,
    reduceRightDictionary,
    createNamespacedFeatureKey,
} from '@zwp/platform.common'
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Model } from '../../model'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'

const fileDataState = createFeatureSelector<Reducers.FileDataFeatureState>(
    createNamespacedFeatureKey(Identifiers.PLATFORM_FILES_ACTION_IDENTIFIER, Identifiers.FILE_DATA_STATE_FEATURE_KEY)
)

const fileDataItemEntitySelectors = Reducers.fileDataItemEntityAdapter.getSelectors()

const fileDataItemIds = createSelector(fileDataState, (state) => fileDataItemEntitySelectors.selectIds(state.items))
const fileDataItemEntities = createSelector(fileDataState, (state) =>
    fileDataItemEntitySelectors.selectEntities(state.items)
)
const allFileDataItems = createSelector(fileDataState, (state) => fileDataItemEntitySelectors.selectAll(state.items))
const totalFileDataItems = createSelector(fileDataState, (state) =>
    fileDataItemEntitySelectors.selectTotal(state.items)
)

// const allDirEntities = createSelector(allEntities, (all) => all.filter(e => e.isDir === true))
// const allNonDirEntities = createSelector(allEntities, (all) => all.filter(e => e.isDir === false))

const directoryFileDataItemEntities = createSelector(fileDataItemEntities, (dict) =>
    filterDictionary(dict, (item) => item?.isDir === true)
)
const nonDirectoryFileDataItemEntities = createSelector(fileDataItemEntities, (dict) =>
    filterDictionary(dict, (item) => item?.isDir === false)
)

const fileDataItemChildIdsByParent = createSelector(fileDataItemEntities, (dict) =>
    reduceDictionary(
        dict,
        (acc, curr) => {
            if (!isUndefined(curr[1]) && !isUndefined(curr[1].parentFileDataItemId)) {
                if (isNil(acc[curr[1].parentFileDataItemId])) {
                    acc[curr[1].parentFileDataItemId] = [curr[0]]
                } else {
                    acc[curr[1].parentFileDataItemId] = [...acc[curr[1].parentFileDataItemId], curr[0]]
                }
            }
            return acc
        },
        {} as ZWPDictionary<string[]>
    )
)

const fileDataItemDescendantIdsByParent = createSelector(fileDataItemChildIdsByParent, (dict) =>
    reduceRightDictionary(
        dict,
        (acc, curr) => {
            acc[curr[0]] = [
                ...new Set([
                    ...(acc[curr[0]] ?? []),
                    ...(curr[1] ?? []),
                    ...(curr[1] ?? [])
                        .map((c1) => [...(acc[c1] ?? []), ...(acc[c1]?.compactMap((ac1) => acc[ac1]).flat() ?? [])])
                        .flat(),
                ]),
            ]
            return acc
        },
        {} as ZWPDictionary<string[]>
    )
)

const fileDataItemById = (id: string) => createSelector(fileDataItemEntities, (dict) => dict[id])
const fileDataItemsByIds = (ids: string[]) =>
    createSelector(fileDataItemEntities, (dict) => ids.compactMap((id) => dict[id]))
const fileDataItemsByParentId = (parentId: string) =>
    createSelector(allFileDataItems, (items) => items.filter((e) => e.parentFileDataItemId === parentId))
const childFileDataItemsCount = (id: string) => createSelector(fileDataItemsByParentId(id), ids => ids.length)

const fileDataItemsByParentIds = (parentIds: string[]) =>
    createSelector(allFileDataItems, (items) =>
        parentIds.reduce((acc, k) => {
            acc[k] = items.filter((e) => e.parentFileDataItemId === k)
            return acc
        }, {} as { [id: string]: Model.FileDataItem[] })
    )

const parentFileDataItemIdForFileDataItem = (id: string) => createSelector(fileDataItemById(id), (item) => item?.parentFileDataItemId)

export const FileDataSelectors = {
    fileDataItemIds,
    fileDataItemEntities,
    allFileDataItems,
    totalFileDataItems,
    directoryFileDataItemEntities,
    nonDirectoryFileDataItemEntities,
    fileDataItemChildIdsByParent,
    fileDataItemDescendantIdsByParent,
    fileDataItemById,
    fileDataItemsByIds,
    fileDataItemsByParentId,
    fileDataItemsByParentIds,
    parentFileDataItemIdForFileDataItem,
    childFileDataItemsCount
}
