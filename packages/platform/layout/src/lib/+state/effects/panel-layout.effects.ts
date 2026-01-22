import { inject, Injectable } from '@angular/core'
import {
    createNamespacedFeatureKey,
    ZWPDebuggableInjectable,
    PersistenceActions,
    PersistenceProfileActions,
} from '@zwp/platform.common'
import { Actions, concatLatestFrom, createEffect, ofType, OnInitEffects } from '@ngrx/effects'
import { select, Store, Action } from '@ngrx/store'
import { concatMap, filter, map, withLatestFrom } from 'rxjs'
import { PanelLayoutActions } from '../actions'
import { Identifiers } from '../identifiers'
import { PanelLayoutSelectors } from '../selectors'
import { v4 } from 'uuid'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPPanelLayoutEffects', options: { skipMethodDebugger: true } })
export class ZWPPanelLayoutEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private store = inject(Store)

    toggleLeftPanelOpen$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PanelLayoutActions.toggleLeftPanelOpen),
            withLatestFrom(this.store.pipe(select(PanelLayoutSelectors.LeftPanelSelectors.selectLeftPanelOpen))),
            map((pair) => pair[1]),
            map((isOpen) => (isOpen ? PanelLayoutActions.closeLeftPanel() : PanelLayoutActions.openLeftPanel()))
        )
    )

    toggleRightPanelOpen$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PanelLayoutActions.toggleRightPanelOpen),
            withLatestFrom(this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectRightPanelOpen))),
            map((pair) => pair[1]),
            map((isOpen) => (isOpen ? PanelLayoutActions.closeRightPanel() : PanelLayoutActions.openRightPanel()))
        )
    )

    toggleBottomPanelOpen$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PanelLayoutActions.toggleBottomPanelOpen),
            withLatestFrom(this.store.pipe(select(PanelLayoutSelectors.BottomPanelSelectors.selectBottomPanelOpen))),
            map((pair) => pair[1]),
            map((isOpen) => (isOpen ? PanelLayoutActions.closeBottomPanel() : PanelLayoutActions.openBottomPanel()))
        )
    )

    rehydrateState$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PersistenceProfileActions.setSelected),
            map((action) =>
                PersistenceActions.rehydrateStateRequest({
                    featureKey: createNamespacedFeatureKey(
                        Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER,
                        Identifiers.PANEL_LAYOUT_STATE_FEATURE_KEY
                    ),
                    persistenceProfileId: action.id,
                })
            )
        )
    )

    generateRightPanelComponent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PanelLayoutActions.createRightPanelRequest),
            withLatestFrom(this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.rightPanelBaseIds))),
            map(([action, rightPanelBaseIds]) => {
                const newRightPanelEntity = { ...action.rightPanelEntity }
                if (rightPanelBaseIds.includes(action.rightPanelEntity.id) && action.allowsMultiple) {
                    newRightPanelEntity.id = `${action.rightPanelEntity.id}#${v4()}`
                }
                return PanelLayoutActions.createRightPanelSuccess({ rightPanelEntity: newRightPanelEntity })
            })
        )
    )

    generateRightPanelComponentSuccessSelectRightPanel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PanelLayoutActions.createRightPanelSuccess),
            map((action) => PanelLayoutActions.selectRightPanel({ id: action.rightPanelEntity.id }))
        )
    )

    generateRightPanelComponentOpen$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PanelLayoutActions.createRightPanelSuccess),
            withLatestFrom(this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectRightPanelOpen))),
            filter(([_, isOpen]) => !isOpen),
            map(() => PanelLayoutActions.openRightPanel())
        )
    )

    generateRightPanelComponentExpand$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PanelLayoutActions.createRightPanelSuccess),
            withLatestFrom(this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectRightPanelExpanded))),
            filter(([_, isExpanded]) => !isExpanded),
            map(() => PanelLayoutActions.expandRightPanel())
        )
    )

    selectNextRightPanelOnRemove$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(PanelLayoutActions.removeRightPanelRequest),
                withLatestFrom(
                    this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.rightPanelIds)),
                    this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.selectedRightPanelId))
                ),
                map(([action, rightPanelIds, selectedId]) => {
                    if ((selectedId === action.id, rightPanelIds.length > 1)) {
                        const index = rightPanelIds.indexOf(action.id)
                        const nextId = rightPanelIds[index + 1] || rightPanelIds[index - 1]
                        this.store.dispatch(PanelLayoutActions.selectRightPanel({ id: nextId }))
                    }
                    this.store.dispatch(PanelLayoutActions.removeRightPanelSuccess({ id: action.id }))
                })
            ),
        { dispatch: false }
    )

    closeRightPanelOnLastRemove$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(PanelLayoutActions.removeRightPanelSuccess),
                withLatestFrom(this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.rightPanelIds))),
                map(([, rightPanelIds]) => {
                    if (rightPanelIds.length === 0) {
                        this.store.dispatch(PanelLayoutActions.closeRightPanel())
                        this.store.dispatch(PanelLayoutActions.deselectRightPanel())
                    }
                })
            ),
        { dispatch: false }
    )

    removeRightPanelsForDataId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PanelLayoutActions.removeRightPanelsForDataId),
            concatLatestFrom((action) =>
                this.store.pipe(select(PanelLayoutSelectors.RightPanelSelectors.rightPanelIdsByDataId(action.id)))
            ),
            map(([_, panelIdsToRemove]) => panelIdsToRemove),
            filter((panelIdsToRemove) => panelIdsToRemove.length > 0),
            concatMap((panelIdsToRemove) =>
                panelIdsToRemove.map((panelId) => PanelLayoutActions.removeRightPanelRequest({ id: panelId }))
            )
        )
    )

    ngrxOnInitEffects(): Action {
        return PersistenceActions.rehydrateStateRequest({
            featureKey: createNamespacedFeatureKey(
                Identifiers.PLATFORM_LAYOUT_ACTION_IDENTIFIER,
                Identifiers.PANEL_LAYOUT_STATE_FEATURE_KEY
            ),
            persistenceProfileId: null,
        })
    }
}
