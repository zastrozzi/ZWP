import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { isUndefined } from '@zwp/platform.common'
import { BaseMenuComponent, ZWPMenuComponent, ZWPMenuLayoutFacade } from '@zwp/platform.layout'
import { Facades } from '../../+state/facades'
import { Model } from '../../model'

@ZWPMenuComponent('FileExplorerItemContextMenuComponent')
@Component({
    selector: 'zwp-file-explorer-item-context-menu',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-menu [menuOverlayData]="menuOverlayData">
            <div fxLayout="column" fxFlexFill>
                <zwp-md-button
                    *ngIf="menuOverlayData?.isDir === true"
                    (btnClick)="navigateDirectory()"
                    materialType="flat"
                    [backgroundColor]="'system-background' | zwpColorTheme"
                    icon="folder"
                    label="Open Folder"
                    [labelColor]="'label' | zwpColorTheme"
                    [iconColor]="'primary' | zwpColorTheme"
                    [horizontalAlign]="'start'"
                    [textStyle]="'body1'"
                    [iconTextStyle]="'headline'"
                ></zwp-md-button>
                <zwp-md-button
                    *ngIf="menuOverlayData?.isDir === false"
                    (btnClick)="previewFile()"
                    materialType="flat"
                    [backgroundColor]="'system-background' | zwpColorTheme"
                    icon="preview"
                    label="Preview File"
                    [labelColor]="'label' | zwpColorTheme"
                    [iconColor]="'primary' | zwpColorTheme"
                    [horizontalAlign]="'start'"
                    [textStyle]="'body1'"
                    [iconTextStyle]="'headline'"
                ></zwp-md-button>
                <zwp-divider></zwp-divider>
                <zwp-md-button
                    (btnClick)="deleteEntity()"
                    materialType="flat"
                    [backgroundColor]="'system-background' | zwpColorTheme"
                    icon="delete"
                    label="Delete"
                    [labelColor]="'label' | zwpColorTheme"
                    [iconColor]="'destructive' | zwpColorTheme"
                    [horizontalAlign]="'start'"
                    [textStyle]="'body1'"
                    [iconTextStyle]="'headline'"
                ></zwp-md-button>
                <zwp-divider></zwp-divider>
                <!-- <span fxFlex="noshrink" zwpPadding="100" [style.whitespace]="'nowrap'" (click)="openMenu($event)" [zwpTextStyle]="'subheadline'" [style.color]="'label' | zwpColorTheme">Hello there!</span>
                <span fxFlex="noshrink" zwpPadding="100" [style.whitespace]="'nowrap'" (click)="openMenu($event)" [zwpTextStyle]="'subheadline'" [style.color]="'label' | zwpColorTheme">{{ menuOverlayData | json }}</span> -->
            </div>
        </zwp-menu>
    `,
})
export class FileExplorerItemContextMenuComponent extends BaseMenuComponent {
    private menuFacade = inject(ZWPMenuLayoutFacade)
    private fileExplorerFacade = inject(Facades.ZWPFileExplorerFacade)

    constructor() {
        super()
        // this._menuOverlayData.subscribe((data) => )
    }

    navigateDirectory() {
        const data: Model.FileDataItem = this.menuOverlayData
        if (!isUndefined(data) && data.isDir) {
            this.fileExplorerFacade.navigateDirectory(data.id)
        }
        this.close()
    }

    deleteEntity() {
        const data: Model.FileDataItem = this.menuOverlayData
        if (!isUndefined(data)) {
            this.fileExplorerFacade.deleteFileExplorerItem(data.id)
        }
        this.close()
    }

    previewFile() {
        this.close()
    }
}
