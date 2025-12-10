import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { FilterGroupLocalActions, FilterGroupRemoteActions } from '../actions'
import { debounceTime, filter, map } from 'rxjs'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'FilterGroupEffects', options: { skipMethodDebugger: true } })
export class FilterGroupEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private filterGroupAPI = inject(Services.FILTER_GROUP_API_SERVICE)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...FilterGroupRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(FilterGroupRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...FilterGroupRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(FilterGroupRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...FilterGroupRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(FilterGroupRemoteActions.identifiers)({ error: action.error }))
    ))

    // Local Action Effects
    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            FilterGroupLocalActions.updateFilterGroupFilters,
            FilterGroupLocalActions.resetFilterGroupFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => FilterGroupRemoteActions.list.request({ pagination: null }))
    ))

    selectFilterGroup$ = createEffect(() => this.actions$.pipe(
        ofType(FilterGroupLocalActions.selectFilterGroup),
        map((action) => FilterGroupRemoteActions.get.request({ filterGroupId: action.filterGroupId }))
    ))

    // Remote Action CRUD Effects
    createFilterGroup$ = createRemoteEffect(
        this.actions$,
        FilterGroupRemoteActions.create,
        (action) => this.filterGroupAPI.createFilterGroup(action.parentId, action.parentType, action.request)
    )

    getFilterGroup$ = createRemoteEffect(
        this.actions$,
        FilterGroupRemoteActions.get,
        (action) => this.filterGroupAPI.getFilterGroup(action.filterGroupId)
    )

    listFilterGroups$ = createRemoteEffect(
        this.actions$,
        FilterGroupRemoteActions.list,
        (action) => this.filterGroupAPI.listFilterGroups(action.parentId, action.parentType, action.pagination)
    )

    updateFilterGroup$ = createRemoteEffect(
        this.actions$,
        FilterGroupRemoteActions.update,
        (action) => this.filterGroupAPI.updateFilterGroup(action.filterGroupId, action.update)
    )

    deleteFilterGroup$ = createRemoteEffect(
        this.actions$,
        FilterGroupRemoteActions.delete,
        (action) => this.filterGroupAPI.deleteFilterGroup(action.filterGroupId)
    )

    // Remote Action Routing Effects

    ngrxOnInitEffects() {
        return FilterGroupLocalActions.initialiseFilterGroupState()
    }
}