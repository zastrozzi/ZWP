import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { CDPCommon } from '@zwp/cdp.common'

@Component({
    selector: 'cdp-routing-clipboard-utility-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            fxLayout="column"
            zwpBackgroundColor="system-background"
            zwpCorners="10"
            class="mat-elevation-z4"
            [style.maxHeight]="'80vh'"
        >
            <div fxLayout="row" fxLayoutAlign="space-between center" fxFlex="50px" zwpPadding="0 10 0 20">
                <span zwpTextStyle="subheadline" zwpColor="label">Clipboard</span>
                <zwp-md-icon-button
                    (btnClick)="closeUtilityDockPanel()"
                    textStyle="headline"
                    icon="close"
                    [iconPadding]="5"
                    backgroundColor="#00000000"
                    [iconColor]="'primary' | zwpColorTheme"
                    label="Close"
                ></zwp-md-icon-button>
            </div>
            
            <zwp-divider></zwp-divider>
            <div fxLayout="column" zwpCustomScroll [scrollDirection]="'vertical'" [scrollbarMode]="'custom'">
                <div fxLayout="column" fxLayoutGap="5px" fxFlexFill zwpPadding="10">
                    <zwp-labelled-property *ngFor="let item of clipboardItems; trackBy: identifyClipboardItem" [property]="item.itemStatus" [label]="item.itemName"/> 
                </div>
            </div>
        </div>
    `
})
export class ClipboardUtilityPanelComponent implements OnInit{
    private utilityDockFacade = inject(CDPCommon.State.Facades.CDPCommonUtilityDockFacade)

    clipboardItems: {itemName: string, itemStatus: string}[] = []

    ngOnInit(): void {
        for (let i = 1; i < 51; i++) {
            this.clipboardItems.push({
                itemName: `Clipboard Item ${i}`,
                itemStatus: 'Copy'
            })
        }
    }

    closeUtilityDockPanel() {
        this.utilityDockFacade.closeUtilityDockPanel(CDPCommon.Model.UtilityDockPanelType.clipboard)
    }

    identifyClipboardItem(index: number, item: {itemName: string, itemStatus: string}) {
        return item.itemName
    }
}