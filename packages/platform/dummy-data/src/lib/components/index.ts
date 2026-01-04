import { PROJECT_COMPONENTS } from './projects'
import { ConfigPageComponent } from './config.page.component'

export const INTERNAL_COMPONENTS = {
    PROJECT_COMPONENTS,
    ConfigPageComponent,
    ALL: [
        ...PROJECT_COMPONENTS.ALL,
        ConfigPageComponent
    ]
}