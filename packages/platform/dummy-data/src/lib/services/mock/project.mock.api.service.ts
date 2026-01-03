import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ZWPDictionary,
    selectFilteredElements,
    isNull,
    initialRemotePaginationState,
    selectPaginatedElements,
} from '@zwp/platform.common'
import { Observable, of, throwError } from 'rxjs'
import { PlatformDummyDataProjectAPIService } from '../abstract'
import { Generators } from '../../generators'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'PlatformDummyDataProjectMockAPIService',
    options: { skipMethodDebugger: true },
})
export class PlatformDummyDataProjectMockAPIService implements PlatformDummyDataProjectAPIService {
    mockProjectStorage: ZWPDictionary<Model.ProjectResponse> = {}

    generateMockProjects(count: number) {
        for (let i = 0; i < count; i++) {
            const newProject = Generators.generateRandomProject()
            this.mockProjectStorage[newProject.id] = newProject
        }
    }

    clearMockProjects() {
        this.mockProjectStorage = {}
    }

    createProject(_request: Model.CreateProjectRequest): Observable<Model.ProjectResponse> {
        return throwError(() => new Error('Not implemented'))
    }

    getProject(_projectId: string): Observable<Model.ProjectResponse> {
        return throwError(() => new Error('Not implemented'))
    }

    listProjects(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ProjectResponse>>>,
        filters: Nullable<Partial<Model.ProjectFilters>>
    ): Observable<PaginatedResponse<Model.ProjectResponse>> {
        const filteredProjects = selectFilteredElements(
            Object.values(this.mockProjectStorage),
            { ...Model.initialProjectFilters, ...filters },
            Model.projectFilterEntityMap
        )
        const paginatedProjects = selectPaginatedElements(
            filteredProjects,
            { ...initialRemotePaginationState('name'), ...pagination }
        )
        return of(
            {
                total: filteredProjects.length,
                results: paginatedProjects
            }
        )
    }

    updateProject(_projectId: string, _request: Model.UpdateProjectRequest): Observable<Model.ProjectResponse> {
        return throwError(() => new Error('Not implemented'))
    }

    deleteProject(projectId: string): Observable<void> {
        delete this.mockProjectStorage[projectId]
        return throwError(() => new Error('Not implemented'))
    }
}
