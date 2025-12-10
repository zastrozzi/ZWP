import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { Model } from '../../model'

const selectCategoryState = createFeatureSelector<Reducers.CategoryFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
        Identifiers.CATEGORY_STATE_FEATURE_KEY
    )
)

const selectCategoryFilters = createSelector(selectCategoryState, (state) => state.filters)
const selectCategoryRemotePagination = createSelector(selectCategoryState, (state) => state.categoriesRemotePagination)
const selectSubcategoryRemotePagination = createSelector(selectCategoryState, (state) => state.subcategoriesRemotePagination)
const selectCategoryRemoteState = createSelector(selectCategoryState, selectRemoteState)

const selectSelectedCategoryId = createSelector(selectCategoryState, (state) => state.selectedCategoryId)

const categoryEntitySelectors = Reducers.categoryEntityAdapter.getSelectors()
const selectCategoryEntityState = createSelector(selectCategoryState, (state) => state.categories)
const selectCategoryIds = createSelector(selectCategoryEntityState, categoryEntitySelectors.selectIds)
const selectCategoryEntities = createSelector(selectCategoryEntityState, categoryEntitySelectors.selectEntities)
const selectAllCategories = createSelector(selectCategoryEntityState, categoryEntitySelectors.selectAll)
const selectCategoryTotal = createSelector(selectCategoryEntityState, categoryEntitySelectors.selectTotal)
const selectCategoryById = (id: string) => createSelector(selectCategoryEntities, (entities) => entities[id])

const selectedCategory = createSelector(
    selectCategoryEntities,
    selectSelectedCategoryId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectFilteredCategories = createSelector(
    selectAllCategories,
    selectCategoryFilters,
    (categories, filters) => selectFilteredElements(categories, filters, Model.Filters.categoryFilterEntityMap)
)

const selectPaginatedCategories = createSelector(
    selectAllCategories,
    selectCategoryRemotePagination,
    (categories, pagination) => selectPaginatedElements(categories, pagination)
)

const selectPaginatedFilteredCategories = createSelector(
    selectFilteredCategories,
    selectCategoryRemotePagination,
    (categories, pagination) => selectPaginatedElements(categories, pagination)
)

const selectTopLevelCategories = createSelector(
    selectAllCategories,
    (categories) => categories.filter(category => !category.parentId)
)

const selectTopLevelFilteredCategories = createSelector(
    selectTopLevelCategories,
    selectCategoryFilters,
    (categories, filters) => selectFilteredElements(categories, filters, Model.Filters.categoryFilterEntityMap)
)

const selectTopLevelPaginatedCategories = createSelector(
    selectTopLevelCategories,
    selectCategoryRemotePagination,
    (categories, pagination) => selectPaginatedElements(categories, pagination)
)

const selectTopLevelPaginatedFilteredCategories = createSelector(
    selectTopLevelFilteredCategories,
    selectCategoryRemotePagination,
    (categories, pagination) => selectPaginatedElements(categories, pagination)
)

const findSubcategories = (categories: Model.CategoryResponse[], id: string): Model.NestedCategoryResponse[] => {
    const subcategories = categories.filter(category => category.parentId === id)
    return subcategories.map(subcategory => ({
        ...subcategory,
        children: findSubcategories(categories, subcategory.id)
    }))
}

const selectSubcategoriesForCategory = (categoryId: string) =>
    createSelector(
        selectFilteredCategories,
        (categories => categories.filter(category => category.parentId === categoryId))
    )

const selectSubcategoriesForCategoryNested = (categoryId: string) =>
        createSelector(
            selectFilteredCategories,
            (categories => findSubcategories(categories, categoryId))
        )

const selectTopLevelPaginatedFilteredCategoriesWithSubcategoriesNested = createSelector(
    selectTopLevelPaginatedFilteredCategories,
    selectFilteredCategories,
    (topLevelCategories, filteredCategories) => {
        return topLevelCategories.map(category => ({
            ...category,
            children: findSubcategories(filteredCategories, category.id)
        }))
    }
)

export const CategorySelectors = {
    selectCategoryState,
    selectCategoryFilters,
    selectCategoryRemotePagination,
    selectSubcategoryRemotePagination,
    selectCategoryRemoteState,
    selectSelectedCategoryId,
    categoryEntitySelectors,
    selectCategoryEntityState,
    selectCategoryIds,
    selectCategoryEntities,
    selectAllCategories,
    selectCategoryTotal,
    selectCategoryById,
    selectedCategory,
    selectFilteredCategories,
    selectPaginatedCategories,
    selectPaginatedFilteredCategories,
    selectTopLevelCategories,
    selectTopLevelFilteredCategories,
    selectTopLevelPaginatedCategories,
    selectTopLevelPaginatedFilteredCategories,
    selectSubcategoriesForCategory,
    selectSubcategoriesForCategoryNested,
    selectTopLevelPaginatedFilteredCategoriesWithSubcategoriesNested
}