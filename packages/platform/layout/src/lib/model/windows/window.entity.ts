import { ComponentType } from "@angular/cdk/portal"
import { WindowPosition } from "./window.position"

export interface WindowEntity {
    id: string
    label: string
    icon: string
    color?: string
    themeColor?: string
    isExpanded: boolean
    component?: ComponentType<any>
    componentName: string
    position: WindowPosition
    data: object
}