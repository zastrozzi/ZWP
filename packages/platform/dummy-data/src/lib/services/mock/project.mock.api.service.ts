import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ZWPDictionary,
    selectFilteredElements,
    initialRemotePaginationState,
    selectPaginatedElements,
} from '@zwp/platform.common'
import { Observable, of, throwError } from 'rxjs'
import { PlatformDummyDataProjectAPIService } from '../abstract'
import { Generators } from '../../generators'
import { v4 } from 'uuid'

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

    createProject(
        request: Model.CreateProjectRequest
    ): Observable<Model.ProjectResponse> {
        const newProjectTimestamp = new Date()
        const newProjectId = v4()
        const newProject: Model.ProjectResponse = {
            id: newProjectId,
            dbCreatedAt: newProjectTimestamp,
            dbUpdatedAt: newProjectTimestamp,
            ...request
        }
        this.mockProjectStorage[newProjectId] = newProject
        return of(newProject)
    }

    getProject(projectId: string): Observable<Model.ProjectResponse> {
        if (Object.keys(this.mockProjectStorage).includes(projectId)) {
            return of(this.mockProjectStorage[projectId])
        } else {
            return throwError(() => new Error('Project not found'))
        }
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

    updateProject(
        projectId: string, 
        request: Model.UpdateProjectRequest
    ): Observable<Model.ProjectResponse> {
        if (Object.keys(this.mockProjectStorage).includes(projectId)) {
            let projectToUpdate = this.mockProjectStorage[projectId]
            projectToUpdate = { ...projectToUpdate, ...request }
            projectToUpdate.dbUpdatedAt = new Date()
            this.mockProjectStorage[projectId] = projectToUpdate
            return of(projectToUpdate)
        } else {
            return throwError(() => new Error('Project not found'))
        }
    }

    deleteProject(projectId: string): Observable<void> {
        if (Object.keys(this.mockProjectStorage).includes(projectId)) {
            delete this.mockProjectStorage[projectId]
            return of()
        } else {
            return throwError(() => new Error('Project not found'))
        }
        
    }
}
