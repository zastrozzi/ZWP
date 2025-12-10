import { Component, EventEmitter, OnInit, Output, ViewEncapsulation, Input, HostBinding } from '@angular/core'
import { InputColor } from '../../model'
import { BASIC_COLORS, isNull, stringInputToObject } from '../../utils'

@Component({
    selector: 'zwp-color-collection',
    template: `
        <div class="color-collection-row">
            <button
                *ngFor="let c of colors1"
                mat-mini-fab
                [style.background-color]="c"
                class="btn-color"
                (click)="select(c)"
                [ngClass]="{ active: selectedColor === c }"
                [disableRipple]="true"
            ></button>
        </div>
        <div class="color-collection-row">
            <button
                *ngFor="let c of colors2"
                mat-mini-fab
                [style.background-color]="c"
                class="btn-color"
                (click)="select(c)"
                [ngClass]="{ active: selectedColor === c }"
                [disableRipple]="true"
            ></button>
        </div>
    `,
    styles: [
        `
            .zwp-color-collection {
                .btn-color {
                    height: 20px;
                    width: 20px;
                    margin-right: 11px;
                    box-shadow: none;
                    opacity: 0.3;

                    will-change: opacity;
                    transition: opacity 0.3s linear;

                    &.active {
                        box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                            0 1px 18px 0 rgba(0, 0, 0, 0.12);
                        opacity: 1;
                    }

                    .mat-mdc-button-touch-target {
                        display: none !important;
                    }
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class ColorCollectionComponent {
    @HostBinding('class') hostClass = 'zwp-color-collection'
    @Output() colorChanged: EventEmitter<InputColor> = new EventEmitter<InputColor>()

    @Input()
    set color(c: InputColor | undefined) {
        if (c) {
            this.selectedColor = c.toHexString()
        }
    }

    selectedColor!: string

    colors1: string[] = BASIC_COLORS.slice(0, 8)
    colors2: string[] = BASIC_COLORS.slice(8, 16)

    select(hex: string) {
        this.selectedColor = hex
        const objectColor = stringInputToObject(hex)
        if (!isNull(objectColor)) {
            const { r, g, b, a } = objectColor
            this.colorChanged.emit(new InputColor(r, g, b, a))
        }
    }
}
