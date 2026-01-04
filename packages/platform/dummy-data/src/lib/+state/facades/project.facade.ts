import { inject, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, RemotePaginationState } from "@zwp/platform.common";
import { Model } from "../../model";
import { Observable, of } from 'rxjs'
import { Services } from '../../services'
import { Selectors } from '../selectors';
import { ProjectLocalActions, ProjectRemoteActions } from '../actions'

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'PlatformDummyDataProjectFacade', options: { skipMethodDebugger: true } })
export class PlatformDummyDataProjectFacade {
    private store = inject(Store)
    private projectService = inject(Services.PROJECT_API_SERVICE)

    projectFilters$ = this.store.pipe(select(Selectors.ProjectSelectors.selectProjectFilters))
    projectRemotePagination$ = this.store.pipe(select(Selectors.ProjectSelectors.selectProjectRemotePagination))
    projectRemoteState$ = this.store.pipe(select(Selectors.ProjectSelectors.selectProjectRemoteState))

    projects$ = this.store.pipe(select(Selectors.ProjectSelectors.selectAllProjects))
    paginatedFilteredProjects$ = this.store.pipe(select(Selectors.ProjectSelectors.selectPaginatedFilteredProjects))
    
    selectedProject$ = this.store.pipe(select(Selectors.ProjectSelectors.selectedProject))
    selectedProjectId$ = this.store.pipe(select(Selectors.ProjectSelectors.selectSelectedProjectId))

    projectById$ = (id: string) => this.store.pipe(select(Selectors.ProjectSelectors.selectProjectById(id)))

    generateProjects(count: number = 500) {
        this.projectService.generateMockProjects(count)
    }

    createProject(request: Model.CreateProjectRequest) {
        return this.store.dispatch(ProjectRemoteActions.createProject.request({ request }))
    }

    getProject(projectId: string) {
        return this.store.dispatch(ProjectRemoteActions.getProject.request({ projectId }))
    }

    listProjects(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ProjectResponse>>> = null
    ) {
        return this.store.dispatch(ProjectRemoteActions.listProjects.request({ pagination }))
    }

    updateProject(
        projectId: string,
        update: Model.UpdateProjectRequest
    ) {
        return this.store.dispatch(ProjectRemoteActions.updateProject.request({ projectId, update }))
    }

    deleteProject(projectId: string) {
        return this.store.dispatch(ProjectRemoteActions.deleteProject.request({ projectId }))
    }

    selectProject(projectId: string) {
        return this.store.dispatch(ProjectLocalActions.selectProject({ projectId }))
    }

    deselectProject() {
        return this.store.dispatch(ProjectLocalActions.deselectProject())
    }

    updateProjectFilters(filters: Partial<Model.ProjectFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(ProjectLocalActions.updateProjectFilters({ filters, triggerRemoteFetch }))
    }

    resetProjectFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(ProjectLocalActions.resetProjectFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(ProjectLocalActions.resetPagination())
    }
}
