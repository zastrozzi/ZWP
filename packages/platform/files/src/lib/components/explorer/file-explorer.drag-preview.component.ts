import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core'
import { ZWPFileExplorerFacade } from '../../+state/facades/file-explorer.facade'

@Component({
    selector: 'zwp-file-explorer-drag-preview',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <div
            fxLayout="row"
            fxLayoutAlign="start center"
            [zwpPadding]="(fileExplorerPreviewTouch$ | async) === true ? '0 0 0 40' : '0 0 0 0'"
        >
            <div
                fxLayout="row"
                fxLayoutAlign="start center"
                fxLayoutGap="15px"
                zwpPadding="10 20 10 10"
                zwpCorners="8"
                [style.backgroundColor]="'tertiary-system-background' | zwpColorTheme"
                [style.boxShadow]="('secondary-label' | zwpColorTheme : { opacity: 0.35 }) + ' 0px 2px 5px'"
            >
                <mat-icon
                    fxFlex="noshrink"
                    [zwpTextStyle]="'headline'"
                    [inline]="true"
                    [style.height]="'auto'"
                    [style.width]="'unset'"
                    [style.color]="'primary' | zwpColorTheme"
                    >{{ (explorerItemDragPreview$ | async)?.icon }}</mat-icon
                >
                <span [zwpTextStyle]="'body1'" [style.color]="'label' | zwpColorTheme" fxFlex="grow">{{
                    (explorerItemDragPreview$ | async)?.label
                }}</span>
            </div>
        </div>
    `,
})
export class FileExplorerDragPreviewComponent {
    constructor(private fileExplorerFacade: ZWPFileExplorerFacade) {}

    explorerItemDragPreview$ = this.fileExplorerFacade.explorerItemDragPreview$
    fileExplorerPreviewTouch$ = this.fileExplorerFacade.fileExplorerPreviewTouch$
}
