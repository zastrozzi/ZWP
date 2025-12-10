import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: 'zwp-detail-panel',
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
        
            
        </div>
    `
})
export class DetailPanelComponent {
    @Input() panelWidth = '300px'
}