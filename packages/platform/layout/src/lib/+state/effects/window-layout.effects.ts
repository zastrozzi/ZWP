import { Injectable } from "@angular/core";
import { createNamespacedFeatureKey, ZWPDebuggableInjectable, ZWPPersistenceProfileFacade, PersistenceActions, PersistenceProfileActions } from "@zwp/platform.common";
import { Actions, concatLatestFrom, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { distinctUntilChanged, filter, map, tap } from "rxjs";
import { ExampleMenuComponent, ExampleWindowComponent } from "../../components";
import { ZWPWindowOverlayService } from "../../services";
import { WindowLayoutActions } from "../actions";
import { ZWPMenuLayoutFacade, ZWPWindowLayoutFacade } from "../facades";
import { Identifiers } from "../identifiers";

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPWindowLayoutEffects', options: { skipMethodDebugger: true } })
export class ZWPWindowLayoutEffects implements OnInitEffects {
    constructor(
        private actions$: Actions, 
        private store: Store, 
        private persistenceProfileFacade: ZWPPersistenceProfileFacade, 
        private windowOverlayService: ZWPWindowOverlayService, 
        private windowLayoutFacade: ZWPWindowLayoutFacade,
        private menuLayoutFacade: ZWPMenuLayoutFacade
    ) {
        // super('WindowLayoutEffects', { skipMethodDebugger: true })
        this.windowLayoutFacade.registerWindowTypes([ExampleWindowComponent])
        this.menuLayoutFacade.registerMenuComponentType(ExampleMenuComponent)
    }

    createWindow$ = createEffect(() => this.actions$.pipe(
        ofType(WindowLayoutActions.createRequest),
        map((action) => {
            const added = this.windowOverlayService.addWindowOverlay(action.windowEntity)
            if (added === true) {
                return WindowLayoutActions.createSuccess({windowEntity: action.windowEntity})
            } else {
                return WindowLayoutActions.createFailure({windowEntity: action.windowEntity})
            }
        })
    ))

    updatePosition$ = createEffect(() => this.actions$.pipe(
        ofType(WindowLayoutActions.updatePositionRequest),
        map((action) => {
            const updated = this.windowOverlayService.updateWindowOverlayPosition(action.windowId, action.position)
            // const updatedData = this.windowOverlayService.updateComponentData({...action.windowEntity, position: action.position})
            if (updated === true) {
                return WindowLayoutActions.updatePositionSuccess({windowId: action.windowId, position: action.position})
            } else {
                return WindowLayoutActions.updatePositionFailure({windowId: action.windowId, position: action.position})
            }
        })
    ))

    removeWindows$ = createEffect(() => this.persistenceProfileFacade.selectedPersistenceProfileId$.pipe(
        distinctUntilChanged(),
        tap(() => {
            this.windowOverlayService.removeAllWindowOverlays()
        })
    ), { dispatch: false })

    rehydrateState$ = createEffect(() => this.actions$.pipe(
        ofType(PersistenceProfileActions.setSelected),
        map((action) => action.id),
        distinctUntilChanged(),
        map((id) => PersistenceActions.rehydrateStateRequest({ featureKey: createNamespacedFeatureKey(
                        Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
                        Identifiers.WINDOW_LAYOUT_STATE_FEATURE_KEY
                    ), persistenceProfileId: id }))
    ))

    rehydrateStateSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(PersistenceActions.rehydrateStateSuccess),
        filter((action) => action.featureKey === createNamespacedFeatureKey(
            Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
            Identifiers.WINDOW_LAYOUT_STATE_FEATURE_KEY
        )),
        concatLatestFrom(() => this.windowLayoutFacade.allWindows$),
        tap((windowEntities) => {
            // let resolvedWindowEntities = windowEntities.map((entity) => ({...entity, component: ExampleWindowComponent}))
            this.windowOverlayService.restoreWindowOverlays(windowEntities[1])
        })
    ), { dispatch: false })

    ngrxOnInitEffects(): Action {
        return PersistenceActions.rehydrateStateRequest({ featureKey: createNamespacedFeatureKey(
            Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
            Identifiers.WINDOW_LAYOUT_STATE_FEATURE_KEY
        ), persistenceProfileId: null })
    }
}