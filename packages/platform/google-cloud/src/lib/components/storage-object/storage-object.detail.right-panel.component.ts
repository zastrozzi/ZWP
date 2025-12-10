import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { ZWPRightPanelComponent, RIGHT_PANEL_COMPONENT_DATA } from '@zwp/platform.layout'
import { Model } from '../../model'
import { State } from '../../+state'
import { v4 } from 'uuid'
import { distinct, map, Observable, of, tap } from 'rxjs'
import { isUndefined } from '@zwp/platform.common'

@ZWPRightPanelComponent('StorageObjectDetailRightPanelComponent')
@Component({
    selector: 'kgc-storage-object-detail-right-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlexFill fxLayoutGap="5px" zwpPadding="5 0">
            <ng-container *ngIf="storageObject$ | async as storageObject">
            <div fxLayout="column" zwpPadding="0 5" fxLayoutGap="5px" fxLayoutAlign="start stretch">
                <zwp-labelled-property [label]="'Name'" [property]="storageObject.name ?? ''" />
                <zwp-labelled-property [label]="'Kind'" [property]="storageObject.kind ?? ''" />
                <zwp-labelled-property [label]="'Size'" [property]="storageObject.size ?? ''" />
                <zwp-labelled-property [label]="'Content Type'" [property]="storageObject.contentType ?? ''" />
                <zwp-labelled-property [label]="'Media Link'" [property]="storageObject.mediaLink ?? ''" layout="column"/>
                <!-- <zwp-labelled-property [label]="'Link'" [property]="storageObject.selfLink ?? ''" /> -->
                <!-- <zwp-labelled-property [label]="'Google ID'" [property]="storageObject.googleId ?? ''" /> -->
                <div fxFlexAlign="stretch" fxFlexOffset="10px" [style.position]="'relative'">
                    <img zwpCorners="5" [ngSrc]="storageObject.mediaLink ?? ''" fill [style.height]="'auto'" [style.position]="'relative'" priority>
                </div>
                
            </div>
            </ng-container>
            
            <zwp-divider></zwp-divider>
            
        </div>
    `
})
export class StorageObjectDetailRightPanelComponent implements OnInit {
    componentData = inject(RIGHT_PANEL_COMPONENT_DATA) as { objectId: string }
    private storageObjectFacade = inject(State.Facades.GoogleCloudStorageObjectFacade)
    
    storageObject$: Observable<Model.Responses.StorageObjectResponse | undefined> = of(undefined)

    ngOnInit() {
        this.storageObject$ = this.storageObjectFacade
            .storageObjectById$(this.componentData.objectId)
            .pipe(
                tap(storageObject => {
                    if (isUndefined(storageObject)) {
                        this.storageObjectFacade.getStorageObject(this.componentData.objectId)
                    }
                })
            )
    }
}