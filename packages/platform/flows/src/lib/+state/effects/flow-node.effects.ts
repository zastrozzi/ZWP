// import { Injectable, inject } from '@angular/core'
// import { Actions } from '@ngrx/effects'
// import { Store } from '@ngrx/store'
// import { ZWPDebuggableInjectable, createRemoteEffect } from '@zwp/platform.common'
// import { FlowNodeRemoteActions } from '../actions'
// import { FLOW_NODE_API_SERVICE } from '../../services'

// @Injectable({ providedIn: 'root' })
// @ZWPDebuggableInjectable({ serviceName: 'FlowNodeEffects', options: { skipMethodDebugger: true } })
// export class FlowNodeEffects {
//     private readonly flowNodeAPI = inject(FLOW_NODE_API_SERVICE)

//     constructor(private actions$: Actions, private store: Store) {}

//     addRemote$ = createRemoteEffect(this.actions$, FlowNodeRemoteActions.addRemote, (req) => this.flowNodeAPI.addNode(req))
//     getRemote$ = createRemoteEffect(this.actions$, FlowNodeRemoteActions.getRemote, (req) => this.flowNodeAPI.getNodeById(req))
//     listRemote$ = createRemoteEffect(this.actions$, FlowNodeRemoteActions.listRemote, (req) => this.flowNodeAPI.listNodes(req))
//     updateRemote$ = createRemoteEffect(this.actions$, FlowNodeRemoteActions.updateRemote, (req) => this.flowNodeAPI.updateNode(req))
//     removeRemote$ = createRemoteEffect(this.actions$, FlowNodeRemoteActions.removeRemote, (req) => this.flowNodeAPI.removeNode(req))
// }