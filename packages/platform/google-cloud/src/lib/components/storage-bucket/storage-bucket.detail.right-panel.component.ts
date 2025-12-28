import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { ZWPRightPanelComponent, RIGHT_PANEL_COMPONENT_DATA } from '@zwp/platform.layout'
import { Model } from '../../model'
import { State } from '../../+state'
import { v4 } from 'uuid'
import { distinct, map, Observable, of, tap } from 'rxjs'
import { isUndefined } from '@zwp/platform.common'

@ZWPRightPanelComponent('StorageBucketDetailRightPanelComponent')
@Component({
    selector: 'kgc-storage-bucket-detail-right-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlexFill fxLayoutGap="5px" zwpPadding="5 0">
            <ng-container *ngIf="storageBucket$ | async as storageBucket">
            <div fxLayout="column"zwpPadding="0 5" fxLayoutGap="5px">
                <zwp-labelled-property [label]="'Name'" [property]="storageBucket.name ?? ''" />
                <zwp-labelled-property [label]="'Kind'" [property]="storageBucket.kind ?? ''" />
                <zwp-labelled-property [label]="'Location'" [property]="storageBucket.location ?? ''" />
                <!-- <zwp-labelled-property [label]="'Link'" [property]="storageBucket.selfLink ?? ''" /> -->
                <zwp-labelled-property [label]="'Google ID'" [property]="storageBucket.googleId ?? ''" />
            </div>
            </ng-container>
            
            <zwp-divider></zwp-divider>
            
        </div>
    `
})
export class StorageBucketDetailRightPanelComponent implements OnInit {
    componentData = inject(RIGHT_PANEL_COMPONENT_DATA) as { bucketId: string }
    private storageBucketFacade = inject(State.Facades.GoogleCloudStorageBucketFacade)
    
    storageBucket$: Observable<Model.Responses.StorageBucketResponse | undefined> = of(undefined)

    ngOnInit() {
        this.storageBucket$ = this.storageBucketFacade
            .storageBucketById$(this.componentData.bucketId)
            .pipe(
                tap(storageBucket => {
                    if (isUndefined(storageBucket)) {
                        this.storageBucketFacade.getStorageBucket(this.componentData.bucketId)
                    }
                })
            )
        // console.log(this.componentData, 'got component data')
    }
}