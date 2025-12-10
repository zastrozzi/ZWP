import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { TinkUserAPIService } from '../abstract/user.api.service'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { ZWPDebuggableInjectable } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TinkUserMockAPIService', options: { skipMethodDebugger: true } })
export class TinkUserMockAPIService implements TinkUserAPIService {
    createUser(
        _enduserId: string,
        _request: Model.ServerAPIModel.User.CreateTinkUserRequest
    ): Observable<Model.ServerAPIModel.User.TinkUserResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    getUser(_tinkUserId: string): Observable<Model.ServerAPIModel.User.TinkUserResponse> {
        return throwError(() => new Error('Method not implemented'))
    }

    listUsers(
        _enduserId: Nullable<string>,
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.User.TinkUserResponse>>>,
        _filters: Nullable<Partial<Model.Filters.UserFilters>>
    ): Observable<PaginatedResponse<Model.ServerAPIModel.User.TinkUserResponse>> {
        return throwError(() => new Error('Method not implemented'))
    }

    deleteUser(_tinkUserId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    refreshUser(_tinkUserId: string): Observable<void> {
        return throwError(() => new Error('Method not implemented'))
    }

    relinkUser(_enduserId: string): Observable<Model.ServerAPIModel.User.TinkUserResponse> {
        return throwError(() => new Error('Method not implemented'))
    }
}
