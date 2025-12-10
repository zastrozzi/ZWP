import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input, HostBinding } from '@angular/core'
import { InputColor } from '../../model'
import { ThemePalette } from '@angular/material/core'

@Component({
    selector: 'zwp-color-palette',
    template: `
        <zwp-color-canvas
            (colorChanged)="handleColorChanged($event)"
            [color]="color"
            [theme]="theme"
        ></zwp-color-canvas>

        <zwp-color-collection (colorChanged)="handleColorChanged($event)" [color]="color"> </zwp-color-collection>
    `,
    styles: [
        `
            .zwp-color-palette {
                .actions {
                    margin-top: 10px;
                    display: flex;
                    .left {
                        display: flex;
                        flex-direction: column;
                        margin-right: 15px;
                        .preview {
                            flex: 2 1 auto;
                            margin-bottom: 10px;
                        }
                    }

                    .right {
                        display: flex;
                        width: 60px;
                        flex-direction: column;
                    }
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class ColorPaletteComponent {
    @HostBinding('class') hostClass = 'zwp-color-palette'
    @Output() colorChanged: EventEmitter<InputColor> = new EventEmitter<InputColor>()

    @Input() color?: InputColor
    @Input() theme: ThemePalette

    public handleColorChanged(color: InputColor) {
        this.colorChanged.emit(color)
    }
}
