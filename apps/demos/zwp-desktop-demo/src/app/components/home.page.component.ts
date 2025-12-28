import { Component, inject } from "@angular/core";
import { ZWPRouterFacade } from '@zwp/platform.common'

@Component({
    selector: 'zwp-home-page',
    template: `
    <div
        fxFlexFill
        zwpBackgroundColor="secondary-system-background"
        fxLayout="column"
        fxLayoutAlign="start stretch"
        fxLayoutGap="10px"
    >
        <zwp-flow-grid [tileWidth]="300" [tileHeight]="200" zwpVScroll zwpPadding="10">
            <div *zwpFlowGridItem fxFlexFill fxLayoutAlign="center center" zwpBackgroundColor="primary" zwpCorners="20">
                <span zwpTextStyle="title3" zwpColor="system-white">Keyboard</span>
            </div>
            <div *zwpFlowGridItem fxFlexFill fxLayoutAlign="center center" zwpBackgroundColor="secondary" zwpCorners="20">
                <span zwpTextStyle="title3" zwpColor="system-white">File Browser</span>
            </div>
        </zwp-flow-grid>
    
        
    </div>
    `
})
export class HomePageComponent {

    private routerFacade = inject(ZWPRouterFacade)
}
