import { Directive, ElementRef, OnInit } from "@angular/core"

@Directive({
    selector: '[zwpDisableSelection]'
})
export class DisableSelectionDirective implements OnInit {
    constructor(private el: ElementRef) {}

    ngOnInit(): void {
        this.setUserSelectForElement('none')
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //     // if (changes['zwpDoubleTap']) {
    //     //     this.setDoubleTapForElement(changes['zwpDoubleTap'].currentValue)
    //     // }
    // }

    private setUserSelectForElement(userSelectValue: string) {
        // console.log('setting double tap', doubleTapValue)
        const element: HTMLElement = this.el.nativeElement
        element.style.setProperty('user-select', userSelectValue)
        element.style.setProperty('-webkit-user-select', userSelectValue)
        element.style.setProperty('-ms-user-select', userSelectValue)
    }
}