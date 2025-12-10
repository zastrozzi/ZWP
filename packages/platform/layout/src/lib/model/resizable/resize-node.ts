import { GeometryEdges, GeometryRect } from "@zwp/platform.common";

export interface ResizeNode {
    edges: GeometryEdges
    initialRect: GeometryRect
    currentRect: GeometryRect
    clonedNode?: HTMLElement
}