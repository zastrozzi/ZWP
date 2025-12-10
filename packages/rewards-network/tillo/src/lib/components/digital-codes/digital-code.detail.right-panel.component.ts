import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { ZWPRightPanelComponent, RIGHT_PANEL_COMPONENT_DATA } from '@zwp/platform.layout'
import { State } from '../../+state';
import { Model } from '../../model';
import { distinct, map, Observable, of, tap } from 'rxjs'
import { isUndefined, TransformEnumPipeSignature } from '@zwp/platform.common'

@ZWPRightPanelComponent('TilloDigitalCodeDetailRightPanelComponent')
@Component({
    selector: 'rewards-network-tillo-digital-code-detail-right-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    
        <div fxLayout="column" fxFlexFill fxLayoutGap="5px" zwpPadding="5 0">
            <ng-container *ngIf="digitalCode$ | async as digitalCode">
            <div fxLayout="column"zwpPadding="0 5" fxLayoutGap="5px">
                <zwp-labelled-property [label]="'Status'" [property]="digitalCode.status" />
                <zwp-labelled-property [label]="'Created At'" [property]="digitalCode.dbCreatedAt | date: 'yyyy/MM/dd HH:mm:ss'" />
                <zwp-labelled-property [label]="'Updated At'" [property]="digitalCode.dbUpdatedAt | date: 'yyyy/MM/dd HH:mm:ss'" />
                <zwp-labelled-property [label]="'Face Value'" [property]="digitalCode.faceValue.amount | currency : 'GBP'" />
                <zwp-labelled-property [label]="'Cost Value'" [property]="digitalCode.costValue.amount | currency : 'GBP'" />
                <zwp-labelled-property [label]="'URL'" [property]="digitalCode.url" />
                <zwp-labelled-property [label]="'Expiration Date'" [property]="digitalCode.expirationDate | date: 'yyyy/MM/dd HH:mm:ss'" />
            </div>
            </ng-container>
            
            <zwp-divider></zwp-divider>
            
        </div>
    `
})

export class TilloDigitalCodeDetailRightPanelComponent implements OnInit {
    componentData = inject(RIGHT_PANEL_COMPONENT_DATA) as { digitalCodeId: string }
    private digitalCodeFacade = inject(State.Facades.TilloDigitalCodeFacade)

    digitalCode$: Observable<Model.DigitalGiftCodeResponse | undefined> = of(undefined)

    ngOnInit() {
        this.digitalCode$ = this.digitalCodeFacade
        .digitalCodeById$(this.componentData.digitalCodeId)
        .pipe(
            tap(digitalGiftCode => {
                if (isUndefined(digitalGiftCode)) {
                    this.digitalCodeFacade.getDigitalCode(this.componentData.digitalCodeId)
                }
            })
        )
    }
}