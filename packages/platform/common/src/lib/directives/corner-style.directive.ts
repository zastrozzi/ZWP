import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core"
import { ZWPCSSProperty } from "../model"

@Directive({
    selector: '[zwpCorners]'
})
export class CornerStyleDirective implements OnChanges {
    @Input() zwpCorners = ""

    constructor(private el: ElementRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['zwpCorners']) {
            this.setCornersForElement(changes['zwpCorners'].currentValue)
        }
    }

    private setCornersForElement(styleStr: string) {
        const cornerStyle = this.parseCornerStyle(styleStr)
        const properties = this.createPropertySet(cornerStyle)

        const element: HTMLElement = this.el.nativeElement
        properties.forEach((property) => {
            element.style.setProperty(property.property, property.value)
        })
        
    }

    private parseCornerStyle(styleStr: string): CornerRadiusSet {
        const styleParts = styleStr.split(' ').map((x) => parseInt(x))
        if (styleParts.length === 1) { return {tl: styleParts[0], tr: styleParts[0], br: styleParts[0], bl: styleParts[0]} }
        if (styleParts.length === 4) { return {tl: styleParts[0], tr: styleParts[1], br: styleParts[2], bl: styleParts[3]} }
        return {tl: 0, tr: 0, br: 0, bl: 0}
    }

    private createPropertySet(cornerSet: CornerRadiusSet): ZWPCSSProperty[] {
        return [
            { property: 'border-top-left-radius', value: (cornerSet.tl).toString() + 'px' },
            { property: 'border-top-right-radius', value: (cornerSet.tr).toString() + 'px' },
            { property: 'border-bottom-right-radius', value: (cornerSet.br).toString() + 'px' },
            { property: 'border-bottom-left-radius', value: (cornerSet.bl).toString() + 'px' }
        ]
    }
}

export interface CornerRadiusSet {
    tl: number
    tr: number
    br: number
    bl: number
}

