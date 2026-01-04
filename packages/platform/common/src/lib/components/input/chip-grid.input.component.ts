import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'
import { TransformEnumPipeSignature } from '../../model'
import { allEnumCases } from '../../utils'

@Component({
    selector: 'zwp-chip-grid-input',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="row" fxLayoutAlign="start start" fxLayoutGap="5px">
            <mat-chip-set>
            <ng-container *ngFor="let option of getAllOptions()">
                <mat-chip-row *ngIf="optionIsSelected(option) as optionSelection"
                    class="noPaddingChip"
                    [zwpBackgroundColor]="optionSelection.isSelected ? 'primary' : 'quaternary-system-fill'"
                    zwpCorners="4"
                    zwpPadding="0 8 0 8"
                    zwpMargin="0 0 0 8"
                    [zwpMatchHeight]="square ? 1 : 0"
                    (click)="toggleSelection(option)"
                >
                <span 
                        [zwpTextStyle]="textStyle" zwpFontWeight="500"
                        [zwpColor]="optionSelection.isSelected ? 'system-white' : 'label'"
                    >{{ option | zwpTransformEnum: transformSignature }}</span>
                    
                    
                </mat-chip-row>
            </ng-container>
            </mat-chip-set>
            <zwp-md-button 
                *ngIf="multi"
                [textStyle]="'button1'" [padding]="'8.5 8'"
                [label]="'Toggle All'" [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                (btnClick)="toggleAll()" [submitButton]="true"
            ></zwp-md-button>
        </div>
    `
})
export class ZWPChipGridInputComponent<EnumInput> {
    @Input() enumInput: FormControl<EnumInput[] | EnumInput | null> = new FormControl(null)
    @Input() transformSignature!: TransformEnumPipeSignature
    @Input() textStyle = 'subheadline'
    @Input() square = false
    @Input() multi = false

    @Input() enumSort?: (a: EnumInput, b: EnumInput) => number

    getAllOptions() {
        return allEnumCases(this.transformSignature.input)
    }

    optionIsSelected(option: EnumInput): { isSelected: boolean, option: EnumInput } {
        return { isSelected: this._inputValueAsArray().includes(option), option }
    }

    toggleSelection(option: EnumInput): void {
        if (this.multi) {
            const options = this._inputValueAsArray()
            if (options.includes(option)) {
                this.enumInput.setValue(options.filter(o => o !== option).sort(this.enumSort))    
            } else {
                this.enumInput.setValue([...options, option].sort(this.enumSort))
            }
        } else {
            this.enumInput.setValue(this.enumInput.value === option ? null : option)
        }
    }

    toggleAll(): void {
        const options = this._inputValueAsArray()
        const allOptions = this.getAllOptions()
        if (options.length === allOptions.length) {
            this.enumInput.setValue(this.multi ? [] : null)
        } else {
            this.enumInput.setValue(this.multi ? allOptions : null)
        }
    }

    _inputValueAsArray(): EnumInput[] {
        return this.enumInput.value ? (Array.isArray(this.enumInput.value) ? this.enumInput.value : [this.enumInput.value]) : []
    }
}