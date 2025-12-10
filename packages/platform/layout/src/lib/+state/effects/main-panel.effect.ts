import { inject, Injectable } from '@angular/core'
import { getLeafRouteNavTitle, isNull, isUndefined, ZWPDebuggableInjectable, ZWPRouterFacade } from '@zwp/platform.common'
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects'
import { select, Store, Action } from '@ngrx/store'
import { map, mergeMap, of, withLatestFrom } from 'rxjs'
import { MainPanelActions } from '../actions'
import { Identifiers } from '../identifiers'
import { MainPanelTabSelectors } from '../selectors'
import { ZWPMainPanelFacade } from '../facades'
import { ROUTER_NAVIGATED } from '@ngrx/router-store'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPMainPanelEffects', options: { skipMethodDebugger: true } })
export class ZWPMainPanelEffects implements OnInitEffects {
    private actions$ = inject(Actions)
    private store = inject(Store)
    private mainPanelFacade = inject(ZWPMainPanelFacade)
    private routerFacade = inject(ZWPRouterFacade)

    closeMainPanelTab$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(MainPanelActions.closeMainPanelTab),
                withLatestFrom(this.store.pipe(select(MainPanelTabSelectors.selectAllMainPanelTabsWithState))),
                map(([action, tabs]) => {
                    if (tabs.length > 1) {
                        const tabToClose = tabs.find((tab) => tab.id === action.tabId)
                        if (tabToClose && tabToClose.isActive) {
                            const nextTab = tabs.find((tab) => tab.id !== action.tabId)
                            if (nextTab) {
                                this.mainPanelFacade.selectMainPanelTab(nextTab.id)
                            }
                        }
                        this.mainPanelFacade.removeMainPanelTab(action.tabId)
                    }
                })
            ),
        { dispatch: false }
    )

    selectMainPanelTab$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(MainPanelActions.selectMainPanelTab),
                map((action) => action.tabId),
                mergeMap((tabId) => of(tabId).pipe(withLatestFrom(this.mainPanelFacade.getMainPanelTabById$(tabId)))),
                map(([_, tab]) => {
                    if (!isUndefined(tab)) {
                        this.routerFacade.navigateByUrl(tab.routePath)
                    }
                })
            ),
        { dispatch: false }
    )

    addMainPanelTab$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(MainPanelActions.addMainPanelTab),
                withLatestFrom(this.store.pipe(select(MainPanelTabSelectors.selectedMainPanelTab))),
                map(([_, selectedTab]) => {
                    if (!isUndefined(selectedTab)) {
                        this.mainPanelFacade.createMainPanelTab(selectedTab.routePath, selectedTab.routeLabel, true)
                    }
                })
            ),
        { dispatch: false }
    )

    updateMainPanelTabOnRouteChange$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ROUTER_NAVIGATED),
                withLatestFrom(this.store.pipe(select(MainPanelTabSelectors.selectSelectedMainPanelTabId))),
                map(([action, selectedTabId]) => {
                    const currentRoutePath = action.payload.routerState.url
                    const currentRouteLabel = getLeafRouteNavTitle(action.payload.routerState.root)
                    if (!isNull(selectedTabId)) {
                        this.mainPanelFacade.updateMainPanelTab(selectedTabId, currentRoutePath, currentRouteLabel)
                    } else {
                        this.mainPanelFacade.createMainPanelTab(currentRoutePath, currentRouteLabel, true)
                    }
                })
            ),
        { dispatch: false }
    )

    ngrxOnInitEffects(): Action {
        return MainPanelActions.initialiseMainPanelState()
    }
}