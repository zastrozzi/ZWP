import { PostGIS } from '@zwp/platform.common'

export interface LocationResponse {
    id: string
    dbCreatedAt: Date
    dbUpdatedAt: Date
    dbDeletedAt?: Date
    name: string
    geometry: PostGIS.Geometric.Point2D
    partnerId: string
    subgroupId?: string
}
