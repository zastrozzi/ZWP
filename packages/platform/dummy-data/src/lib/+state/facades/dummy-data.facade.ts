import { inject, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, RemotePaginationState } from "@zwp/platform.common";
import { Model } from "../../model";
import { Observable, of } from 'rxjs'
import { Services } from '../../services'
import { DataGenerationActions } from '../actions'

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'DummyDataFacade', options: { skipMethodDebugger: true } })
export class DummyDataFacade {
    private store = inject(Store)
    private dummyDataService = inject(Services.PlatformDummyDataService)
    private projectService = inject(Services.PROJECT_API_SERVICE)

    randomName(options?: { sex?: 'male' | 'female' | 'any', givenName?: boolean, familyName?: boolean}): string {
        return this.dummyDataService.randomName(options)
    }

    generateProjects(count: number) {
        this.store.dispatch(DataGenerationActions.generateProjects({ count }))
    }

    clearProjects() {
        this.store.dispatch(DataGenerationActions.clearProjects())
    }
}
