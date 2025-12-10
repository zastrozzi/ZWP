export interface MainPanelTabEntity {
    id: string
    routePath: string
    routeLabel: string
}

export interface MainPanelTabEntityWithState extends MainPanelTabEntity {
    isActive: boolean
}