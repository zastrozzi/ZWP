import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core'
import { Facades } from '../../+state/facades'
import { Model } from '../../model'

@Component({
    selector: 'zwp-file-explorer-grouping-view-mode-controls',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column">
            <div *ngIf="title !== ''" fxLayout="row">
                <span [zwpTextStyle]="'caption1'" [style.color]="'secondary-label' | zwpColorTheme">{{
                    title | uppercase
                }}</span>
            </div>
        </div>
        <div fxLayout="row" fxLayoutAlign="center stretch" fxLayoutGap="5px">
            <zwp-md-icon-button
                (btnClick)="selectGroupingViewModeCombined()"
                textStyle="headline"
                icon="list_alt"
                [backgroundColor]="buttonBackgroundColorTheme | zwpColorTheme"
                [iconPadding]="5"
                [iconColor]="
                    (groupingViewMode$ | async) === combined
                        ? (buttonSelectedColorTheme | zwpColorTheme)
                        : (buttonUnselectedColorTheme | zwpColorTheme)
                "
                matTooltip="Files & Folders Combined"
            ></zwp-md-icon-button>
            <zwp-divider [vertical]="true" zwpPadding="5 0 5 0"></zwp-divider>
            <zwp-md-icon-button
                (btnClick)="selectGroupingViewModeItemType()"
                textStyle="headline"
                icon="all_inbox"
                [backgroundColor]="buttonBackgroundColorTheme | zwpColorTheme"
                [iconPadding]="5"
                [iconColor]="
                    (groupingViewMode$ | async) === itemType
                        ? (buttonSelectedColorTheme | zwpColorTheme)
                        : (buttonUnselectedColorTheme | zwpColorTheme)
                "
                matTooltip="Files & Folders Separated"
            ></zwp-md-icon-button>
            <!-- <zwp-divider [vertical]="true" zwpPadding="5 0 5 0"></zwp-divider>
            <zwp-md-icon-button 
                (btnClick)="selectGroupingViewModeExtensionSeparated()" 
                textStyle="headline"
                icon="all_inbox" 
                [backgroundColor]="buttonBackgroundColorTheme | zwpColorTheme" 
                [iconPadding]="5"
                [iconColor]="(groupingViewMode$ | async) === extensionSeparated ?(buttonSelectedColorTheme | zwpColorTheme) : (buttonUnselectedColorTheme | zwpColorTheme)"
                matTooltip="Files & Folders Separated by Type"
            ></zwp-md-icon-button> -->
        </div>
    `,
})
export class FileExplorerGroupingViewModeControlsComponent {
    @Input() buttonBackgroundColorTheme = 'clear'
    @Input() buttonSelectedColorTheme = 'primary'
    @Input() buttonUnselectedColorTheme = 'tertiary-label'

    @Input() title = ''

    private fileExplorerFacade = inject(Facades.ZWPFileExplorerFacade)

    combined = Model.FileExplorerGroupingViewMode.combined
    fileType = Model.FileExplorerGroupingViewMode.fileType
    itemType = Model.FileExplorerGroupingViewMode.itemType

    groupingViewMode$ = this.fileExplorerFacade.groupingViewMode$

    selectGroupingViewModeCombined() {
        this.fileExplorerFacade.selectGroupingViewMode(this.combined)
    }
    selectGroupingViewModeItemType() {
        this.fileExplorerFacade.selectGroupingViewMode(this.itemType)
    }
    selectGroupingViewModeFileType() {
        this.fileExplorerFacade.selectGroupingViewMode(this.fileType)
    }
}
