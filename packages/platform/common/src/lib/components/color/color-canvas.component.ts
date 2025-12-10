import {
    AfterViewInit,
    Component,
    HostBinding,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { merge } from 'rxjs'
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators'
import { getColorAtPosition, matchers, stringInputToObject } from '../../utils'
import { InputColor } from '../../model'
import { BaseColorCanvasDirective } from '../../directives'

const RADIUS_NOB = 5

@Component({
    selector: 'zwp-color-canvas',
    template: `
        <form [formGroup]="formGroup">
            <div class="color-canvas-row">
                <div class="zone-canvas">
                    <canvas
                        id="color-block"
                        class="zone-block"
                        (mousedown)="onMousedown($event)"
                        (mouseup)="onMouseup($event)"
                        width="200"
                        height="235"
                    ></canvas>
                    <zwp-color-slider (colorChanged)="onSliderColorChanged($event)"></zwp-color-slider>
                </div>

                <div class="zone-inputs">
                    <mat-form-field [color]="theme">
                        <mat-label>R</mat-label>
                        <input matInput formControlName="r" ngxMatNumericColorInput autocomplete="off" />
                    </mat-form-field>

                    <mat-form-field [color]="theme">
                        <mat-label>G</mat-label>
                        <input matInput formControlName="g" ngxMatNumericColorInput autocomplete="off" />
                    </mat-form-field>

                    <mat-form-field [color]="theme">
                        <mat-label>B</mat-label>
                        <input matInput formControlName="b" ngxMatNumericColorInput autocomplete="off" />
                    </mat-form-field>
                </div>
            </div>

            <div class="color-canvas-row">
                <button mat-mini-fab [style.background-color]="color?.rgba || 'transparent'" class="preview"></button>
                <mat-form-field [color]="theme">
                    <mat-label>HEX6</mat-label>
                    <mat-label matPrefix class="symbol">#&nbsp;</mat-label>
                    <input matInput formControlName="hex" autocomplete="off" />
                </mat-form-field>
                <mat-form-field class="input-opacity" [color]="theme">
                    <mat-label>A</mat-label>
                    <input matInput formControlName="a" type="number" min="0" max="1" step="0.1" autocomplete="off" />
                </mat-form-field>
            </div>
        </form>
    `,
    styles: [
        `
            $sizeButtonPreview: 40px;

            .zwp-color-canvas {
                .color-canvas-row {
                    display: flex;

                    &:first-of-type {
                        height: 235px;
                        margin-bottom: 12px;

                        .card {
                            height: 180px;
                        }
                    }

                    canvas:hover {
                        cursor: crosshair;
                    }

                    .zone {
                        display: flex;

                        &-canvas {
                            height: 235px;

                            .zone-block {
                                border: 1px solid rgba(0, 0, 0, 0.12);
                            }
                        }

                        &-strip {
                            flex-basis: auto;
                            margin-left: 10px;
                        }

                        &-inputs {
                            display: flex;
                            width: 60px;
                            height: 235px;
                            flex-direction: column;
                            margin-left: 16px;
                            margin-top: 12px;
                        }
                    }

                    &:nth-of-type(2) {
                        display: flex;

                        .preview {
                            min-width: $sizeButtonPreview;
                            min-height: $sizeButtonPreview;
                            height: $sizeButtonPreview;
                            width: $sizeButtonPreview;
                            margin-top: 12px;
                        }

                        .mat-mdc-form-field {
                            margin-left: 16px;

                            &:first-of-type {
                                width: 170px;

                                .symbol {
                                    font-weight: bold;
                                    color: rgba(0, 0, 0, 0.54);
                                }
                            }

                            &:last-of-type {
                                width: 60px;

                                .mat-mdc-text-field-wrapper {
                                    padding: 0 8px;
                                }
                            }
                        }
                    }
                }

                .mat-mdc-form-field {
                    &-label {
                        font-weight: bold;
                    }

                    .mdc-text-field--filled:not(.mdc-text-field--disabled) {
                        background-color: transparent;
                    }
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class ColorCanvasComponent
    extends BaseColorCanvasDirective
    implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
    @HostBinding('class') hostClass = 'zwp-color-canvas'
    private _baseColor!: InputColor

    get rCtrl(): AbstractControl {
        return this.formGroup.get('r') as AbstractControl
    }

    get gCtrl(): AbstractControl {
        return this.formGroup.get('g') as AbstractControl
    }

    get bCtrl(): AbstractControl {
        return this.formGroup.get('b') as AbstractControl
    }

    get aCtrl(): AbstractControl {
        return this.formGroup.get('a') as AbstractControl
    }

    get hexCtrl(): AbstractControl {
        return this.formGroup.get('hex') as AbstractControl
    }

    _resetBaseColor = true

    formGroup: FormGroup

    rgba!: string

    constructor(override zone: NgZone) {
        super(zone, 'color-block')
        this.formGroup = new FormGroup({
            r: new FormControl(null, [Validators.required]),
            g: new FormControl(null, [Validators.required]),
            b: new FormControl(null, [Validators.required]),
            a: new FormControl(null, [Validators.required]),
            hex: new FormControl(null, [Validators.required, Validators.pattern(matchers.hex6)]),
        })
    }

    ngOnInit() {
        const rgbaCtrl$ = merge(
            this.rCtrl.valueChanges,
            this.gCtrl.valueChanges,
            this.bCtrl.valueChanges,
            this.aCtrl.valueChanges
        )
        rgbaCtrl$.pipe(takeUntil(this._destroyed), debounceTime(400)).subscribe((_) => {
            const color = new InputColor(
                Number(this.rCtrl.value),
                Number(this.gCtrl.value),
                Number(this.bCtrl.value),
                Number(this.aCtrl.value)
            )
            this.emitChange(color)
        })

        const hexCtrl$ = this.hexCtrl.valueChanges
        hexCtrl$.pipe(takeUntil(this._destroyed), debounceTime(400), distinctUntilChanged()).subscribe((hex) => {
            const obj = stringInputToObject(hex)
            if (obj != null) {
                const color = new InputColor(obj.r, obj.g, obj.b, obj.a)
                this.emitChange(color)
            }
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['color'] && changes['color'].currentValue) {
            this.updateForm(changes['color'].currentValue)
            if (this._resetBaseColor) {
                this._baseColor = changes['color'].currentValue
            }

            this._resetBaseColor = true

            if (!changes['color'].firstChange) {
                this.draw()
            }
        }
    }

    private updateForm(val: InputColor): void {
        const config = { emitEvent: false }
        this.rCtrl.setValue(val.r, config)
        this.gCtrl.setValue(val.g, config)
        this.bCtrl.setValue(val.b, config)
        this.aCtrl.setValue(val.a, config)
        this.hexCtrl.setValue(val.hex, config)
    }

    public redrawIndicator(x: number, y: number) {
        this.ctx.beginPath()
        this.ctx.strokeStyle = 'white'
        this.ctx.arc(x, y, RADIUS_NOB, 0, 2 * Math.PI, false)
        this.ctx.stroke()
        this.ctx.closePath()
    }

    public fillGradient() {
        this.ctx.fillStyle = this._baseColor ? this._baseColor.rgba : 'rgba(255,255,255,1)'
        this.ctx.fillRect(0, 0, this.width, this.height)

        const grdWhite = this.ctx.createLinearGradient(0, 0, this.width, 0)
        grdWhite.addColorStop(0, 'rgba(255,255,255,1)')
        grdWhite.addColorStop(1, 'rgba(255,255,255,0)')
        this.ctx.fillStyle = grdWhite
        this.ctx.fillRect(0, 0, this.width, this.height)

        const grdBlack = this.ctx.createLinearGradient(0, 0, 0, this.height)
        grdBlack.addColorStop(0, 'rgba(0,0,0,0)')
        grdBlack.addColorStop(1, 'rgba(0,0,0,1)')
        this.ctx.fillStyle = grdBlack
        this.ctx.fillRect(0, 0, this.width, this.height)
    }

    public onSliderColorChanged(c: InputColor) {
        this._baseColor = c
        this.color = c
        this.fillGradient()
        this.emitChange(c)
    }

    public changeColor(e: MouseEvent): void {
        this.x = e.offsetX
        this.y = e.offsetY
        this._resetBaseColor = false
        this.draw()
        const { r, g, b } = getColorAtPosition(this.ctx, e.offsetX, e.offsetY)
        this.emitChange(new InputColor(r, g, b))
    }
}
