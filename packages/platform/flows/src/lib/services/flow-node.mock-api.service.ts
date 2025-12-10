// import { Injectable } from '@angular/core'
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
// import { Observable, of, throwError } from 'rxjs'
// import * as uuid from 'uuid'
// import { FlowNodeAPIService } from './flow-node.api.service'

// @Injectable({ providedIn: 'root' })
// export class FlowNodeMockAPIService implements FlowNodeAPIService {
//     addNode(request: AddFlowNodeRequest): Observable<AddFlowNodeResponse> {
//         return of<AddFlowNodeResponse>({id: uuid.v4(), flowContainerId: request.path.flowContainerId, currentCondition: null, ...request.body })
//     }

//     getNodeById(request: GetFlowNodeRequest): Observable<GetFlowNodeResponse> {
//         return of<GetFlowNodeResponse>({
//             id: request.path.flowNodeId, 
//             flowContainerId: request.path.flowContainerId, 
//             flowPromptId: null, 
//             currentCondition: null, 
//             continuations: [
//                 { condition: 'TRUE', flowNodeId: uuid.v4() },
//                 { condition: 'FALSE', flowNodeId: uuid.v4() }
//             ]
//         })
//     }

//     listNodes(request: ListFlowNodesRequest): Observable<ListFlowNodesResponse> {
//         return throwError(() => new Error(`Not implemented. REQUEST: ${request}`))
//     }

//     updateNode(request: UpdateFlowNodeRequest): Observable<UpdateFlowNodeResponse> {
//         return throwError(() => new Error(`Not implemented. REQUEST: ${request}`))
//     }

//     removeNode(request: RemoveFlowNodeRequest): Observable<RemoveFlowNodeResponse> {
//         return throwError(() => new Error(`Not implemented. REQUEST: ${request}`))
//     }

// }