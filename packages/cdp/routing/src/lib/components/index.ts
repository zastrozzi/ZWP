import { AuthedContainerComponent } from './authed.container.component'
import { ClipboardUtilityPanelComponent } from './clipboard.utility-panel.component'
import { CDPRoutingHomeComponent } from './home.component'
import { NotificationsUtilityPanelComponent } from './notifications.utility-panel.component'
import { UtilityDockComponent } from './utility-dock.component'

export const INTERNAL_COMPONENTS = {
    AuthedContainerComponent,
    CDPRoutingHomeComponent,
    UtilityDockComponent,
    NotificationsUtilityPanelComponent,
    ClipboardUtilityPanelComponent,
    ALL: [
        AuthedContainerComponent,
        CDPRoutingHomeComponent,
        UtilityDockComponent,
        NotificationsUtilityPanelComponent,
        ClipboardUtilityPanelComponent
    ]
}

export const EXPORTABLE_COMPONENTS = {
    
}