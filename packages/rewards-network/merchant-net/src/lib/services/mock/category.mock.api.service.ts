import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { CategoryAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'CategoryMockAPIService', options: { skipMethodDebugger: true } })
export class CategoryMockAPIService implements CategoryAPIService {
    createCategory(_categoryId: Nullable<string>, _request: Model.CreateCategoryRequest): Observable<Model.CategoryResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getCategory(_categoryId: string): Observable<Model.CategoryResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listCategories(
        _parent: {
            categoryId: Nullable<string>,
            offerId: Nullable<string>
        },
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.CategoryResponse>>>,
        _filters: Nullable<Partial<Model.Filters.CategoryFilters>>
    ): Observable<PaginatedResponse<Model.CategoryResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    listSubcategories(
        _categoryId: string,
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.CategoryResponse>>>,
        _filters: Nullable<Partial<Model.Filters.CategoryFilters>>
    ): Observable<PaginatedResponse<Model.CategoryResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    updateCategory(_categoryId: string, _request: Model.UpdateCategoryRequest): Observable<Model.CategoryResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteCategory(_categoryId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }
}