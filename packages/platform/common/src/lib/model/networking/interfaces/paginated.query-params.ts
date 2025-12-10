import { HttpParams } from "@angular/common/http"
import { RemotePaginationState, createHTTPParams } from "../../../utils"
import { FlexibleKeyOf, Nullable } from "../../types"
import { Observable } from "rxjs"

export interface PaginatedQueryParams<T extends object> {
    limit: number
    offset: number
    order: 'asc' | 'desc'
    orderBy?: FlexibleKeyOf<T>
    includeDeleted?: boolean
}

export const serialisePaginatedQueryParams = <T extends object>(params: Nullable<Partial<PaginatedQueryParams<T>>>, state?: Observable<Nullable<RemotePaginationState<T>>>): HttpParams => {
    let newParams = createHTTPParams()
    if (state) {
        state.subscribe(remoteState => {
            if (remoteState) {
                if (remoteState.limit) { newParams = newParams.append('limit', remoteState.limit) }
                if (remoteState.offset) { newParams = newParams.append('offset', remoteState.offset) }
                if (remoteState.order) { newParams = newParams.append('order', remoteState.order) }
                if (remoteState.orderBy) { newParams = newParams.append('order_by', remoteState.orderBy as string | number | boolean) }
            }
        }).unsubscribe()
    }
    if (params) {
        if (params.limit) { newParams = newParams.set('limit', params.limit) }
        if (params.offset) { newParams = newParams.set('offset', params.offset) }
        if (params.order) { newParams = newParams.set('order', params.order) }
        if (params.orderBy) { newParams = newParams.set('order_by', params.orderBy as string | number | boolean) }
        if (params.includeDeleted) { newParams = newParams.set('include_deleted', params.includeDeleted) }
    }
    
    return newParams
}