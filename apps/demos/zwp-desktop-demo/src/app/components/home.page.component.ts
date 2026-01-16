import { Component, inject } from '@angular/core'
import { ZWPRouterFacade } from '@zwp/platform.common'

@Component({
    selector: 'zwp-home-page',
    template: `
        <div
            fxFlexFill
            zwpBackgroundColor="system-background"
            fxLayout="column"
            fxLayoutAlign="start stretch"
            fxLayoutGap="10px"
            zwpPadding="10"
            zwpVScroll
        >
            <div
                fxLayout="row"
                zwpPadding="5 15"
                zwpBackgroundColor="quaternary-system-fill"
                zwpCorners="20"
                fxLayoutAlign="start center"
            >
                <span zwpDisableSelection [zwpTextStyle]="'subheadline'" zwpColor="label">Platform Features</span>
            </div>
        
            <zwp-flow-grid [tileWidth]="80" [tileHeight]="80">
                <zwp-home-page-tile
                    *zwpFlowGridItem="{ rows: 2, cols: 3 }"
                    iconName="keyboard"
                    title="Keyboard Shortcuts"
                    fxFlexFill
                    (click)="navigateKeyboardShortcuts()"
                />
                <zwp-home-page-tile
                    *zwpFlowGridItem="{ rows: 2, cols: 3 }"
                    iconName="snippet_folder"
                    title="File Browser"
                    fxFlexFill
                    (click)="navigateFileBrowser()"
                />
            </zwp-flow-grid>

            <div
                fxLayout="row"
                zwpPadding="5 15"
                zwpBackgroundColor="quaternary-system-fill"
                zwpCorners="20"
                fxLayoutAlign="start center"
            >
                <span zwpDisableSelection [zwpTextStyle]="'subheadline'" zwpColor="label">Data Tables</span>
            </div>

            <zwp-flow-grid [tileWidth]="80" [tileHeight]="80">
                <zwp-home-page-tile
                    *zwpFlowGridItem="{ rows: 2, cols: 3 }"
                    iconName="business_center"
                    title="Projects"
                    fxFlexFill
                    (click)="navigateProjects()"
                />
            </zwp-flow-grid>
        </div>

        
    `,
})
export class HomePageComponent {
    private routerFacade = inject(ZWPRouterFacade)

    navigateKeyboardShortcuts() {
        this.routerFacade.navigate(['platform', 'keyboard'])
    }

    navigateFileBrowser() {
        this.routerFacade.navigate(['platform', 'file-browser'])
    }

    navigateProjects() {
        this.routerFacade.navigate(['dummy-data', 'projects'])
    }
}
