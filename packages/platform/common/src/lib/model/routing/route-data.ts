export interface RouteData {
    path: string
    navTitle: string
    navIcon: string
    tabbedDropdown?: boolean
    children?: RouteData[]
}