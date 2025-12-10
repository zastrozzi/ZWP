import { CreateLocationWindowComponent } from './create-location.window.component'
import { LocationDetailRouteComponent } from './location.detail-route.component'
import { LocationListComponent } from './location.list.component'

export * from './location.list.component'
export * from './create-location.window.component'
export * from './location.detail-route.component'

export const LOCATION_COMPONENTS = {
    LocationListComponent,
    LocationDetailRouteComponent,
    CreateLocationWindowComponent,
    
    ALL: [
        LocationListComponent,
        LocationDetailRouteComponent,
        CreateLocationWindowComponent
    ]
}