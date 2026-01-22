import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { RIGHT_PANEL_COMPONENT_DATA, ZWPRightPanelComponent } from '@zwp/platform.layout'
import { Model } from '../../model'
import { Facades } from '../../+state/facades'

@ZWPRightPanelComponent('FileExplorerItemRightPanelComponent')
@Component({
    selector: 'zwp-file-explorer-item-right-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlexFill fxLayoutGap="5px" zwpPadding="5" *ngIf="fileDataItem$ | async as fileDataItem">
            <zwp-popup-editable-property label="Name" [property]="fileDataItem.name"/>
            <zwp-labelled-property [label]="'Created At'" [property]="fileDataItem.createdAt | date: 'yyyy/MM/dd HH:mm:ss'" />
            <zwp-labelled-property [label]="'Updated At'" [property]="fileDataItem.updatedAt | date: 'yyyy/MM/dd HH:mm:ss'" />
        </div>
    `
})
export class FileExplorerItemRightPanelComponent {
    componentData = inject(RIGHT_PANEL_COMPONENT_DATA) as Model.FileDataItem
    private fileExplorerFacade = inject(Facades.ZWPFileExplorerFacade)

    fileDataItem$ = this.fileExplorerFacade.fileDataItemById$(this.componentData.id)
}