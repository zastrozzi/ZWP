import { map } from "rxjs";
import { isUndefined } from "../utils";

export function scaleValue(measurement: number) {
    return map((scaleFactor: number) => measurement * scaleFactor)
}

export function scaleValueToPx(measurement: number, precision?: number) {
    return map((scaleFactor: number) => (isUndefined(precision) ? (measurement * scaleFactor) : (measurement * scaleFactor).toFixed(precision)) + 'px')
}