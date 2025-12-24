import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core'
import { Facades } from '../../+state/facades'
import { Model } from '../../model'

@Component({
    selector: 'zwp-file-explorer-grouping-view-mode-controls',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div 
            *ngIf="{ 
                groupingViewMode: groupingViewMode$ | async,
                buttonBackgroundColor: buttonBackgroundColorTheme | zwpColorTheme,
                buttonIconColor: buttonColor(
                    buttonSelectedColorTheme | zwpColorTheme, 
                    buttonUnselectedColorTheme | zwpColorTheme
                )
            } as groupingControls"
            fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="5px">
            <zwp-md-icon-button
                (btnClick)="selectGroupingViewModeCombined()"
                textStyle="headline"
                icon="list_alt"
                [backgroundColor]="groupingControls.buttonBackgroundColor"
                [iconPadding]="5"
                [iconColor]="groupingControls.buttonIconColor(groupingControls.groupingViewMode === viewModeEnum.combined)"
                matTooltip="Files & Folders Combined"
            ></zwp-md-icon-button>
            <zwp-divider [vertical]="true" zwpPadding="5 0" fxFlexAlign="stretch"></zwp-divider>
            <zwp-md-icon-button
                (btnClick)="selectGroupingViewModeItemType()"
                textStyle="headline"
                icon="all_inbox"
                [backgroundColor]="groupingControls.buttonBackgroundColor"
                [iconPadding]="5"
                [iconColor]="groupingControls.buttonIconColor(groupingControls.groupingViewMode === viewModeEnum.itemType)"
                matTooltip="Group by Files & Folders"
            ></zwp-md-icon-button>
            <zwp-divider [vertical]="true" zwpPadding="5 0" fxFlexAlign="stretch"></zwp-divider>
            <zwp-md-icon-button
                (btnClick)="selectGroupingViewModeFileType()"
                textStyle="headline"
                icon="description"
                [backgroundColor]="groupingControls.buttonBackgroundColor"
                [iconPadding]="5"
                [iconColor]="groupingControls.buttonIconColor(groupingControls.groupingViewMode === viewModeEnum.fileType)"
                matTooltip="Group by File Type"
            ></zwp-md-icon-button>
        </div>
    `,
})
export class FileExplorerGroupingViewModeControlsComponent {
    @Input() buttonBackgroundColorTheme = 'clear'
    @Input() buttonSelectedColorTheme = 'primary'
    @Input() buttonUnselectedColorTheme = 'tertiary-label'

    private fileExplorerFacade = inject(Facades.ZWPFileExplorerFacade)

    viewModeEnum = Model.FileExplorerGroupingViewMode
    groupingViewMode$ = this.fileExplorerFacade.groupingViewMode$

    buttonColor = (ifTrue: string, ifFalse: string) => (condition: boolean) => condition ? ifTrue : ifFalse

    selectGroupingViewModeCombined() {
        this.fileExplorerFacade.selectGroupingViewMode(this.viewModeEnum.combined)
    }
    selectGroupingViewModeItemType() {
        this.fileExplorerFacade.selectGroupingViewMode(this.viewModeEnum.itemType)
    }
    selectGroupingViewModeFileType() {
        this.fileExplorerFacade.selectGroupingViewMode(this.viewModeEnum.fileType)
    }
}
