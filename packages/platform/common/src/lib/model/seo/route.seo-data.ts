import { RouteOpenGraphData } from "./route.open-graph.data"

export interface RouteSEOData {
    title?: string
    description?: string
    keywords?: string
    robots?: string
    canonical?: string
    openGraph?: RouteOpenGraphData
}