import { Injectable, inject } from '@angular/core'
import { Model } from '../../model'
import {
    HTTPMethod,
    isNull,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    serialiseDateQueryFilter,
    serialiseEnumQueryFilter,
    serialisePaginatedQueryParams,
    serialiseStringQueryFilter,
    upsertHTTPParam,
    upsertHTTPParams,
} from '@zwp/platform.common'
import { Observable, map, take } from 'rxjs'
import { CategoryAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { MERCHANT_NET_API_BASE_URL, MERCHANT_NET_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'CategoryLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class CategoryLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements CategoryAPIService
{
    private config = inject(MERCHANT_NET_API_CONFIG)
    private baseUrl = inject(MERCHANT_NET_API_BASE_URL)
    private categoryFacade = inject(Facades.CategoryFacade)

    createCategory(
        categoryId: Nullable<string>,
        request: Model.CreateCategoryRequest
    ): Observable<Model.CategoryResponse> {
        let path: string
        if (!isNull(categoryId)) {
            path = APIRoutes.categoryRoutes(this.baseUrl)
                .subcategoryRoutesForCategory(categoryId)
                .createSubcategory()
        }
        else {
            path = APIRoutes.categoryRoutes(this.baseUrl)
                .createCategory()
        }
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.POST,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    getCategory(categoryId: string): Observable<Model.CategoryResponse> {
        const path = APIRoutes.categoryRoutes(this.baseUrl)
            .getCategory(categoryId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    listCategories(
        parent: {
            categoryId: Nullable<string>
            offerId: Nullable<string>
        },
        pagination: Nullable<Partial<PaginatedQueryParams<Model.CategoryResponse>>>,
        filters: Nullable<Partial<Model.Filters.CategoryFilters>>
    ): Observable<PaginatedResponse<Model.CategoryResponse>> {
        let path: string
        if (!isNull(parent.categoryId)) {
            path = APIRoutes.categoryRoutes(this.baseUrl)
                .subcategoryRoutesForCategory(parent.categoryId)
                .listSubcategories()
        }

        else if (!isNull(parent.offerId)) {
            path = APIRoutes.offerRoutes(this.baseUrl)
                .categoryRoutesForOffer(parent.offerId)
                .listCategories()
        }

        else {
            path = APIRoutes.categoryRoutes(this.baseUrl)
                .listCategories()
        }

        let params = serialisePaginatedQueryParams(
            pagination,
            this.categoryFacade.categoryRemotePagination$
        )

        if (filters) {
            if (filters.dbCreatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt))
            }
            if (filters.dbUpdatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt))
            }
            if (filters.dbDeletedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt))
            }
            if (filters.name) {
                params = upsertHTTPParams(params, serialiseStringQueryFilter('name', filters.name))
            }
        }

        if (isNull(parent.categoryId) && isNull(parent.offerId)) {
            params = upsertHTTPParam(params, 'top_level_only', true)
        }
        
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params,
        })
    }

    listSubcategories(
        categoryId: string,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.CategoryResponse>>>,
        filters: Nullable<Partial<Model.Filters.CategoryFilters>>
    ): Observable<PaginatedResponse<Model.CategoryResponse>> {
        const path = APIRoutes.categoryRoutes(this.baseUrl)
                .subcategoryRoutesForCategory(categoryId)
                .listSubcategories()

        let params = serialisePaginatedQueryParams(
            pagination,
            this.categoryFacade.subcategoryRemotePagination$
        )

        if (filters) {
            if (filters.dbCreatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_created_at', filters.dbCreatedAt))
            }
            if (filters.dbUpdatedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_updated_at', filters.dbUpdatedAt))
            }
            if (filters.dbDeletedAt) {
                params = upsertHTTPParams(params, serialiseDateQueryFilter('db_deleted_at', filters.dbDeletedAt))
            }
            if (filters.name) {
                params = upsertHTTPParams(params, serialiseStringQueryFilter('name', filters.name))
            }
        }
        
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.GET,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
            params: params,
        })
    }

    updateCategory(
        categoryId: string,
        request: Model.UpdateCategoryRequest
    ): Observable<Model.CategoryResponse> {
        const path = APIRoutes.categoryRoutes(this.baseUrl)
            .updateCategory(categoryId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.PUT,
            url: path,
            body: request,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }

    deleteCategory(categoryId: string): Observable<void> {
        const path = APIRoutes.categoryRoutes(this.baseUrl)
            .deleteCategory(categoryId)
        return this.http.authedRequestWithOptions({
            accessToken: this.getAccessToken(),
            makeAuthHeader: this.auth.authHeader,
            method: HTTPMethod.DELETE,
            url: path,
            body: null,
            additionalHeaders: this.auth.addDeviceIdHeader(),
        })
    }
}