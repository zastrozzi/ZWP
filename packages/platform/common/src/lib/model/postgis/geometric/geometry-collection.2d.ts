import { CoordinateSystem } from '../coordinate-system'
import { LineString2D } from './line-string.2d'
import { MultiLineString2D } from './multi-line-string.2d'
import { MultiPoint2D } from './multi-point.2d'
import { MultiPolygon2D } from './multi-polygon.2d'
import { Point2D } from './point.2d'
import { Polygon2D } from './polygon.2d'

export interface GeometryCollection2D {
    geometries: {
        points?: Point2D[]
        lineStrings?: LineString2D[]
        polygons?: Polygon2D[]
        multiPoints?: MultiPoint2D[]
        multiLineStrings?: MultiLineString2D[]
        multiPolygons?: MultiPolygon2D[]
        geometryCollections?: GeometryCollection2D[]
    }
    coordinateSystem: CoordinateSystem
}