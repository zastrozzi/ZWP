import { Directive, ElementRef } from "@angular/core"

@Directive({
    selector: '[zwpFullHeight]'
})
export class FullHeightDirective {

    constructor(private el: ElementRef) {
        const nativeEl: HTMLElement = this.el.nativeElement
        nativeEl.style.setProperty('overflow-y', 'hidden')
        nativeEl.style.setProperty('overflow-x', 'hidden')
        
        // nativeEl.style.setProperty('flex-shrink', '0')
        nativeEl.style.setProperty('max-height', '100% !important')
        nativeEl.style.setProperty('height', '100% !important')
        // nativeEl.style.setProperty('height', '40vh')
        
    }

}