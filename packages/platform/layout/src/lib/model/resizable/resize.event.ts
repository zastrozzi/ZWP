import { GeometryEdges, GeometryRect } from "@zwp/platform.common";

export interface ResizeEvent {
    boundingRectangle: GeometryRect
    edges: GeometryEdges
}