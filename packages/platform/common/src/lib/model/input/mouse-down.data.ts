import { GeometryPoint, GeometryEdges } from "../geometry"

export interface MouseDownData {
    location: GeometryPoint
    edges?: GeometryEdges
}