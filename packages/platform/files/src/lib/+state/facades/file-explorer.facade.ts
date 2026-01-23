import { inject, Injectable } from '@angular/core'
import { isNil, isNull, ZWPDebuggableInjectable, ZWPRouterFacade, Nullable, randomEnumCase } from '@zwp/platform.common'
import { PlatformDummyData } from '@zwp/platform.dummy-data'
import { select, Store } from '@ngrx/store'
import { BehaviorSubject, firstValueFrom } from 'rxjs'
import { v4 } from 'uuid'
import { Model } from '../../model'
import { FileDataActions } from '../actions'
import { FileExplorerActions } from '../actions/file-explorer.actions'
import { Selectors } from '../selectors'
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop'
import { ActivatedRoute } from '@angular/router'
import { ZWPWindowLayoutFacade } from '@zwp/platform.layout'

// export const getLastActivatedRouteInChain = (activatedRoute: ActivatedRoute): ActivatedRoute => {
//   let lastRoute = activatedRoute;
//   while (lastRoute.firstChild) {
//     lastRoute = lastRoute.firstChild;
//   }
//   return lastRoute;
// };

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPFileExplorerFacade', options: { skipMethodDebugger: true } })
export class ZWPFileExplorerFacade  {
    private store = inject(Store)
    private dummyDataFacade = inject(PlatformDummyData.State.Facades.DummyDataFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    // private activatedRoute = inject(ActivatedRoute)

    allFileDataItems$ = this.store.pipe(select(Selectors.FileDataSelectors.allFileDataItems))
    selectedFileDataItem$ = this.store.pipe(select(Selectors.FileExplorerSelectors.selectedItems))
    selectedItemIds$ = this.store.pipe(select(Selectors.FileExplorerSelectors.selectedItemIds))
    selectedItemCount$ = this.store.pipe(select(Selectors.FileExplorerSelectors.selectedItemCount))
    hasCurrentDirectory$ = this.store.pipe(select(Selectors.FileExplorerSelectors.hasCurrentDirectory))
    currentDirectory$ = this.store.pipe(select(Selectors.FileExplorerSelectors.currentDirectory))
    currentDirectoryName$ = this.store.pipe(select(Selectors.FileExplorerSelectors.currentDirectoryName))
    currentDirectoryId$ = this.store.pipe(select(Selectors.FileExplorerSelectors.currentDirectoryId))
    currentDirectoryParentDirectoryId$ = this.store.pipe(select(Selectors.FileExplorerSelectors.currentDirectoryParentDirectoryId))
    // currentDirectoryChildren$ = this.store.pipe(select(FileExplorerSelectors.currentDirectoryChildren))
    // rootDirectories$ = this.store.pipe(select(FileExplorerSelectors.rootDirectoriesWithChildren))
    // descendantEntityIdsByParent$ = this.store.pipe(select(FileDataSelectors.descendantEntityIdsByParent))
    viewMode$ = this.store.pipe(select(Selectors.FileExplorerSelectors.viewMode))
    groupingViewMode$ = this.store.pipe(select(Selectors.FileExplorerSelectors.groupingViewMode))
    explorerAllChildren$ = this.store.pipe(select(Selectors.FileExplorerSelectors.explorerAllChildren))
    explorerAllFiles$ = this.store.pipe(select(Selectors.FileExplorerSelectors.explorerAllFiles))
    explorerAllFilesByFileType$ = this.store.pipe(select(Selectors.FileExplorerSelectors.explorerAllFilesByFileType))
    explorerAllDirectories$ = this.store.pipe(select(Selectors.FileExplorerSelectors.explorerAllDirectories))
    explorerAllChildrenCount$ = this.store.pipe(select(Selectors.FileExplorerSelectors.explorerAllChildrenCount))
    explorerAllFilesCount$ = this.store.pipe(select(Selectors.FileExplorerSelectors.explorerAllFilesCount))
    explorerAllDirectoriesCount$ = this.store.pipe(select(Selectors.FileExplorerSelectors.explorerAllDirectoriesCount))

    explorerItemDragPreview$ = this.store.pipe(select(Selectors.FileExplorerSelectors.dragPreview))

    fileExplorerPreviewTouch$ = new BehaviorSubject<boolean>(false)

    fileDataItemsByParentId$ = (parentId: string) => this.store.pipe(select(Selectors.FileDataSelectors.fileDataItemsByParentId(parentId)))
    fileDataItemById$ = (id: string) => this.store.pipe(select(Selectors.FileDataSelectors.fileDataItemById(id)))
    parentFileDataItemIdForFileDataItem$ = (id: string) => this.store.pipe(select(Selectors.FileDataSelectors.parentFileDataItemIdForFileDataItem(id)))
    childFileDataItemsCount$ = (id: string) => this.store.pipe(select(Selectors.FileDataSelectors.childFileDataItemsCount(id)))
    
    explorerItemIsSelected$ = (id: string) =>
        this.store.pipe(select(Selectors.FileExplorerSelectors.explorerItemIsSelected(id)))

    selectFileExplorerItem(id: string) {
        this.store.dispatch(FileExplorerActions.selectFileExplorerItem({ id }))
    }
    selectFileExplorerItems(ids: string[]) {
        this.store.dispatch(FileExplorerActions.selectFileExplorerItems({ ids }))
    }
    deselectAllFileExplorerItems() {
        this.store.dispatch(FileExplorerActions.deselectAllFileExplorerItems())
    }
    addFileExplorerItemToSelection(id: string) {
        this.store.dispatch(FileExplorerActions.addFileExplorerItemToSelection({ id }))
    }
    removeFileExplorerItemFromSelection(id: string) {
        this.store.dispatch(FileExplorerActions.removeFileExplorerItemFromSelection({ id }))
    }
    addFileExplorerItemsToSelection(ids: string[]) {
        this.store.dispatch(FileExplorerActions.addFileExplorerItemsToSelection({ ids }))
    }
    removeFileExplorerItemsFromSelection(ids: string[]) {
        this.store.dispatch(FileExplorerActions.removeFileExplorerItemsFromSelection({ ids }))
    }
    handleFileExplorerItemSelection(id: string) {
        this.store.dispatch(FileExplorerActions.handleFileExplorerItemSelection({ id }))
    }

    updateFileExplorerItemParent(id: string, previousParentId: Nullable<string>, parentId: Nullable<string>) {
        this.store.dispatch(FileDataActions.updateParent({ itemId: id, previousParentId, parentId }))
    }

    selectCurrentDirectory(id: Nullable<string>) {
        this.store.dispatch(FileExplorerActions.selectCurrentDirectory({ id }))
    }

    navigateDirectory(id: Nullable<string>) {
        // const lastChildRoute = getLastActivatedRouteInChain(this.activatedRoute)
        if (isNull(id)) {
            this.routerFacade.navigate(['platform', 'file-browser', 'root'])
        } else {
            this.routerFacade.navigate(['platform', 'file-browser', id])
        }
    }

    selectViewMode(mode: Model.FileExplorerViewMode) {
        this.store.dispatch(FileExplorerActions.selectViewMode({ mode }))
    }
    selectGroupingViewMode(mode: Model.FileExplorerGroupingViewMode) {
        this.store.dispatch(FileExplorerActions.selectGroupingViewMode({ mode }))
    }

    deleteFileExplorerItem(id: string) {
        this.store.dispatch(FileDataActions.remove({ id }))
    }

    deleteFileExplorerItems(ids: string[]) {
        this.store.dispatch(FileDataActions.removeMany({ ids }))
    }

    createRandomFileDataInDirectory(directoryId: string, isDir: boolean) {
        const saveDate = new Date()
        const randomFileDataItem: Model.FileDataItem = {
            id: v4(),
            name: this.dummyDataFacade.randomName(),
            isDir: isDir,
            createdAt: saveDate,
            updatedAt: saveDate,
            parentFileDataItemId: directoryId,
        }
        this.store.dispatch(FileDataActions.create({ item: randomFileDataItem }))
    }

    createManyDirectoriesInDirectory(directoryId: string) {
        // console.log(directoryId)
        // const firstLevelDirIds = new Array(Math.floor(Math.random() * 50)).fill(null).map(() => v4())
        // let entitiesToAdd: FileDataEntity[] = []
        // firstLevelDirIds.forEach(id => {
        //     const randomFileDataEntity: FileDataEntity = {
        //         id: id,
        //         name: this.dummyDataService.randomName(),
        //         parentFileDataEntityId: directoryId
        //     }
        //     entitiesToAdd.push(randomFileDataEntity)
        //     const secondLevelDirIds = new Array(Math.floor(Math.random() * 50)).fill(null).map(() => v4())
        //     secondLevelDirIds.forEach(secondId => {
        //         const randomFileDataEntity2: FileDataEntity = {
        //             id: secondId,
        //             name: this.dummyDataService.randomName(),
        //             parentFileDataEntityId: id
        //         }
        //         entitiesToAdd.push(randomFileDataEntity2)
        //     })
        // })
        // this.store.dispatch(FileDataActions.createMany({ entities: entitiesToAdd }))
    }

    createRandomFileData(isDir: boolean) {
        const saveDate = new Date()
        const randomFileDataItem: Model.FileDataItem = {
            id: v4(),
            name: this.dummyDataFacade.randomName(),
            createdAt: saveDate,
            updatedAt: saveDate,
            fileType: isDir ? undefined : randomEnumCase(Model.FileExplorerFileType),
            isDir: isDir,
        }
        this.store.dispatch(FileDataActions.create({ item: randomFileDataItem }))
    }

    createNewFile(parentDirectoryId: Nullable<string>, name: string, fileType: Model.FileExplorerFileType) {
        const saveDate = new Date()
        const newFileItem: Model.FileDataItem = {
            id: v4(),
            name: name,
            isDir: false,
            createdAt: saveDate,
            updatedAt: saveDate,
            parentFileDataItemId: isNull(parentDirectoryId) ? undefined : parentDirectoryId,
            fileType: fileType
        }
        this.store.dispatch(FileDataActions.create({ item: newFileItem }))
    }

    createNewDirectory(parentDirectoryId: Nullable<string>, name: string) {
        const saveDate = new Date()
        const newDirectoryItem: Model.FileDataItem = {
            id: v4(),
            name: name,
            isDir: true,
            createdAt: saveDate,
            updatedAt: saveDate,
            parentFileDataItemId: isNull(parentDirectoryId) ? undefined : parentDirectoryId
        }
        this.store.dispatch(FileDataActions.create({ item: newDirectoryItem }))
    }

    updateFileData(id: string, update: Partial<Model.FileDataItem>) {
        this.store.dispatch(FileDataActions.update({ itemId: id, update: update }))
    }

    async duplicateFileData(id: string, withNewParent: boolean = false, newParentId: string | undefined = undefined) {
        const fileData = await this.getFileDataItem(id)
        const fileDataChildren = await this.getChildFileDataItems(id)
        if (!isNull(fileData)) {
            const saveDate = new Date()
            const newDirectoryItem: Model.FileDataItem = {
                ...fileData,
                ...(withNewParent ? { parentFileDataItemId: newParentId } : {}),
                id: v4(),
                name: fileData.name + ' copy',
                createdAt: saveDate,
                updatedAt: saveDate
            }
            this.store.dispatch(FileDataActions.create({ item: newDirectoryItem }))

            if (fileDataChildren.length > 0) {
                for (const child of fileDataChildren) {
                    await this.duplicateFileData(child.id, true, newDirectoryItem.id)
                }
            }
        }
    }

    handleDragDropped(event: CdkDragDrop<any>, drops: CdkDropList[]) {
        let dropPointData: any
        drops.forEach((container) =>
            container?.getSortedItems().forEach((item: any) => {
                const boundingRect = item.element.nativeElement.getBoundingClientRect()
                if (
                    boundingRect.x < event.dropPoint.x &&
                    boundingRect.x + boundingRect.width > event.dropPoint.x &&
                    boundingRect.y < event.dropPoint.y &&
                    boundingRect.y + boundingRect.height > event.dropPoint.y &&
                    item.data.id !== event.item.data.id
                ) {
                    dropPointData = item.data
                }
            })
        )

        if (
            !isNil(dropPointData) &&
            !isNil(dropPointData.id) &&
            !isNil(event.item.data.id) &&
            dropPointData.id !== event.item.data.id &&
            dropPointData.isDir
        ) {
            this.store.dispatch(FileExplorerActions.handleFileExplorerItemDragDropped({ dropId: dropPointData.id }))
            // this.updateFileExplorerItemParent(event.item.data.id, null, dropPointData.id)
        }
    }

    handleDragStart(event: MouseEvent | TouchEvent, id: string, isDir: boolean, name: string) {
        event.preventDefault()
        event.stopPropagation()
        if (event.type === 'touchmove') {
            this.fileExplorerPreviewTouch$.next(true)
        } else {
            this.fileExplorerPreviewTouch$.next(false)
        }
        this.store.dispatch(FileExplorerActions.handleFileExplorerItemDragStart({ id, isDir, name }))
    }

    async presentNewFolderWindow() {
        this.windowLayoutFacade.addWindow({
            label: 'New Folder',
            icon: 'folder',
            componentName: 'FileExplorerNewFolderWindowComponent',
            position: { top: 'calc(50vh - 100px)', left: 'calc(50vw - 200px)', width: '400px', height: '200px' },
            data: {
                currentDirectoryId: await this.getCurrentDirectoryIdFromRoute()
            },
        })
    }

    async presentNewFileWindow() {
        this.windowLayoutFacade.addWindow({
            label: 'New File',
            icon: 'description',
            componentName: 'FileExplorerNewFileWindowComponent',
            position: { top: 'calc(50vh - 130px)', left: 'calc(50vw - 200px)', width: '400px', height: '260px' },
            data: {
                currentDirectoryId: await this.getCurrentDirectoryIdFromRoute()
            },
        })
    }

    async getCurrentDirectoryIdFromRoute(): Promise<Nullable<string>> {
        return await this.routerFacade.getNestedRouteParam('directoryId')
    }

    getParentFileDataItemId = async (id: string): Promise<string | null> => {
        return await firstValueFrom(this.parentFileDataItemIdForFileDataItem$(id)) ?? null
    }

    getFileDataItem = async (id: string): Promise<Model.FileDataItem | null> => {
        return await firstValueFrom(this.fileDataItemById$(id)) ?? null
    }

    getChildFileDataItems = async (id: string): Promise<Model.FileDataItem[]> => {
        return await firstValueFrom(this.fileDataItemsByParentId$(id))
    }
}
