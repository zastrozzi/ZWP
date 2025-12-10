// import { Injectable, inject } from '@angular/core'
// import { Actions } from '@ngrx/effects'
// import { Store } from '@ngrx/store'
// import { ZWPDebuggableInjectable, createRemoteEffect } from '@zwp/platform.common'
// import { FlowContainerRemoteActions } from '../actions'
// import { FLOW_CONTAINER_API_SERVICE } from '../../services'

// @Injectable({ providedIn: 'root' })
// @ZWPDebuggableInjectable({ serviceName: 'FlowContainerEffects', options: { skipMethodDebugger: true } })
// export class FlowContainerEffects {
//     private readonly flowContainerAPI = inject(FLOW_CONTAINER_API_SERVICE)

//     constructor(private actions$: Actions, private store: Store) {}

//     addRemote$ = createRemoteEffect(this.actions$, FlowContainerRemoteActions.addRemote, (req) => this.flowContainerAPI.addContainer(req))
//     getRemote$ = createRemoteEffect(this.actions$, FlowContainerRemoteActions.getRemote, (req) => this.flowContainerAPI.getContainerById(req))
//     listRemote$ = createRemoteEffect(this.actions$, FlowContainerRemoteActions.listRemote, (req) => this.flowContainerAPI.listContainers(req))
//     updateRemote$ = createRemoteEffect(this.actions$, FlowContainerRemoteActions.updateRemote, (req) => this.flowContainerAPI.updateContainer(req))
//     removeRemote$ = createRemoteEffect(this.actions$, FlowContainerRemoteActions.removeRemote, (req) => this.flowContainerAPI.removeContainer(req))
// }