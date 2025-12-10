import { Component, OnInit, Output, EventEmitter, NgZone, AfterViewInit } from '@angular/core'
import { InputColor } from '../../model'
import { getColorAtPosition } from '../../utils'
import { BaseColorCanvasDirective } from '../../directives'

@Component({
    selector: 'zwp-color-slider',
    template: `
        <canvas
            id="color-strip"
            class="zone-strip"
            (mousedown)="onMousedown($event)"
            (mouseup)="onMouseup($event)"
            width="15"
            height="234"
        ></canvas>
    `,
})
export class ColorSliderComponent extends BaseColorCanvasDirective implements AfterViewInit {
    constructor(override zone: NgZone) {
        super(zone, 'color-strip')
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit()
    }

    public fillGradient() {
        const grd = this.ctx.createLinearGradient(0, 0, 0, this.height)
        grd.addColorStop(0, 'rgba(255, 0, 0, 1)')
        grd.addColorStop(0.17, 'rgba(255, 255, 0, 1)')
        grd.addColorStop(0.34, 'rgba(0, 255, 0, 1)')
        grd.addColorStop(0.51, 'rgba(0, 255, 255, 1)')
        grd.addColorStop(0.68, 'rgba(0, 0, 255, 1)')
        grd.addColorStop(0.85, 'rgba(255, 0, 255, 1)')
        grd.addColorStop(1, 'rgba(255, 0, 0, 1)')

        this.ctx.fillStyle = grd
        this.ctx.fill()
    }

    public redrawIndicator(x: number, y: number) {
        this.ctx.beginPath()
        this.ctx.strokeStyle = 'white'
        this.ctx.lineWidth = 2
        this.ctx.arc(7.5, y, 7.5, 0, 2 * Math.PI, false)
        this.ctx.stroke()
        this.ctx.closePath()
    }

    public changeColor(e: MouseEvent) {
        this.x = e.offsetX
        this.y = e.offsetY
        this.draw()
        const { r, g, b } = getColorAtPosition(this.ctx, e.offsetX, e.offsetY)
        this.emitChange(new InputColor(r, g, b))
    }
}
