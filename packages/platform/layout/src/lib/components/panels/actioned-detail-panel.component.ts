import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
    selector: 'zwp-actioned-detail-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxLayoutAlign="space-between stretch" fxFlexFill [style.width]="panelWidth">
            <div fxLayout="column" fxFlex="grow" zwpCustomScroll [scrollDirection]="'vertical'" [scrollbarMode]="'custom'">
                <div
                    fxLayout="column"
                    fxLayoutGap="5px"
                    fxFlex="grow"
                    zwpPadding="5"
                    zwpBackgroundColor="system-background"
                >
                    <ng-content select="[detail]"></ng-content>
                </div>
            </div>

            <zwp-divider></zwp-divider>
            <div
                fxLayout="column"
                fxLayoutAlign="start stretch"
                fxFlex="noshrink"
                fxLayoutGap="5px"
                zwpCorners="10"
                zwpPadding="5"
            >
                <span zwpTextStyle="caption2" zwpFontWeight="600" zwpPadding="5" zwpColor="label"
                    >Quick Actions</span
                >
                <ng-content select="[actions]" fxFlex="noshrink"></ng-content>
            </div>
        </div>
    `,
})
export class ActionedDetailPanelComponent {
    @Input() panelWidth = '300px'
}
