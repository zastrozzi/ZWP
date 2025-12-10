import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { ZWPRightPanelComponent, RIGHT_PANEL_COMPONENT_DATA } from '@zwp/platform.layout'
import { Model } from '../../model'
import { State } from '../../+state'
import { v4 } from 'uuid'
import { distinct, map, Observable, of, tap } from 'rxjs'
import { isUndefined } from '@zwp/platform.common'

@ZWPRightPanelComponent('SectorDetailRightPanelComponent')
@Component({
    selector: 'urnet-mnet-sector-detail-right-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlexFill fxLayoutGap="5px" zwpPadding="5 0">
            <ng-container *ngIf="sector$ | async as sector">
            <div fxLayout="column" zwpPadding="0 5" fxLayoutGap="5px" fxLayoutAlign="start stretch">
                <zwp-labelled-property [label]="'Name'" [property]="sector.name" />
                <zwp-labelled-property [label]="'Created At'" [property]="sector.dbCreatedAt | date: 'yyyy/MM/dd HH:mm:ss'" />
                <zwp-labelled-property [label]="'Updated At'" [property]="sector.dbUpdatedAt | date: 'yyyy/MM/dd HH:mm:ss'" />
                <zwp-labelled-property [label]="'Status'" [property]="sector.status | zwpTransformEnum: statusEnumSignature" />
                <zwp-labelled-property [label]="'Display Image URL'" [property]="sector.displayImageUrl" layout="column"/>
                <!-- <zwp-labelled-property [label]="'Link'" [property]="storageObject.selfLink ?? ''" /> -->
                <!-- <zwp-labelled-property [label]="'Google ID'" [property]="storageObject.googleId ?? ''" /> -->
                <div fxFlexAlign="stretch" fxFlexOffset="10px" [style.position]="'relative'">
                    <img zwpCorners="5" [ngSrc]="sector.displayImageUrl ?? ''" fill [style.height]="'auto'" [style.position]="'relative'" priority>
                </div>
                
            </div>
            </ng-container>
            
            <zwp-divider></zwp-divider>
            
        </div>
    `
})
export class SectorDetailRightPanelComponent implements OnInit {
    componentData = inject(RIGHT_PANEL_COMPONENT_DATA) as { sectorId: string }
    private sectorFacade = inject(State.Facades.SectorFacade)
    statusEnumSignature = Model.sectorStatusLabelPipeSignature
    
    sector$: Observable<Model.SectorResponse | undefined> = of(undefined)

    ngOnInit() {
        this.sector$ = this.sectorFacade
            .sectorById$(this.componentData.sectorId)
            .pipe(
                tap(sector => {
                    if (isUndefined(sector)) {
                        this.sectorFacade.getSector(this.componentData.sectorId)
                    }
                })
            )
    }
}