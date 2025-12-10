import { GeometryBoundingRectangle } from "../geometry";

export interface SelectionContainerHost extends HTMLElement {
    boundingClientRect: GeometryBoundingRectangle
}