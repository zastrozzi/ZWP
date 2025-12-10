import { CoordinateSystem } from '../coordinate-system'
import { LineString2D } from './line-string.2d'

export interface Polygon2D {
    exteriorRing: LineString2D
    interiorRings: LineString2D[]
    coordinateSystem: CoordinateSystem
}