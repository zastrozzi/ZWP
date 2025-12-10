import { CoordinateSystem } from '../coordinate-system'
import { LineString2D } from './line-string.2d'

export interface MultiLineString2D {
    lineStrings: LineString2D[]
    coordinateSystem: CoordinateSystem
}