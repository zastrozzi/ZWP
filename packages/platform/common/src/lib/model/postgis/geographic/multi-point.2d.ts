import { CoordinateSystem } from '../coordinate-system'
import { Point2D } from './point.2d'

export interface MultiPoint2D {
    points: Point2D[]
    coordinateSystem: CoordinateSystem
}