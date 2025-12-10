import { Component, ChangeDetectionStrategy, inject } from '@angular/core'
import { ZWPRouterFacade, ZWPThemingFacade, TransformEnumPipeSignature } from '@zwp/platform.common'
import { CDPCommon } from '@zwp/cdp.common'

@Component({
    selector: 'cdp-routing-utility-dock',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            fxLayout="row"
            fxLayoutAlign="start center"
            fxLayoutGap="10px"
            zwpPadding="0 10"
            fxFlex="noshrink"
            
            cdkOverlayOrigin
            #trigger="cdkOverlayOrigin"
        >
            <ng-container *ngFor="let panel of utilityDockPanels$ | async; trackBy: identityUtilityDockPanel">
                <zwp-md-icon-button
                    (btnClick)="toggleUtilityPanelOpen(panel.type)"
                    textStyle="headline"
                    [icon]="panel.type | zwpTransformEnum : utilityDockPanelIconPipeSignature"
                    [iconRotation]="0"
                    backgroundColor="#00000000"
                    [iconPadding]="5"
                    [iconColor]="(panel.isExpanded ? 'primary' : 'tertiary-label') | zwpColorTheme"
                    [label]="panel.type | zwpTransformEnum : utilityDockPanelLabelPipeSignature"
                ></zwp-md-icon-button>
            </ng-container>
            <ng-template
                cdkConnectedOverlay
                [cdkConnectedOverlayOrigin]="trigger"
                [cdkConnectedOverlayOpen]="(uploadUtilityIsOpen$ | async) ?? false"
                [cdkConnectedOverlayOffsetX]="-10"
                [cdkConnectedOverlayMinWidth]="400"
            >
                <kgc-file-upload-utility-panel fxFlexFill></kgc-file-upload-utility-panel>
            </ng-template>
            <ng-template
                cdkConnectedOverlay
                [cdkConnectedOverlayOrigin]="trigger"
                [cdkConnectedOverlayOpen]="(clipboardUtilityIsOpen$ | async) ?? false"
                [cdkConnectedOverlayOffsetX]="-10"
                [cdkConnectedOverlayOffsetY]="-20"
                [cdkConnectedOverlayMinWidth]="400"
            >
                <cdp-routing-clipboard-utility-panel fxFlexFill></cdp-routing-clipboard-utility-panel>
            </ng-template>
            <ng-template
                cdkConnectedOverlay
                [cdkConnectedOverlayOrigin]="trigger"
                [cdkConnectedOverlayOpen]="(notificationsUtilityIsOpen$ | async) ?? false"
                [cdkConnectedOverlayOffsetX]="-10"
                [cdkConnectedOverlayOffsetY]="-20"
                [cdkConnectedOverlayMinWidth]="400"
            >
                <cdp-routing-notifications-utility-panel fxFlexFill></cdp-routing-notifications-utility-panel>
            </ng-template>
        </div>
    `,
})
export class UtilityDockComponent {
    private utilityDockFacade = inject(CDPCommon.State.Facades.CDPCommonUtilityDockFacade)

    utilityDockPanels$ = this.utilityDockFacade.utilityDockPanels$
    anyUtilityDockPanelIsExpanded$ = this.utilityDockFacade.anyUtilityDockPanelIsExpanded$
    uploadUtilityIsOpen$ = this.utilityDockFacade.utilityDockPanelIsExpanded$(
        CDPCommon.Model.UtilityDockPanelType.uploads
    )
    clipboardUtilityIsOpen$ = this.utilityDockFacade.utilityDockPanelIsExpanded$(
        CDPCommon.Model.UtilityDockPanelType.clipboard
    )
    notificationsUtilityIsOpen$ = this.utilityDockFacade.utilityDockPanelIsExpanded$(
        CDPCommon.Model.UtilityDockPanelType.notifications
    )

    utilityDockPanelLabelPipeSignature: TransformEnumPipeSignature = {
        input: CDPCommon.Model.UtilityDockPanelType,
        output: CDPCommon.Model.UtilityDockPanelTypeLabel,
    }
    utilityDockPanelIconPipeSignature: TransformEnumPipeSignature = {
        input: CDPCommon.Model.UtilityDockPanelType,
        output: CDPCommon.Model.UtilityDockPanelTypeIcon,
    }

    utilityDockPanelIsExpanded$ = (panelType: CDPCommon.Model.UtilityDockPanelType) =>
        this.utilityDockFacade.utilityDockPanelIsExpanded$(panelType)

    toggleUtilityPanelOpen(panelType: CDPCommon.Model.UtilityDockPanelType) {
        this.utilityDockFacade.toggleUtilityDockPanel(panelType)
        // this.uploadsUtilityOpen = !this.uploadsUtilityOpen
    }

    identityUtilityDockPanel(index: number, panel: CDPCommon.Model.UtilityDockPanel) {
        return panel.type
    }
}
