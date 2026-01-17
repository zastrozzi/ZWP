import { ChangeDetectionStrategy, Component, HostListener, Input, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import { ZWPThemingFacade } from "@zwp/platform.common";
import { MENU_OVERLAY_STYLES } from "../../model/menus/menu-overlay.styles";

@Component({
    selector: 'zwp-menu',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <div 
            [class]="(darkMode$ | async) === true ? 'zwp-menu-overlay-panel-dark' : 'zwp-menu-overlay-panel-light'" 
            fxLayout="column" 
            [style.backgroundColor]="'system-background' | zwpColorTheme"
            [style.borderRadius]="'5px'" 
            [style.border]="(darkMode$ | async) === true ? '2px solid' + ('system-fill' | zwpColorTheme) : '0px'" 
            [style.overflow]="'hidden'" 
            [style.position]="'relative'"

        >
            <ng-content></ng-content>
        </div>
    `,
    styles: [MENU_OVERLAY_STYLES]
})
export class MenuComponent {
    private clickIsInside = false
    comp: any | null
    darkMode$ = this.themingFacade.darkMode$

    constructor(private vcRef: ViewContainerRef, private themingFacade: ZWPThemingFacade) {
        this.comp = (this.vcRef as any)._hostLView[8] as any
    }
    
    @HostListener('mouseup')
    clickInside() {
        this.clickIsInside = true
    }

    @HostListener('document:mouseup')
    clickout() {
        if (!this.clickIsInside) { this.comp?.close() }
        this.clickIsInside = false
    }

    // @HostListener('touchup')
    // touchInside() {
    //     this.clickIsInside = true
    // }

    // @HostListener('document:touchup')
    // touchout() {
    //     if (!this.clickIsInside) { this.comp?.close() }
    //     this.clickIsInside = false
    // }

    
    

    

    // ngOnChanges(changes: SimpleChanges): void {
        
    // }
}