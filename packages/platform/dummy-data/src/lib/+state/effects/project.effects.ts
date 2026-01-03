import { inject, Injectable } from '@angular/core'
import { Actions, OnInitEffects } from '@ngrx/effects'
import { ZWPDebuggableInjectable } from '@zwp/platform.common'

// @Injectable()
// @ZWPDebuggableInjectable({ serviceName: 'PlatformDummyDataProjectEffects', options: { skipMethodDebugger: true }})
// export class PlatformDummyDataProjectEffects implements OnInitEffects {
//     private actions$ = inject(Actions)
//     private projectAPI = inject(Services.)
// }