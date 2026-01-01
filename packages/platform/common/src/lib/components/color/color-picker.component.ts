import { Directionality } from '@angular/cdk/bidi'
import { coerceBooleanProperty } from '@angular/cdk/coercion'
import { ESCAPE, UP_ARROW } from '@angular/cdk/keycodes'
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy, ScrollStrategy } from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal'
import { DOCUMENT } from '@angular/common'
import {
    ChangeDetectionStrategy,
    Component,
    ComponentRef,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    InjectionToken,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core'
import { CanColor, ThemePalette, mixinColor } from '@angular/material/core'
import { matDatepickerAnimations } from '@angular/material/datepicker'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Subject, Subscription, merge } from 'rxjs'
import { filter, take } from 'rxjs/operators'
import { InputColor, Nullable } from '../../model'
import { ZWPColorAdapterService } from '../../services'
import { ColorPaletteComponent } from './color-palette.component'
import { ColorPickerInputDirective } from './color-input.component'
import { isNull } from '../../utils'

/** Injection token that determines the scroll handling while the calendar is open. */
export const ZWP_COLOR_PICKER_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>(
    'zwp.colorpicker-scroll-strategy'
)

export function ZWP_COLOR_PICKER_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.reposition()
}

export const ZWP_COLOR_PICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: ZWP_COLOR_PICKER_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: ZWP_COLOR_PICKER_SCROLL_STRATEGY_FACTORY,
}

const _ZWPColorpickerContentBase = mixinColor(
    class {
        constructor(public _elementRef: ElementRef) {}
    }
)

