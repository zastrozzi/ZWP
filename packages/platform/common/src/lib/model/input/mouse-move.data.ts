import { GeometryEdges, GeometryPoint } from "../geometry"

export interface MouseMoveData {
    location: GeometryPoint
    edges?: GeometryEdges
    event: MouseEvent | TouchEvent
}