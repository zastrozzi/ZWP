import { Injectable } from "@angular/core";
import { createNamespacedFeatureKey, ZWPDebuggableInjectable, PersistenceActions, PersistenceProfileActions } from "@zwp/platform.common";
import { Actions, createEffect, ofType, OnInitEffects } from "@ngrx/effects";
import { select, Store, Action } from "@ngrx/store";
import { map, withLatestFrom } from "rxjs";
import { PanelLayoutActions } from "../actions";
import { Identifiers } from "../identifiers";
import { PanelLayoutSelectors } from "../selectors";
import { getZWPRightPanelComponent } from '../../decorators'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPPanelLayoutEffects', options: { skipMethodDebugger: true } })
export class ZWPPanelLayoutEffects implements OnInitEffects {
    constructor(private actions$: Actions, private store: Store) {
        // super('PanelLayoutEffects', { skipMethodDebugger: true })
    }

    toggleLeftPanelOpen$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PanelLayoutActions.toggleLeftPanelOpen),
            withLatestFrom(this.store.pipe(select(PanelLayoutSelectors.LeftPanelSelectors.selectLeftPanelOpen))),
            map(pair => pair[1]),
            map(isOpen => isOpen ? PanelLayoutActions.closeLeftPanel() : PanelLayoutActions.openLeftPanel())
        )
    )
    
    toggleRightPanelOpen$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PanelLayoutActions.toggleRightPanelOpen),
            withLatestFrom(this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectRightPanelOpen))),
            map(pair => pair[1]),
            map(isOpen => isOpen ? PanelLayoutActions.closeRightPanel() : PanelLayoutActions.openRightPanel())
        )
    )

    toggleBottomPanelOpen$ = createEffect(() => 
        this.actions$.pipe(
            ofType(PanelLayoutActions.toggleBottomPanelOpen),
            withLatestFrom(this.store.pipe(select(PanelLayoutSelectors.BottomPanelSelectors.selectBottomPanelOpen))),
            map(pair => pair[1]),
            map(isOpen => isOpen ? PanelLayoutActions.closeBottomPanel() : PanelLayoutActions.openBottomPanel())
        )
    )

    rehydrateState$ = createEffect(() => this.actions$.pipe(
        ofType(PersistenceProfileActions.setSelected),
        map((action) => PersistenceActions.rehydrateStateRequest({ featureKey: createNamespacedFeatureKey(
                        Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
                        Identifiers.PANEL_LAYOUT_STATE_FEATURE_KEY
                    ), persistenceProfileId: action.id }))
    ))

    generateRightPanelComponent$ = createEffect(() => this.actions$.pipe(
        ofType(PanelLayoutActions.createRightPanelRequest),
        withLatestFrom(
            this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.rightPanelIds)),
            this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectRightPanelOpen)),
            this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectRightPanelExpanded)),
        ),
        map(([action, rightPanelIds, panelOpen, panelExpanded]) => {
            if (rightPanelIds.includes(action.rightPanelEntity.id)) {
                this.store.dispatch(PanelLayoutActions.createRightPanelFailure({ rightPanelEntity: action.rightPanelEntity }))
            } else {
                this.store.dispatch(PanelLayoutActions.createRightPanelSuccess({ rightPanelEntity: action.rightPanelEntity }))
            }
            this.store.dispatch(PanelLayoutActions.selectRightPanel({ id: action.rightPanelEntity.id }))
            if (!panelOpen) { this.store.dispatch(PanelLayoutActions.openRightPanel()) }
            if (!panelExpanded) { this.store.dispatch(PanelLayoutActions.expandRightPanel()) }
        })
    ), { dispatch: false })

    selectNextRightPanelOnRemove$ = createEffect(() => this.actions$.pipe(
        ofType(PanelLayoutActions.removeRightPanelRequest),
        withLatestFrom(
            this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.rightPanelIds)),
            this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectedRightPanelId))
        ),
        map(([action, rightPanelIds, selectedId]) => {
            if (selectedId === action.id, rightPanelIds.length > 1) {
                const index = rightPanelIds.indexOf(action.id)
                const nextId = rightPanelIds[index + 1] || rightPanelIds[index - 1]
                this.store.dispatch(PanelLayoutActions.selectRightPanel({ id: nextId }))
            }
            this.store.dispatch(PanelLayoutActions.removeRightPanelSuccess({ id: action.id }))
        })
    ), { dispatch: false })

    closeRightPanelOnLastRemove$ = createEffect(() => this.actions$.pipe(
        ofType(PanelLayoutActions.removeRightPanelSuccess),
        withLatestFrom(
            this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.rightPanelIds))
        ),
        map(([, rightPanelIds]) => {
            if (rightPanelIds.length === 0) {
                this.store.dispatch(PanelLayoutActions.closeRightPanel())
            }
        })
    ), { dispatch: false })

    ngrxOnInitEffects(): Action {
        return PersistenceActions.rehydrateStateRequest({ featureKey: createNamespacedFeatureKey(
            Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER, 
            Identifiers.PANEL_LAYOUT_STATE_FEATURE_KEY
        ), persistenceProfileId: null })
    }
}