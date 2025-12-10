import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from "@angular/core";
import { ZWPColorThemePipe } from "../pipes";
import { ZWPThemingFacade } from '../+state/facades'
import { Subscription } from 'rxjs'

@Directive({
    selector: '[zwpBorderColor]'
})
export class BorderColorDirective implements OnChanges, OnInit, OnDestroy {
    @Input() zwpBorderColor = ""
    @Input() zwpBorderColorOptions: { lightness?: number, saturation?: number, opacity?: number } = {}

    private el = inject(ElementRef)
    colorThemePipe = inject(ZWPColorThemePipe)
    themingFacade = inject(ZWPThemingFacade)

    private subscriptions = new Subscription()

    ngOnInit(): void {
        this.subscriptions.add(
            this.themingFacade.darkMode$.subscribe(() => {
                this.setColorForElement(this.zwpBorderColor, this.zwpBorderColorOptions)
            })
        )
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['zwpBorderColor']) {
            this.setColorForElement(changes['zwpBorderColor'].currentValue)
        }
        if (changes['zwpBorderColorOptions']) {
            this.setColorForElement(this.zwpBorderColor, this.zwpBorderColorOptions)
        }
    }

    private setColorForElement(value: string, options?: { lightness?: number, saturation?: number, opacity?: number }) {
        const element: HTMLElement = this.el.nativeElement
        const color = this.colorThemePipe.transform(value, options)
        element.style.setProperty('border-color', color)
    }
}