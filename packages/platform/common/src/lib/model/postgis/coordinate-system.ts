export type CoordinateSystem = KnownCoordinateSystem | number

export enum KnownCoordinateSystem {
    wgs84 = 4326,
    wgs84PseudoMercator = 3857,
    osgb36BritishNationalGrid = 27700
}