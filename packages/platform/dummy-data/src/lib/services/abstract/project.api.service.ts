import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class PlatformDummyDataProjectAPIService {
    abstract generateMockProjects(count: number): void
    abstract createProject(
        request: Model.CreateProjectRequest
    ): Observable<Model.ProjectResponse>

    abstract getProject(
        projectId: string
    ): Observable<Model.ProjectResponse>

    abstract listProjects(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ProjectResponse>>>,
        filters: Nullable<Partial<Model.ProjectFilters>>
    ): Observable<PaginatedResponse<Model.ProjectResponse>>

    abstract updateProject(
        projectId: string,
        request: Model.UpdateProjectRequest
    ): Observable<Model.ProjectResponse>

    abstract deleteProject(projectId: string): Observable<void>
}

export const PROJECT_API_SERVICE = new InjectionToken<PlatformDummyDataProjectAPIService>(
    'platform.dummy-data.project.api.service'
)