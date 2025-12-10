import { ComponentType } from "@angular/cdk/portal"

export interface UtilityPanelEntity {
    id: string
    label: string
    category: string
    icon: string
    color?: string
    themeColor?: string
    component?: ComponentType<any>
    componentName: string
    data: object
    isExpanded: boolean
}