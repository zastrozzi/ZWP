import { ProjectTeam } from './project-team'

export interface BucketAccessControls {
    kind?: string
    id?: string
    selfLink?: string
    bucket?: string
    entity?: string
    role?: string
    email?: string
    entityId?: string
    domain?: string
    projectTeam?: ProjectTeam
    etag?: string
}