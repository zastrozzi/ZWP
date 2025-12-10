import { createFeatureSelector, createSelector } from '@ngrx/store'
import { RouterReducerState, getRouterSelectors } from '@ngrx/router-store'
import { Identifiers } from '../identifiers'
import { RouteSEOData } from '../../model'
import { createNamespacedFeatureKey } from '../../utils'
import { Params } from '@angular/router'

const routerState = createFeatureSelector<RouterReducerState>(
    createNamespacedFeatureKey(Identifiers.ZWP_ACTION_IDENTIFIER, Identifiers.ROUTER_STATE_FEATURE_KEY)
)

const selectNestedRouteParams = createSelector(routerState, (router) => {
    let currentRoute = router?.state?.root
    let params: Params = {}
    while (currentRoute?.firstChild) {
        currentRoute = currentRoute.firstChild
        params = {
            ...params,
            ...currentRoute.params,
        }
    }
    return params
})

const selectNestedRouteParam = (param: string) =>
    createSelector(selectNestedRouteParams, (params) => params[param] as string | undefined)

const {
    selectCurrentRoute,
    selectFragment,
    selectQueryParams,
    selectQueryParam,
    selectRouteParams,
    selectRouteParam,
    selectRouteData,
    selectRouteDataParam,
    selectUrl,
    selectTitle,
} = getRouterSelectors(routerState)

const selectRouteSEOData = createSelector(
    selectRouteData,
    (routeData) => routeData && (routeData['seo'] as RouteSEOData)
)

export const RouterSelectors = {
    selectCurrentRoute,
    selectFragment,
    selectQueryParams,
    selectQueryParam,
    selectRouteParams,
    selectRouteParam,
    selectRouteData,
    selectRouteSEOData,
    selectRouteDataParam,
    selectUrl,
    selectTitle,
    selectNestedRouteParams,
    selectNestedRouteParam
}
