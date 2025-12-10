import { XOR } from "../types"

export type GeometryTop = { top?: number }
export type GeometryRight = { right?: number }
export type GeometryBottom = { bottom?: number }
export type GeometryLeft = { left?: number }
export type GeometryStart = { start?: number }
export type GeometryEnd = { end?: number }

export type GeometryXAxis = XOR<XOR<GeometryLeft, GeometryRight>, XOR<GeometryStart, GeometryEnd>>
export type GeometryYAxis = XOR<GeometryTop, GeometryBottom>