import { CdkDragDrop, CdkDragRelease, CdkDragStart, CdkDropList } from '@angular/cdk/drag-drop'
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    NgZone,
    OnDestroy,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core'
import { ZWPColorThemePipe, isUndefined, Nullable } from '@zwp/platform.common'
import { ZWPMenuLayoutFacade } from '@zwp/platform.layout'
import { BehaviorSubject, map, Subscription } from 'rxjs'
import { ZWPFileExplorerFacade } from '../../+state/facades/file-explorer.facade'
import { Model } from '../../model'

@Component({
    selector: 'zwp-file-explorer-grid',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            zwpSelectionContainer
            (zwpSelectionChange)="handleSelectionContainerChange($event, fileExplorerGridData.selectedItemIds)"
            #explorerGrid
            *ngIf="{
                groupingViewMode: groupingViewMode$ | async,
                selectedItemIds: (selectedExplorerItemIds$ | async) ?? [],
                allChildren: explorerAllChildren$ | async,
                allDirectories: (explorerAllDirectories$ | async) ?? [],
                allFiles: (explorerAllFiles$ | async) ?? [],
                allFilesByFileType: (explorerAllFilesByFileType$ | async) ?? [],
                gridColumns: fileGridColumns$ | async,
                gridWidth: (explorerGridWidth$ | async) ?? 0
            } as fileExplorerGridData"
            fxLayout="column"
            fxFlex="grow"
            cdkDropListGroup
            zwpVScroll
        >
            <div *ngIf="fileExplorerGridData.groupingViewMode" fxLayout="row" zwpPadding="10">
                <mat-grid-list
                    [cols]="fileExplorerGridData.gridColumns"
                    rowHeight="10px"
                    gutterSize="10px"
                    [style.width]="fileExplorerGridData.gridWidth - 20 + 'px'"
                    cdkDropList
                    (cdkDropListDropped)="handleDragDropped($event)"
                    [cdkDropListEnterPredicate]="returnFalse"
                    [cdkDropListSortingDisabled]="true"
                >
                    <ng-container *ngIf="fileExplorerGridData.groupingViewMode === groupingViewModeEnum.combined">
                        <mat-grid-tile
                            [rowspan]="6" [colspan]="1"
                            zwpSelectionContainerItem
                            [zwpSelectionContainerItemId]="child.id"
                            *ngFor="let child of fileExplorerGridData.allChildren"
                            cdkDrag
                            [cdkDragData]="child"
                            (cdkDragStarted)="handleDragStart($event)"
                            [cdkDragStartDelay]="{ touch: 150, mouse: 0 }"
                        >
                            <zwp-file-explorer-drag-preview *cdkDragPreview/>
                            <zwp-file-explorer-grid-item
                                fxFlexFill
                                (contextmenu)="openContextMenu($event, child)"
                                [fileDataItem]="child"
                                [isSelected]="fileExplorerGridData.selectedItemIds.includes(child.id)"
                                (clicked)="handleFileExplorerItemSelection($event)"
                                (doubleClicked)="handleFileExplorerItemDoubleClick($event)"
                            />
                        </mat-grid-tile>
                    </ng-container>
                    <ng-container *ngIf="fileExplorerGridData.groupingViewMode === groupingViewModeEnum.itemType">
                        <mat-grid-tile
                            [colspan]="fileExplorerGridData.gridColumns" [rowspan]="2"
                            zwpBackgroundColor="quaternary-system-fill" zwpCorners="20"
                        >
                            <span zwpDisableSelection fxFlexOffset="15px" [zwpTextStyle]="'body3'" zwpColor="label" fxFlex="noshrink"
                            >Folders</span>
                        </mat-grid-tile>
                        <mat-grid-tile
                            [rowspan]="6"
                            zwpSelectionContainerItem
                            [zwpSelectionContainerItemId]="child.id"
                            *ngFor="let child of fileExplorerGridData.allDirectories"
                            cdkDrag
                            [cdkDragData]="child"
                            (cdkDragStarted)="handleDragStart($event)"
                            [cdkDragStartDelay]="{ touch: 150, mouse: 0 }"
                        >
                            <zwp-file-explorer-drag-preview *cdkDragPreview/>
                            <zwp-file-explorer-grid-item
                                (contextmenu)="openContextMenu($event, child)"
                                fxFlexFill
                                [fileDataItem]="child"
                                [isSelected]="fileExplorerGridData.selectedItemIds.includes(child.id)"
                                (clicked)="handleFileExplorerItemSelection($event)"
                                (doubleClicked)="handleFileExplorerItemDoubleClick($event)"
                            />
                        </mat-grid-tile>

                        <mat-grid-tile
                            [colspan]="fileExplorerGridData.gridColumns" [rowspan]="2"
                            zwpBackgroundColor="quaternary-system-fill" zwpCorners="20"
                        >
                            <span zwpDisableSelection fxFlexOffset="15px" [zwpTextStyle]="'body3'" zwpColor="label" fxFlex="noshrink"
                            >Files</span>
                        </mat-grid-tile>
                        <mat-grid-tile
                            [rowspan]="6"
                            zwpSelectionContainerItem
                            [zwpSelectionContainerItemId]="child.id"
                            *ngFor="let child of fileExplorerGridData.allFiles"
                            cdkDrag
                            [cdkDragData]="child"
                            (cdkDragStarted)="handleDragStart($event)"
                            [cdkDragStartDelay]="{ touch: 150, mouse: 0 }"
                        >
                            <zwp-file-explorer-drag-preview *cdkDragPreview/>
                            <zwp-file-explorer-grid-item
                                (contextmenu)="openContextMenu($event, child)"
                                fxFlexFill
                                [fileDataItem]="child"
                                [isSelected]="fileExplorerGridData.selectedItemIds.includes(child.id)"
                                (clicked)="handleFileExplorerItemSelection($event)"
                                (doubleClicked)="handleFileExplorerItemDoubleClick($event)"
                            />
                        </mat-grid-tile>
                    </ng-container>
                    <ng-container *ngIf="fileExplorerGridData.groupingViewMode === groupingViewModeEnum.fileType">
                        <mat-grid-tile
                            [colspan]="fileExplorerGridData.gridColumns" [rowspan]="2"
                            zwpBackgroundColor="quaternary-system-fill" zwpCorners="20"
                        >
                            <span zwpDisableSelection fxFlexOffset="15px" [zwpTextStyle]="'body3'" zwpColor="label" fxFlex="noshrink"
                            >Folders</span>
                        </mat-grid-tile>
                        <mat-grid-tile
                            [rowspan]="6"
                            zwpSelectionContainerItem
                            [zwpSelectionContainerItemId]="child.id"
                            *ngFor="let child of fileExplorerGridData.allDirectories"
                            cdkDrag
                            [cdkDragData]="child"
                            (cdkDragStarted)="handleDragStart($event)"
                            [cdkDragStartDelay]="{ touch: 150, mouse: 0 }"
                        >
                            <zwp-file-explorer-drag-preview *cdkDragPreview/>
                            <zwp-file-explorer-grid-item
                                (contextmenu)="openContextMenu($event, child)"
                                fxFlexFill
                                [fileDataItem]="child"
                                [isSelected]="fileExplorerGridData.selectedItemIds.includes(child.id)"
                                (clicked)="handleFileExplorerItemSelection($event)"
                                (doubleClicked)="handleFileExplorerItemDoubleClick($event)"
                            />
                        </mat-grid-tile>
                        <ng-container *ngFor="let filesByType of fileExplorerGridData.allFilesByFileType">
                            <mat-grid-tile
                                [colspan]="fileExplorerGridData.gridColumns" [rowspan]="2"
                                zwpBackgroundColor="quaternary-system-fill" zwpCorners="20"
                            >
                                <span zwpDisableSelection fxFlexOffset="15px" [zwpTextStyle]="'body3'" zwpColor="label" fxFlex="noshrink"
                                >{{ filesByType.enumKey | zwpTransformEnum : fileTypeLabelEnumPipe }}</span>
                            </mat-grid-tile>
                            <mat-grid-tile
                                [rowspan]="6"
                                zwpSelectionContainerItem
                                [zwpSelectionContainerItemId]="child.id"
                                *ngFor="let child of filesByType.values"
                                cdkDrag
                                [cdkDragData]="child"
                                (cdkDragStarted)="handleDragStart($event)"
                                [cdkDragStartDelay]="{ touch: 150, mouse: 0 }"
                            >
                                <zwp-file-explorer-drag-preview *cdkDragPreview/>
                                <zwp-file-explorer-grid-item
                                    (contextmenu)="openContextMenu($event, child)"
                                    fxFlexFill
                                    [fileDataItem]="child"
                                    [isSelected]="fileExplorerGridData.selectedItemIds.includes(child.id)"
                                    (clicked)="handleFileExplorerItemSelection($event)"
                                    (doubleClicked)="handleFileExplorerItemDoubleClick($event)"
                                />
                            </mat-grid-tile>
                        </ng-container>
                        
                    </ng-container>
                </mat-grid-list>
            </div>
        </div>
    `,
})
export class FileExplorerGridComponent implements AfterViewInit, OnDestroy {
    @ViewChild('explorerGrid', { static: false }) explorerGrid!: ElementRef
    @ViewChildren(CdkDropList) dropsQuery: QueryList<CdkDropList> | undefined

    private readonly subscriptions: Subscription = new Subscription()
    drops: CdkDropList[] | undefined

    private fileExplorerFacade = inject(ZWPFileExplorerFacade)
    private zone = inject(NgZone)
    private colorThemePipe = inject(ZWPColorThemePipe)
    private menuFacade = inject(ZWPMenuLayoutFacade)

    groupingViewModeEnum = Model.FileExplorerGroupingViewMode
    fileTypeIconEnumPipe = Model.fileExplorerFileTypeIconPipeSignature
    fileTypeLabelEnumPipe = Model.fileExplorerFileTypeLabelPipeSignature

    fileGridTileWidth = 115
    fileGridTileHeight = 110

    groupingViewMode$ = this.fileExplorerFacade.groupingViewMode$

    explorerAllChildren$ = this.fileExplorerFacade.explorerAllChildren$
    explorerAllFiles$ = this.fileExplorerFacade.explorerAllFiles$
    explorerAllDirectories$ = this.fileExplorerFacade.explorerAllDirectories$
    selectedExplorerItemIds$ = this.fileExplorerFacade.selectedItemIds$
    explorerAllFilesByFileType$ = this.fileExplorerFacade.explorerAllFilesByFileType$

    explorerGridWidthObserver: ResizeObserver | undefined
    explorerGridWidth$ = new BehaviorSubject<number>(0)
    folderGridColumns$ = this.explorerGridWidth$.pipe(map((w) => Math.floor((w - 20) / 250)))
    fileGridColumns$ = this.explorerGridWidth$.pipe(map((w) => Math.floor((w - 20) / this.fileGridTileWidth)))

    ngAfterViewInit(): void {
        this.explorerGridWidthObserver = new ResizeObserver((entries) => {
            this.zone.run(() => {
                this.explorerGridWidth$.next(entries[0].contentRect.width)
            })
        })

        this.explorerGridWidthObserver.observe(this.explorerGrid.nativeElement)

        const dropsQueryChangesSub = this.dropsQuery?.changes.subscribe(() => {
            this.drops = this.dropsQuery?.toArray()
        })

        Promise.resolve().then(() => {
            this.drops = this.dropsQuery?.toArray()
        })

        this.subscriptions.add(dropsQueryChangesSub)
    }

    ngOnDestroy(): void {
        this.explorerGridWidthObserver?.unobserve(this.explorerGrid?.nativeElement)
        this.subscriptions.unsubscribe()
    }

    deleteExplorerItem(id: string) {
        this.fileExplorerFacade.deleteFileExplorerItem(id)
    }

    handleSelectionContainerChange(ids: string[], currentlySelectedIds: string[]) {
        this.zone.run(() => {
            if (ids.length > 0) {
                this.fileExplorerFacade.selectFileExplorerItems(ids)
            } else if (currentlySelectedIds.length > 0) {
                this.fileExplorerFacade.deselectAllFileExplorerItems()
            }
        })
    }

    navigateDirectory(id: Nullable<string>) {
        this.fileExplorerFacade.navigateDirectory(id)
    }

    handleFileExplorerItemDoubleClick(id: string) {
        this.navigateDirectory(id)
    }

    handleFileExplorerItemSelection(id: string) {
        // event.stopPropagation()
        this.fileExplorerFacade.handleFileExplorerItemSelection(id)
    }
    // deselectAllFileExplorerItems(event: MouseEvent | TouchEvent) {
    //     event.preventDefault()
    //     this.fileExplorerFacade.deselectAllFileExplorerItems()
    // }

    handleDragStart(event: CdkDragStart) {
        if (
            !isUndefined(event.source.data.id) &&
            !isUndefined(event.source.data.name) &&
            !isUndefined(event.source.data.isDir)
        ) {
            this.fileExplorerFacade.handleDragStart(
                event.event,
                event.source.data.id,
                event.source.data.isDir,
                event.source.data.name
            )
            event.source.getPlaceholderElement().style.backgroundColor = this.colorThemePipe.transform('primary', {
                opacity: 0.3,
            })
            event.source.getPlaceholderElement().style.borderRadius = '8px'
        }
    }

    // handleDragMove(event: CdkDragMove) {
    //     if (!isUndefined(this.drops)) {
    //         // this.fileExplorerFacade
    //     }
    // }

    handleDragEnd(event: CdkDragRelease) {
        // console.log('drag end', event)
    }

    handleDragDropped(event: CdkDragDrop<any>) {
        if (!isUndefined(this.drops)) {
            this.fileExplorerFacade.handleDragDropped(event, this.drops)
        }

        // let dropPointData: any
        // this.drops?.forEach(container => container?.getSortedItems().forEach((item: any) => {
        //     let boundingRect = item.element.nativeElement.getBoundingClientRect()
        //     if ((boundingRect.x < event.dropPoint.x) && ((boundingRect.x + boundingRect.width) > event.dropPoint.x) && (boundingRect.y < event.dropPoint.y) && ((boundingRect.y + boundingRect.height) > event.dropPoint.y) && item.data.id !== event.item.data.id) {
        //         dropPointData = item.data
        //     }
        // }))

        // if (!isNil(dropPointData) && !isNil(dropPointData.id) && !isNil(event.item.data.id) && dropPointData.id !== event.item.data.id && dropPointData.isDir) {
        //     this.fileExplorerFacade.updateFileExplorerItemParent(event.item.data.id, null, dropPointData.id)
        // }
    }

    returnFalse() {
        return false
    }

    openContextMenu(event: any, entity: Model.FileDataItem) {
        this.menuFacade.openMenu(
            'FileExplorerItemContextMenuComponent',
            { x: event.clientX, y: event.clientY },
            'after',
            'below',
            entity
        )
        return false
    }
}
