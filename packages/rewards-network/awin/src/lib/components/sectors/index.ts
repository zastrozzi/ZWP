import { SectorDetailRouteComponent } from './sector.detail-route.component'
import { SectorDetailRightPanelComponent } from './sector.detail.right-panel.component'
// import { SectorPaginatedListComponent } from './sector.paginated-list.component'
import { SectorPaginatedTreeComponent } from './sector.paginated-tree.component'
import { CreateSectorWindowComponent } from './create-sector.window.component'

export * from './sector.detail-route.component'
export * from './sector.detail.right-panel.component'
// export * from './sector.paginated-list.component'
export * from './sector.paginated-tree.component'
export * from './create-sector.window.component'

export const SECTOR_COMPONENTS = {
    SectorDetailRouteComponent,
    SectorDetailRightPanelComponent,
    // SectorPaginatedListComponent,
    SectorPaginatedTreeComponent,
    CreateSectorWindowComponent,

    ALL: [
        SectorDetailRouteComponent,
        SectorDetailRightPanelComponent,
        // SectorPaginatedListComponent,
        SectorPaginatedTreeComponent,
        CreateSectorWindowComponent
    ]
}