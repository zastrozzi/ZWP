import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from "@angular/core";
import { ZWPColorThemePipe } from "../pipes";
import { ZWPThemingFacade } from '../+state/facades'
import { Subscription } from 'rxjs'

@Directive({
    selector: '[zwpBackgroundColor]'
})
export class BackgroundColorDirective implements OnChanges, OnInit, OnDestroy {
    @Input() zwpBackgroundColor = ""
    @Input() zwpBackgroundColorOptions: { lightness?: number, saturation?: number, opacity?: number } = {}
    
    private el = inject(ElementRef)
    colorThemePipe = inject(ZWPColorThemePipe)
    themingFacade = inject(ZWPThemingFacade)

    private subscriptions = new Subscription()

    ngOnInit(): void {
        this.subscriptions.add(
            this.themingFacade.darkMode$.subscribe(() => {
                this.setColorForElement(this.zwpBackgroundColor, this.zwpBackgroundColorOptions)
            })
        )
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['zwpBackgroundColor']) {
            this.setColorForElement(changes['zwpBackgroundColor'].currentValue)
        }
        if (changes['zwpBackgroundColorOptions']) {
            this.setColorForElement(this.zwpBackgroundColor, this.zwpBackgroundColorOptions)
        }
    }

    private setColorForElement(value: string, options?: { lightness?: number, saturation?: number, opacity?: number }) {
        const element: HTMLElement = this.el.nativeElement
        const color = this.colorThemePipe.transform(value, options)
        element.style.setProperty('background-color', color)
    }
}