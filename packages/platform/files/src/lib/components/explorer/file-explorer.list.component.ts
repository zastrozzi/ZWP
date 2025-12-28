import { CdkDragDrop, CdkDragStart, CdkDropList } from '@angular/cdk/drag-drop'
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    inject,
    NgZone,
    OnDestroy,
    QueryList,
    ViewChildren,
} from '@angular/core'
import { ZWPColorThemePipe, isUndefined, Nullable } from '@zwp/platform.common'
import { ZWPMenuLayoutFacade } from '@zwp/platform.layout'
import { Subscription } from 'rxjs'
import { ZWPFileExplorerFacade } from '../../+state/facades/file-explorer.facade'
import { Model } from '../../model'

@Component({
    selector: 'zwp-file-explorer-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            zwpSelectionContainer
            (zwpSelectionChange)="handleSelectionContainerChange($event, fileExplorerListData.selectedItemIds)"
            *ngIf="{
                groupingViewMode: groupingViewMode$ | async,
                selectedItemIds: (selectedExplorerItemIds$ | async) ?? [],
                allChildren: explorerAllChildren$ | async,
                allDirectories: (explorerAllDirectories$ | async) ?? [],
                allFiles: (explorerAllFiles$ | async) ?? [],
                allFilesByFileType: (explorerAllFilesByFileType$ | async) ?? []
            } as fileExplorerListData"
            fxLayout="column"
            fxFlex="grow"
            zwpVScroll
        >
            <div
                *ngIf="fileExplorerListData.groupingViewMode"
                fxLayout="row"
                fxFlex="grow"
                fxLayoutAlign="start stretch"
            >
                <div
                    fxLayout="column"
                    fxFlex="grow"
                    cdkDropList
                    (cdkDropListDropped)="handleDragDropped($event)"
                    [cdkDropListEnterPredicate]="returnFalse"
                    [cdkDropListSortingDisabled]="true"
                >
                    <ng-container *ngIf="fileExplorerListData.groupingViewMode === groupingViewModeEnum.combined">
                        <div
                            *ngFor="let child of fileExplorerListData.allChildren; let last = last"
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
                                fileExplorerListData.selectedItemIds.includes(child.id)
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
                                zwpDisableSelection
                                cdkDragHandle
                                fxFlex="noshrink"
                                [zwpTextStyle]="'headline'"
                                [inline]="true"
                                [style.height]="'auto'"
                                [style.width]="'unset'"
                                [style.color]="'primary' | zwpColorTheme"
                                >{{
                                    child.isDir ? 'folder' : (child.fileType | zwpTransformEnum : fileTypeIconEnumPipe)
                                }}</mat-icon
                            >
                            <span
                                cdkDragHandle
                                zwpDisableSelection
                                zwpSelectionContainerItem
                                [zwpSelectionContainerItemId]="child.id"
                                [style.textAlign]="'left'"
                                [style.textOverflow]="'ellipsis'"
                                [style.whiteSpace]="'nowrap'"
                                [zwpTextStyle]="'body1'"
                                [style.color]="'label' | zwpColorTheme"
                                >{{ child.name }}</span
                            >
                            <div fxFlex="grow"></div>
                        </div>
                    </ng-container>
                    <ng-container *ngIf="fileExplorerListData.groupingViewMode === groupingViewModeEnum.itemType">
                        <div
                            fxLayout="row"
                            fxFlex="30px"
                            zwpBackgroundColor="quaternary-system-fill"
                            zwpCorners="20"
                            fxLayoutAlign="start center"
                            zwpMargin="10 10 5 10"
                        >
                            <span zwpDisableSelection [zwpTextStyle]="'body3'" zwpColor="label" fxFlexOffset="15px"
                                >Folders</span
                            >
                        </div>
                        <div
                            *ngFor="let child of fileExplorerListData.allDirectories; let last = last"
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
                                fileExplorerListData.selectedItemIds.includes(child.id)
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
                                zwpDisableSelection
                                cdkDragHandle
                                fxFlex="noshrink"
                                fxFlexOffset="5px"
                                [zwpTextStyle]="'headline'"
                                [inline]="true"
                                [style.height]="'auto'"
                                [style.width]="'unset'"
                                [style.color]="'primary' | zwpColorTheme"
                                >{{
                                    child.isDir ? 'folder' : (child.fileType | zwpTransformEnum : fileTypeIconEnumPipe)
                                }}</mat-icon
                            >
                            <span
                                cdkDragHandle
                                zwpDisableSelection
                                zwpSelectionContainerItem
                                [zwpSelectionContainerItemId]="child.id"
                                [style.textAlign]="'left'"
                                [style.textOverflow]="'ellipsis'"
                                [style.whiteSpace]="'nowrap'"
                                [zwpTextStyle]="'body1'"
                                [style.color]="'label' | zwpColorTheme"
                                >{{ child.name }}</span
                            >
                            <div fxFlex="grow"></div>
                        </div>
                        <div
                            fxLayout="row"
                            fxFlex="30px"
                            zwpBackgroundColor="quaternary-system-fill"
                            zwpCorners="20"
                            fxLayoutAlign="start center"
                            zwpMargin="5 10"
                        >
                            <span zwpDisableSelection [zwpTextStyle]="'body3'" zwpColor="label" fxFlexOffset="15px"
                                >Files</span
                            >
                        </div>
                        <div
                            *ngFor="let child of fileExplorerListData.allFiles; let last = last"
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
                                fileExplorerListData.selectedItemIds.includes(child.id)
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
                                zwpDisableSelection
                                cdkDragHandle
                                fxFlex="noshrink"
                                fxFlexOffset="5px"
                                [zwpTextStyle]="'headline'"
                                [inline]="true"
                                [style.height]="'auto'"
                                [style.width]="'unset'"
                                [style.color]="'primary' | zwpColorTheme"
                                >{{
                                    child.isDir ? 'folder' : (child.fileType | zwpTransformEnum : fileTypeIconEnumPipe)
                                }}</mat-icon
                            >
                            <span
                                cdkDragHandle
                                zwpDisableSelection
                                zwpSelectionContainerItem
                                [zwpSelectionContainerItemId]="child.id"
                                [style.textAlign]="'left'"
                                [style.textOverflow]="'ellipsis'"
                                [style.whiteSpace]="'nowrap'"
                                [zwpTextStyle]="'body1'"
                                [style.color]="'label' | zwpColorTheme"
                                >{{ child.name }}</span
                            >
                            <div fxFlex="grow"></div>
                        </div>
                    </ng-container>
                    <ng-container *ngIf="fileExplorerListData.groupingViewMode === groupingViewModeEnum.fileType">
                        <div
                            fxLayout="row"
                            fxFlex="30px"
                            zwpBackgroundColor="quaternary-system-fill"
                            zwpCorners="20"
                            fxLayoutAlign="start center"
                            zwpMargin="10 10 5 10"
                        >
                            <span zwpDisableSelection [zwpTextStyle]="'body3'" zwpColor="label" fxFlexOffset="15px"
                                >Folders</span
                            >
                        </div>
                        <div
                            *ngFor="let child of fileExplorerListData.allDirectories; let last = last"
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
                                fileExplorerListData.selectedItemIds.includes(child.id)
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
                                zwpDisableSelection
                                cdkDragHandle
                                fxFlex="noshrink"
                                fxFlexOffset="5px"
                                [zwpTextStyle]="'headline'"
                                [inline]="true"
                                [style.height]="'auto'"
                                [style.width]="'unset'"
                                [style.color]="'primary' | zwpColorTheme"
                                >{{
                                    child.isDir ? 'folder' : (child.fileType | zwpTransformEnum : fileTypeIconEnumPipe)
                                }}</mat-icon
                            >
                            <span
                                cdkDragHandle
                                zwpDisableSelection
                                zwpSelectionContainerItem
                                [zwpSelectionContainerItemId]="child.id"
                                [style.textAlign]="'left'"
                                [style.textOverflow]="'ellipsis'"
                                [style.whiteSpace]="'nowrap'"
                                [zwpTextStyle]="'body1'"
                                [style.color]="'label' | zwpColorTheme"
                                >{{ child.name }}</span
                            >
                            <div fxFlex="grow"></div>
                        </div>
                        <ng-container *ngFor="let filesByType of fileExplorerListData.allFilesByFileType">
                            <div
                                fxLayout="row"
                                fxFlex="30px"
                                zwpBackgroundColor="quaternary-system-fill"
                                zwpCorners="20"
                                fxLayoutAlign="start center"
                                zwpMargin="5 10"
                            >
                                <span
                                    zwpDisableSelection
                                    [zwpTextStyle]="'body3'"
                                    zwpColor="label"
                                    fxFlexOffset="15px"
                                    >{{ filesByType.enumKey | zwpTransformEnum : fileTypeLabelEnumPipe }}</span
                                >
                            </div>
                            <div
                                *ngFor="let child of filesByType.values; let last = last"
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
                                    fileExplorerListData.selectedItemIds.includes(child.id)
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
                                    zwpDisableSelection
                                    cdkDragHandle
                                    fxFlex="noshrink"
                                    fxFlexOffset="5px"
                                    [zwpTextStyle]="'headline'"
                                    [inline]="true"
                                    [style.height]="'auto'"
                                    [style.width]="'unset'"
                                    [style.color]="'primary' | zwpColorTheme"
                                    >{{
                                        child.isDir
                                            ? 'folder'
                                            : (child.fileType | zwpTransformEnum : fileTypeIconEnumPipe)
                                    }}</mat-icon
                                >
                                <span
                                    cdkDragHandle
                                    zwpDisableSelection
                                    zwpSelectionContainerItem
                                    [zwpSelectionContainerItemId]="child.id"
                                    [style.textAlign]="'left'"
                                    [style.textOverflow]="'ellipsis'"
                                    [style.whiteSpace]="'nowrap'"
                                    [zwpTextStyle]="'body1'"
                                    [style.color]="'label' | zwpColorTheme"
                                    >{{ child.name }}</span
                                >
                                <div fxFlex="grow"></div>
                            </div>
                        </ng-container>
                    </ng-container>
                </div>
            </div>
        </div>
    `,
})
export class FileExplorerListComponent implements AfterViewInit, OnDestroy {
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

    groupingViewMode$ = this.fileExplorerFacade.groupingViewMode$

    explorerAllChildren$ = this.fileExplorerFacade.explorerAllChildren$
    explorerAllFiles$ = this.fileExplorerFacade.explorerAllFiles$
    explorerAllDirectories$ = this.fileExplorerFacade.explorerAllDirectories$
    selectedExplorerItemIds$ = this.fileExplorerFacade.selectedItemIds$
    explorerAllFilesByFileType$ = this.fileExplorerFacade.explorerAllFilesByFileType$

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
