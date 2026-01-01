import { RootComponent } from './root.component'
import { RoutingContainerComponent } from './routing-container.component'
import { HomePageComponent } from './home.page.component'
import { FileBrowserPageComponent } from './file-browser.page.component'
import { KEYBOARD_COMPONENTS } from './keyboard'
import { HomePageTileComponent } from './home-page.tile.component'
import { TABLES_COMPONENTS } from './tables'

export * from './root.component'
export * from './routing-container.component'
export * from './home.page.component'
export * from './home-page.tile.component'
export * from './file-browser.page.component'
export * from './keyboard'
export * from './tables'

export const COMPONENTS = {
    RootComponent: RootComponent,
    RoutingContainerComponent,
    HomePageComponent,
    HomePageTileComponent,
    FileBrowserPageComponent,
    
    KEYBOARD_COMPONENTS,
    TABLES_COMPONENTS,

    ALL: [
        RootComponent,
        RoutingContainerComponent,
        HomePageComponent,
        HomePageTileComponent,
        FileBrowserPageComponent,
        ...KEYBOARD_COMPONENTS.ALL,
        ...TABLES_COMPONENTS.ALL
    ]
}