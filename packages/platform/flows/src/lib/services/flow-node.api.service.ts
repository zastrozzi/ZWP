// import { Injectable, InjectionToken } from '@angular/core'
// import { 
//     AddFlowNodeRequest, 
//     AddFlowNodeResponse, 
//     GetFlowNodeRequest, 
//     GetFlowNodeResponse, 
//     ListFlowNodesRequest, 
//     ListFlowNodesResponse, 
//     UpdateFlowNodeRequest, 
//     UpdateFlowNodeResponse,
//     RemoveFlowNodeRequest, 
//     RemoveFlowNodeResponse
// } from '../model'
// import { Observable } from 'rxjs'

// @Injectable({ providedIn: 'root' })
// export abstract class FlowNodeAPIService {
//     abstract addNode(request: AddFlowNodeRequest): Observable<AddFlowNodeResponse>
//     abstract getNodeById(request: GetFlowNodeRequest): Observable<GetFlowNodeResponse>
//     abstract listNodes(request: ListFlowNodesRequest): Observable<ListFlowNodesResponse>
//     abstract updateNode(request: UpdateFlowNodeRequest): Observable<UpdateFlowNodeResponse>
//     abstract removeNode(request: RemoveFlowNodeRequest): Observable<RemoveFlowNodeResponse>
// }

// export const FLOW_NODE_API_SERVICE = new InjectionToken<FlowNodeAPIService>('zwp.flows.flow-node-api-service')