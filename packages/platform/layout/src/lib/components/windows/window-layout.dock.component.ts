import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ZWPThemingFacade } from "@zwp/platform.common";
import { ZWPWindowLayoutFacade } from "../../+state/facades";
import { WindowEntity } from "../../model";

@Component({
    selector: 'zwp-window-layout-dock',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="row" fxFlexFill fxLayoutAlign="start center" zwpPadding="5px" fxLayoutGap="5px" [style.backgroundColor]="'system-background' | zwpColorTheme">
            <zwp-window-dock-button 
                *ngFor="let windowEntity of allWindows$ | async" 
                [label]="windowEntity.label" 
                [icon]="windowEntity.icon" 
                [labelColor]="windowEntity.themeColor !== undefined ? (windowEntity.themeColor | zwpColorTheme) : windowEntity.color ?? ('primary' | zwpColorTheme)" 
                [backgroundColor]="'system-background' | zwpColorTheme"
                [isExpanded]="windowEntity.isExpanded" 
                [darkMode]="darkMode$ | async"
                (btnMainClick)="focusWindow(windowEntity)"
                (btnExpandClick)="toggleWindowVisibility(windowEntity)" 
                (btnRemoveClick)="removeWindow(windowEntity)" 
            ></zwp-window-dock-button>
        </div>
    `
})
export class WindowLayoutDockComponent {
    constructor(private windowLayoutFacade: ZWPWindowLayoutFacade, private themingFacade: ZWPThemingFacade) {}

    allWindows$ = this.windowLayoutFacade.allWindows$
    darkMode$ = this.themingFacade.darkMode$

    toggleWindowVisibility(windowEntity: WindowEntity) {
        windowEntity.isExpanded ? this.windowLayoutFacade.minimiseWindow(windowEntity.id) : this.windowLayoutFacade.expandWindow(windowEntity.id)
    }

    removeWindow(windowEntity: WindowEntity) {
        this.windowLayoutFacade.removeWindow(windowEntity.id)
    }

    focusWindow(windowEntity: WindowEntity) {
        this.windowLayoutFacade.focusWindow(windowEntity.id)
    }
}