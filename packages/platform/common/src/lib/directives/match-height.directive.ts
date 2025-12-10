import { AfterViewChecked, AfterViewInit, Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core"

@Directive({
    selector: '[zwpMatchHeight]'
})
export class MatchHeightDirective implements OnChanges, AfterViewInit {
    @Input() zwpMatchHeight = 1

    constructor(private el: ElementRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['zwpMatchHeight']) {
            this.setWidthForElement(changes['zwpMatchHeight'].currentValue, 'ON CHANGES')
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.setWidthForElement(this.zwpMatchHeight, 'AFTER VIEW INIT'), 0)
        
    }

    private setWidthForElement(scale: number, lifecycle: string = '') {
        if (scale <= 0) {
            return
        } else {
            const element: HTMLElement = this.el.nativeElement
            const computedStyle = window.getComputedStyle(element)
            const computedHeight = parseFloat(computedStyle.height)
            const computedWidth = parseFloat(computedStyle.width)
            // console.log(lifecycle, `clientHeight: ${clientHeight}, offsetHeight: ${offsetHeight}, computedHeight: ${computedHeight}`)
            // console.log(lifecycle, 'COMPUTED STYLE', computedStyle)
            if (computedHeight > 0 && computedWidth !== computedHeight * scale) {
                // console.log(lifecycle, `SETTING WIDTH: ${computedHeight * scale}`)
                element.style.setProperty('width', `${computedHeight * scale}px`)
            }
        }
    }
}