import {
    AfterContentInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Directive,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core'
import { MatButton } from '@angular/material/button'
import { Subscription, merge, of } from 'rxjs'
import { ColorPickerComponent } from './color-picker.component'
import { Nullable } from '../../model'

@Directive({
    selector: '[zwpColorpickerToggleIcon]',
})
export class ColorpickerToggleIconDirective {}

@Component({
    selector: 'zwp-color-toggle',
    template: `
        <button
            #button
            mat-icon-button
            type="button"
            [attr.aria-haspopup]="picker ? 'dialog' : null"
            [attr.tabindex]="disabled ? -1 : tabIndex"
            [disabled]="disabled"
            (click)="open($event)"
            [disableRipple]="disableRipple"
        >
            <mat-icon *ngIf="!_customIcon" [style.color]="picker?._selected?.rgba"> palette </mat-icon>

            <ng-content select="[zwpColorpickerToggleIcon]"></ng-content>
        </button>
    `,
    styles: [
        `
            .mat-form-field-appearance {
                .mat-form-field-prefix,
                .mat-form-field-suffix {
                    .zwp-color-toggle-default-icon {
                        width: 1em;
                    }
                }
            }

            .mat-form-field:not(.mat-form-field-appearance) {
                .mat-form-field-prefix,
                .mat-form-field-suffix {
                    .zwp-color-toggle-default-icon {
                        display: block;
                        width: 1.5em;
                        height: 1.5em;
                    }

                    .mat-icon-button .zwp-color-toggle-default-icon {
                        margin: auto;
                    }
                }
            }
        `,
    ],
    exportAs: 'zwpColorPickerToggle',
    encapsulation: ViewEncapsulation.None,
})
export class ColorToggleComponent implements AfterContentInit, OnChanges, OnDestroy {
    @HostBinding('class') hostClass = 'zwp-color-toggle'
    @HostBinding('[attr.tabindex]') attrTabIndex = -1
    @HostBinding('[class.zwp-color-toggle-active]') active = this.picker && this.picker.opened
    @HostBinding('[class.mat-accent]') accent = this.picker && this.picker.color === 'accent'
    @HostBinding('[class.mat-warn]') warn = this.picker && this.picker.color === 'warn'

    

    private _stateChanges = Subscription.EMPTY

    @Input() picker?: ColorPickerComponent
    @Input() tabIndex!: number

    @Input() get disabled(): boolean {
        if (this._disabled == null && this.picker) {
            return this.picker.disabled
        } else {
            return false
        }
    }
    set disabled(value: boolean) {
        this._disabled = value
    }
    private _disabled: Nullable<boolean> = null

    @Input() disableRipple!: boolean

    @ContentChild(ColorpickerToggleIconDirective) _customIcon!: ColorpickerToggleIconDirective

    @ViewChild('button') _button!: MatButton

    constructor(private _cd: ChangeDetectorRef) {}

    @HostListener('focus') focus() { this._button.focus() }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['picker']) {
            this._watchStateChanges()
        }
    }

    ngOnDestroy() {
        this._stateChanges.unsubscribe()
    }

    ngAfterContentInit() {
        this._watchStateChanges()
    }

    public open(event: Event): void {
        if (this.picker && !this.disabled) {
            this.picker.open()
            event.stopPropagation()
        }
    }

    private _watchStateChanges() {
        const disabled$ = this.picker ? this.picker._disabledChange : of(false)
        const inputDisabled$ = this.picker && this.picker._pickerInput ? this.picker._pickerInput._disabledChange : of(false)

        const pickerToggled$ = this.picker ? merge(this.picker.openedStream, this.picker.closedStream) : of()
        this._stateChanges.unsubscribe()

        this._stateChanges = merge(disabled$, inputDisabled$, pickerToggled$).subscribe(() => this._cd.markForCheck())
    }
}
