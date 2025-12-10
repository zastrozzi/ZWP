import { Injectable, InjectionToken } from '@angular/core'
import { Observable } from 'rxjs'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Model } from '../../model'

@Injectable({ providedIn: 'root' })
export abstract class TinkUserAPIService {
    abstract createUser(
        enduserId: string,
        request: Model.ServerAPIModel.User.CreateTinkUserRequest
    ): Observable<Model.ServerAPIModel.User.TinkUserResponse>

    abstract getUser(tinkUserId: string): Observable<Model.ServerAPIModel.User.TinkUserResponse>

    abstract listUsers(
        enduserId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.User.TinkUserResponse>>>,
        filters: Nullable<Partial<Model.Filters.UserFilters>>
    ): Observable<PaginatedResponse<Model.ServerAPIModel.User.TinkUserResponse>>

    abstract deleteUser(tinkUserId: string): Observable<void>

    abstract refreshUser(tinkUserId: string): Observable<void>

    abstract relinkUser(enduserId: string): Observable<Model.ServerAPIModel.User.TinkUserResponse>
}

export const TINK_USER_API_SERVICE = new InjectionToken<TinkUserAPIService>('fsn.tink.user.api.service')
