import { Directive, ElementRef, Input, OnChanges, SimpleChanges, inject } from "@angular/core";
import { ZWPColorThemePipe } from "../pipes";

@Directive({
    selector: '[zwpPlaceholderColor]'
})
export class PlaceholderColorDirective implements OnChanges {
    @Input() zwpPlaceholderColor = ""
    @Input() zwpPlaceholderColorOptions: { lightness?: number, saturation?: number, opacity?: number } = {}

    colorThemePipe = inject(ZWPColorThemePipe)

    constructor(private el: ElementRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['zwpPlaceholderColor']) {
            this.setColorForElement(changes['zwpPlaceholderColor'].currentValue)
        }
        if (changes['zwpPlaceholderColorOptions']) {
            this.setColorForElement(this.zwpPlaceholderColor, this.zwpPlaceholderColorOptions)
        }
    }

    private setColorForElement(value: string, options?: { lightness?: number, saturation?: number, opacity?: number }) {
        const element: HTMLElement = this.el.nativeElement
        const color = this.colorThemePipe.transform(value, options)
        // element.style.setProperty('color', color)
    }
}