@Component({
    selector: 'zwp-color-picker-content',
    template: `
        <zwp-color-palette
            (colorChanged)="picker?.select($event)"
            [color]="picker?._selected"
            [theme]="color"
        ></zwp-color-palette>
    `,
    styles: [
        `
            $zwp-colorpicker-calendar-padding: 8px;
            $zwp-colorpicker-non-touch-calendar-cell-size: 40px;
            $zwp-colorpicker-non-touch-calendar-width: $zwp-colorpicker-non-touch-calendar-cell-size * 7 +
                $zwp-colorpicker-calendar-padding * 2;
            
            $zwp-colorpicker-non-touch-calendar-height: 354px;
            $zwp-colorpicker-touch-landscape-width: 64vh;
            $zwp-colorpicker-touch-landscape-height: 80vh;
            $zwp-colorpicker-touch-portrait-width: 80vw;
            $zwp-colorpicker-touch-portrait-height: 100vw;
            $zwp-colorpicker-touch-min-width: 250px;
            $zwp-colorpicker-touch-min-height: 312px;
            $zwp-colorpicker-touch-max-width: 750px;
            $zwp-colorpicker-touch-max-height: 788px;

            .zwp-colorpicker-content {
                display: block;
                border-radius: 4px;
                box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
                    0 1px 10px 0 rgba(0, 0, 0, 0.12);
                background-color: #fff;
                color: rgba(0, 0, 0, 0.87);
                padding: 16px;

                .zwp-color-palette {
                    width: $zwp-colorpicker-non-touch-calendar-width;
                    height: $zwp-colorpicker-non-touch-calendar-height;
                }
            }

            .zwp-colorpicker-content-touch {
                display: block;
                max-height: 80vh;
                overflow: auto;

                .zwp-color-palette {
                    min-width: $zwp-colorpicker-touch-min-width;
                    min-height: $zwp-colorpicker-touch-min-height;
                    max-width: $zwp-colorpicker-touch-max-width;
                    max-height: $zwp-colorpicker-touch-max-height;
                }
            }

            @media all and (orientation: landscape) {
                .zwp-colorpicker-content-touch .zwp-color-palette {
                    width: $zwp-colorpicker-touch-landscape-width;
                    height: $zwp-colorpicker-touch-landscape-height;
                }
            }

            @media all and (orientation: portrait) {
                .zwp-colorpicker-content-touch .zwp-color-palette {
                    width: $zwp-colorpicker-touch-portrait-width;
                    height: $zwp-colorpicker-touch-portrait-height;
                }
            }
        `,
    ],
    animations: [matDatepickerAnimations.transformPanel, matDatepickerAnimations.fadeInCalendar],
    exportAs: 'zwpColorPickerContent',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerContentComponent extends _ZWPColorpickerContentBase implements CanColor {
    @ViewChild(ColorPaletteComponent) _palette!: ColorPaletteComponent
    @HostBinding('class') hostClass = 'zwp-colorpicker-content'
    @HostBinding('@transformPanel') transformPanel = 'enter'
    @Input() override color!: ThemePalette
    picker?: ColorPickerComponent

    @HostBinding('class.zwp-colorpicker-content-touch') touchUi = this.picker?.touchUi
    _isAbove!: boolean

    constructor(elementRef: ElementRef) {
        super(elementRef)
    }
}

@Component({
    selector: 'zwp-color-picker',
    template: '',
    exportAs: 'zwpColorPicker',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ColorPickerComponent implements OnDestroy, CanColor {
    @HostBinding('id') id?: string
    private _scrollStrategy: () => ScrollStrategy

    @Output() openedStream: EventEmitter<void> = new EventEmitter<void>()
    @Output() closedStream: EventEmitter<void> = new EventEmitter<void>()

    @Input() get disabled() {
        return this._disabled === undefined && this._pickerInput ? this._pickerInput.disabled : !!this._disabled
    }
    set disabled(value: boolean) {
        const newValue = coerceBooleanProperty(value)

        if (newValue !== this._disabled) {
            this._disabled = newValue
            this._disabledChange.next(newValue)
        }
    }
    private _disabled?: boolean

    @Input()
    set touchUi(value: boolean) {
        this._touchUi = coerceBooleanProperty(value)
    }
    get touchUi(): boolean {
        return this._touchUi
    }
    
    private _touchUi = false

    @Input()
    get opened(): boolean {
        return this._opened
    }
    set opened(value: boolean) {
        value ? this.open() : this.close()
    }
    private _opened = false

    @Input()
    get defaultColor(): ThemePalette {
        return this._defaultColor
    }
    set defaultColor(value: ThemePalette) {
        this._defaultColor = value
    }
    _defaultColor: ThemePalette = 'primary'

    @Input()
    get color(): ThemePalette {
        return this._color || (this._pickerInput ? this._pickerInput.getThemePalette() : undefined)
    }
    set color(value: ThemePalette) {
        this._color = value
    }
    _color: ThemePalette

    get _selected(): InputColor {
        return this._validSelected ?? new InputColor(0, 0, 0, 1)
    }
    set _selected(value: InputColor) {
        this._validSelected = value
    }
    private _validSelected: Nullable<InputColor> = null

    _pickerInput!: ColorPickerInputDirective
    _popupRef: Nullable<OverlayRef> = null

    private _dialogRef: Nullable<MatDialogRef<ColorPickerContentComponent>> = null
    private _popupComponentRef: Nullable<ComponentRef<ColorPickerContentComponent>> = null
    private _portal!: ComponentPortal<ColorPickerContentComponent>
    readonly _disabledChange = new Subject<boolean>()

    private _focusedElementBeforeOpen: HTMLElement | null = null
    private _inputSubscription = Subscription.EMPTY
    readonly _selectedChanged = new Subject<InputColor>()

    constructor(
        private _dialog: MatDialog,
        private _overlay: Overlay,
        private _zone: NgZone,
        private _adapter: ZWPColorAdapterService,
        @Optional() private _dir: Directionality,
        @Inject(ZWP_COLOR_PICKER_SCROLL_STRATEGY) scrollStrategy: any,
        @Optional() @Inject(DOCUMENT) private _document: any,
        private _viewContainerRef: ViewContainerRef
    ) {
        this._scrollStrategy = scrollStrategy
    }

    ngOnDestroy() {
        this.close()
        this._inputSubscription.unsubscribe()
        this._disabledChange.complete()

        if (this._popupRef) {
            this._popupRef.dispose()
            this._popupComponentRef = null
        }
    }
    select(nextVal: InputColor): void {
        const oldValue = this._selected
        this._selected = nextVal
        if (!isNull(oldValue) && !this._adapter.sameColor(oldValue, this._selected)) {
            this._selectedChanged.next(nextVal)
        }
    }

    registerInput(input: ColorPickerInputDirective): void {
        if (this._pickerInput) {
            throw Error('A ColorPicker can only be associated with a single input.')
        }
        this._pickerInput = input
        this._inputSubscription = this._pickerInput._valueChange.subscribe(
            (value: InputColor) => (this._selected = value)
        )
    }

    public open(): void {
        if (this._opened || this.disabled) {
            return
        }
        if (!this._pickerInput) {
            throw Error('Attempted to open an ColorPicker with no associated input.')
        }

        if (this._document) {
            this._focusedElementBeforeOpen = this._document.activeElement
        }

        this.touchUi ? this._openAsDialog() : this._openAsPopup()
        this._opened = true
        this.openedStream.emit()
    }

    private _openAsDialog(): void {
        if (this._dialogRef) {
            this._dialogRef.close()
        }

        this._dialogRef = this._dialog.open<ColorPickerContentComponent>(ColorPickerContentComponent, {
            direction: this._dir ? this._dir.value : 'ltr',
            viewContainerRef: this._viewContainerRef,
            panelClass: 'zwp-colorpicker-dialog',
        })

        this._dialogRef.afterClosed().subscribe(() => this.close())
        this._dialogRef.componentInstance.picker = this
        this._setColor()
    }

    private _openAsPopup(): void {
        if (!this._portal) {
            this._portal = new ComponentPortal<ColorPickerContentComponent>(
                ColorPickerContentComponent,
                this._viewContainerRef
            )
        }

        if (!this._popupRef) {
            this._createPopup()
        }

        if (!isNull(this._popupRef) && !this._popupRef.hasAttached()) {
            this._popupComponentRef = this._popupRef.attach(this._portal)
            this._popupComponentRef.instance.picker = this
            this._setColor()
            this._zone.onStable
                .asObservable()
                .pipe(take(1))
                .subscribe(() => {
                    this._popupRef?.updatePosition()
                })
        }
    }

    private _createPopup(): void {
        const overlayConfig = new OverlayConfig({
            positionStrategy: this._createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: 'mat-overlay-transparent-backdrop',
            direction: this._dir,
            scrollStrategy: this._scrollStrategy(),
            panelClass: 'zwp-colorpicker-popup',
        })

        this._popupRef = this._overlay.create(overlayConfig)
        this._popupRef.overlayElement.setAttribute('role', 'dialog')

        merge(
            this._popupRef.backdropClick(),
            this._popupRef.detachments(),
            this._popupRef.keydownEvents().pipe(
                filter((event) => {
                    return event.keyCode === ESCAPE || (this._pickerInput && event.altKey && event.keyCode === UP_ARROW)
                })
            )
        ).subscribe((event) => {
            if (event) {
                event.preventDefault()
            }

            this.close()
        })
    }

    close(): void {
        if (!this._opened) {
            return
        }
        if (this._popupRef && this._popupRef.hasAttached()) {
            this._popupRef.detach()
        }
        if (this._dialogRef) {
            this._dialogRef.close()
            this._dialogRef = null
        }
        if (this._portal && this._portal.isAttached) {
            this._portal.detach()
        }

        const completeClose = () => {
            if (this._opened) {
                this._opened = false
                this.closedStream.emit()
                this._focusedElementBeforeOpen = null
            }
        }

        if (this._focusedElementBeforeOpen && typeof this._focusedElementBeforeOpen.focus === 'function') {
            this._focusedElementBeforeOpen.focus()
            setTimeout(completeClose)
        } else {
            completeClose()
        }
    }

    private _setColor(): void {
        const color = this.color
        if (this._popupComponentRef) {
            this._popupComponentRef.instance.color = color
        }
        if (this._dialogRef) {
            this._dialogRef.componentInstance.color = color
        }
    }

    private _createPopupPositionStrategy(): PositionStrategy {
        return this._overlay
            .position()
            .flexibleConnectedTo(this._pickerInput.getConnectedOverlayOrigin())
            .withTransformOriginOn('.zwp-colorpicker-content')
            .withFlexibleDimensions(false)
            .withViewportMargin(8)
            .withLockedPosition()
            .withPositions([
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                },
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                },
                {
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top',
                },
                {
                    originX: 'end',
                    originY: 'top',
                    overlayX: 'end',
                    overlayY: 'bottom',
                },
            ])
    }
}
