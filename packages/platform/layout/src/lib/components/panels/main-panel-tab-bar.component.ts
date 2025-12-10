import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core'
import { ActivatedRoute, Route } from '@angular/router'
import {
    isNull,
    ZWPRouterFacade,
    resolveChildRouteSnapshots,
    resolveRelativeChildRoutePath,
} from '@zwp/platform.common'
import { ZWPMainPanelFacade } from '../../+state/facades'
import { MainPanelTabEntityWithState } from '../../model'

@Component({
    selector: 'zwp-main-panel-tab-bar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="row" fxLayoutAlign="start center" zwpPadding="0 0 0 5">
            <zwp-md-button
                
                [textStyle]="'button1'"
                label="New Tab"
                materialType="flat"
                icon="add"
                [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                [labelColor]="'primary' | zwpColorTheme"
                (btnClick)="addMainPanelTab()"
            />
            <zwp-divider [vertical]="true" fxFlexAlign="stretch" fxFlexOffset="5px"></zwp-divider>
            <div
                fxLayout="row"
                fxFlex="grow"
                zwpCustomScroll
                [scrollDirection]="'horizontal'"
                [scrollbarMode]="'custom'"
            >
                <div
                    fxLayout="row"
                    fxFlex="grow"
                    fxLayoutAlign="start stretch"
                    fxLayoutGap="5px"
                    zwpPadding="5"
                >
                    <ng-container *ngFor="let tab of allMainPanelTabsWithState$ | async">
                        <zwp-md-button
                            layoutGap="10px"
                            [textStyle]="'button1'"
                            [label]="tab.routeLabel === '/' ? 'Empty Tab' : tab.routeLabel"
                            materialType="flat"
                            [postfixIcon]="tab.isActive ? 'close' : 'open_in_full'"
                            [backgroundColor]="
                                tab.isActive
                                    ? ('primary' | zwpColorTheme)
                                    : ('quaternary-system-fill' | zwpColorTheme)
                            "
                            [labelColor]="
                                tab.isActive ? ('system-white' | zwpColorTheme) : ('primary' | zwpColorTheme)
                            "
                            (btnClick)="tab.isActive ? closeMainPanelTab(tab.id) : selectMainPanelTab(tab)"
                        >
                        </zwp-md-button>
                    </ng-container>
                </div>
            </div>
        </div>
    `,
})
export class MainPanelTabBarComponent {
    private mainPanelFacade = inject(ZWPMainPanelFacade)
    private routerFacade = inject(ZWPRouterFacade)

    allMainPanelTabsWithState$ = this.mainPanelFacade.allMainPanelTabsWithState$
    selectedMainPanelTab$ = this.mainPanelFacade.selectedMainPanelTab$
    selectedMainPanelTabId$ = this.mainPanelFacade.selectedMainPanelTabId$
    getMainPanelTabById$ = (id: string) => this.mainPanelFacade.getMainPanelTabById$(id)

    addMainPanelTab() {
        this.mainPanelFacade.addMainPanelTab()
    }

    selectMainPanelTab(tab: MainPanelTabEntityWithState) {
        this.mainPanelFacade.selectMainPanelTab(tab.id)
    }

    closeMainPanelTab(tabId: string) {
        this.mainPanelFacade.closeMainPanelTab(tabId)
    }
}
