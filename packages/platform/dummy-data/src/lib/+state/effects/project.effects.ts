import { inject, Injectable } from '@angular/core'
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects'
import { createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess, ZWPDebuggableInjectable } from '@zwp/platform.common'
import { Services } from '../../services'
import { Facades } from '../facades'
import { ProjectLocalActions, ProjectRemoteActions } from '../actions'
import { debounceTime, filter, map, of, switchMap, withLatestFrom } from 'rxjs'
import { Action } from '@ngrx/store'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'PlatformDummyDataProjectEffects', options: { skipMethodDebugger: true }})
export class PlatformDummyDataProjectEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private projectAPI = inject(Services.PROJECT_API_SERVICE)
    private projectFacade = inject(Facades.PlatformDummyDataProjectFacade)


    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...ProjectRemoteActions.requestActions),
            map(() => remoteStateUpdateRequest(ProjectRemoteActions.identifiers)())
        )
    )

    updateRemoteStateSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...ProjectRemoteActions.successActions),
            map(() => remoteStateUpdateSuccess(ProjectRemoteActions.identifiers)())
        )
    )

    updateRemoteStateFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(...ProjectRemoteActions.failureActions),
            map((action) => remoteStateUpdateFailure(ProjectRemoteActions.identifiers)({ error: action.error }))
        )
    )

    // Local Action Effects
    updateOrResetFilters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectLocalActions.updateProjectFilters, ProjectLocalActions.resetProjectFilters),
            filter((action) => action.triggerRemoteFetch),
            debounceTime(200),
            map(() => ProjectRemoteActions.listProjects.request({ pagination: null }))
        )
    )

    selectProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProjectLocalActions.selectProject),
            map((action) => ProjectRemoteActions.getProject.request({ projectId: action.projectId }))
        )
    )

    // Remote Action CRUD Effects
    createProject$ = createRemoteEffect(this.actions$, ProjectRemoteActions.createProject, (action) =>
        this.projectAPI.createProject(action.request)
    )

    getProject$ = createRemoteEffect(this.actions$, ProjectRemoteActions.getProject, (action) =>
        this.projectAPI.getProject(action.projectId)
    )

    listProjects$ = createRemoteEffect(this.actions$, ProjectRemoteActions.listProjects, (action) =>
        of(action).pipe(
            withLatestFrom(this.projectFacade.projectFilters$),
            switchMap(([requestAction, projectFilters]) =>
                this.projectAPI.listProjects(
                    requestAction.pagination,
                    projectFilters
                )
            )
        )
    )

    updateProject$ = createRemoteEffect(this.actions$, ProjectRemoteActions.updateProject, (action) =>
        this.projectAPI.updateProject(action.projectId, action.update)
    )

    deleteProject$ = createRemoteEffect(this.actions$, ProjectRemoteActions.deleteProject, (action) =>
        this.projectAPI.deleteProject(action.projectId),
        (action) => ({ projectId: action.projectId })
    )

    deleteProjects$ = createRemoteEffect(this.actions$, ProjectRemoteActions.deleteProjects, (action) =>
        this.projectAPI.deleteProjects(action.projectIds),
        (action) => ({ projectIds: action.projectIds })
    )

    // OnInitEffects
    ngrxOnInitEffects(): Action {
        return ProjectLocalActions.initialiseProjectState()
    }
}