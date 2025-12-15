import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core'
import { Facades } from '../../+state/facades'
import { Model } from '../../model'

@Component({
    selector: 'zwp-file-explorer-view-mode-controls',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div 
            *ngIf="
            {
                viewMode: viewMode$ | async,
                buttonIconColor: buttonColor(
                    buttonSelectedColorTheme | zwpColorTheme, 
                    buttonUnselectedColorTheme | zwpColorTheme
                )
            } as viewModeControlsData
            "
            fxLayout="row" fxLayoutAlign="center stretch" fxLayoutGap="5px"
        >
            <zwp-md-icon-button
                (btnClick)="selectViewMode(viewModeEnum.grid)"
                textStyle="headline"
                icon="grid_view"
                [backgroundColor]="buttonBackgroundColorTheme | zwpColorTheme"
                [iconPadding]="5"
                [iconColor]="viewModeControlsData.buttonIconColor(viewModeControlsData.viewMode === viewModeEnum.grid)"
                matTooltip="Grid View"
            ></zwp-md-icon-button>
            <zwp-divider [vertical]="true" zwpPadding="5 0 5 0"></zwp-divider>
            <zwp-md-icon-button
                (btnClick)="selectViewMode(viewModeEnum.list)"
                textStyle="headline"
                icon="view_agenda"
                [backgroundColor]="buttonBackgroundColorTheme | zwpColorTheme"
                [iconPadding]="5"
                [iconColor]="viewModeControlsData.buttonIconColor(viewModeControlsData.viewMode === viewModeEnum.list)"
                matTooltip="List View"
            ></zwp-md-icon-button>
            <zwp-divider [vertical]="true" zwpPadding="5 0 5 0"></zwp-divider>
            <zwp-md-icon-button
                (btnClick)="selectViewMode(viewModeEnum.compact)"
                textStyle="headline"
                icon="view_headline"
                [backgroundColor]="buttonBackgroundColorTheme | zwpColorTheme"
                [iconPadding]="5"
                [iconColor]="viewModeControlsData.buttonIconColor(viewModeControlsData.viewMode === viewModeEnum.compact)"
                matTooltip="Compact List View"
            ></zwp-md-icon-button>
        </div>
    `,
})
export class FileExplorerViewModeControlsComponent {
    @Input() buttonBackgroundColorTheme = 'clear'
    @Input() buttonSelectedColorTheme = 'primary'
    @Input() buttonUnselectedColorTheme = 'tertiary-label'

    private fileExplorerFacade = inject(Facades.ZWPFileExplorerFacade)

    viewModeEnum = Model.FileExplorerViewMode
    viewMode$ = this.fileExplorerFacade.viewMode$

    buttonColor = (ifTrue: string, ifFalse: string) => (condition: boolean) => condition ? ifTrue : ifFalse

    selectViewMode(mode: Model.FileExplorerViewMode) {
        this.fileExplorerFacade.selectViewMode(mode)
    }
}
