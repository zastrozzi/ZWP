import { CoordinateSystem } from '../coordinate-system'

export interface Point2D {
    longitude: number
    latitude: number
    coordinateSystem: CoordinateSystem
}