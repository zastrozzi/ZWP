import { Directive, OnChanges, Input, ElementRef, SimpleChanges } from "@angular/core"

@Directive({
    selector: '[zwpVScroll]'
})
export class VerticalScrollDirective implements OnChanges {
    @Input() scrollbarHidden = true

    styleElement: HTMLStyleElement = document.createElement('style')

    constructor(private el: ElementRef) {
        const nativeEl: HTMLElement = this.el.nativeElement
        nativeEl.style.setProperty('overflow-y', 'scroll')
        nativeEl.style.setProperty('overflow-x', 'hidden')
        
        // nativeEl.style.setProperty('flex-shrink', '0')
        nativeEl.style.setProperty('max-height', '100% !important')
        nativeEl.style.setProperty('height', '100% !important')
        // nativeEl.style.setProperty('height', '40vh')
        
        this.styleElement.innerText = `
            .hidden-scrollbar::-webkit-scrollbar {
                display: none;
                width: 0px;
            }

            .hidden-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        `

        nativeEl.classList.add('hidden-scrollbar')
        nativeEl.appendChild(this.styleElement)
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['scrollbarHidden']) {
            const nativeEl: HTMLElement = this.el.nativeElement
            if (changes['scrollbarHidden'].currentValue === true) { nativeEl.classList.add('hidden-scrollbar') }
            else { nativeEl.classList.remove('hidden-scrollbar') }
        }
    }
}