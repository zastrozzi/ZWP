import { inject, Injectable } from "@angular/core"
import { select, Store } from "@ngrx/store"
import { ZWPDebuggableInjectable } from '../../decorators/zwp.debuggable.decorator'
import { KeyboardSelectors } from "../selectors"
import { KeyboardActions } from '../actions'

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'ZWPKeyboardFacade', options: { skipMethodDebugger: true }})
export class ZWPKeyboardFacade {
    private store = inject(Store)

    activeKeyCodes$ = this.store.pipe(select(KeyboardSelectors.activeKeyCodes))
    trackingActive$ = this.store.pipe(select(KeyboardSelectors.trackingActive))
    altKeyActive$ = this.store.pipe(select(KeyboardSelectors.altKeyActive))
    ctrlKeyActive$ = this.store.pipe(select(KeyboardSelectors.ctrlKeyActive))
    metaKeyActive$ = this.store.pipe(select(KeyboardSelectors.metaKeyActive))
    shiftKeyActive$ = this.store.pipe(select(KeyboardSelectors.shiftKeyActive))

    keyCodeIsActive$ = (keyCode: number) => this.store.pipe(select(KeyboardSelectors.keyCodeIsActive(keyCode)))

    toggleTrackingActive() {
        this.store.dispatch(KeyboardActions.toggleTrackingActive())
    }
}