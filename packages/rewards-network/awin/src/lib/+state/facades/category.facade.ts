import { inject, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from "@zwp/platform.common";
import { CategoryLocalActions, CategoryRemoteActions } from '../actions';
import { Selectors } from '../selectors'
import { Model } from "../../model";

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'AWinCategoryFacade', options: { skipMethodDebugger: true } })
export class AWinCategoryFacade {
    private store = inject(Store)
    
    categoryFilters$ = this.store.pipe(select(Selectors.CategorySelectors.selectCategoryFilters))
    categoryRemotePagination$ = this.store.pipe(select(Selectors.CategorySelectors.selectCategoryRemotePagination))
    subcategoryRemotePagination$ = this.store.pipe(select(Selectors.CategorySelectors.selectSubcategoryRemotePagination))
    categoryRemoteState$ = this.store.pipe(select(Selectors.CategorySelectors.selectCategoryRemoteState))

    categories$ = this.store.pipe(select(Selectors.CategorySelectors.selectAllCategories))
    topLevelCategories$ = this.store.pipe(select(Selectors.CategorySelectors.selectTopLevelCategories))
    paginatedFilteredCategories$ = this.store.pipe(select(Selectors.CategorySelectors.selectPaginatedFilteredCategories))
    topLevelFilteredCategories$ = this.store.pipe(select(Selectors.CategorySelectors.selectTopLevelFilteredCategories))
    topLevelPaginatedFilteredCategories$ = this.store.pipe(select(Selectors.CategorySelectors.selectTopLevelPaginatedFilteredCategories))
    topLevelPaginatedFilteredCategoriesWithSubcategoriesNested$ = this.store.pipe(select(Selectors.CategorySelectors.selectTopLevelPaginatedFilteredCategoriesWithSubcategoriesNested))
    selectedCategory$ = this.store.pipe(select(Selectors.CategorySelectors.selectedCategory))
    selectedCategoryId$ = this.store.pipe(select(Selectors.CategorySelectors.selectSelectedCategoryId))

    categoryById$ = (id: string) => this.store.pipe(select(Selectors.CategorySelectors.selectCategoryById(id)))
    subcategoriesForCategory$ = (categoryId: string) => this.store.pipe(select(Selectors.CategorySelectors.selectSubcategoriesForCategory(categoryId)))
    subcategoriesForCategoryNested$ = (categoryId: string) => this.store.pipe(select(Selectors.CategorySelectors.selectSubcategoriesForCategoryNested(categoryId)))
    
    createCategory(parentId: Nullable<string>, request: Model.CreateCategoryRequest) {
        return this.store.dispatch(CategoryRemoteActions.create.request({ parentId, request }))
    }

    getCategory(categoryId: string) {
        return this.store.dispatch(CategoryRemoteActions.get.request({ categoryId }))
    }

    listCategories(
        parent: {
            categoryId: Nullable<string>,
            offerId: Nullable<string>,
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.CategoryResponse>>> = null
    ) {
        return this.store.dispatch(CategoryRemoteActions.list.request({ parent: parent, pagination: pagination }))
    }

    listSubcategories(
        categoryId: string,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.CategoryResponse>>> = null
    ) {
        return this.store.dispatch(CategoryRemoteActions.listSubcategories.request({ categoryId, pagination: pagination }))
    }

    selectCategory(categoryId: string) {
        return this.store.dispatch(CategoryLocalActions.selectCategory({ categoryId }))
    }

    deselectCategory() {
        return this.store.dispatch(CategoryLocalActions.deselectCategory())
    }

    updateCategory(categoryId: string, update: Model.UpdateCategoryRequest) {
        return this.store.dispatch(CategoryRemoteActions.update.request({ categoryId, update }))
    }

    deleteCategory(categoryId: string) {
        return this.store.dispatch(CategoryRemoteActions.delete.request({ categoryId }))
    }

    updateCategoryFilters(filters: Partial<Model.Filters.CategoryFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(CategoryLocalActions.updateCategoryFilters({ filters, triggerRemoteFetch }))
    }

    resetCategoryFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(CategoryLocalActions.resetCategoryFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(CategoryLocalActions.resetPagination())
    }
}