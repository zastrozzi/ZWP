import { CdkDragDrop, CdkDragRelease, CdkDragStart, CdkDropList } from '@angular/cdk/drag-drop'
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
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
    selector: 'zwp-file-explorer-old-grid',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            zwpSelectionContainer
            (zwpSelectionChange)="handleSelectionContainerChange($event)"
            #explorerGrid
            *ngIf="{
                groupingViewMode: groupingViewMode$ | async,
                selectedItemIds: (selectedExplorerItemIds$ | async) ?? [],
                allChildren: explorerAllChildren$ | async,
                allDirectories: (explorerAllDirectories$ | async) ?? [],
                allFiles: (explorerAllFiles$ | async) ?? [],
                gridColumns: fileGridColumns$ | async,
                gridWidth: (explorerGridWidth$ | async) ?? 0
            } as fileExplorerGridData"
            (click)="fileExplorerGridData.selectedItemIds.length > 0 ? deselectAllFileExplorerItems() : null"
            fxLayout="column"
            fxFlex="grow"
            fxFlexFill
            cdkDropListGroup
        >
            <div *ngIf="fileExplorerGridData.groupingViewMode === groupingViewModeEnum.combined" fxLayout="row" zwpPadding="10">
                <mat-grid-list
                    [cols]="fileExplorerGridData.gridColumns"
                    rowHeight="120px"
                    gutterSize="10px"
                    [style.width]="fileExplorerGridData.gridWidth - 20 + 'px'"
                    cdkDropList
                    (cdkDropListDropped)="handleDragDropped($event)"
                    [cdkDropListEnterPredicate]="returnFalse"
                    [cdkDropListSortingDisabled]="true"
                >
                    <mat-grid-tile
                        zwpSelectionContainerItem
                        [zwpSelectionContainerItemId]="child.id"
                        *ngFor="let child of fileExplorerGridData.allChildren"
                        cdkDrag
                        [cdkDragData]="child"
                        (cdkDragStarted)="handleDragStart($event)"
                        [cdkDragStartDelay]="{ touch: 150, mouse: 0 }"
                    >
                        <zwp-file-explorer-drag-preview *cdkDragPreview></zwp-file-explorer-drag-preview>
                        <div
                            (contextmenu)="openContextMenu($event, child)"
                            (dblclick)="child.isDir ? navigateDirectory(child.id) : null"
                            (click)="handleFileExplorerItemSelection($event, child.id)"
                            fxLayout="column"
                            fxLayoutAlign="center center"
                            fxFlexFill
                            fxLayoutGap="5px"
                            [style.backgroundColor]="
                                fileExplorerGridData.selectedItemIds.includes(child.id)
                                    ? ('primary' | zwpColorTheme : { opacity: 0.3 })
                                    : ('quaternary-system-fill' | zwpColorTheme)
                            "
                            zwpCorners="8"
                            zwpPadding="10"
                        >
                            <div fxFlex="grow"></div>
                            <mat-icon
                                fxFlex="noshrink"
                                [zwpTextStyle]="'title1'"
                                [inline]="true"
                                [style.height]="'unset'"
                                [style.width]="'unset'"
                                [style.color]="'primary' | zwpColorTheme"
                            >
                                {{ child.isDir ? 'folder' : 'description' }}
                            </mat-icon>
                            <div fxFlex="grow"></div>
                            <span
                                [style.textAlign]="'center'"
                                [style.textOverflow]="'ellipsis'"
                                [style.whiteSpace]="'nowrap'"
                                [zwpTextStyle]="'body1'"
                                [style.color]="'label' | zwpColorTheme"
                            >
                                {{ child.name }}
                            </span>
                        </div>
                    </mat-grid-tile>
                </mat-grid-list>
            </div>
            <div *ngIf="fileExplorerGridData.groupingViewMode === groupingViewModeEnum.itemType" fxLayout="row">
                <div fxLayout="column" fxFlex="grow">
                    <div #spacerGrid></div>
                    <div
                        *ngIf="fileExplorerGridData.allDirectories.length !== 0"
                        fxLayout="row"
                        zwpSticky
                        [spacer]="spacerGrid"
                        [scrollContainer]="'.file-explorer-container-scrollable'"
                        zwpPadding="10 0 10 0"
                        [style.backgroundColor]="'system-background' | zwpColorTheme"
                        [style.zIndex]="'1'"
                    >
                        <span
                            fxFlexOffset="10px"
                            [zwpTextStyle]="'body1'"
                            [style.color]="'label' | zwpColorTheme"
                            zwpCorners="5"
                            >{{ fileExplorerGridData.allDirectories.length === 0 ? 'No Folders' : 'Folders' }}</span
                        >
                    </div>
                    <div
                        *ngIf="fileExplorerGridData.allDirectories.length !== 0"
                        fxLayout="row"
                        fxFlex="grow"
                        zwpPadding="10"
                        cdkDropList
                        (cdkDropListDropped)="handleDragDropped($event)"
                        [cdkDropListEnterPredicate]="returnFalse"
                        [cdkDropListSortingDisabled]="true"
                    >
                        <mat-grid-list
                            [cols]="fileExplorerGridData.gridColumns"
                            rowHeight="50px"
                            fxFlex="grow"
                            gutterSize="10px"
                            [style.width]="fileExplorerGridData.gridWidth - 20 + 'px'"
                        >
                            <mat-grid-tile
                                zwpSelectionContainerItem
                                [zwpSelectionContainerItemId]="directory.id"
                                *ngFor="let directory of fileExplorerGridData.allDirectories"
                                cdkDrag
                                [cdkDragData]="directory"
                                (cdkDragStarted)="handleDragStart($event)"
                                [cdkDragStartDelay]="{ touch: 150, mouse: 0 }"
                            >
                                <zwp-file-explorer-drag-preview *cdkDragPreview></zwp-file-explorer-drag-preview>
                                <div
                                    (contextmenu)="openContextMenu($event, directory)"
                                    (dblclick)="navigateDirectory(directory.id)"
                                    (click)="handleFileExplorerItemSelection($event, directory.id)"
                                    fxLayout="row"
                                    fxLayoutAlign="start center"
                                    fxFlexFill
                                    fxLayoutGap="15px"
                                    [style.backgroundColor]="
                                        fileExplorerGridData.selectedItemIds.includes(directory.id)
                                            ? ('primary' | zwpColorTheme : { opacity: 0.3 })
                                            : ('quaternary-system-fill' | zwpColorTheme)
                                    "
                                    zwpCorners="8"
                                    zwpPadding="0 15 0 20"
                                >
                                    <mat-icon
                                        [zwpTextStyle]="'headline'"
                                        [inline]="true"
                                        [style.height]="'auto'"
                                        [style.width]="'unset'"
                                        [style.color]="'primary' | zwpColorTheme"
                                        >folder</mat-icon
                                    >
                                    <span
                                        [zwpTextStyle]="'body1'"
                                        [style.color]="'label' | zwpColorTheme"
                                        fxFlex="grow"
                                        >{{ directory.name }}</span
                                    >
                                </div>
                            </mat-grid-tile>
                        </mat-grid-list>
                    </div>
                </div>
            </div>
            <div *ngIf="fileExplorerGridData.groupingViewMode === groupingViewModeEnum.itemType" fxLayout="row">
                <div fxLayout="column" fxFlex="grow">
                    <div #spacerGrid></div>
                    <div
                        *ngIf="fileExplorerGridData.allFiles.length !== 0"
                        fxLayout="row"
                        fxLayout="row"
                        zwpSticky
                        [spacer]="spacerGrid"
                        [scrollContainer]="'.file-explorer-container-scrollable'"
                        zwpPadding="10 0 10 0"
                        [style.backgroundColor]="'system-background' | zwpColorTheme"
                        [style.zIndex]="'1'"
                    >
                        <span
                            fxFlexOffset="10px"
                            [zwpTextStyle]="'body1'"
                            [style.color]="'label' | zwpColorTheme"
                            zwpCorners="5"
                            >{{ fileExplorerGridData.allFiles.length === 0 ? 'No Files' : 'Files' }}</span
                        >
                    </div>
                    <div
                        *ngIf="fileExplorerGridData.allFiles.length !== 0"
                        fxLayout="row"
                        fxFlex="grow"
                        zwpPadding="10"
                        cdkDropList
                        [cdkDropListEnterPredicate]="returnFalse"
                        [cdkDropListSortingDisabled]="true"
                        (cdkDropListDropped)="handleDragDropped($event)"
                    >
                        <mat-grid-list
                            [cols]="fileGridColumns$ | async"
                            rowHeight="120px"
                            fxFlex="grow"
                            gutterSize="10px"
                            [style.width]="((explorerGridWidth$ | async) ?? 0) - 20 + 'px'"
                        >
                            <mat-grid-tile
                                zwpSelectionContainerItem
                                [zwpSelectionContainerItemId]="file.id"
                                *ngFor="let file of fileExplorerGridData.allFiles"
                                cdkDrag
                                [cdkDragData]="file"
                                (cdkDragStarted)="handleDragStart($event)"
                                [cdkDragStartDelay]="{ touch: 150, mouse: 0 }"
                            >
                                <zwp-file-explorer-drag-preview *cdkDragPreview></zwp-file-explorer-drag-preview>
                                <div
                                    (contextmenu)="openContextMenu($event, file)"
                                    (click)="handleFileExplorerItemSelection($event, file.id)"
                                    fxLayout="column"
                                    fxLayoutAlign="center center"
                                    fxFlexFill
                                    fxLayoutGap="5px"
                                    [style.backgroundColor]="
                                        fileExplorerGridData.selectedItemIds.includes(file.id)
                                            ? ('primary' | zwpColorTheme : { opacity: 0.3 })
                                            : ('quaternary-system-fill' | zwpColorTheme)
                                    "
                                    zwpCorners="8"
                                    zwpPadding="10"
                                >
                                    <div fxFlex="grow"></div>
                                    <mat-icon
                                        fxFlex="noshrink"
                                        [zwpTextStyle]="'title1'"
                                        [inline]="true"
                                        [style.height]="'unset'"
                                        [style.width]="'unset'"
                                        [style.color]="'primary' | zwpColorTheme"
                                        >description</mat-icon
                                    >
                                    <div fxFlex="grow"></div>
                                    <span
                                        [style.textAlign]="'center'"
                                        [style.textOverflow]="'ellipsis'"
                                        [style.whiteSpace]="'nowrap'"
                                        [zwpTextStyle]="'body1'"
                                        [style.color]="'label' | zwpColorTheme"
                                        >{{ file.name }}</span
                                    >
                                </div>
                            </mat-grid-tile>
                        </mat-grid-list>
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class FileExplorerOldGridComponent implements AfterViewInit, OnDestroy {
    @ViewChild('explorerGrid', { static: false }) explorerGrid: ElementRef | undefined
    @ViewChildren(CdkDropList) dropsQuery: QueryList<CdkDropList> | undefined

    private readonly subscriptions: Subscription = new Subscription()
    drops: CdkDropList[] | undefined

    constructor(
        private fileExplorerFacade: ZWPFileExplorerFacade,
        private zone: NgZone,
        private colorThemePipe: ZWPColorThemePipe,
        private menuFacade: ZWPMenuLayoutFacade
    ) {}

    groupingViewModeEnum = Model.FileExplorerGroupingViewMode

    groupingViewMode$ = this.fileExplorerFacade.groupingViewMode$

    explorerAllChildren$ = this.fileExplorerFacade.explorerAllChildren$
    explorerAllFiles$ = this.fileExplorerFacade.explorerAllFiles$
    explorerAllDirectories$ = this.fileExplorerFacade.explorerAllDirectories$
    selectedExplorerItemIds$ = this.fileExplorerFacade.selectedItemIds$

    explorerGridWidthObserver: ResizeObserver | undefined
    explorerGridWidth$ = new BehaviorSubject<number>(0)
    folderGridColumns$ = this.explorerGridWidth$.pipe(map((w) => Math.floor((w - 20) / 250)))
    fileGridColumns$ = this.explorerGridWidth$.pipe(map((w) => Math.floor((w - 20) / 120)))

    ngAfterViewInit(): void {
        this.explorerGridWidthObserver = new ResizeObserver((entries) => {
            this.zone.run(() => {
                this.explorerGridWidth$.next(entries[0].contentRect.width)
            })
        })

        this.explorerGridWidthObserver.observe(this.explorerGrid?.nativeElement)

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

    handleSelectionContainerChange(ids: string[]) {
        this.zone.run(() => {
            this.fileExplorerFacade.selectFileExplorerItems(ids)
        })
    }

    navigateDirectory(id: Nullable<string>) {
        this.fileExplorerFacade.navigateDirectory(id)
    }
    handleFileExplorerItemSelection(event: MouseEvent | TouchEvent, id: string) {
        event.stopPropagation()
        this.fileExplorerFacade.handleFileExplorerItemSelection(id)
    }
    deselectAllFileExplorerItems() {
        // this.fileExplorerFacade.deselectAllFileExplorerItems()
    }

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
