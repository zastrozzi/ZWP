import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class CategoryAPIService {
    abstract createCategory(
        categoryId: Nullable<string>,
        request: Model.CreateCategoryRequest
    ): Observable<Model.CategoryResponse>

    abstract getCategory(categoryId: string): Observable<Model.CategoryResponse>

    abstract listCategories(
        parent: {
            categoryId: Nullable<string>,
            offerId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.CategoryResponse>>>,
        filters: Nullable<Partial<Model.Filters.CategoryFilters>>
    ): Observable<PaginatedResponse<Model.CategoryResponse>>

    abstract listSubcategories(
        categoryId: string,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.CategoryResponse>>>,
        filters: Nullable<Partial<Model.Filters.CategoryFilters>>
    ): Observable<PaginatedResponse<Model.CategoryResponse>>

    abstract updateCategory(
        categoryId: string,
        request: Model.UpdateCategoryRequest
    ): Observable<Model.CategoryResponse>

    abstract deleteCategory(categoryId: string): Observable<void>
}

export const CATEGORY_API_SERVICE = new InjectionToken<CategoryAPIService>(
    'rewards-network.merchant-net.category.api.service'
)
