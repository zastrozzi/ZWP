import { Component, ChangeDetectionStrategy, inject } from '@angular/core'
import { ZWPRouterFacade, ZWPThemingFacade } from '@zwp/platform.common'

@Component({
    selector: 'zwp-routing-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            fxLayout="column"
            fxFlexFill
            zwpBackgroundColor="system-background"
            [style.overflow]="'hidden'"
            [style.height]="'100dvh'"
            [style.width]="'100dvw'"
            zwpDisableSelection
        >
            <div fxLayout="row" fxLayoutAlign="stretch center" zwpPadding="7" fxLayoutGap="10px">
                <zwp-feature-nav-button buttonLabelColor="primary-label"></zwp-feature-nav-button>
                <zwp-unified-search fxFlex="grow"/>
                <zwp-md-icon-button
                    (btnClick)="toggleDarkMode()"
                    textStyle="headline"
                    icon="dark_mode"
                    [iconRotation]="0"
                    backgroundColor="#00000000"
                    [iconPadding]="5"
                    [iconColor]="'primary-label' | zwpColorTheme"
                ></zwp-md-icon-button>
                <zwp-panel-layout-controls
                    buttonSelectedColorTheme="primary-label"
                    panelControlMenuButtonLabelColorTheme="primary-label"
                    panelControlMenuBackgroundColorTheme="secondary-system-background"
                    zwpBackgroundColor="quaternary-system-fill"
                    zwpCorners="80"
                    zwpPadding="2 5"
                ></zwp-panel-layout-controls>
            </div>
            <zwp-divider></zwp-divider>
            <zwp-main-panel-tab-bar buttonUnselectedLabelColorTheme="primary-label"></zwp-main-panel-tab-bar>
            <zwp-divider></zwp-divider>
            <div fxFlex="grow" [style.overflow]="'hidden'">
                <zwp-panel-layout
                    [dividerColor]="'system-gray3' | zwpColorTheme"
                    [panelDragHandleColor]="'tertiary-label' | zwpColorTheme"
                >
                    <zwp-left-nav-panel leftPanel zwpBackgroundColor="system-background"></zwp-left-nav-panel>
                    <div fxFlexFill mainPanel>
                        <router-outlet></router-outlet>
                    </div>
                    <div zwpBackgroundColor="system-background" bottomPanel fxFlexFill></div>
                    <zwp-tabbed-right-panel rightPanel fxFlexFill></zwp-tabbed-right-panel>
                </zwp-panel-layout>
            </div>
            <zwp-divider [style.zIndex]="12"></zwp-divider>
            <div fxLayout="row" fxFlex="50px" fxLayoutAlign="start stretch" [style.zIndex]="12">
                <zwp-window-layout-dock
                    fxFlex="grow"
                    zwpCustomScroll
                    [scrollbarMode]="'custom'"
                    [scrollDirection]="'horizontal'"
                ></zwp-window-layout-dock>
                <zwp-divider [vertical]="true" fxFlexAlign="stretch"></zwp-divider>
                <!-- <cdp-routing-utility-dock fxFlexAlign="stretch"></cdp-routing-utility-dock> -->
            </div>
        </div>
    `,
    styles: [``],
})
export class RoutingContainerComponent {
    private router = inject(ZWPRouterFacade)
    private themingFacade = inject(ZWPThemingFacade)

    toggleDarkMode() {
        this.themingFacade.toggleDarkMode()
    }

    navigateHome() {
        this.router.navigate([''])
    }
}
