import { ProjectTeam } from './project-team'

export interface ObjectAccessControls {
    kind?: string
    id?: string
    selfLink?: string
    bucket?: string
    object?: string
    generation?: string
    entity?: string
    role?: string
    email?: string
    entityId?: string
    domain?: string
    projectTeam?: ProjectTeam
    etag?: string
}