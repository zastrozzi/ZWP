import { ProjectPaginatedListComponent } from './project.paginated-list.component'
import { PlatformDummyDataCreateProjectWindowComponent } from './create-project.window.component'
export * from './project.paginated-list.component'

export const PROJECT_COMPONENTS = {
    ProjectPaginatedListComponent,
    PlatformDummyDataCreateProjectWindowComponent,
    ALL: [
        ProjectPaginatedListComponent,
        PlatformDummyDataCreateProjectWindowComponent
    ]
}