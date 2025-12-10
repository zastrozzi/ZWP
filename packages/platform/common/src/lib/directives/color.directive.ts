import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from "@angular/core";
import { ZWPColorThemePipe } from "../pipes";
import { ZWPThemingFacade } from '../+state/facades'
import { Subscription } from 'rxjs'

@Directive({
    selector: '[zwpColor]'
})
export class ColorDirective implements OnChanges, OnInit, OnDestroy {
    @Input() zwpColor = ""
    @Input() zwpColorOptions: { lightness?: number, saturation?: number, opacity?: number } = {}

    private el = inject(ElementRef)
    colorThemePipe = inject(ZWPColorThemePipe)
    themingFacade = inject(ZWPThemingFacade)

    private subscriptions = new Subscription()

    ngOnInit(): void {
        this.subscriptions.add(
            this.themingFacade.darkMode$.subscribe(() => {
                this.setColorForElement(this.zwpColor, this.zwpColorOptions)
            })
        )
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['zwpColor']) {
            this.setColorForElement(changes['zwpColor'].currentValue)
        }
        if (changes['zwpColorOptions']) {
            this.setColorForElement(this.zwpColor, this.zwpColorOptions)
        }
    }

    private setColorForElement(value: string, options?: { lightness?: number, saturation?: number, opacity?: number }) {
        const element: HTMLElement = this.el.nativeElement
        const color = this.colorThemePipe.transform(value, options)
        element.style.setProperty('color', color)
    }
}