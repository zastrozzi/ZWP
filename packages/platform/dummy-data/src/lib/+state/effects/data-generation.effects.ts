import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects'
import { createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess, ZWPDebuggableInjectable } from '@zwp/platform.common'
import { Services } from '../../services'
import { Facades } from '../facades'
import { DataGenerationActions, ProjectLocalActions, ProjectRemoteActions } from '../actions'
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Action } from '@ngrx/store'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'PlatformDummyDataDataGenerationEffects', options: { skipMethodDebugger: true }})
export class PlatformDummyDataDataGenerationEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private projectAPI = inject(Services.PROJECT_API_SERVICE)

    // Local Action Effects
    generateProjects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DataGenerationActions.generateProjects),
            map((action) => this.projectAPI.generateMockProjects(action.count))
        )
    , { dispatch: false })

    clearProjects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DataGenerationActions.clearProjects),
            map(() => this.projectAPI.clearMockProjects())
        )
    , { dispatch: false })

    cleanStateOnProjects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DataGenerationActions.clearProjects),
            map(() => ProjectLocalActions.initialiseProjectState())
        )
    )

    // OnInitEffects
    ngrxOnInitEffects(): Action {
        return DataGenerationActions.generateProjects({ count: 100 })
    }
}