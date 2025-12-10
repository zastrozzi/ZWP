import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    ResetRemoteFilters,
    UpdateRemoteFilters,
    createActionType,
    createRemoteActionCRUDMap,
    createRemoteActionGroup
} from '@zwp/platform.common'
import { Identifiers } from '../identifiers'
import { createAction, props } from '@ngrx/store'

const CATEGORY_ACTION_IDENTIFIERS = [
    Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
    Identifiers.CATEGORY_STATE_FEATURE_KEY
]

const updateCategoryFilters = createAction(
    createActionType(CATEGORY_ACTION_IDENTIFIERS, 'Update Filters'),
    props<UpdateRemoteFilters<Model.Filters.CategoryFilters>>()
)

const resetCategoryFilters = createAction(
    createActionType(CATEGORY_ACTION_IDENTIFIERS, 'Reset Filters'),
    props<ResetRemoteFilters>()
)

const resetCategoryState = createAction(
    createActionType(CATEGORY_ACTION_IDENTIFIERS, 'Reset State')
)

const initialiseCategoryState = createAction(
    createActionType(CATEGORY_ACTION_IDENTIFIERS, 'Initialise State')
)

const selectCategory = createAction(
    createActionType(CATEGORY_ACTION_IDENTIFIERS, 'Select Category'),
    props<{ categoryId: string }>()
)

const deselectCategory = createAction(
    createActionType(CATEGORY_ACTION_IDENTIFIERS, 'Deselect Category')
)

const resetPagination = createAction(
    createActionType(CATEGORY_ACTION_IDENTIFIERS, 'Reset Pagination')
)

const createCategory = createRemoteActionGroup<
    { parentId: Nullable<string>; request: Model.CreateCategoryRequest },
    Model.CategoryResponse
>('Create Category', ...CATEGORY_ACTION_IDENTIFIERS)

const getCategory = createRemoteActionGroup<
    { categoryId: string },
    Model.CategoryResponse
>('Get Category', ...CATEGORY_ACTION_IDENTIFIERS)

const listCategories = createRemoteActionGroup<
    { parent: {
        categoryId: Nullable<string>,
        offerId: Nullable<string>,
    }, pagination: Nullable<Partial<PaginatedQueryParams<Model.CategoryResponse>>> },
    PaginatedResponse<Model.CategoryResponse>
>('List Categories', ...CATEGORY_ACTION_IDENTIFIERS)

const listSubcategories = createRemoteActionGroup<
    { categoryId: string, pagination: Nullable<Partial<PaginatedQueryParams<Model.CategoryResponse>>> },
    PaginatedResponse<Model.CategoryResponse>
>('List Subcategories', ...CATEGORY_ACTION_IDENTIFIERS)

const updateCategory = createRemoteActionGroup<
    { categoryId: string; update: Model.UpdateCategoryRequest },
    Model.CategoryResponse
>('Update Category', ...CATEGORY_ACTION_IDENTIFIERS)

const deleteCategory = createRemoteActionGroup<
    { categoryId: string },
    { categoryId: string }
>('Delete Category', ...CATEGORY_ACTION_IDENTIFIERS)

export const CategoryLocalActions = {
    updateCategoryFilters,
    resetCategoryFilters,
    resetCategoryState,
    initialiseCategoryState,
    selectCategory,
    deselectCategory,
    resetPagination
}

export const CategoryRemoteActions = createRemoteActionCRUDMap(
    CATEGORY_ACTION_IDENTIFIERS,
    {
        create: createCategory,
        get: getCategory,
        list: listCategories,
        update: updateCategory,
        delete: deleteCategory,
        listSubcategories: listSubcategories
    }
)