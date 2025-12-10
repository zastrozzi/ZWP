import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../model'
import { Observable } from 'rxjs'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'

@Injectable({ providedIn: 'root' })
export abstract class FlowContainerAPIService {
    abstract createContainer(request: Model.CreateFlowContainerRequest): Observable<Model.FlowContainerResponse>
    abstract getContainer(containerId: string): Observable<Model.FlowContainerResponse>
    abstract listContainers(pagination: Nullable<Partial<PaginatedQueryParams<Model.FlowContainerResponse>>>): Observable<PaginatedResponse<Model.FlowContainerResponse>>
    abstract updateContainer(containerId: string, request: Model.UpdateFlowContainerRequest): Observable<Model.FlowContainerResponse>
    abstract deleteContainer(containerId: string): Observable<void>
}

export const FLOW_CONTAINER_API_SERVICE = new InjectionToken<FlowContainerAPIService>('zwp.flows.flow-container-api-service')