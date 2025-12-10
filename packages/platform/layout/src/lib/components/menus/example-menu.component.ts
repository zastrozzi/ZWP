import { ChangeDetectionStrategy, Component } from "@angular/core"
import { ZWPMenuLayoutFacade } from "../../+state/facades"
import { ZWPMenuComponent } from "../../decorators"
import { BaseMenuComponent } from "./base-menu.component"

@ZWPMenuComponent('ExampleMenuComponent')
@Component({
    selector: 'zwp-example-menu',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-menu [menuOverlayData]="menuOverlayData">
            <div fxLayout="column" fxLayoutAlign="center center" fxFlexFill>
                <span fxFlex="noshrink" zwpPadding="100" [style.whitespace]="'nowrap'" (click)="openMenu($event)" [zwpTextStyle]="'subheadline'" [style.color]="'label' | zwpColorTheme">Hello there!</span>
                <span fxFlex="noshrink" zwpPadding="100" [style.whitespace]="'nowrap'" (click)="openMenu($event)" [zwpTextStyle]="'subheadline'" [style.color]="'label' | zwpColorTheme">{{ menuOverlayData | json }}</span>
            </div>
            
        </zwp-menu>
    `
})
export class ExampleMenuComponent extends BaseMenuComponent {
    // @Input() menuOverlayData: any | null = null

    constructor(private menuFacade: ZWPMenuLayoutFacade) {
        super()
        // this._menuOverlayData.subscribe((data) => )
    }

    openMenu(event: any) {
        this.menuFacade.openMenu('ExampleMenuComponent', {x: event.clientX, y: event.clientY}, 'after', 'below', {})
    }
}