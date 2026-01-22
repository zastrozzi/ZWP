import { ComponentType } from "@angular/cdk/portal"

export interface RightPanelEntity {
    id: string
    label: string
    category: string
    icon: string
    color?: string
    themeColor?: string
    component?: ComponentType<any>
    componentName: string
    data: object
    dataId?: string
}