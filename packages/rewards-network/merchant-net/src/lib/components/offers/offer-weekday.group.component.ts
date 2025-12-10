import { Component, Input } from '@angular/core'
import { Model } from '../../model'
import { allEnumCases, TransformEnumPipeSignature } from '@zwp/platform.common'

@Component({
    selector: 'urnet-mnet-offer-weekday-group',
    template: `
        <div fxLayout="row" fxLayoutAlign="stretch stretch" fxLayoutGap="5px" fxFlex="grow">
            <ng-container *ngFor="let weekday of allWeekdays">
                <div *ngIf="weekdayIsSelected(weekday) as weekdaySelection"
                fxLayout="column"
                fxLayoutAlign="center center"
                [zwpMatchHeight]="1"
                zwpPadding="5"
                [zwpBackgroundColor]="weekdaySelection.isSelected ? 'primary' : 'tertiary-system-fill'"
                zwpCorners="4"
            >
                <span 
                    [zwpTextStyle]="textStyle" zwpFontWeight="500"
                    [zwpColor]="weekdaySelection.isSelected ? 'system-white' : 'label'"
                >{{ weekday | zwpTransformEnum: weekdayInitialTransform }}</span>
            </div>
            </ng-container>
        </div>
    `
})
export class OfferWeekdayGroupComponent {
    @Input() weekdays: Model.OfferWeekday[] = []
    @Input() size = '35px'
    @Input() textStyle = 'body1'

    allWeekdays = allEnumCases(Model.OfferWeekday)
    weekdayInitialTransform: TransformEnumPipeSignature = { input: Model.OfferWeekday, output: Model.OfferWeekdayInitial }

    weekdayIsSelected(weekday: Model.OfferWeekday): { isSelected: boolean, weekday: Model.OfferWeekday } {
        return { isSelected: this.weekdays.includes(weekday), weekday }
    }
}