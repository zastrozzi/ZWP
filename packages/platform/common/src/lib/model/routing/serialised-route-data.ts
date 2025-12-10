export interface SerialisedRoute {
    params: Record<string, string>
    data: SerialisedRouteData
    firstChild?: SerialisedRoute
    children?: SerialisedRoute[]
    title?: string
}

export interface SerialisedRouteData {
    navTitle?: string
    navIcon?: string
    featureNavTitle?: string
    featureNavIcon?: string
}