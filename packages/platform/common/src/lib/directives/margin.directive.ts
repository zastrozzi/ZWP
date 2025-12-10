import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";
import { createGeometryPropertySet, parseGeometryEdgesString } from "../utils";

@Directive({
    selector: '[zwpMargin]'
})
export class MarginDirective implements OnChanges {
    @Input() zwpMargin = ""

    constructor(private el: ElementRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['zwpMargin']) {
            this.setMarginForElement(changes['zwpMargin'].currentValue)
        }
    }

    private setMarginForElement(styleStr: string) {
        const marginSet = parseGeometryEdgesString(styleStr)
        const properties = createGeometryPropertySet('margin', 'px', marginSet)

        const element: HTMLElement = this.el.nativeElement
        properties.forEach((property) => {
            element.style.setProperty(property.property, property.value)
        })
    }
}