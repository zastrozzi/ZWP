import { RootComponent } from './root.component'
import { RoutingContainerComponent } from './routing-container.component'
import { HomePageComponent } from './home.page.component'
import { KEYBOARD_COMPONENTS } from './keyboard'

export * from './root.component'
export * from './routing-container.component'
export * from './home.page.component'
export * from './keyboard'

export const COMPONENTS = {
    RootComponent: RootComponent,
    RoutingContainerComponent,
    HomePageComponent,
    
    KEYBOARD_COMPONENTS,

    ALL: [
        RootComponent,
        RoutingContainerComponent,
        HomePageComponent,
        ...KEYBOARD_COMPONENTS.ALL
    ]
}