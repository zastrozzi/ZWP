import { inject, Injectable } from "@angular/core"
import { NavigationBehaviorOptions, Router } from "@angular/router"
import { select, Store } from "@ngrx/store"
import { ZWPDebuggableInjectable } from '../../decorators/zwp.debuggable.decorator'
// import { Decorator } from '../../services/zwp.debuggable.decorator'
// import { ZWPDebuggableInjectable } from '../../services/zwp.debuggable.decorator'

import { RouterSelectors } from "../selectors"
import { firstValueFrom, lastValueFrom } from 'rxjs'

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'ZWPRouterFacade', options: { skipMethodDebugger: true }})
export class ZWPRouterFacade {
    constructor() {
        // super('ZWPRouterFacade', { skipMethodDebugger: true })
    }

    private store: Store = inject(Store)
    private router: Router = inject(Router)

    currentRoute$ = this.store.pipe(select(RouterSelectors.selectCurrentRoute))
    fragment$ = this.store.pipe(select(RouterSelectors.selectFragment))
    queryParams$ = this.store.pipe(select(RouterSelectors.selectQueryParams))
    routeParams$ = this.store.pipe(select(RouterSelectors.selectRouteParams))
    routeData$ = this.store.pipe(select(RouterSelectors.selectRouteData))
    routeSEOData$ = this.store.pipe(select(RouterSelectors.selectRouteSEOData))
    url$ = this.store.pipe(select(RouterSelectors.selectUrl))
    title$ = this.store.pipe(select(RouterSelectors.selectTitle))
    nestedRouteParams$ = this.store.pipe(select(RouterSelectors.selectNestedRouteParams))
    nestedRouteParam$ = (param: string) => this.store.pipe(select(RouterSelectors.selectNestedRouteParam(param)))

    queryParam$ = (param: string) => this.store.pipe(select(RouterSelectors.selectQueryParam(param)))
    routeParam$ = (param: string) => this.store.pipe(select(RouterSelectors.selectRouteParam(param)))
    routeDataParam$ = (param: string) => this.store.pipe(select(RouterSelectors.selectRouteDataParam(param)))



    navigate(commands: any[], extras?: NavigationBehaviorOptions | undefined) {
        this.router.navigate(commands, extras)
    }

    navigateByUrl(url: string, extras?: NavigationBehaviorOptions | undefined) {
        this.router.navigateByUrl(url, extras)
    }

    getNestedRouteParam = async (param: string): Promise<string | null> => {
        return await firstValueFrom(this.nestedRouteParam$(param)) ?? null
    }
}