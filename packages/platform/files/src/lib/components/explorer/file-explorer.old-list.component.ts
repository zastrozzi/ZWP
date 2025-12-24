import { CdkDragDrop, CdkDragStart, CdkDropList } from '@angular/cdk/drag-drop'
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, QueryList, ViewChildren } from '@angular/core'
import { ZWPColorThemePipe, isUndefined, Nullable } from '@zwp/platform.common'
import { ZWPMenuLayoutFacade } from '@zwp/platform.layout'
import { Subscription } from 'rxjs'
import { ZWPFileExplorerFacade } from '../../+state/facades/file-explorer.facade'
import { Model } from '../../model'

@Component({
    selector: 'zwp-file-explorer-old-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            *ngIf="groupingViewMode$ | async as groupingViewMode"
            fxLayout="column"
            fxFlex="grow"
            fxFlexFill
            cdkDropListGroup
        >
            <ng-container *ngIf="selectedExplorerItemIds$ | async as selectedItemIds">
                <div
                    *ngIf="groupingViewMode === groupingViewModeCombined"
                    fxLayout="row"
                    fxFlex="grow"
                    fxLayoutAlign="start stretch"
                >
                    <div
                        *ngIf="explorerAllChildren$ | async as allChildren"
                        fxLayout="column"
                        fxFlex="grow"
                        cdkDropList
                        (cdkDropListDropped)="handleDragDropped($event)"
                        [cdkDropListEnterPredicate]="returnFalse"
                        [cdkDropListSortingDisabled]="true"
                    >
                        <div
                            *ngFor="let child of allChildren; let last = last"
                            (contextmenu)="openContextMenu($event, child)"
                            (click)="handleFileExplorerItemSelection(child.id)"
                            (dblclick)="child.isDir ? navigateDirectory(child.id) : null"
                            fxLayout="row"
                            zwpPadding="15 10 15 10"
                            fxLayoutAlign="start center"
                            fxLayoutGap="15px"
                            [style.borderBottom]="last ? '' : 'solid 1px'"
                            [style.borderBottomColor]="'separator' | zwpColorTheme"
                            [style.backgroundColor]="
                                selectedItemIds.includes(child.id)
                                    ? ('primary' | zwpColorTheme : { opacity: 0.3 })
                                    : ('clear' | zwpColorTheme)
                            "
                            cdkDrag
                            [cdkDragData]="child"
                            (cdkDragStarted)="handleDragStart($event)"
                            [cdkDragStartDelay]="{ touch: 150, mouse: 0 }"
                        >
                            <zwp-file-explorer-drag-preview *cdkDragPreview></zwp-file-explorer-drag-preview>
                            <mat-icon
                                fxFlex="noshrink"
                                [zwpTextStyle]="'headline'"
                                [inline]="true"
                                [style.height]="'auto'"
                                [style.width]="'unset'"
                                [style.color]="'primary' | zwpColorTheme"
                                >{{ child.isDir ? 'folder' : 'description' }}</mat-icon
                            >
                            <span
                                fxFlex="grow"
                                [style.textAlign]="'left'"
                                [style.textOverflow]="'ellipsis'"
                                [style.whiteSpace]="'nowrap'"
                                [zwpTextStyle]="'body1'"
                                [style.color]="'label' | zwpColorTheme"
                                >{{ child.name }}</span
                            >
                        </div>
                    </div>
                </div>
                <div *ngIf="groupingViewMode === groupingViewModeItemType" fxLayout="row">
                    <div *ngIf="explorerAllDirectories$ | async as allDirectories" fxLayout="column" fxFlex="grow">
                        <div #spacerList></div>
                        <div
                            *ngIf="allDirectories.length !== 0"
                            fxLayout="row"
                            zwpSticky
                            [spacer]="spacerList"
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
                                >{{ allDirectories.length === 0 ? 'No Folders' : 'Folders' }}</span
                            >
                        </div>
                        <div fxLayout="row" fxFlex="grow">
                            <div
                                fxLayout="column"
                                fxFlex="grow"
                                cdkDropList
                                (cdkDropListDropped)="handleDragDropped($event)"
                                [cdkDropListEnterPredicate]="returnFalse"
                                [cdkDropListSortingDisabled]="true"
                            >
                                <div
                                    *ngFor="let child of allDirectories; let last = last"
                                    (contextmenu)="openContextMenu($event, child)"
                                    (click)="handleFileExplorerItemSelection(child.id)"
                                    (dblclick)="navigateDirectory(child.id)"
                                    fxLayout="row"
                                    zwpPadding="15 10 15 10"
                                    fxLayoutAlign="start center"
                                    fxLayoutGap="15px"
                                    [style.borderBottom]="last ? '' : 'solid 1px'"
                                    [style.borderBottomColor]="'separator' | zwpColorTheme"
                                    [style.backgroundColor]="
                                        selectedItemIds.includes(child.id)
                                            ? ('primary' | zwpColorTheme : { opacity: 0.3 })
                                            : ('clear' | zwpColorTheme)
                                    "
                                    cdkDrag
                                    [cdkDragData]="child"
                                    (cdkDragStarted)="handleDragStart($event)"
                                    [cdkDragStartDelay]="{ touch: 150, mouse: 0 }"
                                >
                                    <zwp-file-explorer-drag-preview *cdkDragPreview></zwp-file-explorer-drag-preview>
                                    <mat-icon
                                        fxFlex="noshrink"
                                        [zwpTextStyle]="'headline'"
                                        [inline]="true"
                                        [style.height]="'auto'"
                                        [style.width]="'unset'"
                                        [style.color]="'primary' | zwpColorTheme"
                                        >folder</mat-icon
                                    >
                                    <span
                                        fxFlex="grow"
                                        [style.textAlign]="'left'"
                                        [style.textOverflow]="'ellipsis'"
                                        [style.whiteSpace]="'nowrap'"
                                        [zwpTextStyle]="'body1'"
                                        [style.color]="'label' | zwpColorTheme"
                                        >{{ child.name }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div *ngIf="groupingViewMode === groupingViewModeItemType" fxLayout="row">
                    <div *ngIf="explorerAllFiles$ | async as allFiles" fxLayout="column" fxFlex="grow">
                        <div #spacerList></div>
                        <div
                            *ngIf="allFiles.length !== 0"
                            fxLayout="row"
                            fxLayout="row"
                            zwpSticky
                            [spacer]="spacerList"
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
                                >{{ allFiles.length === 0 ? 'No Files' : 'Files' }}</span
                            >
                        </div>
                        <div fxLayout="row" fxFlex="grow">
                            <div
                                fxLayout="column"
                                fxFlex="grow"
                                cdkDropList
                                (cdkDropListDropped)="handleDragDropped($event)"
                                [cdkDropListEnterPredicate]="returnFalse"
                                [cdkDropListSortingDisabled]="true"
                            >
                                <div
                                    *ngFor="let child of allFiles; let last = last"
                                    (contextmenu)="openContextMenu($event, child)"
                                    (click)="handleFileExplorerItemSelection(child.id)"
                                    fxLayout="row"
                                    zwpPadding="15 10 15 10"
                                    fxLayoutAlign="start center"
                                    fxLayoutGap="15px"
                                    [style.borderBottom]="last ? '' : 'solid 1px'"
                                    [style.borderBottomColor]="'separator' | zwpColorTheme"
                                    [style.backgroundColor]="
                                        selectedItemIds.includes(child.id)
                                            ? ('primary' | zwpColorTheme : { opacity: 0.3 })
                                            : ('clear' | zwpColorTheme)
                                    "
                                    cdkDrag
                                    [cdkDragData]="child"
                                    (cdkDragStarted)="handleDragStart($event)"
                                    [cdkDragStartDelay]="{ touch: 150, mouse: 0 }"
                                >
                                    <zwp-file-explorer-drag-preview *cdkDragPreview></zwp-file-explorer-drag-preview>
                                    <mat-icon
                                        fxFlex="noshrink"
                                        [zwpTextStyle]="'headline'"
                                        [inline]="true"
                                        [style.height]="'auto'"
                                        [style.width]="'unset'"
                                        [style.color]="'primary' | zwpColorTheme"
                                        >description</mat-icon
                                    >
                                    <span
                                        fxFlex="grow"
                                        [style.textAlign]="'left'"
                                        [style.textOverflow]="'ellipsis'"
                                        [style.whiteSpace]="'nowrap'"
                                        [zwpTextStyle]="'body1'"
                                        [style.color]="'label' | zwpColorTheme"
                                        >{{ child.name }}</span
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ng-container>
        </div>
    `,
})
export class FileExplorerOldListComponent implements AfterViewInit, OnDestroy {
    @ViewChildren(CdkDropList) dropsQuery: QueryList<CdkDropList> | undefined

    private readonly subscriptions: Subscription = new Subscription()
    drops: CdkDropList[] | undefined

    constructor(
        private fileExplorerFacade: ZWPFileExplorerFacade,
        private colorThemePipe: ZWPColorThemePipe,
        private menuFacade: ZWPMenuLayoutFacade
    ) {}

    groupingViewModeCombined = Model.FileExplorerGroupingViewMode.combined
    groupingViewModeItemType = Model.FileExplorerGroupingViewMode.itemType

    groupingViewMode$ = this.fileExplorerFacade.groupingViewMode$

    explorerAllChildren$ = this.fileExplorerFacade.explorerAllChildren$
    explorerAllFiles$ = this.fileExplorerFacade.explorerAllFiles$
    explorerAllDirectories$ = this.fileExplorerFacade.explorerAllDirectories$
    selectedExplorerItemIds$ = this.fileExplorerFacade.selectedItemIds$

    ngAfterViewInit(): void {
        const dropsQueryChangesSub = this.dropsQuery?.changes.subscribe(() => {
            this.drops = this.dropsQuery?.toArray()
        })

        Promise.resolve().then(() => {
            this.drops = this.dropsQuery?.toArray()
        })

        this.subscriptions.add(dropsQueryChangesSub)
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    navigateDirectory(id: Nullable<string>) {
        this.fileExplorerFacade.navigateDirectory(id)
    }

    handleFileExplorerItemSelection(id: string) {
        this.fileExplorerFacade.handleFileExplorerItemSelection(id)
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
        }
    }

    handleDragDropped(event: CdkDragDrop<any>) {
        if (!isUndefined(this.drops)) {
            this.fileExplorerFacade.handleDragDropped(event, this.drops)
        }
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
