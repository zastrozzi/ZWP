import { GeometryPoint } from "../geometry";
import { PointerEventButtonType } from "./pointer-event.button-type";
import { PointerEventInputType } from "./pointer-event.input-type";

export interface PointerEventCoordinate {
    location: GeometryPoint
    event: MouseEvent | TouchEvent
    inputType: PointerEventInputType
    buttonType?: PointerEventButtonType
}