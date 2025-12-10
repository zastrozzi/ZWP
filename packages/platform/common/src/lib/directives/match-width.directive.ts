import { AfterViewChecked, Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core"

@Directive({
    selector: '[zwpMatchWidth]'
})
export class MatchWidthDirective implements OnChanges, AfterViewChecked {
    @Input() zwpMatchWidth = 1

    constructor(private el: ElementRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['zwpMatchWidth']) {
            this.setHeightForElement(changes['zwpMatchWidth'].currentValue, 'ON CHANGES')
        }
    }

    ngAfterViewChecked(): void {
        this.setHeightForElement(this.zwpMatchWidth, 'AFTER VIEW CHECKED')
    }

    private setHeightForElement(scale: number, lifecycle: string = '') {
        const element: HTMLElement = this.el.nativeElement
        const computedStyle = window.getComputedStyle(element)
        const computedHeight = parseFloat(computedStyle.height)
        const computedWidth = parseFloat(computedStyle.width)
        // console.log(lifecycle, `clientHeight: ${clientHeight}, offsetHeight: ${offsetHeight}, computedHeight: ${computedHeight}`)
        if (computedWidth > 0 && computedHeight !== computedWidth * scale) {
            // console.log(lifecycle, `SETTING HEIGHT: ${computedWidth * scale}`)
            element.style.setProperty('height', `${computedWidth * scale}px`)
        }
    }
}