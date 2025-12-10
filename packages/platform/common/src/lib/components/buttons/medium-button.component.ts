import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import { MainAxisAlignment, MaterialButtonType, PerpendicularAxisAlignment } from '../../model'
import { DarkenHex, isNull, isUndefined, LightenHex } from '../../utils'

@Component({
    selector: 'zwp-md-button',
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
            fxLayout="column"
            [ariaLabel]="buttonAriaLabel"
            fxLayoutAlign="center stretch"
            [style.padding]="buttonPadding"
            [disabled]="disabled"
            [style.whiteSpace]="'nowrap'" 
            [style.backgroundColor]="buttonBackgroundColor"
            [style.minWidth]="'100%'"
            [type]="submitButton ? 'submit' : 'button'"
            [zwpCorners]="buttonCorners"
        >
            <div fxLayout="row" fxFlex="noshrink" [fxLayoutAlign]="buttonItemAlignment" [fxLayoutGap]="layoutGap">
                <mat-icon *ngIf="hasIcon" fxFlex="noshrink" [zwpTextStyle]="buttonIconTextStyle" [inline]="true" [style.height]="'auto'" [style.color]="buttonIconColor" [style.transform]="buttonIconRotation">{{ buttonIcon }}</mat-icon>
                <span *ngIf="!this.isCollapsed" fxFlex="grow" [style.textAlign]="hasIcon ? hasPostfixIcon ? 'center' : 'left' : hasPostfixIcon ? 'right' : 'left'" [zwpTextStyle]="buttonLabelTextStyle" [style.color]="buttonLabelColor">{{ buttonLabel }}</span>
                <mat-icon *ngIf="hasPostfixIcon && !isCollapsed" fxFlex="noshrink" [zwpTextStyle]="buttonIconTextStyle" [inline]="true" [style.height]="'auto'" [style.color]="buttonIconColor">{{ buttonPostfixIcon }}</mat-icon>
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
            fxLayout="column"
            [ariaLabel]="buttonAriaLabel"
            fxFlex="grow"
            fxLayoutAlign="center stretch"
            [style.padding]="buttonPadding"
            [style.minWidth]="'0px'"
            [disabled]="disabled"
            [style.whiteSpace]="'nowrap'" 
            [style.backgroundColor]="buttonBackgroundColor"
            [type]="submitButton ? 'submit' : 'button'"
        >
            <div fxLayout="row" fxLayoutAlign="start center"  [fxLayoutGap]="layoutGap">
                <mat-icon *ngIf="hasIcon" [zwpTextStyle]="buttonIconTextStyle" [inline]="true" [style.height]="'auto'" [style.color]="buttonIconColor" [style]="'transform: rotate('+iconRotation+'deg)'">{{ buttonIcon }}</mat-icon>
                <span *ngIf="!this.isCollapsed" [zwpTextStyle]="buttonLabelTextStyle" [style.color]="buttonLabelColor">{{ buttonLabel }}</span>
                <mat-icon *ngIf="hasPostfixIcon && !isCollapsed" [zwpTextStyle]="buttonIconTextStyle" [inline]="true" [style.height]="'auto'" [style.color]="buttonIconColor">{{ buttonPostfixIcon }}</mat-icon>
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
            fxLayout="column"
            [ariaLabel]="buttonAriaLabel"
            fxFlex="grow"
            fxLayoutAlign="center stretch"
            [style.padding]="buttonPadding"
            [style.minWidth]="'0px'"
            [disabled]="disabled"
            [style.whiteSpace]="'nowrap'" 
            [style.backgroundColor]="buttonBackgroundColor"
            [type]="submitButton ? 'submit' : 'button'"
        >
            <div fxLayout="row" fxLayoutAlign="start center"  [fxLayoutGap]="layoutGap">
                <mat-icon *ngIf="hasIcon" [zwpTextStyle]="buttonIconTextStyle" [inline]="true" [style.height]="'auto'" [style.color]="buttonIconColor" [style]="'transform: rotate('+iconRotation+'deg)'">{{ buttonIcon }}</mat-icon>
                <span *ngIf="!this.isCollapsed" [zwpTextStyle]="buttonLabelTextStyle" [style.color]="buttonLabelColor">{{ buttonLabel }}</span>
                <mat-icon *ngIf="hasPostfixIcon && !isCollapsed" [zwpTextStyle]="buttonIconTextStyle" [inline]="true" [style.height]="'auto'" [style.color]="buttonIconColor">{{ buttonPostfixIcon }}</mat-icon>
            </div>
        </button>
    `
})
export class MediumButtonComponent implements OnInit, OnChanges {
    @Input() label: string | null = null
    @Input() labelColor: string | null = null
    @Input() icon: string | null = null
    @Input() postfixIcon: string | null = null
    @Input() iconColor: string | null = null
    @Input() iconRotation: number | null = null
    @Input() padding: string | null = null
    @Input() textStyle: string | null = null
    @Input() iconTextStyle: string | null = null
    @Input() backgroundColor: string | null = null
    @Input() disabled = false
    @Input() materialType: string | null = null
    @Input() horizontalAlign: string | null = null
    @Input() verticalAlign: string | null = null
    @Input() isCollapsed = false
    @Input() layoutGap = "15px"
    @Input() corners: string | null = null
    @Output() btnClick: EventEmitter<MouseEvent | TouchEvent> = new EventEmitter<MouseEvent | TouchEvent>()
    @Input() submitButton = false

    buttonBackgroundColor: string | undefined
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

    ngOnInit(): void {
        this.buttonBackgroundColor = this.buttonBackgroundHexColor
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['backgroundColor']) {
            this.buttonBackgroundColor = this.buttonBackgroundHexColor
        }
    }

    get buttonItemAlignment() {
        const horizontal = MainAxisAlignment[(this.horizontalAlign ?? 'start') as keyof typeof MainAxisAlignment]
        const vertical = PerpendicularAxisAlignment[(this.verticalAlign ?? 'center') as keyof typeof PerpendicularAxisAlignment]
        return `${horizontal} ${vertical}`
    }

    get buttonPadding() {
        if (this.padding !== null && this.padding !== undefined) {
            const paddingValues = this.padding.split(" ").map((p) => parseFloat(p))
            if (paddingValues.length === 1) {
                return `${paddingValues[0]}px`
            }
            if (paddingValues.length === 2) {
                return `${paddingValues[0]}px ${paddingValues[1]}px`
            }
            if (paddingValues.length === 4) {
                return `${paddingValues[0]}px ${paddingValues[1]}px ${paddingValues[2]}px ${paddingValues[3]}px`
            }
        }
        return '10px 15px'
    }

    get buttonLabelTextStyle() {
        return this.textStyle ?? 'body1'
    }

    get buttonIconTextStyle() {
        return this.iconTextStyle ?? this.buttonLabelTextStyle
    }

    get buttonLabel() {
        return this.label ?? 'Medium Icon Button'
    }

    get buttonAriaLabel() {
        return this.label ?? 'Button'
    }

    get buttonLabelColor() {
        return this.labelColor ?? '#1357a6' // nice blue color
    }

    get buttonIcon() {
        return this.icon ?? 'add'
    }

    get buttonPostfixIcon() {
        return this.postfixIcon ?? 'add'
    }

    get hasIcon() {
        return !isUndefined(this.icon) && !isNull(this.icon)
    }

    get hasPostfixIcon() {
        return !isUndefined(this.postfixIcon) && !isNull(this.postfixIcon)
    }

    get buttonIconColor() {
        return this.iconColor ?? this.buttonLabelColor
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

    get buttonCorners() {
        return this.corners ?? '4'
    }
}
