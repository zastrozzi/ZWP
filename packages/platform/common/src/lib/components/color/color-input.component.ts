import { coerceBooleanProperty } from '@angular/cdk/coercion'
import { DOWN_ARROW } from '@angular/cdk/keycodes'
import {
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
} from '@angular/core'
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator,
    ValidatorFn,
    Validators,
} from '@angular/forms'
import { ThemePalette } from '@angular/material/core'
import { MatFormField } from '@angular/material/form-field'
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input'
import { Subscription } from 'rxjs'
import { createMissingDateImplError, isNull } from '../../utils'
import { InputColor } from '../../model'
import { ZWPColorAdapterService, ZWP_COLOR_FORMATS, ZWPColorFormats } from '../../services'
import { ColorPickerComponent } from './color-picker.component'

export class ColorPickerInputEvent {
    value: InputColor | null

    constructor(public target: ColorPickerInputDirective, public targetElement: HTMLElement) {
        this.value = this.target.value
    }
}

export const ZWP_COLORPICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ColorPickerInputDirective),
    multi: true,
}

export const ZWP_COLORPICKER_VALIDATORS: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => ColorPickerInputDirective),
    multi: true,
}

@Directive({
    selector: 'input[zwpColorPicker]',
    providers: [
        ZWP_COLORPICKER_VALUE_ACCESSOR,
        ZWP_COLORPICKER_VALIDATORS,
        { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: ColorPickerInputDirective },
    ],
    exportAs: 'zwpColorPickerInput',
})
export class ColorPickerInputDirective implements ControlValueAccessor, OnDestroy, Validator {
    @HostBinding('attr.aria-haspopup') ariaHasPopup = this._picker ? 'dialog' : null
    @HostBinding('attr.aria-owns') ariaOwns = (this._picker?.opened && this._picker?.id) || null
    @HostBinding('disabled') ariaDisabled = this.disabled

    @Input()
    set zwpColorPicker(value: ColorPickerComponent) {
        if (!value) {
            return
        }

        this._picker = value
        this._picker.registerInput(this)
        this._pickerSubscription.unsubscribe()

        this._pickerSubscription = this._picker._selectedChanged.subscribe((selected: InputColor) => {
            this.value = selected
            this._cvaOnChange(selected)
            this._onTouched()
            this.colorInput.emit(new ColorPickerInputEvent(this, this._elementRef.nativeElement))
            this.colorChange.emit(new ColorPickerInputEvent(this, this._elementRef.nativeElement))
        })
    }
    _picker?: ColorPickerComponent

    @Input()
    get disabled(): boolean {
        return !!this._disabled
    }
    set disabled(value: boolean) {
        const newValue = coerceBooleanProperty(value)
        const element = this._elementRef.nativeElement

        if (this._disabled !== newValue) {
            this._disabled = newValue
            this._disabledChange.emit(newValue)
        }

        if (newValue && element.blur) {
            element.blur()
        }
    }
    private _disabled?: boolean

    @Input()
    get value(): InputColor | null {
        return this._value
    }
    set value(value: InputColor | null) {
        const oldValue = this.value
        this._value = value
        this._formatValue(value)

        if (!isNull(oldValue) && !isNull(value) && !this._adapter.sameColor(oldValue, value)) {
            this._valueChange.emit(value)
        }
    }
    private _value: InputColor | null = null

    @Output() readonly colorChange: EventEmitter<ColorPickerInputEvent> = new EventEmitter<ColorPickerInputEvent>()

    @Output() readonly colorInput: EventEmitter<ColorPickerInputEvent> = new EventEmitter<ColorPickerInputEvent>()

    _disabledChange = new EventEmitter<boolean>()

    _valueChange = new EventEmitter<InputColor>()

    private _pickerSubscription = Subscription.EMPTY
    private _validator: ValidatorFn | null = Validators.compose([])
    private _lastValueValid = false

    @HostListener('input', ['$event']) onInput(event: Event) {
        const inputEl = event.target as HTMLInputElement
        this._onInput(inputEl.value)
    }
    @HostListener('change') onChange() {
        this._onChange()
    }
    @HostListener('blur') onBlur() {
        this._onBlur()
    }
    @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
        this._onKeydown(event)
    }

    _onTouched = () => {
        // console.log('onTouched')
    }

    private _cvaOnChange: (value: any) => void = () => {
        // console.log('onChange')
    }

    private _validatorOnChange = () => {
        // console.log('validatorOnChange')
    }

    constructor(
        private _elementRef: ElementRef<HTMLInputElement>,
        @Optional() private _formField: MatFormField,
        @Optional() @Inject(ZWP_COLOR_FORMATS) private _colorFormats: ZWPColorFormats,
        private _adapter: ZWPColorAdapterService
    ) {
        if (!this._colorFormats) {
            throw createMissingDateImplError('ZWP_COLOR_FORMATS')
        }
    }

    public getThemePalette(): ThemePalette {
        return this._formField ? this._formField.color : undefined
    }

    registerOnValidatorChange(fn: () => void): void {
        this._validatorOnChange = fn
    }

    validate(c: AbstractControl): ValidationErrors | null {
        return this._validator ? this._validator(c) : null
    }

    getPopupConnectionElementRef(): ElementRef {
        return this.getConnectedOverlayOrigin()
    }

    getConnectedOverlayOrigin(): ElementRef {
        return this._formField ? this._formField.getConnectedOverlayOrigin() : this._elementRef
    }

    ngOnDestroy(): void {
        this._pickerSubscription.unsubscribe()
        this._valueChange.complete()
        this._disabledChange.complete()
    }

    writeValue(value: InputColor): void {
        this.value = value
    }

    registerOnChange(fn: (value: any) => void): void {
        this._cvaOnChange = fn
    }

    registerOnTouched(fn: () => void): void {
        this._onTouched = fn
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled
    }

    _onChange() {
        this.colorChange.emit(new ColorPickerInputEvent(this, this._elementRef.nativeElement))
    }

    _onKeydown(event: KeyboardEvent) {
        const isAltDownArrow = event.altKey && event.keyCode === DOWN_ARROW

        if (this._picker && isAltDownArrow && !this._elementRef.nativeElement.readOnly) {
            this._picker.open()
            event.preventDefault()
        }
    }

    _onBlur() {
        if (this.value) {
            this._formatValue(this.value)
        }

        this._onTouched()
    }

    private _formatValue(value: InputColor | null) {
        this._elementRef.nativeElement.value = value
            ? this._adapter.format(value, this._colorFormats.display.inputColor)
            : ''
    }

    _onInput(value: string) {
        const lastValueWasValid = this._lastValueValid
        const nextValue = this._adapter.parse(value)
        if (!isNull(nextValue) && !isNull(this._value)) {
            if (!this._adapter.sameColor(nextValue, this._value)) {
                this._value = nextValue
                this._cvaOnChange(nextValue)
                this._valueChange.emit(nextValue)
                this.colorInput.emit(new ColorPickerInputEvent(this, this._elementRef.nativeElement))
            } else if (lastValueWasValid !== this._lastValueValid) {
                this._validatorOnChange()
            }
        }
    }
}
