import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core'
import { Nullable } from '@zwp/platform.common'
import { ZWPFileExplorerFacade } from '../../+state/facades/file-explorer.facade'
import { Model } from '../../model'

@Component({
    selector: 'zwp-file-explorer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <div
            *ngIf="
            { 
                viewMode: viewMode$ | async, 
                childrenCount: explorerAllChildrenCount$ | async,
                selectedItemCount: selectedItemCount$ | async
            } as fileExplorerData"
            fxLayout="column"
            [style.backgroundColor]="'system-background' | zwpColorTheme"
            fxFlex="grow"
        >
            <div
                fxFlex="noshrink"
                fxLayout="row"
                fxLayoutGap="5px"
                zwpPadding="3 5"
                fxLayoutAlign="center stretch"
                [style.backgroundColor]="'system-background' | zwpColorTheme"
                zwpHScroll
            >
                <zwp-file-explorer-navigation-controls buttonUnselectedColorTheme="primary-label" fxFlexAlign="center"/>
                <div fxFlex="grow"></div>
                <span
                    [zwpTextStyle]="'body1'"
                    [style.color]="'secondary-label' | zwpColorTheme"
                    fxFlex="noshrink" fxFlexAlign="center"
                    zwpPadding="0 5"
                >
                    {{ 'Total: ' + fileExplorerData.childrenCount + (fileExplorerData.childrenCount === 1 ? ' item' : ' items') }}
                </span>
                <zwp-file-explorer-grouping-view-mode-controls 
                    fxFlexAlign="center"
                    zwpBackgroundColor="quaternary-system-fill"
                    zwpCorners="80"
                    zwpPadding="2 5"
                />
                <zwp-file-explorer-view-mode-controls
                    fxFlexAlign="center"
                    zwpBackgroundColor="quaternary-system-fill"
                    zwpCorners="80"
                    zwpPadding="2 5"
                ></zwp-file-explorer-view-mode-controls>
            </div>
            <zwp-divider></zwp-divider>
            <div class="file-explorer-container-scrollable" fxLayout="row" fxFlex="grow" zwpVScroll>
                <zwp-file-explorer-grid
                    *ngIf="fileExplorerData.viewMode === listViewModeGrid"
                    fxFlex="grow"
                ></zwp-file-explorer-grid>
                <zwp-file-explorer-list
                    *ngIf="fileExplorerData.viewMode === listViewModeList"
                    fxFlex="grow"
                ></zwp-file-explorer-list>
                <zwp-file-explorer-compact-list
                    *ngIf="fileExplorerData.viewMode === listViewModeCompact"
                    fxFlex="grow"
                ></zwp-file-explorer-compact-list>
            </div>
            <!-- <zwp-divider></zwp-divider> -->
            
        </div>
    `,
})
export class FileExplorerComponent {
    private fileExplorerFacade = inject(ZWPFileExplorerFacade)

    listViewModeList = Model.FileExplorerViewMode.list
    listViewModeCompact = Model.FileExplorerViewMode.compact
    listViewModeGrid = Model.FileExplorerViewMode.grid

    groupingViewModeCombined = Model.FileExplorerGroupingViewMode.combined
    groupingViewModeItemType = Model.FileExplorerGroupingViewMode.itemType

    viewMode$ = this.fileExplorerFacade.viewMode$
    groupingViewMode$ = this.fileExplorerFacade.groupingViewMode$
    currentDirectory$ = this.fileExplorerFacade.currentDirectory$
    currentDirectoryId$ = this.fileExplorerFacade.currentDirectoryId$
    currentDirectoryName$ = this.fileExplorerFacade.currentDirectoryName$
    explorerAllChildren$ = this.fileExplorerFacade.explorerAllChildren$
    explorerAllChildrenCount$ = this.fileExplorerFacade.explorerAllChildrenCount$
    selectedItemCount$ = this.fileExplorerFacade.selectedItemCount$
    hasCurrentDirectory$ = this.fileExplorerFacade.hasCurrentDirectory$
}
