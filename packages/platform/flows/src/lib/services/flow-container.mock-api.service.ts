import { Injectable } from '@angular/core'
import { Model } from '../model'
import { Observable, throwError } from 'rxjs'
import { FlowContainerAPIService } from './flow-container.api.service'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
export class FlowContainerMockAPIService implements FlowContainerAPIService {
    createContainer(request: Model.CreateFlowContainerRequest): Observable<Model.FlowContainerResponse> {
        return throwError(() => new Error(`Not implemented.`))
    }
    getContainer(containerId: string): Observable<Model.FlowContainerResponse> {
        return throwError(() => new Error(`Not implemented.`))
    }
    listContainers(pagination: Nullable<Partial<PaginatedQueryParams<Model.FlowContainerResponse>>>): Observable<PaginatedResponse<Model.FlowContainerResponse>> {
        return throwError(() => new Error(`Not implemented.`))
    }
    updateContainer(containerId: string, request: Model.UpdateFlowContainerRequest): Observable<Model.FlowContainerResponse> {
        return throwError(() => new Error(`Not implemented.`))
    }
    deleteContainer(containerId: string): Observable<void> {
        return throwError(() => new Error(`Not implemented.`))
    }
}