import { inject, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, RemotePaginationState } from "@zwp/platform.common";
import { Model } from "../../model";
import { Observable, of } from 'rxjs'
import { Services } from '../../services'

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'DummyDataFacade', options: { skipMethodDebugger: true } })
export class DummyDataFacade {
    private store = inject(Store)
    private dummyDataService = inject(Services.PlatformDummyDataService)
    private projectService = inject(Services.PROJECT_API_SERVICE)

    projects$: Observable<Model.ProjectResponse[]> = of([])
    projectRemotePagination$: Observable<RemotePaginationState<Model.ProjectResponse>> = of({
        limit: 0,
        offset: 0,
        order: 'asc',
        orderBy: 'name',
        total: 0
    })

    listProjects(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ProjectResponse>>> = null
    ) {
        return
    }

    getProject(projectId: string) {
        return
    }

    deleteProject(projectId: string) {
        return
    }

    randomName(options?: { sex?: 'male' | 'female' | 'any', givenName?: boolean, familyName?: boolean}): string {
        return this.dummyDataService.randomName(options)
    }

    generateProjects(count: number = 500) {
        this.projectService.generateMockProjects(count)
    }
}
