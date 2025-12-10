import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core'
import { ZWPPanelLayoutFacade } from '../../+state/facades'

@Component({
    selector: 'zwp-tabbed-right-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="row" fxFlexFill zwpBackgroundColor="system-background">
            <zwp-right-panel-tab-bar></zwp-right-panel-tab-bar>
            <zwp-divider [vertical]="true" fxFlexAlign="stretch"></zwp-divider>
            <div fxFlex="grow" fxLayout="column" [style.overflowX]="'auto'">
                <ng-container *ngIf="selectedRightPanel$ | async as selectedRightPanel">
                    <div fxLayout="row" fxLayoutAlign="start center" zwpPadding="5px 5px 5px 10px">
                        <span [zwpTextStyle]="'subheadline'" zwpColor="label" fxFlex="grow">{{selectedRightPanel.label}}</span>
                        <zwp-md-button 
                            (btnClick)="removeRightPanel(selectedRightPanel.id)"
                            [icon]="'close'" [label]="''" [layoutGap]="'0px'"
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'system-background' | zwpColorTheme"
                            [textStyle]="'headline'"
                            [isCollapsed]="true"
                            [padding]="'5 10 5 10'"
                        ></zwp-md-button>
                    </div>
                    <zwp-divider fxFlexAlign="stretch"></zwp-divider>
                    <div fxLayout="column" zwpCustomScroll [scrollDirection]="'vertical'" [scrollbarMode]="'custom'">
                        <ng-template [cdkPortalOutlet]="selectedRightPanelPortal$ | async"></ng-template>
                    </div>
                </ng-container>
            </div>
        </div>
    `
})
export class TabbedRightPanelComponent {
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    rightPanelExpanded$ = this.panelLayoutFacade.rightPanelExpanded$
    rightPanelDisplayMode$ = this.panelLayoutFacade.rightPanelDisplayMode$
    selectedRightPanel$ = this.panelLayoutFacade.selectedRightPanel$
    selectedRightPanelPortal$ = this.panelLayoutFacade.rightPanelPortal$
    

    removeRightPanel(rightPanelId: string) {
        this.panelLayoutFacade.removeRightPanel(rightPanelId)
    }

    // tooltipDisabled$ = this.leftPanelDisplayMode$.pipe(map((mode) => mode !== 'inline'))


    // routeChildren = this.route.routeConfig?.children?.filter((child) => child.data?.['leftNavPanelShown'] === true)
    //     .map(child =>
    //         ({ path: `./${child.path}`, navTitle: child.data?.['navTitle'] ?? '', navIcon: child.data?.['navIcon'] ?? 'atr' })
    //     )
}