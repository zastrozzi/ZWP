import { Injectable, inject } from '@angular/core'
import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects'
import { ZWPDebuggableInjectable, ZWPRouterFacade, createRemoteEffect, remoteStateUpdateFailure, remoteStateUpdateRequest, remoteStateUpdateSuccess } from '@zwp/platform.common'
import { Services } from '../../services'
import { CategoryLocalActions, CategoryRemoteActions } from '../actions'
import { debounceTime, filter, map, mergeMap, of, withLatestFrom } from 'rxjs'
import { Facades } from '../facades'


@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'CategoryEffects', options: { skipMethodDebugger: true } })
export class CategoryEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private categoryAPI = inject(Services.CATEGORY_API_SERVICE)
    private categoryFacade = inject(Facades.CategoryFacade)
    private routerFacade = inject(ZWPRouterFacade)

    // Remote State Updates
    updateRemoteStateRequest$ = createEffect(() => this.actions$.pipe(
        ofType(...CategoryRemoteActions.requestActions),
        map(() => remoteStateUpdateRequest(CategoryRemoteActions.identifiers)())
    ))

    updateRemoteStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(...CategoryRemoteActions.successActions),
        map(() => remoteStateUpdateSuccess(CategoryRemoteActions.identifiers)())
    ))

    updateRemoteStateFailure$ = createEffect(() => this.actions$.pipe(
        ofType(...CategoryRemoteActions.failureActions),
        map((action) => remoteStateUpdateFailure(CategoryRemoteActions.identifiers)({ error: action.error }))
    ))


    // Local Action Effects
    updateOrResetFilters$ = createEffect(() => this.actions$.pipe(
        ofType(
            CategoryLocalActions.updateCategoryFilters, 
            CategoryLocalActions.resetCategoryFilters
        ),
        filter((action) => action.triggerRemoteFetch),
        debounceTime(200),
        map(() => CategoryRemoteActions.list.request({ pagination: null }))
    ))

    selectCategory$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryLocalActions.selectCategory),
        map((action) => CategoryRemoteActions.get.request({ categoryId: action.categoryId }))
    ))

    // Remote Action CRUD Effects
    createCategory$ = createRemoteEffect(
        this.actions$,
        CategoryRemoteActions.create,
        (action) => this.categoryAPI.createCategory(action.parentId, action.request)
    )

    getCategory$ = createRemoteEffect(
        this.actions$,
        CategoryRemoteActions.get,
        (action) => this.categoryAPI.getCategory(action.categoryId)
    )

    listCategories$ = createRemoteEffect(
        this.actions$,
        CategoryRemoteActions.list,
        (action) => of(action).pipe(
            withLatestFrom(this.categoryFacade.categoryFilters$),
            mergeMap(([requestAction, categoryFilters]) => this.categoryAPI.listCategories(
                requestAction.parent,
                requestAction.pagination,
                categoryFilters
            ))
        )
    )

    listSubcategories$ = createRemoteEffect(
        this.actions$,
        CategoryRemoteActions.listSubcategories,
        (action) => of(action).pipe(
            withLatestFrom(this.categoryFacade.categoryFilters$),
            mergeMap(([requestAction, categoryFilters]) => this.categoryAPI.listSubcategories(
                requestAction.categoryId,
                requestAction.pagination,
                categoryFilters
            ))
        )
    )

    updateCategory$ = createRemoteEffect(
        this.actions$,
        CategoryRemoteActions.update,
        (action) => this.categoryAPI.updateCategory(action.categoryId, action.update)
    )

    deleteCategory$ = createRemoteEffect(
        this.actions$,
        CategoryRemoteActions.delete,
        (action) => this.categoryAPI.deleteCategory(action.categoryId),
        (action) => ({ categoryId: action.categoryId })
    )

    ngrxOnInitEffects() {
        return CategoryLocalActions.initialiseCategoryState()
    }
}