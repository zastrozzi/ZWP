import { inject, Injectable } from '@angular/core'
import { isNil, ZWPDebuggableInjectable, ZWPKeyboardFacade, ZWPRouterFacade } from '@zwp/platform.common'
import { ZWPMenuLayoutFacade } from '@zwp/platform.layout'
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects'
import { routerNavigatedAction } from '@ngrx/router-store'
import { map, tap, withLatestFrom } from 'rxjs'
import { FileExplorerItemContextMenuComponent } from '../../components'
import { FileDataActions, FileExplorerActions } from '../actions'
import { Facades } from '../facades'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPFileExplorerEffects', options: { skipMethodDebugger: true } })
export class ZWPFileExplorerEffects {
    private actions$ = inject(Actions)
    private routerFacade = inject(ZWPRouterFacade)
    private fileExplorerFacade = inject(Facades.ZWPFileExplorerFacade)
    private keyboardFacade = inject(ZWPKeyboardFacade)
    private menuLayoutFacade = inject(ZWPMenuLayoutFacade)

    constructor() {
        this.menuLayoutFacade.registerMenuComponentType(FileExplorerItemContextMenuComponent)
    }

    selectCurrentDirectoryFromRouter$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(routerNavigatedAction),
                withLatestFrom(this.routerFacade.url$, this.routerFacade.routeParams$),
                tap((tuple) => {
                    if (tuple[1].startsWith('/file-browser')) {
                        if (!isNil(tuple[2]['directoryId'])) {
                            this.fileExplorerFacade.selectCurrentDirectory(tuple[2]['directoryId'])
                        } else {
                            this.fileExplorerFacade.selectCurrentDirectory(null)
                        }
                    }
                })
            ),
        { dispatch: false }
    )

    deselectAllFileExplorerItemsOnCurrentDirectoryChange$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FileExplorerActions.selectCurrentDirectory),
            map(() => FileExplorerActions.deselectAllFileExplorerItems())
        )
    )

    deselectAllFileExplorerItemsOnUpdateParent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FileDataActions.updateParent),
            map(() => FileExplorerActions.deselectAllFileExplorerItems())
        )
    )

    deselectAllFileExplorerItemsOnUpdateParents$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FileDataActions.updateParents),
            map(() => FileExplorerActions.deselectAllFileExplorerItems())
        )
    )

    handleFileExplorerItemSelection$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FileExplorerActions.handleFileExplorerItemSelection),
            map((action) => action.id),
            withLatestFrom(
                this.fileExplorerFacade.selectedItemIds$,
                this.keyboardFacade.metaKeyActive$,
                this.keyboardFacade.shiftKeyActive$
            ),
            map(([id, selectedIds, metaKeyActive, shiftKeyActive]) => {
                const alreadySelected = selectedIds.includes(id)
                if (alreadySelected) {
                    if (metaKeyActive || shiftKeyActive) {
                        return FileExplorerActions.removeFileExplorerItemFromSelection({ id })
                    } else {
                        if (selectedIds.length > 1) {
                            return FileExplorerActions.selectFileExplorerItem({ id })
                        } else {
                            return FileExplorerActions.deselectAllFileExplorerItems()
                        }
                    }
                } else {
                    if (metaKeyActive || shiftKeyActive) {
                        return FileExplorerActions.addFileExplorerItemToSelection({ id })
                    } else {
                        return FileExplorerActions.selectFileExplorerItem({ id })
                    }
                }
            })
        )
    )

    handleFileExplorerDragStartDragPreview$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FileExplorerActions.handleFileExplorerItemDragStartPreview),
            withLatestFrom(this.fileExplorerFacade.selectedItemIds$),
            map(([action, selectedIds]) => {
                const alreadySelected = selectedIds.includes(action.id)
                let selectionCount = selectedIds.length
                if (!alreadySelected) {
                    selectionCount++
                }
                const isMulti = selectionCount > 1
                const icon = isMulti ? 'pan_tool' : action.isDir ? 'folder' : 'description'
                const label = isMulti ? `Moving ${selectionCount} items` : action.name

                return FileExplorerActions.setFileExplorerItemDragPreview({
                    isMulti,
                    itemCount: selectionCount,
                    icon,
                    label,
                })
            })
        )
    )

    handleFileExplorerDragStartItemSelection$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FileExplorerActions.handleFileExplorerItemDragStart),
            withLatestFrom(
                this.fileExplorerFacade.selectedItemIds$,
                this.keyboardFacade.metaKeyActive$,
                this.keyboardFacade.shiftKeyActive$
            ),
            map(([action, selectedIds, metaKeyActive, shiftKeyActive]) => {
                const alreadySelected = selectedIds.includes(action.id)
                if (alreadySelected) {
                    return FileExplorerActions.selectFileExplorerItems({ ids: selectedIds })
                } else {
                    if (metaKeyActive || shiftKeyActive) {
                        return FileExplorerActions.addFileExplorerItemToSelection({ id: action.id })
                    } else {
                        return FileExplorerActions.selectFileExplorerItem({ id: action.id })
                    }
                }
            })
        )
    )

    handleFileExplorerDragStartPreview$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FileExplorerActions.handleFileExplorerItemDragStart),
            map((action) =>
                FileExplorerActions.handleFileExplorerItemDragStartPreview({
                    id: action.id,
                    isDir: action.isDir,
                    name: action.name,
                })
            )
        )
    )

    handleFileExplorerDragDropped$ = createEffect(() =>
        this.actions$.pipe(
            ofType(FileExplorerActions.handleFileExplorerItemDragDropped),
            withLatestFrom(this.fileExplorerFacade.selectedItemIds$),
            map(([action, selectedIds]) => {
                const dropInSelection = selectedIds.includes(action.dropId)
                if (dropInSelection) {
                    return FileDataActions.updateParentsFailure({ reason: 'Cannot move item into itself' })
                } else {
                    return FileDataActions.updateParents({
                        updates: selectedIds.map((id) => ({ itemId: id, parentId: action.dropId })),
                    })
                }
            })
        )
    )
}
