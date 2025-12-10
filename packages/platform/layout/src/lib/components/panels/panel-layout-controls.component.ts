import { ChangeDetectionStrategy, Component, Input, ViewChild } from "@angular/core";
import { MatMenuTrigger } from "@angular/material/menu";
import { ZWPPanelLayoutFacade } from "../../+state/facades";
import { PanelDisplayMode, PanelPosition } from "../../model";

@Component({
    selector: 'zwp-panel-layout-controls',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="row" fxFlexFill fxLayoutAlign="center center" fxLayoutGap="5px">
            <zwp-md-icon-button 
                (btnClick)="toggleLeftPanelOpen()" 
                textStyle="headline"
                icon="vertical_split" 
                [iconRotation]="180" 
                [backgroundColor]="buttonBackgroundColorTheme | zwpColorTheme" 
                [iconPadding]="5"
                [iconColor]="(leftPanelOpen$ | async) === true ? (buttonSelectedColorTheme | zwpColorTheme) : (buttonUnselectedColorTheme | zwpColorTheme)"
                zwpLongPress 
                (isLongPressed)="longPressLeftControls($event)"
            ></zwp-md-icon-button>
            <zwp-divider [vertical]="true" zwpPadding="5 0" fxFlexAlign="stretch"></zwp-divider>
            <zwp-md-icon-button 
                (btnClick)="toggleBottomPanelOpen()" 
                textStyle="headline"
                icon="horizontal_split" 
                [iconRotation]="0" 
                [backgroundColor]="buttonBackgroundColorTheme | zwpColorTheme" 
                [iconPadding]="5"
                [iconColor]="(bottomPanelOpen$ | async) === true ? (buttonSelectedColorTheme | zwpColorTheme) : (buttonUnselectedColorTheme | zwpColorTheme)"
                zwpLongPress 
                (isLongPressed)="longPressBottomControls($event)"
            ></zwp-md-icon-button>
            <zwp-divider [vertical]="true" zwpPadding="5 0" fxFlexAlign="stretch"></zwp-divider>
            <zwp-md-icon-button 
                (btnClick)="toggleRightPanelOpen()" 
                textStyle="headline"
                icon="vertical_split" 
                [iconRotation]="0" 
                [backgroundColor]="buttonBackgroundColorTheme | zwpColorTheme" 
                [iconPadding]="5"
                [iconColor]="(rightPanelOpen$ | async) === true ? (buttonSelectedColorTheme | zwpColorTheme) : (buttonUnselectedColorTheme | zwpColorTheme)"
                zwpLongPress 
                (isLongPressed)="longPressRightControls($event)"
            ></zwp-md-icon-button>
        </div>
        <div [style.width]="'0px'" [style.height]="'0px'" [style.overflow]="'hidden'">
            <div [matMenuTriggerFor]="leftPanelControlsMenu" #leftPanelControlsMenuTrigger="matMenuTrigger"></div>
            <div [matMenuTriggerFor]="bottomPanelControlsMenu" #bottomPanelControlsMenuTrigger="matMenuTrigger"></div>
            <div [matMenuTriggerFor]="rightPanelControlsMenu" #rightPanelControlsMenuTrigger="matMenuTrigger"></div>
        </div>

        <mat-menu #leftPanelControlsMenu="matMenu" >
            <div fxLayout="column" fxLayoutAlign="center start" fxLayoutGap="8px" [style.backgroundColor]="'tertiary-system-background' | zwpColorTheme" [style.marginTop]="'-8px'" [style.marginBottom]="'-8px'" zwpPadding="10px">
                    <zwp-md-button 
                        *ngIf="(leftPanelOpen$ | async) === false" 
                        (btnClick)="openLeftPanel()" 
                        icon="border_left" 
                        label="Open Left Panel" 
                        [backgroundColor]="'clear' | zwpColorTheme" 
                        [labelColor]="'primary' | zwpColorTheme"
                    ></zwp-md-button>
                    <zwp-md-button 
                        *ngIf="(leftPanelOpen$ | async) === true" 
                        (btnClick)="closeLeftPanel()" 
                        icon="border_left" 
                        label="Close Left Panel" 
                        [backgroundColor]="'clear' | zwpColorTheme" 
                        [labelColor]="'primary' | zwpColorTheme"
                    ></zwp-md-button>
                    <zwp-md-button 
                        *ngIf="(leftPanelOpen$ | async) === true && (leftPanelExpanded$ | async) === false" 
                        (btnClick)="expandLeftPanel()" 
                        icon="open_in_full" 
                        label="Expand Left Panel" 
                        [backgroundColor]="'clear' | zwpColorTheme" 
                        [labelColor]="'primary' | zwpColorTheme"
                    ></zwp-md-button>
                    <zwp-md-button 
                        *ngIf="(leftPanelOpen$ | async) === true && (leftPanelExpanded$ | async) === true" 
                        (btnClick)="collapseLeftPanel()" 
                        icon="close_fullscreen" 
                        label="Minimise Left Panel" 
                        [backgroundColor]="'clear' | zwpColorTheme" 
                        [labelColor]="'primary' | zwpColorTheme"
                    ></zwp-md-button>
                    <zwp-md-button 
                        *ngIf="(leftPanelDisplayMode$ | async) === inlineAndOver" 
                        (btnClick)="pinLeftPanel()" 
                        icon="push_pin" 
                        label="Pin Left Panel" 
                        [backgroundColor]="'clear' | zwpColorTheme" 
                        [labelColor]="'primary' | zwpColorTheme"
                    ></zwp-md-button>
                    <zwp-md-button 
                        *ngIf="(leftPanelDisplayMode$ | async) === inline" 
                        (btnClick)="unpinLeftPanel()" 
                        icon="push_pin" 
                        label="Unpin Left Panel" 
                        [backgroundColor]="'clear' | zwpColorTheme" 
                        [labelColor]="'primary' | zwpColorTheme"
                    ></zwp-md-button>
            </div>
        </mat-menu>

        <mat-menu #bottomPanelControlsMenu="matMenu" >
            <div fxLayout="column" fxLayoutAlign="center start" fxLayoutGap="8px" [style.backgroundColor]="'tertiary-system-background' | zwpColorTheme" [style.marginTop]="'-8px'" [style.marginBottom]="'-8px'" zwpPadding="10px">
                    <zwp-md-button 
                        *ngIf="(bottomPanelOpen$ | async) === false" 
                        (btnClick)="openBottomPanel()" 
                        icon="border_bottom" 
                        label="Open Bottom Panel" 
                        [backgroundColor]="'clear' | zwpColorTheme" 
                        [labelColor]="'primary' | zwpColorTheme"
                    ></zwp-md-button>
                    <zwp-md-button 
                        *ngIf="(bottomPanelOpen$ | async) === true" 
                        (btnClick)="closeBottomPanel()" 
                        icon="border_bottom" 
                        label="Close Bottom Panel" 
                        [backgroundColor]="'clear' | zwpColorTheme" 
                        [labelColor]="'primary' | zwpColorTheme"
                    ></zwp-md-button>
                    <zwp-md-button 
                        *ngIf="(bottomPanelOpen$ | async) === true && (bottomPanelExpanded$ | async) === false" 
                        (btnClick)="expandBottomPanel()" 
                        icon="open_in_full" 
                        label="Expand Bottom Panel" 
                        [backgroundColor]="'clear' | zwpColorTheme" 
                        [labelColor]="'primary' | zwpColorTheme"
                    ></zwp-md-button>
                    <zwp-md-button 
                        *ngIf="(bottomPanelOpen$ | async) === true && (bottomPanelExpanded$ | async) === true" 
                        (btnClick)="collapseBottomPanel()" 
                        icon="close_fullscreen" 
                        label="Minimise Bottom Panel" 
                        [backgroundColor]="'clear' | zwpColorTheme" 
                        [labelColor]="'primary' | zwpColorTheme"
                    ></zwp-md-button>
            </div>
        </mat-menu>

        <mat-menu #rightPanelControlsMenu="matMenu" >
            <div fxLayout="column" fxLayoutAlign="center start" fxLayoutGap="8px" [style.backgroundColor]="'tertiary-system-background' | zwpColorTheme" [style.marginTop]="'-8px'" [style.marginBottom]="'-8px'" zwpPadding="10px">
                    <zwp-md-button 
                        *ngIf="(rightPanelOpen$ | async) === false" 
                        (btnClick)="openRightPanel()" 
                        icon="border_right" 
                        label="Open Right Panel" 
                        [backgroundColor]="'clear' | zwpColorTheme" 
                        [labelColor]="'primary' | zwpColorTheme"
                    ></zwp-md-button>
                    <zwp-md-button 
                        *ngIf="(rightPanelOpen$ | async) === true" 
                        (btnClick)="closeRightPanel()" 
                        icon="border_right" 
                        label="Close Right Panel" 
                        [backgroundColor]="'clear' | zwpColorTheme" 
                        [labelColor]="'primary' | zwpColorTheme"
                    ></zwp-md-button>
                    <zwp-md-button 
                        *ngIf="(rightPanelOpen$ | async) === true && (rightPanelExpanded$ | async) === false" 
                        (btnClick)="expandRightPanel()" 
                        icon="open_in_full" 
                        label="Expand Right Panel" 
                        [backgroundColor]="'clear' | zwpColorTheme" 
                        [labelColor]="'primary' | zwpColorTheme"
                    ></zwp-md-button>
                    <zwp-md-button 
                        *ngIf="(rightPanelOpen$ | async) === true && (rightPanelExpanded$ | async) === true" 
                        (btnClick)="collapseRightPanel()" 
                        icon="close_fullscreen" 
                        label="Minimise Right Panel" 
                        [backgroundColor]="'clear' | zwpColorTheme" 
                        [labelColor]="'primary' | zwpColorTheme"
                    ></zwp-md-button>
                    <zwp-md-button 
                        *ngIf="(rightPanelDisplayMode$ | async) === inlineAndOver" 
                        (btnClick)="pinRightPanel()" 
                        icon="push_pin" 
                        label="Pin Right Panel" 
                        [backgroundColor]="'clear' | zwpColorTheme" 
                        [labelColor]="'primary' | zwpColorTheme"
                    ></zwp-md-button>
                    <zwp-md-button 
                        *ngIf="(rightPanelDisplayMode$ | async) === inline" 
                        (btnClick)="unpinRightPanel()" 
                        icon="push_pin" 
                        label="Unpin Right Panel" 
                        [backgroundColor]="'clear' | zwpColorTheme" 
                        [labelColor]="'primary' | zwpColorTheme"
                    ></zwp-md-button>
            </div>
        </mat-menu>
    `
})
export class PanelLayoutControlsComponent {
    @ViewChild('leftPanelControlsMenuTrigger') leftPanelControlsMenuTrigger: MatMenuTrigger | undefined
    @ViewChild('bottomPanelControlsMenuTrigger') bottomPanelControlsMenuTrigger: MatMenuTrigger | undefined
    @ViewChild('rightPanelControlsMenuTrigger') rightPanelControlsMenuTrigger: MatMenuTrigger | undefined

    @Input() buttonBackgroundColorTheme = "clear"
    @Input() buttonSelectedColorTheme = "primary"
    @Input() buttonUnselectedColorTheme = "tertiary-label"

    constructor(private panelLayoutFacade: ZWPPanelLayoutFacade) {}

    inline = PanelDisplayMode.inline
    inlineAndOver = PanelDisplayMode.inlineAndOver

    leftPanelOpen$ = this.panelLayoutFacade.leftPanelOpen$
    leftPanelExpanded$ = this.panelLayoutFacade.leftPanelExpanded$
    leftPanelCollapsedSize$ = this.panelLayoutFacade.leftPanelCollapsedSize$
    leftPanelExpandedSize$ = this.panelLayoutFacade.leftPanelExpandedSize$
    leftPanelDisplayMode$ = this.panelLayoutFacade.leftPanelDisplayMode$
    leftPanelSize$ = this.panelLayoutFacade.leftPanelSize$

    rightPanelOpen$ = this.panelLayoutFacade.rightPanelOpen$
    rightPanelExpanded$ = this.panelLayoutFacade.rightPanelExpanded$
    rightPanelCollapsedSize$ = this.panelLayoutFacade.rightPanelCollapsedSize$
    rightPanelExpandedSize$ = this.panelLayoutFacade.rightPanelExpandedSize$
    rightPanelDisplayMode$ = this.panelLayoutFacade.rightPanelDisplayMode$
    rightPanelSize$ = this.panelLayoutFacade.rightPanelSize$

    bottomPanelOpen$ = this.panelLayoutFacade.bottomPanelOpen$
    bottomPanelExpanded$ = this.panelLayoutFacade.bottomPanelExpanded$
    bottomPanelCollapsedSize$ = this.panelLayoutFacade.bottomPanelCollapsedSize$
    bottomPanelExpandedSize$ = this.panelLayoutFacade.bottomPanelExpandedSize$
    bottomPanelDisplayMode$ = this.panelLayoutFacade.bottomPanelDisplayMode$
    bottomPanelSize$ = this.panelLayoutFacade.bottomPanelSize$

    openLeftPanel() { this.panelLayoutFacade.openPanel(PanelPosition.left) }
    closeLeftPanel() { this.panelLayoutFacade.closePanel(PanelPosition.left) }
    expandLeftPanel() { this.panelLayoutFacade.expandPanel(PanelPosition.left) }
    collapseLeftPanel() { this.panelLayoutFacade.collapsePanel(PanelPosition.left) }
    toggleLeftPanelOpen() { this.panelLayoutFacade.togglePanelOpen(PanelPosition.left) }
    pinLeftPanel() { 
        this.panelLayoutFacade.setPanelDisplayMode(PanelPosition.left, PanelDisplayMode.inline) 
        this.expandLeftPanel()
    }
    unpinLeftPanel() { 
        this.panelLayoutFacade.setPanelDisplayMode(PanelPosition.left, PanelDisplayMode.inlineAndOver)
        this.collapseLeftPanel()
    }

    openRightPanel() { this.panelLayoutFacade.openPanel(PanelPosition.right) }
    closeRightPanel() { this.panelLayoutFacade.closePanel(PanelPosition.right) }
    expandRightPanel() { this.panelLayoutFacade.expandPanel(PanelPosition.right) }
    collapseRightPanel() { this.panelLayoutFacade.collapsePanel(PanelPosition.right) }
    toggleRightPanelOpen() { this.panelLayoutFacade.togglePanelOpen(PanelPosition.right) }
    pinRightPanel() { 
        this.panelLayoutFacade.setPanelDisplayMode(PanelPosition.right, PanelDisplayMode.inline) 
        this.expandRightPanel()
    }
    unpinRightPanel() { 
        this.panelLayoutFacade.setPanelDisplayMode(PanelPosition.right, PanelDisplayMode.inlineAndOver)
        this.collapseRightPanel()
    }

    openBottomPanel() { this.panelLayoutFacade.openPanel(PanelPosition.bottom) }
    closeBottomPanel() { this.panelLayoutFacade.closePanel(PanelPosition.bottom) }
    expandBottomPanel() { this.panelLayoutFacade.expandPanel(PanelPosition.bottom) }
    collapseBottomPanel() { this.panelLayoutFacade.collapsePanel(PanelPosition.bottom) }
    toggleBottomPanelOpen() { this.panelLayoutFacade.togglePanelOpen(PanelPosition.bottom) }
    pinBottomPanel() { 
        this.panelLayoutFacade.setPanelDisplayMode(PanelPosition.bottom, PanelDisplayMode.inline) 
        this.expandBottomPanel()
    }
    unpinBottomPanel() { 
        this.panelLayoutFacade.setPanelDisplayMode(PanelPosition.bottom, PanelDisplayMode.inlineAndOver)
        this.collapseLeftPanel()
    }

    longPressLeftControls(isPressed: boolean) {
        if (isPressed) {
            this.leftPanelControlsMenuTrigger?.openMenu()
        }
    }

    longPressBottomControls(isPressed: boolean) {
        if (isPressed) {
            this.bottomPanelControlsMenuTrigger?.openMenu()
        }
    }

    longPressRightControls(isPressed: boolean) {
        if (isPressed) {
            this.rightPanelControlsMenuTrigger?.openMenu()
        }
    }
}