import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity'
import { createReducer, on } from '@ngrx/store'
import { Model } from '../../model'
import { CategoryLocalActions, CategoryRemoteActions } from '../actions'
import {
  BaseRemoteFeatureState,
  Nullable,
  RemotePaginationState,
  initialBaseRemoteFeatureState,
  remoteFailureState,
  remoteRequestState,
  remoteStateUpdateFailure,
  remoteStateUpdateRequest,
  remoteStateUpdateSuccess,
  remoteSuccessState,
} from '@zwp/platform.common'

export interface CategoryFeatureState extends BaseRemoteFeatureState {
    categories: EntityState<Model.CategoryResponse>
    selectedCategoryId: Nullable<string>
    categoriesRemotePagination: RemotePaginationState<Model.CategoryResponse>
    subcategoriesRemotePagination: RemotePaginationState<Model.CategoryResponse>
    filters: Model.Filters.CategoryFilters
}

export const categoryEntityAdapter: EntityAdapter<Model.CategoryResponse> =
    createEntityAdapter<Model.CategoryResponse>()

export const initialCategoryFeatureState: CategoryFeatureState = {
    ...initialBaseRemoteFeatureState,
    categories: categoryEntityAdapter.getInitialState(),
    selectedCategoryId: null,
    categoriesRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'name',
        total: 0,
    },
    subcategoriesRemotePagination: {
        limit: 30,
        offset: 0,
        order: 'asc',
        orderBy: 'name',
        total: 0,
    },
    filters: Model.Filters.initialCategoryFilters
}

export const categoryReducer = createReducer(
    initialCategoryFeatureState,
    on(CategoryLocalActions.resetCategoryState, () => initialCategoryFeatureState),
    on(CategoryLocalActions.initialiseCategoryState, () => initialCategoryFeatureState),
    on(CategoryLocalActions.updateCategoryFilters, (state, { filters }) => ({
        ...state,
        filters: { ...state.filters, ...filters },
    })),
    on(CategoryLocalActions.resetCategoryFilters, (state) => ({ ...state, filters: Model.Filters.initialCategoryFilters })),
    on(CategoryLocalActions.selectCategory, (state, { categoryId }) => ({ ...state, selectedCategoryId: categoryId })),
    on(CategoryLocalActions.deselectCategory, (state) => ({ ...state, selectedCategoryId: null })),
    on(CategoryLocalActions.resetPagination, (state) => ({
        ...state,
        categoriesRemotePagination: { ...state.categoriesRemotePagination, offset: 0 },
        subcategoriesRemotePagination: { ...state.subcategoriesRemotePagination, offset: 0 }
    })),
    on(remoteStateUpdateRequest(CategoryRemoteActions.identifiers), (state) => remoteRequestState(state)),
    on(remoteStateUpdateSuccess(CategoryRemoteActions.identifiers), (state) => remoteSuccessState(state)),
    on(remoteStateUpdateFailure(CategoryRemoteActions.identifiers), (state, { error }) =>
        remoteFailureState(state, error)
    ),
    on(CategoryRemoteActions.create.success, (state, { response }) => ({
        ...state,
        categories: categoryEntityAdapter.setOne(response, state.categories)
    })),
    on(CategoryRemoteActions.get.success, (state, { response }) => ({
        ...state,
        categories: categoryEntityAdapter.setOne(response, state.categories),
        selectedCategoryId: response.id
    })),
    on(CategoryRemoteActions.list.request, (state, { pagination }) => ({
        ...state,
        categoriesRemotePagination: {
            ...state.categoriesRemotePagination,
            ...pagination
        }
    })),
    on(CategoryRemoteActions.list.success, (state, { response }) => ({
        ...state,
        categories: categoryEntityAdapter.setMany(response.results, state.categories),
        categoriesRemotePagination: {
            ...state.categoriesRemotePagination,
            total: response.total,
        },
    })),
    on(CategoryRemoteActions.listSubcategories.request, (state, { pagination }) => ({
        ...state,
        subcategoriesRemotePagination: {
            ...state.subcategoriesRemotePagination,
            ...pagination
        }
    })),
    on(CategoryRemoteActions.listSubcategories.success, (state, { response }) => ({
        ...state,
        categories: categoryEntityAdapter.setMany(response.results, state.categories),
        subcategoriesRemotePagination: {
            ...state.subcategoriesRemotePagination,
            total: response.total,
        },
    })),
    on(CategoryRemoteActions.update.success, (state, { response }) => ({
        ...state,
        categories: categoryEntityAdapter.updateOne({ id: response.id, changes: response }, state.categories)
    })),
    on(CategoryRemoteActions.delete.success, (state, { categoryId }) => ({
        ...state,
        categories: categoryEntityAdapter.removeOne(categoryId, state.categories),
        selectedCategoryId: state.selectedCategoryId === categoryId ? null : state.selectedCategoryId,
    }))
)