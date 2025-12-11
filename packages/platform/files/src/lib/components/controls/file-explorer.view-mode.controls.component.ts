import { ChangeDetectionStrategy, Component, inject, Input } from "@angular/core";
import { Facades } from "../../+state/facades";
import { Model } from "../../model";

@Component({
    selector: 'zwp-file-explorer-view-mode-controls',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="row" fxLayoutAlign="center stretch" fxLayoutGap="5px">
            <zwp-md-icon-button 
                (btnClick)="selectViewModeList()" 
                textStyle="headline"
                icon="view_agenda" 
                [backgroundColor]="buttonBackgroundColorTheme | zwpColorTheme" 
                [iconPadding]="5"
                [iconColor]="(viewMode$ | async) === list ? (buttonSelectedColorTheme | zwpColorTheme) : (buttonUnselectedColorTheme | zwpColorTheme)"
                matTooltip="List View"
            ></zwp-md-icon-button>
            <zwp-divider [vertical]="true" zwpPadding="5 0 5 0"></zwp-divider>
            <zwp-md-icon-button 
                (btnClick)="selectViewModeCompact()" 
                textStyle="headline"
                icon="view_headline" 
                [backgroundColor]="buttonBackgroundColorTheme | zwpColorTheme" 
                [iconPadding]="5"
                [iconColor]="(viewMode$ | async) === compact ? (buttonSelectedColorTheme | zwpColorTheme) : (buttonUnselectedColorTheme | zwpColorTheme)"
                matTooltip="Compact List View"
            ></zwp-md-icon-button>
            <zwp-divider [vertical]="true" zwpPadding="5 0 5 0"></zwp-divider>
            <zwp-md-icon-button 
                (btnClick)="selectViewModeGrid()" 
                textStyle="headline"
                icon="grid_view" 
                [backgroundColor]="buttonBackgroundColorTheme | zwpColorTheme" 
                [iconPadding]="5"
                [iconColor]="(viewMode$ | async) === grid ?(buttonSelectedColorTheme | zwpColorTheme) : (buttonUnselectedColorTheme | zwpColorTheme)"
                matTooltip="Grid View"
            ></zwp-md-icon-button>
        </div>
    `
})
export class FileExplorerViewModeControlsComponent {
    @Input() buttonBackgroundColorTheme = "clear"
    @Input() buttonSelectedColorTheme = "primary"
    @Input() buttonUnselectedColorTheme = "tertiary-label"

    private fileExplorerFacade = inject(Facades.ZWPFileExplorerFacade)

    list = Model.FileExplorerViewMode.list
    compact = Model.FileExplorerViewMode.compact
    grid = Model.FileExplorerViewMode.grid

    viewMode$ = this.fileExplorerFacade.viewMode$

    selectViewModeList() { this.fileExplorerFacade.selectViewMode(this.list) }
    selectViewModeCompact() { this.fileExplorerFacade.selectViewMode(this.compact) }
    selectViewModeGrid() { this.fileExplorerFacade.selectViewMode(this.grid) }
}