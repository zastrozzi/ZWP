import { Directive, ElementRef, inject, OnDestroy, OnInit } from '@angular/core'
import { ZWPThemingFacade } from '../+state/facades'
import { Subscription } from 'rxjs'

@Directive({
    selector: '[zwpBoxShadow]',
})
export class BoxShadowDirective implements OnInit, OnDestroy {
    private el = inject(ElementRef)
    themingFacade = inject(ZWPThemingFacade)

    private subscriptions = new Subscription()

    ngOnInit(): void {
        this.subscriptions.add(this.themingFacade.darkMode$.subscribe((isDarkMode) => {
            this.setShadowForElement(isDarkMode)
        }))
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    private setShadowForElement(isDarkMode: boolean) {
        const element: HTMLElement = this.el.nativeElement
        const boxShadow = isDarkMode 
            ? 'rgba(120, 120, 120, 0.35) 0px 3px 5px' 
            : 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        element.style.boxShadow = boxShadow
    }
}
