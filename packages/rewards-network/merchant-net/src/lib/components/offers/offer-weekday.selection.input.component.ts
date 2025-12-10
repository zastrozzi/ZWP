import { Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Model } from '../../model'
import { allEnumCases, TransformEnumPipeSignature } from '@zwp/platform.common'
import { offerWeekdaySort } from '../../model/enums'

@Component({
    selector: 'urnet-mnet-offer-weekday-selection-input',
    template: `
        <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="5px" fxFlex="grow">
            <mat-chip-grid>
            <ng-container *ngFor="let weekday of allWeekdays">
                <mat-chip-row *ngIf="weekdayIsSelected(weekday) as weekdaySelection"
                    class="noPaddingChip"
                    [zwpBackgroundColor]="weekdaySelection.isSelected ? 'primary' : 'quaternary-system-fill'"
                    zwpCorners="4"
                    zwpPadding="0 8 0 8"
                    [zwpMatchHeight]="square ? 1 : 0"
                    (click)="toggleWeekdaySelection(weekday)"
                >
                <span 
                        [zwpTextStyle]="textStyle" zwpFontWeight="600"
                        [zwpColor]="weekdaySelection.isSelected ? 'system-white' : 'label'"
                    >{{ weekday | zwpTransformEnum: weekdayInitialTransform }}</span>
                    
                    
                </mat-chip-row>
            </ng-container>
            </mat-chip-grid>
            <zwp-md-button 
                [label]="'Toggle All'" [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                (btnClick)="toggleAllWeekdays()"
            ></zwp-md-button>
        </div>
    `
})
export class OfferWeekdaySelectionInputComponent {
    @Input() weekdaysInput: FormControl<Model.OfferWeekday[] | null> = new FormControl([])
    @Input() textStyle = 'subheadline'
    @Input() square = false

    allWeekdays = allEnumCases(Model.OfferWeekday)
    weekdayInitialTransform: TransformEnumPipeSignature = { input: Model.OfferWeekday, output: Model.OfferWeekdayLabel }

    weekdayIsSelected(weekday: Model.OfferWeekday): { isSelected: boolean, weekday: Model.OfferWeekday } {
        return { isSelected: this.weekdaysInput.value?.includes(weekday) ?? false, weekday }
    }

    toggleWeekdaySelection(weekday: Model.OfferWeekday): void {
        const weekdays = this.weekdaysInput.value ?? []
        if (weekdays.includes(weekday)) {
            this.weekdaysInput.setValue(weekdays.filter(w => w !== weekday).sort(offerWeekdaySort))
        } else {
            this.weekdaysInput.setValue([...weekdays, weekday].sort(offerWeekdaySort))
        }
    }

    toggleAllWeekdays(): void {
        const weekdays = this.weekdaysInput.value ?? []
        if (weekdays.length === this.allWeekdays.length) {
            this.weekdaysInput.setValue([])
        } else {
            this.weekdaysInput.setValue(this.allWeekdays)
        }
    }
}