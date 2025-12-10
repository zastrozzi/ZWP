import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { ZWPRightPanelComponent, RIGHT_PANEL_COMPONENT_DATA } from '@zwp/platform.layout'
import { State } from '../../+state';
import { Model } from '../../model';
import { distinct, map, Observable, of, tap } from 'rxjs'
import { isUndefined, TransformEnumPipeSignature } from '@zwp/platform.common';


@ZWPRightPanelComponent('TilloFloatDetailRightPanelComponent')
@Component({
    selector: 'rewards-network-tillo-float-detail-right-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlexFill fxLayoutGap="5px" zwpPadding="5 0">
            <ng-container *ngIf="float$ | async as float">
            <div fxLayout="column"zwpPadding="0 5" fxLayoutGap="5px">
                <zwp-labelled-property [label]="'Created At'" [property]="float.dbCreatedAt | date: 'yyyy/MM/dd HH:mm:ss'" />
                <zwp-labelled-property [label]="'Updated At'" [property]="float.dbUpdatedAt | date: 'yyyy/MM/dd HH:mm:ss'" />
                <zwp-labelled-property [label]="'Deleted At'" [property]="float.dbDeletedAt | date: 'yyyy/MM/dd HH:mm:ss'" />
                <zwp-labelled-property [label]="'Available Balance'" [property]="float.availableBalance.amount | currency : 'GBP'" />
            </div>
            </ng-container>
            
            <zwp-divider></zwp-divider>
            
        </div>`
})
export class TilloFloatDetailRightPanelComponent implements OnInit {
    componentData = inject(RIGHT_PANEL_COMPONENT_DATA) as { floatId: string }
    private floatFacade = inject(State.Facades.TilloFloatFacade)

    float$: Observable<Model.FloatResponse | undefined> = of(undefined)


    ngOnInit() {
        this.float$ = this.floatFacade
        .floatById$(this.componentData.floatId)
        .pipe(
            tap(float => {
                if(isUndefined(float)) {
                    this.floatFacade.getFloat(this.componentData.floatId)
                }
            })
        )
    }
}
