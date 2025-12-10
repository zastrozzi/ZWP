import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { ZWPPanelLayoutFacade } from "../../+state/facades";
import { PanelPosition } from "../../model";

@Component({
    selector: 'zwp-right-panel-tab-bar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlex="60px" zwpCustomScroll [scrollDirection]="'vertical'" [scrollbarMode]="'custom'">
            <div 
                fxLayout="column" fxLayoutGap="5px" fxFlex="grow" zwpPadding="5px"
            >
                <zwp-md-button 
                    *ngFor="let rightPanelEntity of allRightPanels$ | async" 
                    (btnClick)="selectRightPanel(rightPanelEntity.id)"
                    [icon]="rightPanelEntity.icon" [label]="''" [layoutGap]="'0px'"
                    [iconColor]="
                        ((selectedRightPanelId$ | async) === rightPanelEntity.id) ? 
                        ('system-white' | zwpColorTheme) : ('primary' | zwpColorTheme)
                        "
                    [backgroundColor]="
                        ((selectedRightPanelId$ | async) === rightPanelEntity.id) ? 
                        ('primary' | zwpColorTheme) : ('system-background' | zwpColorTheme)
                        "
                    [textStyle]="'headline'"
                    [isCollapsed]="true"
                    [matTooltip]="rightPanelEntity.label" matTooltipPosition="before"
                    [padding]="'10 0 10 0'"
                ></zwp-md-button>
            </div>
        </div>
    `
})
export class RightPanelTabBarComponent {
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)

    allRightPanels$ = this.panelLayoutFacade.allRightPanels$
    rightPanelExpanded$ = this.panelLayoutFacade.rightPanelExpanded$
    selectedRightPanelId$ = this.panelLayoutFacade.selectedRightPanelId$
    rightPanelsByCategory$ = this.panelLayoutFacade.rightPanelsByCategory$

    selectRightPanel(rightPanelId: string) {
        this.panelLayoutFacade.expandPanel(PanelPosition.right)
        this.panelLayoutFacade.selectRightPanel(rightPanelId)
    }
}