import { GeometryPoint, GeometryEdges } from "../geometry"

export interface MouseUpData {
    location: GeometryPoint
    edges?: GeometryEdges
    event: MouseEvent | TouchEvent
}