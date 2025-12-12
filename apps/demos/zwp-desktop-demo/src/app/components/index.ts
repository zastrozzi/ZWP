import { RootComponent } from './root.component'
import { RoutingContainerComponent } from './routing-container.component'
import { HomePageComponent } from './home.page.component'

export * from './root.component'
export * from './routing-container.component'
export * from './home.page.component'

export const COMPONENTS = {
    RootComponent: RootComponent,
    RoutingContainerComponent,
    HomePageComponent,

    ALL: [
        RootComponent,
        RoutingContainerComponent,
        HomePageComponent
    ]
}