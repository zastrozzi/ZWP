import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { ZWPRightPanelComponent, RIGHT_PANEL_COMPONENT_DATA } from '@zwp/platform.layout'
import { StoreCardResponse } from '../../model/responses';
import { State } from '../../+state';
import { Model } from '../../model';
import { distinct, map, Observable, of, tap } from 'rxjs'
import { isUndefined, TransformEnumPipeSignature } from '@zwp/platform.common'

@ZWPRightPanelComponent('TilloStoreCardDetailRightPanelComponent')
@Component({
    selector: 'rewards-network-tillo-store-card-detail-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        
        <div fxLayout="column" fxFlexFill fxLayoutGap="5px" zwpPadding="5 0">
            <ng-container *ngIf="tilloStoreCard$ | async as tilloStoreCards">
            <div fxLayout="column"zwpPadding="0 5" fxLayoutGap="5px">
                <zwp-labelled-property [label]="'Status'" [property]="tilloStoreCards.status | zwpTransformEnum: statusEnumSignature" />
                <zwp-labelled-property [label]="'Created At'" [property]="tilloStoreCards.dbCreatedAt | date: 'yyyy/MM/dd HH:mm:ss'" />
                <zwp-labelled-property [label]="'Updated At'" [property]="tilloStoreCards.dbUpdatedAt | date: 'yyyy/MM/dd HH:mm:ss'" />
            </div>
            </ng-container>
            
            <zwp-divider></zwp-divider>
            
        </div>
    `
})

export class TilloStoreCardDetailRightPanelComponent implements OnInit {
    componentData = inject(RIGHT_PANEL_COMPONENT_DATA) as { storeCardId: string }
    private storeCardFacade = inject(State.Facades.TilloStoreCardFacade)
    statusEnumSignature = Model.storeCardLabelPipeSignature

    tilloStoreCard$: Observable<Model.StoreCardResponse | undefined> = of(undefined)

    ngOnInit() {
        this.tilloStoreCard$ = this.storeCardFacade
        .storeCardById$(this.componentData.storeCardId)
        .pipe(
            tap(storeCard => {
                if (isUndefined(storeCard)) {
                    this.storeCardFacade.getStoreCard(this.componentData.storeCardId)                }
            })
        )
    }
}