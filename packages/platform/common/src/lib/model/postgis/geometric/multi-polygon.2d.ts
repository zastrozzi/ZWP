import { CoordinateSystem } from '../coordinate-system'
import { Polygon2D } from './polygon.2d'

export interface MultiPolygon2D {
    polygons: Polygon2D[]
    coordinateSystem: CoordinateSystem
}