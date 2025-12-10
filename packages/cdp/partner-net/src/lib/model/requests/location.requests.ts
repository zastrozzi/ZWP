import { PostGIS } from '@zwp/platform.common'

export interface CreateLocationRequest {
    name: string
    geometry: PostGIS.Geometric.Point2D
}

export interface UpdateLocationRequest {
    name?: string
    geometry?: PostGIS.Geometric.Point2D
}
  