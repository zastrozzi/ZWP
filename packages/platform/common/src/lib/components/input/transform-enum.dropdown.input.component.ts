import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, ViewChild } from '@angular/core'
import { map, Observable } from 'rxjs'
import { TransformEnumPipeSignature } from '../../model'
import { allEnumCases } from '../../utils'
import { TRANSFORM_ENUM_PIPE } from '../../pipes'
import { FormControl } from '@angular/forms'
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'

@Component({
    selector: 'zwp-transform-enum-dropdown-input',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div
            fxLayout="row"
            fxLayoutAlign="stretch center"
            fxFlex="45px"
            zwpCorners="4"
            zwpBackgroundColor="tertiary-system-fill"
        >
            <mat-form-field
                appearance="outline"
                fxFlex="grow"
                class="noHintFormField noPaddingFormField noOutlineFormField"
            >
                <div fxLayout="row">
                    <mat-chip-grid #enumChipList>
                        <mat-chip-row *ngIf="enumInput.value !== null && enumInput.value !== undefined" (removed)="clearInput()">
                            <span
                                zwpTextStyle="body1"
                                zwpFontWeight="400"
                            >{{ getEnumInput() | zwpTransformEnum: transformSignature }}</span>
                            <button matChipRemove ><mat-icon>cancel</mat-icon></button>
                        </mat-chip-row>
                        
                    </mat-chip-grid>
                    <input
                        [placeholder]="getPlaceholder()"
                        #filterInput
                        [style.marginLeft]="getInputMarginLeft()"
                        [formControl]="inputCtrl"
                        [matAutocomplete]="auto"
                        [matChipInputFor]="enumChipList"
                    />
                </div>
                <mat-autocomplete #auto="matAutocomplete" (optionSelected)="setInput($event)" hideSingleSelectionIndicator class="zwp-window-overlay-zindex-10">
                    <mat-option *ngFor="let enumValue of filteredEnumValues$ | async" [value]="enumValue">
                        {{ enumValue | zwpTransformEnum: transformSignature }}
                    </mat-option>
                </mat-autocomplete>
            </mat-form-field>
        </div>
    </div>
    `
})
export class ZWPTransformEnumDropdownInputComponent<EnumInput, EnumOutput> {
    @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>
    @Input() enumInput: FormControl<EnumInput | null> = new FormControl(null)
    @Input() transformSignature!: TransformEnumPipeSignature
    @Input() placeholder = ''
    private transformEnumPipe = inject(TRANSFORM_ENUM_PIPE)
    inputCtrl = new FormControl()

    filteredEnumValues$: Observable<string[]> = this.inputCtrl.valueChanges.pipe(
        map((value) => value ? this._filterInput(value) as unknown as string[] : allEnumCases(this.transformSignature.input as object) as string[])
    )
    
    private _filterInput(value: string): EnumInput[] {
        const filterValue: string = typeof value === 'string' ? value.toLowerCase() : ''
        return (allEnumCases(this.transformSignature.output) as EnumOutput[])
            .filter((enumOutput) => (enumOutput as unknown as string).toLowerCase().includes(filterValue))
            .map((enumOutput) => {
                return this.transformEnumPipe.transform(enumOutput as unknown as string, { input: this.transformSignature.output, output: this.transformSignature.input }) as unknown as EnumInput
            })
    }

    getPlaceholder(): string {
        if (this.enumInput.value === null || this.enumInput.value === undefined) {
            return this.placeholder
        } else {
            return ''
        }
    }

    getInputMarginLeft(): string {
        if (this.enumInput.value === null || this.enumInput.value === undefined) {
            return '0'
        } else {
            return '8px'
        }
    }

    getEnumInput(): string {
        return this.enumInput.value as unknown as string
    }

    setInput(event: MatAutocompleteSelectedEvent): void {
        const selectedValue: string = event.option.value
        const value: EnumInput = selectedValue as unknown as EnumInput
        if (value) {
            this.enumInput.setValue(value)
        }
        this.filterInput.nativeElement.value = ''
        this.inputCtrl.setValue(null)
    }

    clearInput(): void {
        this.enumInput.setValue(null)
        this.inputCtrl.setValue(null)
        this.filterInput.nativeElement.value = ''
    }
    
}