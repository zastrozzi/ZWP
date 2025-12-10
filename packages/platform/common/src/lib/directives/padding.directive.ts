import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";
import { createGeometryPropertySet, parseGeometryEdgesString } from "../utils";

@Directive({
    selector: '[zwpPadding]'
})
export class PaddingDirective implements OnChanges {
    @Input() zwpPadding = ""

    constructor(private el: ElementRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['zwpPadding']) {
            this.setPaddingForElement(changes['zwpPadding'].currentValue)
        }
    }

    private setPaddingForElement(styleStr: string) {
        const paddingSet = parseGeometryEdgesString(styleStr)
        const properties = createGeometryPropertySet('padding', 'px', paddingSet)

        const element: HTMLElement = this.el.nativeElement
        properties.forEach((property) => {
            element.style.setProperty(property.property, property.value)
        })
    }
}