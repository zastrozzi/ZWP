import { Pipe, PipeTransform } from "@angular/core";
import { MatDrawerMode } from "@angular/material/sidenav";
import { PanelDisplayMode } from "../model";

@Pipe({
    name: 'materialPanelDisplayMode'
})
export class MaterialPanelDisplayModePipe implements PipeTransform {
    transform(value: PanelDisplayMode | null): MatDrawerMode {
        const panelDisplayModeKey = PanelDisplayMode[value as keyof typeof PanelDisplayMode]
        if (panelDisplayModeKey === null) { return 'side' }
        switch (panelDisplayModeKey) {
            case PanelDisplayMode.inline: return 'side'
            case PanelDisplayMode.over: return 'over'
            case PanelDisplayMode.inlineAndOver: return 'over'
            case PanelDisplayMode.none: return 'side'
            default: return 'side'
        }
    }
}