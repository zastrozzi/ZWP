import { GeometryEdges, GeometryXAxis, GeometryYAxis } from "../geometry";
import { ZWPScrollAxisAlignment } from "./zwp.scroll-axis.alignment";

export type ZWPScrollOptions = GeometryXAxis & GeometryYAxis & ScrollOptions
export type ZWPScrollAxis = "horizontal" | "vertical"

export interface ZWPScrollToOptions {
    axis?: ZWPScrollAxis
    alignment?: ZWPScrollAxisAlignment
    behavior?: ScrollBehavior
    offset?: GeometryEdges
}