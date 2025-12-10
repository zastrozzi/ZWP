import { Directive, ElementRef, OnInit } from "@angular/core"

@Directive({
    selector: '[zwpDoubleTapDisable]'
})
export class DoubleTapDirective implements OnInit {
    constructor(private el: ElementRef) {}

    ngOnInit(): void {
        this.setDoubleTapForElement('none')
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //     // if (changes['zwpDoubleTap']) {
    //     //     this.setDoubleTapForElement(changes['zwpDoubleTap'].currentValue)
    //     // }
    // }

    private setDoubleTapForElement(doubleTapValue: string) {
        // console.log('setting double tap', doubleTapValue)
        const element: HTMLElement = this.el.nativeElement
        element.style.setProperty('touch-action', doubleTapValue)
    }
}