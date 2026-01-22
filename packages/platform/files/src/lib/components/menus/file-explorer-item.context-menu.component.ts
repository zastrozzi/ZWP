import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { isUndefined } from '@zwp/platform.common'
import { BaseMenuComponent, MENU_COMPONENT_DATA, ZWPMenuComponent, ZWPMenuLayoutFacade, ZWPPanelLayoutFacade } from '@zwp/platform.layout'
import { Facades } from '../../+state/facades'
import { Model } from '../../model'

@ZWPMenuComponent('FileExplorerItemContextMenuComponent')
@Component({
    selector: 'zwp-file-explorer-item-context-menu',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-menu>
            <div fxLayout="column" fxFlexFill>
                <zwp-md-button
                    *ngIf="menuData.isDir"
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
                    *ngIf="!menuData.isDir"
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
                    (btnClick)="openInInspector()"
                    materialType="flat"
                    [backgroundColor]="'system-background' | zwpColorTheme"
                    icon="vertical_split"
                    label="Open in Inspector"
                    [labelColor]="'label' | zwpColorTheme"
                    [iconColor]="'primary' | zwpColorTheme"
                    [horizontalAlign]="'start'"
                    [textStyle]="'body1'"
                    [iconTextStyle]="'headline'"
                ></zwp-md-button>
                <zwp-divider></zwp-divider>
                <zwp-md-button
                    (btnClick)="openInNewInspector()"
                    materialType="flat"
                    [backgroundColor]="'system-background' | zwpColorTheme"
                    icon="vertical_split"
                    label="Open in New Inspector"
                    [labelColor]="'label' | zwpColorTheme"
                    [iconColor]="'primary' | zwpColorTheme"
                    [horizontalAlign]="'start'"
                    [textStyle]="'body1'"
                    [iconTextStyle]="'headline'"
                ></zwp-md-button>
                <zwp-divider></zwp-divider>
                <zwp-md-button
                    *ngIf="menuData.parentFileDataItemId !== undefined"
                    (btnClick)="moveToParent()"
                    materialType="flat"
                    [backgroundColor]="'system-background' | zwpColorTheme"
                    icon="move_up"
                    label="Move to Enclosing Folder"
                    [labelColor]="'label' | zwpColorTheme"
                    [iconColor]="'primary' | zwpColorTheme"
                    [horizontalAlign]="'start'"
                    [textStyle]="'body1'"
                    [iconTextStyle]="'headline'"
                ></zwp-md-button>
                <zwp-divider *ngIf="menuData.parentFileDataItemId !== undefined"></zwp-divider>
                <zwp-md-button
                    (btnClick)="duplicate()"
                    materialType="flat"
                    [backgroundColor]="'system-background' | zwpColorTheme"
                    icon="content_copy"
                    label="Duplicate"
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
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    menuData = inject(MENU_COMPONENT_DATA) as Model.FileDataItem
    private fileExplorerFacade = inject(Facades.ZWPFileExplorerFacade)

    constructor() {
        super()
        // this._menuOverlayData.subscribe((data) => )
    }

    navigateDirectory() {
        this.fileExplorerFacade.navigateDirectory(this.menuData.id)
        this.close()
    }

    deleteEntity() {
        this.fileExplorerFacade.deleteFileExplorerItem(this.menuData.id)
        this.close()
    }

    previewFile() {
        this.close()
    }

    openInInspector() {
        this.panelLayoutFacade.addRightPanel({
            id: `file-explorer-item-details`,
            label: `File Explorer - ${this.menuData.name}`,
            icon: 'perm_media',
            componentName: 'FileExplorerItemRightPanelComponent',
            data: {
                ...this.menuData
            },
            dataId: this.menuData.id
        })
        this.close()
    }

    openInNewInspector() {
        this.panelLayoutFacade.addRightPanel({
            id: `file-explorer-item-details`,
            label: `File Explorer - ${this.menuData.name}`,
            icon: 'perm_media',
            componentName: 'FileExplorerItemRightPanelComponent',
            data: {
                ...this.menuData
            },
            dataId: this.menuData.id
        }, true)
        this.close()
    }

    async moveToParent() {
        if (!isUndefined(this.menuData.parentFileDataItemId)) {
            const newParentId = await this.fileExplorerFacade.getParentFileDataItemId(this.menuData.parentFileDataItemId)
            this.fileExplorerFacade.updateFileExplorerItemParent(
                this.menuData.id,
                this.menuData.parentFileDataItemId,
                newParentId
            )
        }
        this.close()
    }

    async duplicate() {
        await this.fileExplorerFacade.duplicateFileData(this.menuData.id)
        this.close()
    }
}
