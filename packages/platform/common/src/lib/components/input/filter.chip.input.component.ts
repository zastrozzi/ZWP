import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core'
import {
    FilterChip,
    FilterChipEvent,
    FilterDefinition,
    FilterTypeDefinition,
    ZWPDateFilterType,
    ZWPDateFilterTypeLabel,
    ZWPEnumFilterType,
    ZWPEnumFilterTypeLabel,
    ZWPFilterChipInputType,
    ZWPNumberFilterType,
    ZWPNumberFilterTypeLabel,
    ZWPStringFilterType,
    ZWPStringFilterTypeLabel,
    Nullable,
    TransformEnumPipeSignature,
} from '../../model'
import { ENTER } from '@angular/cdk/keycodes'
import { MatChipInput, MatChipInputEvent } from '@angular/material/chips'
import { FormControl } from '@angular/forms'
import { Observable, map, startWith, switchMap } from 'rxjs'
import { allEnumCases } from '../../utils'
import { TRANSFORM_ENUM_PIPE } from '../../pipes'
import { MatDatepicker, MatDatepickerInput, MatDatepickerInputEvent } from '@angular/material/datepicker'

@Component({
    selector: 'zwp-filter-chip-input',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlexFill>
            <div
                fxLayout="row"
                fxLayoutAlign="stretch center"
                fxFlex="42px"
                zwpCorners="4"
                zwpBackgroundColor="tertiary-system-fill"
            >
                <mat-form-field
                    appearance="outline"
                    fxFlex="grow"
                    class="noHintFormField noPaddingFormField noOutlineFormField"
                >
                    <mat-chip-grid #inputChipGrid>
                        <ng-container *ngFor="let filterChip of selectedFilters">
                            <mat-chip-row
                                zwpCorners="16"
                                zwpMargin="4 0 0 8"
                                (removed)="removeFilter(filterChip)"
                            >
                                <div
                                    fxLayout="row"
                                    fxLayoutAlign="stretch center"
                                    fxLayoutGap="10px"
                                >
                                    <span
                                        zwpTextStyle="body1"
                                        zwpFontWeight="400"
                                        >{{ filterChip.displayName }}</span>
                                    <zwp-divider
                                        [vertical]="true"
                                        fxFlexAlign="stretch"
                                    ></zwp-divider>
                                    <span
                                        zwpTextStyle="body1"
                                        zwpFontWeight="400"
                                        >{{
                                            getLabelForInputFilterType(filterChip)
                                        }}</span
                                    >
                                    <zwp-divider
                                        [vertical]="true"
                                        fxFlexAlign="stretch"
                                    ></zwp-divider>
                                    <span
                                        zwpTextStyle="body1"
                                        zwpFontWeight="600"
                                        >{{
                                            getLabelForInputValue(filterChip)
                                        }}</span
                                    >
                                </div>
                                <button matChipRemove aria-label="Remove filter">
                                    <mat-icon>cancel</mat-icon>
                                </button>
                            </mat-chip-row>
                        </ng-container>
                        <ng-container *ngIf="inputFilterChip as filterChip">
                            <mat-chip-row
                                (removed)="removeInput(filterChip)"
                                zwpCorners="16 0 0 16"
                            >
                                <span
                                    zwpTextStyle="body1"
                                    zwpFontWeight="600"
                                    >{{ filterChip.displayName }}</span
                                >
                            </mat-chip-row>
                            <ng-container
                                *ngIf="inputFilterHasFilterType(filterChip)"
                            >
                                <mat-chip-row
                                    (removed)="removeInput(filterChip)"
                                    zwpCorners="16 0 0 16"
                                >
                                    <span
                                        zwpTextStyle="body1"
                                        zwpFontWeight="600"
                                        >{{
                                            getLabelForInputFilterType(
                                                filterChip
                                            )
                                        }}</span
                                    >
                                </mat-chip-row>
                            </ng-container>
                            <ng-container *ngIf="hasInputValueDate()">
                                <mat-chip-row
                                    (removed)="removeInput(filterChip)"
                                    zwpCorners="16"
                                    zwpBackgroundColor="secondary"
                                >
                                    <div
                                        fxLayout="row"
                                        fxLayoutAlign="stretch center"
                                        fxLayoutGap="10px"
                                    >
                                        <span
                                            zwpTextStyle="body1"
                                            zwpFontWeight="400"
                                            zwpColor="system-white"
                                            (click)="openDatePicker()"
                                            >{{ getLabelForDatePicker() }}</span
                                        >
                                        <mat-icon
                                            zwpColor="system-white"
                                            [inline]="true"
                                            (click)="openDatePicker()"
                                            >{{ dropdownIcon }}</mat-icon
                                        >
                                    </div>
                                </mat-chip-row>
                            </ng-container>
                            <ng-container *ngIf="hasInputValueDateRange()">
                                <mat-chip-row
                                    (removed)="removeInput(filterChip)"
                                    zwpCorners="16"
                                    zwpBackgroundColor="secondary"
                                >
                                    <div
                                        fxLayout="row"
                                        fxLayoutAlign="stretch center"
                                        fxLayoutGap="10px"
                                    >
                                        <span
                                            zwpTextStyle="body1"
                                            zwpFontWeight="400"
                                            zwpColor="system-white"
                                            (click)="openDateRangeStartPicker()"
                                            >{{
                                                getLabelForDatePickerStart()
                                            }}</span
                                        >
                                        <mat-icon
                                            zwpColor="system-white"
                                            [inline]="true"
                                            (click)="openDateRangeStartPicker()"
                                            >{{ dropdownIcon }}</mat-icon
                                        >
                                        <zwp-divider
                                            [vertical]="true"
                                            fxFlexAlign="stretch"
                                        ></zwp-divider>
                                        <span
                                            zwpTextStyle="body1"
                                            zwpFontWeight="400"
                                            zwpColor="system-white"
                                            (click)="openDateRangeEndPicker()"
                                            >{{
                                                getLabelForDatePickerEnd()
                                            }}</span
                                        >
                                        <mat-icon
                                            zwpColor="system-white"
                                            [inline]="true"
                                            (click)="openDateRangeEndPicker()"
                                            >{{ dropdownIcon }}</mat-icon
                                        >
                                        <zwp-divider
                                            [vertical]="true"
                                            fxFlexAlign="stretch"
                                        ></zwp-divider>
                                        <mat-icon
                                            zwpColor="system-white"
                                            [inline]="true"
                                            (click)="saveDateRange()"
                                            >{{ confirmIcon }}</mat-icon
                                        >
                                    </div>
                                </mat-chip-row>
                            </ng-container>
                        </ng-container>

                        <input
                            #filterInput
                            [formControl]="filterControl"
                            type="text"
                            name="text"
                            zwpColor="label"
                            class="placeholderInheritColor"
                            [placeholder]="inputPlaceholder"
                            [matChipInputFor]="inputChipGrid"
                            [matAutocomplete]="columnFilterAutocomplete"
                            [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
                            [matChipInputAddOnBlur]="addOnBlur"
                            (matChipInputTokenEnd)="addInput($event)"
                        />
                        <input
                            matInput
                            #dateInput
                            [matDatepicker]="datePicker"
                            [style.height]="'0px'"
                            [style.width]="'0px'"
                            (dateInput)="selectDatePickerValue($event)"
                        />
                        <input
                            matInput
                            #dateRangeStartInput
                            [matDatepicker]="dateRangeStartPicker"
                            [style.height]="'0px'"
                            [style.width]="'0px'"
                            (dateInput)="selectDatePickerStartValue($event)"
                        />
                        <input
                            matInput
                            #dateRangeEndInput
                            [matDatepicker]="dateRangeEndPicker"
                            [style.height]="'0px'"
                            [style.width]="'0px'"
                            (dateInput)="selectDatePickerEndValue($event)"
                        />
                    </mat-chip-grid>
                </mat-form-field>
            </div>
            
            <mat-autocomplete
                #columnFilterAutocomplete="matAutocomplete"
                hideSingleSelectionIndicator
                [class]="['no-background-autocomplete', 'zwp-window-overlay-zindex-50']"
                [disableRipple]="true"
            >
                <mat-option zwpBackgroundColor="clear">
                    <ng-container *ngIf="inputMode === 'filterColumn'">
                        <mat-chip-listbox aria-label="Color selection">
                            <mat-chip
                                *ngFor="
                                    let definition of autocompleteFilteredDefinitions
                                        | async
                                "
                                [value]="definition"
                                zwpBackgroundColor="primary"
                                class="mat-elevation-z5"
                                (click)="selectColumn(definition)"
                                ><span zwpColor="system-white">{{
                                    definition.displayName
                                }}</span>
                            </mat-chip>
                        </mat-chip-listbox>
                    </ng-container>
                    <ng-container *ngIf="inputMode === 'filterType'">
                        <mat-chip-listbox aria-label="Color selection">
                            <mat-chip
                                *ngFor="
                                    let type of autocompleteFilteredTypes
                                        | async
                                "
                                [value]="type"
                                class="mat-elevation-z5"
                                zwpBackgroundColor="secondary"
                                (click)="selectFilterType(type)"
                            >
                                <span zwpColor="system-white">{{
                                    getLabelForFilterType(type)
                                }}</span>
                            </mat-chip>
                        </mat-chip-listbox>
                    </ng-container>
                    <ng-container *ngIf="hasInputValueEnumFilter()">
                        <mat-chip-listbox aria-label="Color selection">
                            <mat-chip
                                *ngFor="
                                    let enumValue of autocompleteFilteredEnumValues
                                        | async
                                "
                                [value]="enumValue"
                                class="mat-elevation-z5"
                                zwpBackgroundColor="secondary"
                                (click)="addFilterEnumValue(enumValue)"
                            >
                                <span zwpColor="system-white">{{
                                    getLabelForEnumInputValue(enumValue)
                                }}</span>
                            </mat-chip>
                        </mat-chip-listbox>
                    </ng-container>
                </mat-option>
            </mat-autocomplete>
            <mat-datepicker #datePicker panelClass="zwp-window-overlay-zindex-50"></mat-datepicker>
            <mat-datepicker #dateRangeStartPicker panelClass="zwp-window-overlay-zindex-50"></mat-datepicker>
            <mat-datepicker #dateRangeEndPicker panelClass="zwp-window-overlay-zindex-50"></mat-datepicker>
        </div>
    `,
})
export class ZWPFilterChipInputComponent {
    @ViewChild(MatChipInput) filterInput!: MatChipInput
    @ViewChild(MatDatepickerInput) dateInput!: MatDatepickerInput<Date>
    @ViewChild(MatDatepickerInput)
    dateRangeStartInput!: MatDatepickerInput<Date>
    @ViewChild(MatDatepickerInput) dateRangeEndInput!: MatDatepickerInput<Date>
    @ViewChild('datePicker') datePicker!: MatDatepicker<Date>
    @ViewChild('dateRangeStartPicker')
    dateRangeStartPicker!: MatDatepicker<Date>
    @ViewChild('dateRangeEndPicker') dateRangeEndPicker!: MatDatepicker<Date>

    filterControl = new FormControl('')

    inputMode: 'filterColumn' | 'filterType' | 'filterValue' = 'filterColumn'

    addOnBlur = true
    readonly separatorKeysCodes = [ENTER] as const
    readonly dropdownIcon = 'keyboard_arrow_down' as const
    readonly confirmIcon = 'check' as const
    selectedFilters: FilterChip[] = []
    inputFilterChip: Nullable<FilterChip> = null

    private transformEnumPipe = inject(TRANSFORM_ENUM_PIPE)

    @Output() filterChange = new EventEmitter<FilterChipEvent>()

    filteredDefinitions: Observable<FilterDefinition[]> =
        this.filterControl.valueChanges.pipe(
            startWith(null),
            map((value: string | null) =>
                value ? this._filterDefinitions(value) : this.filterDefinitions
            )
        )

    autocompleteFilteredDefinitions: Observable<FilterDefinition[]> = this.filterChange.pipe(
        startWith(null),
        switchMap(() => this.filteredDefinitions),
        map(definitions => definitions.filter(definition => !this.selectedFilters.some(filter => filter.name === definition.name)))
    )
    

    autocompleteFilteredTypes: Observable<FilterTypeDefinition[]> =
        this.filterControl.valueChanges.pipe(
            startWith(null),
            map((value: string | null) =>
                value ? this._filterTypes(value) : this._initialFilterTypes()
            )
        )

    autocompleteFilteredEnumValues: Observable<string[]> =
        this.filterControl.valueChanges.pipe(
            startWith(null),
            map((value: string | null) =>
                value ? this._filterEnumValues(value) : this._allEnumValues()
            ),
            map((values) => {
                return values
            })
        )

    @Input() filterDefinitions: FilterDefinition[] = []

    get _filterDefinitionsMap(): Record<string, FilterDefinition> {
        return this.filterDefinitions.reduce((acc, filter) => {
            acc[filter.name] = filter
            return acc
        }, {} as Record<string, FilterDefinition>)
    }

    get inputPlaceholder(): string {
        switch (this.inputMode) {
            case 'filterColumn':
                return 'Filter by column...'
            case 'filterType':
                return 'Choose filter type...'
            case 'filterValue': {
                if (this.hasInputValueDate() || this.hasInputValueDateRange())
                    return ''
                else if (this.hasInputValueNumberRange()) return 'Enter a range with two numbers separated by a comma...'
                else return 'Enter a value...'
            }
        }
    }

    openDatePicker() {
        this.datePicker.open()
    }

    openDateRangeStartPicker() {
        this.dateRangeStartPicker.open()
    }

    openDateRangeEndPicker() {
        this.dateRangeEndPicker.open()
    }

    getLabelForDatePicker(): string {
        if (
            this.inputFilterChip === null ||
            this.inputFilterChip.type !== ZWPFilterChipInputType.DATE
        )
            return ''
        if (
            this.inputFilterChip.dateFilter === null ||
            this.inputFilterChip.dateFilterType === null
        )
            return 'Select Date...'
        else {
            switch (this.inputFilterChip.dateFilterType) {
                case ZWPDateFilterType.EQUAL_TO:
                    if (this.inputFilterChip.dateFilter.equalTo === null)
                        return 'Select Date...'
                    else {
                        return new Date(
                            this.inputFilterChip.dateFilter.equalTo
                        ).toLocaleDateString()
                    }
                case ZWPDateFilterType.GREATER_THAN:
                    if (this.inputFilterChip.dateFilter.greaterThan === null)
                        return 'Select Date...'
                    else {
                        return new Date(
                            this.inputFilterChip.dateFilter.greaterThan
                        ).toLocaleDateString()
                    }
                case ZWPDateFilterType.LESS_THAN:
                    if (this.inputFilterChip.dateFilter.lessThan === null)
                        return 'Select Date...'
                    else {
                        return new Date(
                            this.inputFilterChip.dateFilter.lessThan
                        ).toLocaleDateString()
                    }
                case ZWPDateFilterType.RANGE:
                    return 'Select Date Range...'
                default:
                    return 'Select Date...'
            }
        }
    }

    getLabelForDatePickerStart(): string {
        if (
            this.inputFilterChip === null ||
            this.inputFilterChip.type !== ZWPFilterChipInputType.DATE
        )
            return ''
        if (
            this.inputFilterChip.dateFilter === null ||
            this.inputFilterChip.dateFilterType === null ||
            this.inputFilterChip.dateFilter.greaterThan === null
        )
            return 'Select Start Date...'
        else {
            return new Date(
                this.inputFilterChip.dateFilter.greaterThan
            ).toLocaleDateString()
        }
    }

    getLabelForDatePickerEnd(): string {
        if (
            this.inputFilterChip === null ||
            this.inputFilterChip.type !== ZWPFilterChipInputType.DATE
        )
            return ''
        if (
            this.inputFilterChip.dateFilter === null ||
            this.inputFilterChip.dateFilterType === null ||
            this.inputFilterChip.dateFilter.lessThan === null
        )
            return 'Select End Date...'
        else {
            return new Date(
                this.inputFilterChip.dateFilter.lessThan
            ).toLocaleDateString()
        }
    }

    getLabelForFilterType(definition: FilterTypeDefinition): string {
        switch (definition.inputType) {
            case ZWPFilterChipInputType.DATE:
                return this.transformEnumPipe.transform(definition.filterType, {
                    input: ZWPDateFilterType,
                    output: ZWPDateFilterTypeLabel,
                })
            case ZWPFilterChipInputType.NUMBER:
                return this.transformEnumPipe.transform(definition.filterType, {
                    input: ZWPNumberFilterType,
                    output: ZWPNumberFilterTypeLabel,
                })
            case ZWPFilterChipInputType.STRING:
                return this.transformEnumPipe.transform(definition.filterType, {
                    input: ZWPStringFilterType,
                    output: ZWPStringFilterTypeLabel,
                })
            case ZWPFilterChipInputType.ENUM:
                return this.transformEnumPipe.transform(definition.filterType, {
                    input: ZWPEnumFilterType,
                    output: ZWPEnumFilterTypeLabel,
                })
        }
    }

    getLabelForInputFilterType(filter: FilterChip): string {
        if (!this.inputFilterHasFilterType(filter)) return ''
        switch (filter.type) {
            case ZWPFilterChipInputType.DATE:
                if (filter.dateFilterType === null) return ''
                return this.transformEnumPipe.transform(filter.dateFilterType, {
                    input: ZWPDateFilterType,
                    output: ZWPDateFilterTypeLabel,
                })
            case ZWPFilterChipInputType.NUMBER:
                if (filter.numberFilterType === null) return ''
                return this.transformEnumPipe.transform(
                    filter.numberFilterType,
                    {
                        input: ZWPNumberFilterType,
                        output: ZWPNumberFilterTypeLabel,
                    }
                )
            case ZWPFilterChipInputType.STRING:
                if (filter.stringFilterType === null) return ''
                return this.transformEnumPipe.transform(
                    filter.stringFilterType,
                    {
                        input: ZWPStringFilterType,
                        output: ZWPStringFilterTypeLabel,
                    }
                )
            case ZWPFilterChipInputType.ENUM:
                if (filter.enumFilterType === null) return ''
                return this.transformEnumPipe.transform(filter.enumFilterType, {
                    input: ZWPEnumFilterType,
                    output: ZWPEnumFilterTypeLabel,
                })
        }
    }

    getLabelForInputValue(filter: FilterChip): string {
        switch (filter.type) {
            case ZWPFilterChipInputType.DATE:
                switch (filter.dateFilterType) {
                    case null:
                        return ''
                    case ZWPDateFilterType.EQUAL_TO:
                        return new Date(
                            filter.dateFilter?.equalTo ?? 0
                        ).toLocaleDateString()
                    case ZWPDateFilterType.GREATER_THAN:
                        return new Date(
                            filter.dateFilter?.greaterThan ?? 0
                        ).toLocaleDateString()
                    case ZWPDateFilterType.LESS_THAN:
                        return new Date(
                            filter.dateFilter?.lessThan ?? 0
                        ).toLocaleDateString()
                    case ZWPDateFilterType.RANGE:
                        return `${new Date(
                            filter.dateFilter?.greaterThan ?? 0
                        ).toLocaleDateString()} - ${new Date(
                            filter.dateFilter?.lessThan ?? 0
                        ).toLocaleDateString()}`
                    default:
                        return ''
                }
            case ZWPFilterChipInputType.NUMBER:
                switch (filter.numberFilterType) {
                    case null:
                        return ''
                    case ZWPNumberFilterType.EQUAL_TO:
                        return filter.numberFilter?.equalTo?.toString() || ''
                    case ZWPNumberFilterType.GREATER_THAN:
                        return (
                            filter.numberFilter?.greaterThan?.toString() || ''
                        )
                    case ZWPNumberFilterType.LESS_THAN:
                        return filter.numberFilter?.lessThan?.toString() || ''
                    case ZWPNumberFilterType.RANGE:
                        return `${filter.numberFilter?.greaterThanOrEqualTo} - ${filter.numberFilter?.lessThanOrEqualTo}`
                    default:
                        return ''
                }
            case ZWPFilterChipInputType.STRING:
                switch (filter.stringFilterType) {
                    case null:
                        return ''
                    case ZWPStringFilterType.EQUAL_TO:
                        return filter.stringFilter?.equalTo || ''
                    case ZWPStringFilterType.CONTAINS:
                        return filter.stringFilter?.contains || ''
                    default:
                        return ''
                }
            case ZWPFilterChipInputType.ENUM: {
                const enumDefinition = this._getEnumDefinition(filter)
                if (enumDefinition === null) return ''
                switch (filter.enumFilterType) {
                    case null:
                        return ''
                    case ZWPEnumFilterType.EQUAL_TO: {
                        const value = filter.enumFilter?.equalTo
                        if (value === null) return ''
                        const valueLabel = this.transformEnumPipe.transform(
                            value as string,
                            enumDefinition
                        )
                        return valueLabel.length === 0 ? 'Unknown' : valueLabel
                    }

                    case ZWPEnumFilterType.IN:
                        return 'ENUM IN NOT IMPLEMENTED'
                    case ZWPEnumFilterType.NOT_IN:
                        return 'ENUM NOT IN NOT IMPLEMENTED'
                    default:
                        return ''
                }
            }
        }
    }

    getLabelForEnumInputValue(value: string): string {
        if (
            this.inputFilterChip === null ||
            this.inputFilterChip.type !== ZWPFilterChipInputType.ENUM
        )
            return ''
        const filter = this.inputFilterChip
        const enumFilterDefinitions = this._filterDefinitions(
            filter.displayName
        )
        if (enumFilterDefinitions.length === 0) return ''
        const enumDefinition = enumFilterDefinitions[0].enumDefinition
        if (enumDefinition === null) return ''
        return this.transformEnumPipe.transform(value, enumDefinition)
    }

    inputFilterHasFilterType(filter: FilterChip): boolean {
        return (
            filter.stringFilterType !== null ||
            filter.numberFilterType !== null ||
            filter.dateFilterType !== null ||
            filter.enumFilterType !== null
        )
    }

    hasInputFilterChip(): boolean {
        return this.inputFilterChip !== null
    }

    hasSelectedFilters(): boolean {
        return this.selectedFilters.length > 0
    }

    hasInputValueEnumFilter(): boolean {
        return (
            this.inputMode === 'filterValue' &&
            this.inputFilterChip !== null &&
            this.inputFilterChip.type === ZWPFilterChipInputType.ENUM
        )
    }

    hasInputValueDate(): boolean {
        return (
            this.inputMode === 'filterValue' &&
            this.inputFilterChip !== null &&
            this.inputFilterChip.type === ZWPFilterChipInputType.DATE &&
            this.inputFilterChip.dateFilterType !== ZWPDateFilterType.RANGE
        )
    }

    hasInputValueDateRange(): boolean {
        return (
            this.inputMode === 'filterValue' &&
            this.inputFilterChip !== null &&
            this.inputFilterChip.type === ZWPFilterChipInputType.DATE &&
            this.inputFilterChip.dateFilterType === ZWPDateFilterType.RANGE
        )
    }

    hasInputValueNumberRange(): boolean {
        return (
            this.inputMode === 'filterValue' &&
            this.inputFilterChip !== null &&
            this.inputFilterChip.type === ZWPFilterChipInputType.NUMBER &&
            this.inputFilterChip.numberFilterType === ZWPNumberFilterType.RANGE
        )
    }

    getFilterTypesForFilter(filter: FilterChip): FilterTypeDefinition[] {
        switch (filter.type) {
            case ZWPFilterChipInputType.DATE:
                return allEnumCases(ZWPDateFilterType).map((type) => ({
                    inputType: ZWPFilterChipInputType.DATE,
                    filterType: type,
                }))
            case ZWPFilterChipInputType.NUMBER:
                return allEnumCases(ZWPNumberFilterType).map((type) => ({
                    inputType: ZWPFilterChipInputType.NUMBER,
                    filterType: type,
                }))
            case ZWPFilterChipInputType.STRING:
                return allEnumCases(ZWPStringFilterType).map((type) => ({
                    inputType: ZWPFilterChipInputType.STRING,
                    filterType: type,
                }))
            case ZWPFilterChipInputType.ENUM:
                return [ZWPEnumFilterType.EQUAL_TO].map((type) => ({
                    inputType: ZWPFilterChipInputType.ENUM,
                    filterType: type,
                }))
            default:
                return []
        }
    }

    private _initialFilterTypes(): FilterTypeDefinition[] {
        if (this.inputFilterChip === null) return []
        const filter = this.inputFilterChip
        return this.getFilterTypesForFilter(filter)
    }

    private _filterDefinitions(value: string): FilterDefinition[] {
        return this.filterDefinitions.filter((filter) =>
            filter.displayName.toLowerCase().includes(value.toLowerCase())
        )
    }

    private _filterEnumValues(value: string): string[] {
        return this._allEnumValues().filter((enumValue) =>
            enumValue.toLowerCase().includes(value.toLowerCase())
        )
    }

    private _allEnumValues(): string[] {
        if (
            this.inputFilterChip === null ||
            this.inputFilterChip.type !== ZWPFilterChipInputType.ENUM
        )
            return []
        const enumDefinition = this._getEnumDefinition(this.inputFilterChip)
        if (enumDefinition === null) return []
        return allEnumCases(enumDefinition.input)
    }

    private _getEnumDefinition(
        filter: FilterChip
    ): Nullable<TransformEnumPipeSignature> {
        const enumFilterDefinitions = this._filterDefinitions(
            filter.displayName
        )
        if (enumFilterDefinitions.length === 0) return null
        const enumDefinition = enumFilterDefinitions[0].enumDefinition
        if (enumDefinition === null) return null
        return enumDefinition
    }

    private _filterTypes(value: string): FilterTypeDefinition[] {
        if (this.inputFilterChip === null) return []
        const filter = this.inputFilterChip
        return this.getFilterTypesForFilter(filter).filter((type) =>
            type.filterType.toLowerCase().includes(value.toLowerCase())
        )
    }

    selectColumn(definition: FilterDefinition) {
        this.filterInput.clear()
        this.filterControl.setValue(null)
        this.inputFilterChip = {
            type: definition.type,
            name: definition.name,
            displayName: definition.displayName,
            stringFilter: null,
            numberFilter: null,
            dateFilter: null,
            enumFilter: null,
            stringFilterType: null,
            numberFilterType: null,
            dateFilterType: null,
            enumFilterType: null,
        }
        this.inputMode = 'filterType'
        this.filterInput.focus()
        this.filterInput.clear()
        this.filterControl.setValue(null)
    }

    selectFilterType(definition: FilterTypeDefinition) {
        this.filterInput.clear()
        this.filterControl.setValue(null)
        if (this.inputFilterChip === null) return
        switch (definition.inputType) {
            case ZWPFilterChipInputType.DATE:
                this.inputFilterChip.dateFilterType =
                    definition.filterType as ZWPDateFilterType
                if (
                    this.inputFilterChip.dateFilterType ===
                    ZWPDateFilterType.RANGE
                ) {
                    this.openDateRangeStartPicker()
                } else {
                    this.openDatePicker()
                }

                break
            case ZWPFilterChipInputType.NUMBER:
                // Temporarily disable range filter
                // if (definition.filterType === ZWPNumberFilterType.RANGE) return
                this.inputFilterChip.numberFilterType =
                    definition.filterType as ZWPNumberFilterType
                break
            case ZWPFilterChipInputType.STRING:
                this.inputFilterChip.stringFilterType =
                    definition.filterType as ZWPStringFilterType
                break
            case ZWPFilterChipInputType.ENUM:
                // Temporarily disable IN and NOT IN filters
                if (definition.filterType !== ZWPEnumFilterType.EQUAL_TO) return
                this.inputFilterChip.enumFilterType =
                    definition.filterType as ZWPEnumFilterType
                break
        }
        this.inputMode = 'filterValue'
        this.filterInput.focus()
        this.filterInput.clear()
        this.filterControl.setValue(null)
    }

    selectDatePickerValue(event: MatDatepickerInputEvent<Date>) {
        const value = event.value || new Date()
        if (this.inputFilterChip === null) return
        switch (this.inputFilterChip.dateFilterType) {
            case null:
                return
            case ZWPDateFilterType.EQUAL_TO:
                this.inputFilterChip.dateFilter = {
                    ...{ equalTo: null, greaterThan: null, lessThan: null },
                    ...this.inputFilterChip.dateFilter,
                    equalTo: value.getTime(),
                }
                break
            case ZWPDateFilterType.GREATER_THAN:
                this.inputFilterChip.dateFilter = {
                    ...{ equalTo: null, greaterThan: null, lessThan: null },
                    ...this.inputFilterChip.dateFilter,
                    greaterThan: value.getTime(),
                }
                break
            case ZWPDateFilterType.LESS_THAN:
                this.inputFilterChip.dateFilter = {
                    ...{ equalTo: null, greaterThan: null, lessThan: null },
                    ...this.inputFilterChip.dateFilter,
                    lessThan: value.getTime(),
                }
                break
            case ZWPDateFilterType.RANGE:
                return
        }
        this.saveInput()
        this.resetInput()
    }

    selectDatePickerStartValue(event: MatDatepickerInputEvent<Date>) {
        const value = event.value || new Date()
        if (this.inputFilterChip === null) return
        switch (this.inputFilterChip.dateFilterType) {
            case null:
                return
            case ZWPDateFilterType.RANGE:
                this.inputFilterChip.dateFilter = {
                    ...{ equalTo: null, greaterThan: null, lessThan: null },
                    ...this.inputFilterChip.dateFilter,
                    greaterThan: value.getTime(),
                }
                break
            default:
                return
        }
    }

    selectDatePickerEndValue(event: MatDatepickerInputEvent<Date>) {
        const value = event.value || new Date()
        if (this.inputFilterChip === null) return
        switch (this.inputFilterChip.dateFilterType) {
            case null:
                return
            case ZWPDateFilterType.RANGE:
                this.inputFilterChip.dateFilter = {
                    ...{ equalTo: null, greaterThan: null, lessThan: null },
                    ...this.inputFilterChip.dateFilter,
                    lessThan: value.getTime(),
                }
                break
            default:
                return
        }
    }

    saveDateRange() {
        if (this.inputFilterChip === null) return
        if (this.inputFilterChip.dateFilter === null) return
        if (
            this.inputFilterChip.dateFilter.greaterThan === null ||
            this.inputFilterChip.dateFilter.lessThan === null
        )
            return
        this.saveInput()
        this.resetInput()
    }

    addFilterEnumValue(value: string) {
        if (this.inputFilterChip === null) return
        const enumValues = this._filterEnumValues(value)
        if (enumValues.length !== 1) {
            return
        }

        switch (this.inputFilterChip.enumFilterType) {
            case null:
                break
            case ZWPEnumFilterType.EQUAL_TO:
                this.inputFilterChip.enumFilter = {
                    ...{ equalTo: null, in: null, notIn: null, all: null },
                    ...this.inputFilterChip.enumFilter,
                    equalTo: enumValues[0],
                }
                break
            case ZWPEnumFilterType.IN:
                break
            case ZWPEnumFilterType.NOT_IN:
                break
        }
        this.saveInput()
        this.resetInput()
    }

    addFilterNumberValue(value: string) {
        if (this.inputFilterChip === null) return
        switch (this.inputFilterChip.numberFilterType) {
            case null:
                return
            case ZWPNumberFilterType.EQUAL_TO:
                this.inputFilterChip.numberFilter = {
                    ...{ equalTo: null, greaterThan: null, lessThan: null, lessThanOrEqualTo: null, greaterThanOrEqualTo: null },
                    ...this.inputFilterChip.numberFilter,
                    equalTo: parseFloat(value),
                }
                break
            case ZWPNumberFilterType.GREATER_THAN:
                this.inputFilterChip.numberFilter = {
                    ...{ equalTo: null, greaterThan: null, lessThan: null, lessThanOrEqualTo: null, greaterThanOrEqualTo: null },
                    ...this.inputFilterChip.numberFilter,
                    greaterThan: parseFloat(value),
                }
                break
            case ZWPNumberFilterType.LESS_THAN:
                this.inputFilterChip.numberFilter = {
                    ...{ equalTo: null, greaterThan: null, lessThan: null, lessThanOrEqualTo: null, greaterThanOrEqualTo: null },
                    ...this.inputFilterChip.numberFilter,
                    lessThan: parseFloat(value),
                }
                break
            case ZWPNumberFilterType.RANGE: {
                const values =  value.split(',').map((v) => parseFloat(v.replace(/[^\d.-]/g, ''))).sort()
                if (values.length !== 2) return
                this.inputFilterChip.numberFilter = {
                    ...{ equalTo: null, greaterThan: null, lessThan: null, lessThanOrEqualTo: null, greaterThanOrEqualTo: null },
                    ...this.inputFilterChip.numberFilter,
                    greaterThanOrEqualTo: values[1],
                    lessThanOrEqualTo: values[0],
                }
                break
            }
        }
        this.saveInput()
        this.resetInput()
    }

    addFilterStringValue(value: string) {
        if (this.inputFilterChip === null) return
        switch (this.inputFilterChip.stringFilterType) {
            case null:
                return
            case ZWPStringFilterType.EQUAL_TO:
                this.inputFilterChip.stringFilter = {
                    ...{ equalTo: null, contains: null },
                    ...this.inputFilterChip.stringFilter,
                    equalTo: value,
                }
                break
            case ZWPStringFilterType.CONTAINS:
                this.inputFilterChip.stringFilter = {
                    ...{ equalTo: null, contains: null },
                    ...this.inputFilterChip.stringFilter,
                    contains: value,
                }
                break
        }
        this.saveInput()
        this.resetInput()
    }

    addFilterDateValue(value: string) {
        if (this.inputFilterChip === null) return
        switch (this.inputFilterChip.dateFilterType) {
            case null:
                return
            case ZWPDateFilterType.EQUAL_TO:
                this.inputFilterChip.dateFilter = {
                    ...{ equalTo: null, greaterThan: null, lessThan: null },
                    ...this.inputFilterChip.dateFilter,
                    equalTo: parseFloat(value),
                }
                break
            case ZWPDateFilterType.GREATER_THAN:
                this.inputFilterChip.dateFilter = {
                    ...{ equalTo: null, greaterThan: null, lessThan: null },
                    ...this.inputFilterChip.dateFilter,
                    greaterThan: parseFloat(value),
                }
                break
            case ZWPDateFilterType.LESS_THAN:
                this.inputFilterChip.dateFilter = {
                    ...{ equalTo: null, greaterThan: null, lessThan: null },
                    ...this.inputFilterChip.dateFilter,
                    lessThan: parseFloat(value),
                }
                break
            case ZWPDateFilterType.RANGE:
                return
        }
        this.saveInput()
        this.resetInput()
    }

    addInput(event: MatChipInputEvent): void {
        const value = (event.value || '').trim()
        if (!value) {
            return
        }
        switch (this.inputMode) {
            case 'filterValue':
                if (this.inputFilterChip === null) return
                switch (this.inputFilterChip.type) {
                    case ZWPFilterChipInputType.DATE:
                        return this.addFilterDateValue(value)
                    case ZWPFilterChipInputType.NUMBER:
                        return this.addFilterNumberValue(value)
                    case ZWPFilterChipInputType.STRING:
                        return this.addFilterStringValue(value)
                    case ZWPFilterChipInputType.ENUM:
                        return this.addFilterEnumValue(value)
                }
                break
            case 'filterType': {
                const definitions = this._filterTypes(value)
                if (definitions.length === 1) {
                    this.selectFilterType(definitions[0])
                }
                break
            }
            case 'filterColumn': {
                const definitions = this._filterDefinitions(value)
                if (definitions.length === 1) {
                    this.selectColumn(definitions[0])
                }
                break
            }
        }
    }

    saveInput(): void {
        if (this.inputFilterChip === null) return
        this.selectedFilters.push(this.inputFilterChip)
        this.filterChange.emit({filter: this.inputFilterChip, action: 'add'})
    }

    resetInput(): void {
        this.inputFilterChip = null
        this.inputMode = 'filterColumn'
        this.filterControl.setValue(null)
        this.filterControl.reset()
        this.filterInput.clear()
    }

    removeInput(filter: FilterChip): void {
        if (this.inputMode === 'filterColumn') {
            this.inputFilterChip = null
            this.inputMode = 'filterColumn'
        } else if (
            this.inputMode === 'filterType' &&
            this.inputFilterChip !== null
        ) {
            this.inputFilterChip.dateFilterType = null
            this.inputFilterChip.enumFilterType = null
            this.inputFilterChip.numberFilterType = null
            this.inputFilterChip.stringFilterType = null
            this.inputMode = 'filterColumn'
        } else if (
            this.inputMode === 'filterValue' &&
            this.inputFilterChip !== null
        ) {
            this.inputFilterChip.dateFilterType = null
            this.inputFilterChip.enumFilterType = null
            this.inputFilterChip.numberFilterType = null
            this.inputFilterChip.stringFilterType = null
            this.inputMode = 'filterType'
        }
        this.filterInput.focus()
        this.filterInput.clear()
        this.filterControl.setValue(null)
    }

    removeFilter(filter: FilterChip): void {
        const index = this.selectedFilters.indexOf(filter)
        if (index >= 0) {
            this.selectedFilters.splice(index, 1)
        }
        this.filterChange.emit({filter, action: 'remove'})
    }
}
