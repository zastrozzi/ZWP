import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core'
import { LightenHex } from '../utils'

@Directive({
    selector: '[zwpSliderColor]'
})
export class SliderColorDirective implements OnChanges {
    static sliderNumberCounter = 0

    @Input() circleColor = ''
    @Input() sliderColor = ''
    styleElement: HTMLStyleElement = document.createElement('style')

    attributeName: string

    constructor(private el: ElementRef) {
        this.attributeName = `slider-color-${SliderColorDirective.sliderNumberCounter}`
        SliderColorDirective.sliderNumberCounter++
        const nativeEl: HTMLElement = this.el.nativeElement
        nativeEl.setAttribute(this.attributeName, '')
        nativeEl.appendChild(this.styleElement)
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['circleColor' || changes['sliderColor']]) {
            this.setColors()
        }
    }

    setColors(): void {
        const sliderLightColor = LightenHex(this.sliderColor, 15)
        this.styleElement.innerText = `
		[${this.attributeName}] {
			--mdc-switch-selected-focus-state-layer-color: ${this.sliderColor} !important;
			--mdc-switch-selected-handle-color: ${this.sliderColor} !important;
			--mdc-switch-selected-hover-state-layer-color: ${this.sliderColor} !important;
			--mdc-switch-selected-pressed-state-layer-color: ${this.sliderColor} !important;
			--mdc-switch-selected-focus-handle-color: ${this.sliderColor} !important;
			--mdc-switch-selected-hover-handle-color: ${this.sliderColor} !important;
			--mdc-switch-selected-pressed-handle-color: ${this.sliderColor} !important;
			--mdc-switch-selected-focus-track-color: ${sliderLightColor} !important;
			--mdc-switch-selected-hover-track-color: ${sliderLightColor} !important;
			--mdc-switch-selected-pressed-track-color: ${sliderLightColor} !important;
			--mdc-switch-selected-track-color: ${sliderLightColor} !important;
			--mdc-switch-unselected-focus-handle-color: #cccccc !important;
			--mdc-switch-unselected-hover-handle-color: #cccccc !important;
			--mdc-switch-unselected-pressed-handle-color: #cccccc !important;
		}
		[${this.attributeName}] .mat-slide-toggle-thumb {
			background-color: ${this.circleColor};
		}
    	`
    }
}
