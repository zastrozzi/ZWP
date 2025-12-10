import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { ZWPRightPanelComponent, RIGHT_PANEL_COMPONENT_DATA } from '@zwp/platform.layout'
import { BrandResponse } from '../../model/responses';
import { State } from '../../+state';
import { Model } from '../../model';
import { distinct, map, Observable, of, tap } from 'rxjs'
import { isUndefined, TransformEnumPipeSignature } from '@zwp/platform.common'


@ZWPRightPanelComponent('TilloBrandDetailRightPanelComponent')
@Component({
    selector: 'rewards-network-tillo-brand-detail-right-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template:  `
        
        <div fxLayout="column" fxFlexFill fxLayoutGap="5px" zwpPadding="5 0">
            <ng-container *ngIf="tilloBrands$ | async as tilloBrands">
            <div fxLayout="column"zwpPadding="0 5" fxLayoutGap="5px">
                <zwp-labelled-property [label]="'Name'" [property]="tilloBrands.name" />
                <zwp-labelled-property [label]="'Status'" [property]="tilloBrands.status.code | zwpTransformEnum: statusEnumSignature" />
                <zwp-labelled-property [label]="'Product Type'" [property]="tilloBrands.type | zwpTransformEnum: productTypePipeSignature" />
                <zwp-labelled-property [label]="'Created At'" [property]="tilloBrands.dbCreatedAt | date: 'yyyy/MM/dd HH:mm:ss'" />
                <zwp-labelled-property [label]="'Updated At'" [property]="tilloBrands.dbUpdatedAt | date: 'yyyy/MM/dd HH:mm:ss'" />
            </div>
            </ng-container>
            
            <zwp-divider></zwp-divider>
            
        </div>
    `

})
export class TilloBrandDetailRightPanelComponent implements OnInit {
    componentData = inject(RIGHT_PANEL_COMPONENT_DATA) as { brandId: string }
    private tilloBrandFacade = inject(State.Facades.TilloBrandFacade)
    statusEnumSignature = Model.brandStatusLabelPipeSignature
    productTypePipeSignature = Model.productTypeLabelPipeSignature
    transactionTypePipeSignature = Model.transactionTypePipeSignature


    tilloBrands$: Observable<Model.BrandResponse | undefined> = of(undefined)

    ngOnInit() {
        this.tilloBrands$ = this.tilloBrandFacade
        .brandById$(this.componentData.brandId)
        .pipe(
            tap(tilloBrand => {
                if (isUndefined(tilloBrand)) {
                    this.tilloBrandFacade.getBrand(this.componentData.brandId)
                }
            })
        )
        console.log('Tillo brands', this.tilloBrands$)
    }
}