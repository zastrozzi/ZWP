import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from "@angular/core"
import { DarkenHex, LightenHex, MakeHexWithLightness } from "@zwp/platform.common"

@Component({
    selector: 'zwp-window-dock-button',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <button
            
            class="zwp-no-mat-hover"
            [class]="isExpanded ? darkMode ? 'zwp-light-button-shadow' : 'zwp-dark-button-shadow' : ''"
            mat-flat-button
            (click)="clickMain($event)"
            [style.opacity]="disabled ? '0.5' : '1'"
            [style.cursor]="'pointer'"
            [disabled]="disabled"
            [style.height]="'35px'"
            [style.backgroundColor]="isExpanded ? expandedButtonBackgroundColor : minimisedButtonBackgroundColor"
            [style.whiteSpace]="'nowrap'" 
            [style.padding]="'0px 5px'"
            [style.lineHeight]="'35px'"
            [style.borderRadius]="'5px'"
            [style.border]="isExpanded ? '0px' : '0px solid' + (isExpanded ? buttonBackgroundColor : buttonIconColor)"
        >
            <div fxLayout="row" fxLayoutAlign="start center" [style.height]="'35px'" fxLayoutGap="5px">
                <mat-icon 
                    (mouseover)="onFocusMain()" 
                    (mouseout)="onFocusMainOut()" 
                    [style.fontSize]="'16px'" 
                    [style.width]="'16px'" 
                    [style.height]="'16px'" 
                    [style.color]="isExpanded ? expandedButtonLabelColor : buttonIconColor" 
                    fxFlexOffset="7px"
                >{{ buttonIcon }}</mat-icon>
                <span 
                    fxFlexOffset="5px" 
                    (mouseover)="onFocusMain()" 
                    (mouseout)="onFocusMainOut()" 
                    [zwpTextStyle]="'button2'"
                    [style.color]="isExpanded ? expandedButtonLabelColor : minimisedButtonLabelColor"
                >{{ buttonLabel }}</span>
                <!-- <button> -->
                <div 
                    fxFlexOffset="10px" 
                    (mouseover)="onFocusExpand()" 
                    (mouseout)="onFocusExpandOut()" 
                    (click)="clickExpand($event)" 
                    fxLayout="column" 
                    fxLayoutAlign="center center" 
                    [style.height]="'25px'" 
                    [style.width]="'25px'" 
                    [style.borderRadius]="'4px'" 
                    [style.border]="isExpandHighlighted ? '1px solid' + (isExpanded ? expandedButtonLabelColor : buttonIconColor) : '0px'" 
                    [style.backgroundColor]="isExpanded ? ('quaternary-system-fill' | zwpColorTheme) : minimisedButtonBackgroundColor"
                >
                    <mat-icon 
                        [style.fontSize]="'22px'" 
                        [style.width]="'22px'" 
                        [style.height]="'22px'" 
                        [style.color]="isExpanded ? expandedButtonLabelColor : buttonLabelColor"
                    >{{ isExpanded ? 'minimize' : 'expand_less'}}</mat-icon>
                </div>
                <div 
                    (mouseover)="onFocusRemove()" 
                    (mouseout)="onFocusRemoveOut()" 
                    (click)="clickRemove($event)" 
                    fxLayout="column" 
                    fxLayoutAlign="center center" 
                    [style.height]="'25px'" 
                    [style.width]="'25px'" 
                    [style.borderRadius]="'4px'" 
                    [style.border]="isRemoveHighlighted ? '1px solid' + (isExpanded ? expandedButtonLabelColor : buttonIconColor) : '0px'" 
                    [style.backgroundColor]="isExpanded ? ('quaternary-system-fill' | zwpColorTheme) : minimisedButtonBackgroundColor"
                >
                    <mat-icon 
                        [style.fontSize]="'18px'" 
                        [style.width]="'18px'" 
                        [style.height]="'18px'" 
                        [style.color]="isExpanded ? expandedButtonLabelColor : buttonLabelColor"
                    >close</mat-icon>
                </div>
                <!-- </button> -->
            </div>
        </button>
    `,
    styles: [`
        .zwp-no-mat-hover .mat-mdc-raised-button:hover .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button:hover .mat-mdc-button-persistent-ripple::before {
            opacity: 0 !important;
        }

        .zwp-light-button-shadow {
            box-shadow: 0px 3px 1px -2px rgb(200 200 200 / 15%), 0px 4px 4px 0px rgb(200 200 200 / 10%), 0px 7px 5px 0px rgb(200 200 200 / 8%);
        }

        .zwp-dark-button-shadow {
            box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 15%), 0px 2px 2px 0px rgb(0 0 0 / 12%), 0px 1px 5px 0px rgb(0 0 0 / 10%);
        }
    `]
})
export class WindowDockButtonComponent implements OnInit, OnChanges {
    @Input() label: string | null = null
    @Input() labelColor: string | null = null
    @Input() icon: string | null = null
    @Input() iconColor: string | null = null
    @Input() backgroundColor: string | null = null
    @Input() disabled = false
    @Input() isExpanded = false
    @Input() darkMode: boolean | null = null
    // @Input() materialType: string
    @Output() btnMainClick: EventEmitter<MouseEvent | TouchEvent> = new EventEmitter<MouseEvent | TouchEvent>()
    @Output() btnExpandClick: EventEmitter<MouseEvent | TouchEvent> = new EventEmitter<MouseEvent | TouchEvent>()
    @Output() btnRemoveClick: EventEmitter<MouseEvent | TouchEvent> = new EventEmitter<MouseEvent | TouchEvent>()

    buttonBackgroundColor: string | undefined
    isHighlighted = false
    isExpandHighlighted = false
    isRemoveHighlighted = false

    // @HostListener('mouseover') onMouseOver() {
    //     if (!this.isHighlighted && !this.disabled) {
    //         this.isHighlighted = true
    //         this.buttonBackgroundColor = this.darkenedBackgroundHexColor
    //     }
    // }

    // @HostListener('mouseout') onMouseOut() {
    //     if (this.isHighlighted && !this.disabled) {
    //         this.isHighlighted = false
    //         this.buttonBackgroundColor = this.buttonBackgroundHexColor
    //     }
    // }

    onFocusMain() {
        // if (!this.isHighlighted && !this.disabled) {
        //     this.isHighlighted = true
        //     this.buttonBackgroundColor = this.darkenedBackgroundHexColor
        // }
    }

    onFocusMainOut() {
        // if (this.isHighlighted && !this.disabled) {
        //     this.isHighlighted = false
        //     this.buttonBackgroundColor = this.buttonBackgroundHexColor
        // }
    }

    onFocusExpand() {
        if (!this.isExpandHighlighted && !this.disabled) {
            this.isExpandHighlighted = true
        }
    }

    onFocusExpandOut() {
        if (this.isExpandHighlighted && !this.disabled) {
            this.isExpandHighlighted = false
        }
    }

    onFocusRemove() {
        if (!this.isRemoveHighlighted && !this.disabled) {
            this.isRemoveHighlighted = true
        }
    }

    onFocusRemoveOut() {
        if (this.isRemoveHighlighted && !this.disabled) {
            this.isRemoveHighlighted = false
        }
    }

    clickRemove(event: MouseEvent | TouchEvent) {
        event.preventDefault()
        event.stopPropagation()
        this.btnRemoveClick.emit(event)
    }

    clickExpand(event: MouseEvent | TouchEvent) {
        event.preventDefault()
        event.stopPropagation()
        this.btnExpandClick.emit(event)
        // this.isExpanded = !this.isExpanded
    }

    clickMain(event: MouseEvent | TouchEvent) {
        this.btnMainClick.emit(event)
    }

    ngOnInit() {
        this.buttonBackgroundColor = this.buttonBackgroundHexColor
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['backgroundColor']) {
            this.buttonBackgroundColor = this.buttonBackgroundHexColor
        }
    }

    get buttonLabel() {
        return this.label ?? 'Medium Icon Button'
    }

    get buttonLabelColor() {
        return this.labelColor ?? '#1357a6' // nice blue color
    }

    get buttonIcon() {
        return this.icon ?? 'add'
    }

    get buttonIconColor() {
        return this.iconColor ?? this.buttonLabelColor
    }

    get buttonBackgroundHexColor() {
        return this.backgroundColor ?? '#f7f7f7'
    }

    get expandedButtonBackgroundColor() {
        return MakeHexWithLightness(this.buttonLabelColor, this.darkMode ? 550 : 480)
    }

    get minimisedButtonBackgroundColor() {
        return MakeHexWithLightness(this.buttonLabelColor, this.darkMode ? 50 : 990)
    }

    get expandedButtonLabelColor() {
        return MakeHexWithLightness(this.buttonLabelColor, this.darkMode ? 1000 : 1000)
    }

    get minimisedButtonLabelColor() {
        return MakeHexWithLightness(this.buttonLabelColor, this.darkMode ? 900 : 150)
    }

    // get buttonMaterialType() {
    //     let materialButtonEnumType: MaterialButtonType = this.materialType ? MaterialButtonType[this.materialType] ?? MaterialButtonType.flat : MaterialButtonType.flat

    //     return materialButtonEnumType
    // }

    // flatMaterialButtonType = MaterialButtonType.flat
    // strokedMaterialButtonType = MaterialButtonType.stroked
    // raisedMaterialButtonType = MaterialButtonType.raised

    get brightenedBackgroundHexColor() {
        return LightenHex(this.buttonBackgroundHexColor, 5)
    }

    get darkenedBackgroundHexColor() {
        return DarkenHex(this.buttonBackgroundHexColor, 5)
    }
}