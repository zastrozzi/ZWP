import { inject, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, RemotePaginationState } from "@zwp/platform.common";
import { Model } from "../../model";
import { Observable, of } from 'rxjs'

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'DummyDataFacade', options: { skipMethodDebugger: true } })
export class DummyDataFacade {
    private store = inject(Store)

    projects$: Observable<Model.Project[]> = of([])
    projectRemotePagination$: Observable<RemotePaginationState<Model.Project>> = of({
        limit: 0,
        offset: 0,
        order: 'asc',
        orderBy: 'name',
        total: 0
    })

    listProjects(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.Project>>> = null
    ) {
        return
    }

    getProject(projectId: string) {
        return
    }

    deleteProject(projectId: string) {
        return
    }

    //refreshAccounts
}
