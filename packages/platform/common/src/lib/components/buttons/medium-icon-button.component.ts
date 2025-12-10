import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import { DarkenHex, isUndefined, LightenHex } from '../../utils'
import { MaterialButtonType } from '../../model'

@Component({
    selector: 'zwp-md-icon-button',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <button
            *ngIf="this.buttonMaterialType === flatMaterialButtonType"
            class="no-mat-hover"
            zwpDoubleTapDisable
            mat-flat-button
            (click)="btnClick.emit($event)"
            [style.opacity]="disabled ? '0.5' : '1'"
            [style.height]="'auto !important'"
            [disabled]="disabled"
            [style.whiteSpace]="'nowrap'" 
            [style.backgroundColor]="buttonBackgroundColor"
            [style.padding]="iconPadding + 'px'"
            [style.minWidth]="'0px'"
            [matTooltip]="label"
            [ariaLabel]="buttonAriaLabel"
        >
            <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="10px">
                <mat-icon [zwpTextStyle]="textStyle" [inline]="true" [style.height]="'auto'" [style.color]="buttonIconColor" [style.transform]="buttonIconRotation">{{ buttonIcon }}</mat-icon>
            </div>
        </button>
        <button
            *ngIf="this.buttonMaterialType === strokedMaterialButtonType"
            class="no-mat-hover"
            zwpDoubleTapDisable
            mat-stroked-button
            (click)="btnClick.emit($event)"
            [style.opacity]="disabled ? '0.5' : '1'"
            [style.height]="'auto !important'"
            [disabled]="disabled"
            [style.whiteSpace]="'nowrap'" 
            [style.backgroundColor]="buttonBackgroundColor"
            [style.padding]="iconPadding + 'px'"
            [style.minWidth]="'0px'"
            [matTooltip]="label"
            [ariaLabel]="buttonAriaLabel"
        >
            <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="10px">
                <mat-icon [zwpTextStyle]="textStyle" [inline]="true" [style.height]="'auto'" [style.color]="buttonIconColor" [style.transform]="buttonIconRotation">{{ buttonIcon }}</mat-icon>
            </div>
        </button>
        <button
            *ngIf="this.buttonMaterialType === raisedMaterialButtonType"
            class="no-mat-hover"
            zwpDoubleTapDisable
            mat-raised-button
            (click)="btnClick.emit($event)"
            [style.opacity]="disabled ? '0.5' : '1'"
            [style.height]="'auto !important'"
            [disabled]="disabled"
            [style.whiteSpace]="'nowrap'" 
            [style.backgroundColor]="buttonBackgroundColor"
            [style.padding]="iconPadding + 'px'"
            [style.minWidth]="'0px'"
            [matTooltip]="label"
            [ariaLabel]="buttonAriaLabel"
        >
            <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="10px">
                <mat-icon [zwpTextStyle]="textStyle" [inline]="true" [style.height]="'auto'" [style.color]="buttonIconColor" [style.transform]="buttonIconRotation">{{ buttonIcon }}</mat-icon>
            </div>
        </button>
    `
})
export class MediumIconButtonComponent implements OnInit, OnChanges {
    @Input() icon: string | null = null
    @Input() iconColor: string | null = null
    @Input() iconRotation: number | null = null
    @Input() iconPadding = 10
    @Input() textStyle = "body1"
    @Input() backgroundColor: string | null = null
    @Input() disabled = false
    @Input() materialType: string | null = null
    @Input() label = ""
    @Output() btnClick: EventEmitter<MouseEvent | TouchEvent> = new EventEmitter<MouseEvent | TouchEvent>()

    buttonBackgroundColor: string | undefined
    buttonIconColor: string | undefined
    isHighlighted = false
    flatMaterialButtonType = MaterialButtonType.flat
    strokedMaterialButtonType = MaterialButtonType.stroked
    raisedMaterialButtonType = MaterialButtonType.raised

    @HostListener('mouseover') onMouseOver() {
        if (!this.isHighlighted && !this.disabled) {
            this.buttonBackgroundColor = this.darkenedBackgroundHexColor
            this.isHighlighted = true
        }
    }

    @HostListener('mouseout') onMouseOut() {
        if (this.isHighlighted && !this.disabled) {
            this.isHighlighted = false
            this.buttonBackgroundColor = this.buttonBackgroundHexColor
        }
    }

    onFocus() {
        if (!this.isHighlighted && !this.disabled) {
            this.isHighlighted = true
            this.buttonBackgroundColor = this.darkenedBackgroundHexColor
        }
    }

    onFocusOut() {
        if (this.isHighlighted && !this.disabled) {
            this.isHighlighted = false
            this.buttonBackgroundColor = this.buttonBackgroundHexColor
        }
    }

    ngOnInit() {
        this.buttonBackgroundColor = this.buttonBackgroundHexColor
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['backgroundColor']) {
            this.buttonBackgroundColor = this.buttonBackgroundHexColor
        }

        if (changes['iconColor']) {
            this.buttonIconColor = this.buttonIconHexColor
            // console.log(changes['iconColor'].currentValue, 'change')
        }
    }

    get buttonAriaLabel() {
        return (!isUndefined(this.label) && this.label !== '') ? this.label : (this.icon ?? 'IconButton')
    }

    get buttonIcon() {
        return this.icon ?? 'add'
    }

    get buttonIconHexColor() {
        return this.iconColor ?? '#1357a6'
    }

    get buttonIconRotation() {
        return `rotate(${this.iconRotation ?? 0}deg)`
    }

    get buttonBackgroundHexColor() {
        return this.backgroundColor ?? '#f7f7f7'
    }

    get buttonMaterialType() {
        const materialButtonEnumType: MaterialButtonType = this.materialType
            ? MaterialButtonType[this.materialType as keyof typeof MaterialButtonType] ?? MaterialButtonType.flat
            : MaterialButtonType.flat

        return materialButtonEnumType
    }

    

    get brightenedBackgroundHexColor() {
        return LightenHex(this.buttonBackgroundHexColor, 5)
    }

    get darkenedBackgroundHexColor() {
        return DarkenHex(this.buttonBackgroundHexColor, 5)
    }
}