import { ChangeDetectionStrategy, Component, NgZone } from '@angular/core'
import { Nullable } from '@zwp/platform.common'
import { ZWPMenuLayoutFacade } from '@zwp/platform.layout'
import { ZWPFileExplorerFacade } from '../../+state/facades/file-explorer.facade'
import { Model } from '../../model'

@Component({
    selector: 'zwp-file-explorer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            *ngIf="viewMode$ | async as viewMode"
            fxLayout="column"
            [style.backgroundColor]="'system-background' | zwpColorTheme"
            fxFlex="grow"
        >
            <div
                fxFlex="noshrink"
                fxLayout="row"
                zwpPadding="10"
                fxLayoutAlign="start stretch"
                [style.backgroundColor]="'system-background' | zwpColorTheme"
                zwpHScroll
            >
                <ng-container *ngIf="currentDirectory$ | async as currentDirectory">
                    <zwp-md-icon-button
                        [style.marginRight]="'5px'"
                        (btnClick)="navigateDirectory(currentDirectory.parentFileDataItemId ?? null)"
                        fxFlexAlign="center"
                        textStyle="button2"
                        [iconPadding]="2"
                        icon="arrow_back"
                        [backgroundColor]="'clear' | zwpColorTheme"
                        [iconColor]="'accent' | zwpColorTheme"
                    ></zwp-md-icon-button>
                    <span
                        [zwpTextStyle]="'subheadline'"
                        [style.color]="'primary' | zwpColorTheme"
                        fxFlex="noshrink"
                        fxFlexAlign="center"
                        >{{ currentDirectory.name }}</span
                    >
                    <div (click)="openMenu($event)" fxFlex="grow"></div>
                    <zwp-md-icon-button
                        (btnClick)="createRandomFileInDirectory(currentDirectory.id!)"
                        materialType="raised"
                        fxFlexAlign="center"
                        layoutGap="7px"
                        label="New File"
                        textStyle="button2"
                        icon="description"
                        [backgroundColor]="'primary' | zwpColorTheme"
                        [iconColor]="'system-white' | zwpColorTheme"
                    ></zwp-md-icon-button>
                    <zwp-md-icon-button
                        fxFlexOffset="10px"
                        (btnClick)="createRandomDirectoryInDirectory(currentDirectory.id!)"
                        materialType="raised"
                        fxFlexAlign="center"
                        layoutGap="7px"
                        label="New Folder"
                        textStyle="button2"
                        icon="folder"
                        [backgroundColor]="'accent' | zwpColorTheme"
                        [iconColor]="'system-white' | zwpColorTheme"
                    ></zwp-md-icon-button>
                </ng-container>
                <ng-container *ngIf="(hasCurrentDirectory$ | async) === false">
                    <span
                        [zwpTextStyle]="'subheadline'"
                        [style.color]="'primary' | zwpColorTheme"
                        fxFlex="noshrink"
                        fxFlexAlign="center"
                        >File Explorer</span
                    >
                    <div (click)="openMenu($event)" fxFlex="grow"></div>
                    <zwp-md-icon-button
                        (btnClick)="createRandomFile()"
                        materialType="raised"
                        fxFlexAlign="center"
                        layoutGap="7px"
                        label="New File"
                        textStyle="button2"
                        icon="description"
                        [backgroundColor]="'primary' | zwpColorTheme"
                        [iconColor]="'system-white' | zwpColorTheme"
                    ></zwp-md-icon-button>
                    <zwp-md-icon-button
                        fxFlexOffset="10px"
                        (btnClick)="createRandomDirectory()"
                        materialType="raised"
                        fxFlexAlign="center"
                        layoutGap="7px"
                        label="New Folder"
                        textStyle="button2"
                        icon="folder"
                        [backgroundColor]="'accent' | zwpColorTheme"
                        [iconColor]="'system-white' | zwpColorTheme"
                    ></zwp-md-icon-button>
                </ng-container>

                <!-- <zwp-divider [vertical]="true"></zwp-divider> -->
            </div>
            <!-- <zwp-divider></zwp-divider> -->
            <div
                fxFlex="noshrink"
                fxLayout="row"
                zwpPadding="0 10 0 10"
                fxLayoutAlign="start stretch"
                [style.backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                zwpHScroll
            >
                <span
                    *ngIf="explorerAllChildren$ | async as allChildren"
                    [zwpTextStyle]="'body1'"
                    [style.color]="'secondary-label' | zwpColorTheme"
                    fxFlex="noshrink"
                    fxFlexAlign="center"
                >
                    {{ allChildren.length + (allChildren.length === 1 ? ' item' : ' items') }}
                </span>
                <div fxFlex="grow"></div>
                <zwp-file-explorer-grouping-view-mode-controls
                    zwpPadding="5"
                ></zwp-file-explorer-grouping-view-mode-controls>
                <zwp-divider [vertical]="true" zwpPadding="10 0 10 0"></zwp-divider>
                <zwp-file-explorer-list-view-mode-controls
                    zwpPadding="5 0 5 0"
                ></zwp-file-explorer-list-view-mode-controls>
            </div>
            <div class="file-explorer-container-scrollable" fxLayout="row" fxFlex="grow" zwpVScroll>
                <zwp-file-explorer-grid
                    *ngIf="viewMode === listViewModeGrid"
                    fxFlex="grow"
                ></zwp-file-explorer-grid>
                <zwp-file-explorer-list
                    *ngIf="viewMode === listViewModeList"
                    fxFlex="grow"
                ></zwp-file-explorer-list>
                <zwp-file-explorer-compact-list
                    *ngIf="viewMode === listViewModeCompact"
                    fxFlex="grow"
                ></zwp-file-explorer-compact-list>
            </div>
        </div>
    `,
})
export class FileExplorerComponent {
    // @ViewChild('explorer', {static: false}) explorer: ElementRef | undefined

    constructor(
        private fileExplorerFacade: ZWPFileExplorerFacade,
        private zone: NgZone,
        private menuFacade: ZWPMenuLayoutFacade
    ) {}

    listViewModeList = Model.FileExplorerViewMode.list
    listViewModeCompact = Model.FileExplorerViewMode.compact
    listViewModeGrid = Model.FileExplorerViewMode.grid

    groupingViewModeCombined = Model.FileExplorerGroupingViewMode.combined
    groupingViewModeItemType = Model.FileExplorerGroupingViewMode.itemType
    // groupingViewModeExtensionSeparated = FileExplorerGroupingViewMode.EXTENSION_SEPARATED

    viewMode$ = this.fileExplorerFacade.viewMode$
    groupingViewMode$ = this.fileExplorerFacade.groupingViewMode$
    currentDirectory$ = this.fileExplorerFacade.currentDirectory$
    explorerAllChildren$ = this.fileExplorerFacade.explorerAllChildren$
    explorerAllChildrenCount$ = this.fileExplorerFacade.explorerAllChildrenCount$
    // currentAllFiles$ = this.fileExplorerFacade.currentAllFiles$
    // currentAllDirectories$ = this.fileExplorerFacade.currentAllDirectories$
    hasCurrentDirectory$ = this.fileExplorerFacade.hasCurrentDirectory$

    // explorerWidthObserver: ResizeObserver | undefined
    // explorerWidth$ = new BehaviorSubject<number>(0)
    // folderColumns$ = this.explorerWidth$.pipe(map(explorerWidth => Math.floor((explorerWidth - 20) / 250)))
    // fileColumns$ = this.explorerWidth$.pipe(map(explorerWidth => Math.floor((explorerWidth - 20) / 120)))

    // ngAfterViewInit(): void {
    //     this.explorerWidthObserver = new ResizeObserver(entries => {
    //         this.zone.run(() => {
    //             this.explorerWidth$.next(entries[0].contentRect.width)
    //         })
    //     })

    //     this.explorerWidthObserver.observe(this.explorer?.nativeElement)
    // }

    // ngOnDestroy(): void {
    //     this.explorerWidthObserver?.unobserve(this.explorer?.nativeElement)
    // }

    doNothing() {
        return
    }
    
    navigateDirectory(id: Nullable<string>) {
        this.fileExplorerFacade.navigateDirectory(id)
    }
    createRandomDirectory() {
        this.fileExplorerFacade.createRandomFileData(true)
    }
    createRandomFile() {
        this.fileExplorerFacade.createRandomFileData(false)
    }
    createRandomDirectoryInDirectory(id: string) {
        this.fileExplorerFacade.createRandomFileDataInDirectory(id, true)
    }
    createRandomFileInDirectory(id: string) {
        this.fileExplorerFacade.createRandomFileDataInDirectory(id, false)
    }

    openMenu(event: any) {
        this.menuFacade.openMenu('ExampleMenuComponent', { x: event.clientX, y: event.clientY }, 'after', 'below', {
            foo: 'bar',
        })
    }
}
