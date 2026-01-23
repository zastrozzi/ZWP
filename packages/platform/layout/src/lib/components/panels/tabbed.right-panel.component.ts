import { Component, ChangeDetectionStrategy, OnInit, inject, ViewEncapsulation } from '@angular/core'
import { ZWPPanelLayoutFacade } from '../../+state/facades'
import { isUndefined } from '@zwp/platform.common'

@Component({
    selector: 'zwp-tabbed-right-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="row" fxFlex="grow" zwpBackgroundColor="system-background">
            <zwp-right-panel-tab-bar></zwp-right-panel-tab-bar>
            <zwp-divider [vertical]="true" fxFlexAlign="stretch"></zwp-divider>
            <div
                fxFlex="grow"
                fxLayout="column"
                fxLayoutAlign="start stretch"
                *ngIf="{
                    rightPanel: selectedRightPanel$ | async,
                    portal: selectedRightPanelPortal$ | async
                } as panelData"
            >
                <div fxLayout="row" fxLayoutAlign="start center" zwpPadding="5 5 5 10">
                    <span [zwpTextStyle]="'subheadline'" zwpColor="label" fxFlex="grow">{{
                        panelData.rightPanel?.label
                    }}</span>
                    <zwp-md-icon-button
                        (btnClick)="removeRightPanel(panelData.rightPanel?.id)"
                        [icon]="'close'"
                        [iconColor]="'primary-label' | zwpColorTheme"
                        [backgroundColor]="'system-background' | zwpColorTheme"
                        [textStyle]="'title3'"
                        [iconPadding]="4"
                    ></zwp-md-icon-button>
                </div>
                <zwp-divider></zwp-divider>
                <div fxLayout="column" fxFlex="grow" zwpCustomScroll >
                    <ng-template [cdkPortalOutlet]="panelData.portal"></ng-template>
                </div>
            </div>
        </div>
    `,
})
export class TabbedRightPanelComponent {
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    rightPanelExpanded$ = this.panelLayoutFacade.rightPanelExpanded$
    rightPanelDisplayMode$ = this.panelLayoutFacade.rightPanelDisplayMode$
    selectedRightPanel$ = this.panelLayoutFacade.selectedRightPanel$
    selectedRightPanelPortal$ = this.panelLayoutFacade.rightPanelPortal$

    removeRightPanel(rightPanelId?: string) {
        if (!isUndefined(rightPanelId)) {
            this.panelLayoutFacade.removeRightPanel(rightPanelId)
        }
    }

    // tooltipDisabled$ = this.leftPanelDisplayMode$.pipe(map((mode) => mode !== 'inline'))

    // routeChildren = this.route.routeConfig?.children?.filter((child) => child.data?.['leftNavPanelShown'] === true)
    //     .map(child =>
    //         ({ path: `./${child.path}`, navTitle: child.data?.['navTitle'] ?? '', navIcon: child.data?.['navIcon'] ?? 'atr' })
    //     )
}
