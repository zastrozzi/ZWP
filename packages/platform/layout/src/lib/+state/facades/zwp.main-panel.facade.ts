import { inject, Injectable } from '@angular/core'
import { ZWPDebuggableInjectable, Nullable, Undefinable } from '@zwp/platform.common'
import { select, Store } from '@ngrx/store'
import { MainPanelTabEntity } from '../../model'
import { MainPanelActions } from '../actions'
import { MainPanelTabSelectors } from '../selectors'
import { v4 } from 'uuid'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPMainPanelFacade', options: { skipMethodDebugger: true } })
export class ZWPMainPanelFacade {
    private store = inject(Store)

    allMainPanelTabs$ = this.store.pipe(select(MainPanelTabSelectors.selectAllMainPanelTabs))
    allMainPanelTabsWithState$ = this.store.pipe(select(MainPanelTabSelectors.selectAllMainPanelTabsWithState))
    selectedMainPanelTab$ = this.store.pipe(select(MainPanelTabSelectors.selectedMainPanelTab))
    selectedMainPanelTabId$ = this.store.pipe(select(MainPanelTabSelectors.selectSelectedMainPanelTabId))

    getMainPanelTabById$ = (id: string) => this.store.pipe(select(MainPanelTabSelectors.getMainPanelTabById(id)))

    addMainPanelTab() {
        this.store.dispatch(MainPanelActions.addMainPanelTab())
    }

    createMainPanelTab(initialRoutePath: string, initialRouteLabel: string, isActive: boolean = false) {
        const newTab: MainPanelTabEntity = {
            id: v4(),
            routePath: initialRoutePath,
            routeLabel: initialRouteLabel
        }

        this.store.dispatch(MainPanelActions.createMainPanelTab({ tab: newTab }))
        if (isActive) {
            this.store.dispatch(MainPanelActions.selectMainPanelTab({ tabId: newTab.id }))
        }
    }

    selectMainPanelTab(tabId: string) {
        this.store.dispatch(MainPanelActions.selectMainPanelTab({ tabId }))
    }

    closeMainPanelTab(tabId: string) {
        this.store.dispatch(MainPanelActions.closeMainPanelTab({ tabId }))
    }

    removeMainPanelTab(tabId: string) {
        this.store.dispatch(MainPanelActions.removeMainPanelTab({ tabId }))
    }

    updateMainPanelTab(tabId: string, newRoutePath: Undefinable<string>, newRouteLabel: Undefinable<string>) {
        this.store.dispatch(
            MainPanelActions.updateMainPanelTab({
                tabId,
                changes: {
                    routePath: newRoutePath,
                    ...newRouteLabel ? { routeLabel: newRouteLabel } : {}
                }
            })
        )
    }
}
