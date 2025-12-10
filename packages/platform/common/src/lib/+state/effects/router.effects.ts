import { Injectable } from "@angular/core"
import { Actions, createEffect } from "@ngrx/effects"
import { tap } from "rxjs"
import { ZWPDebuggableInjectable } from '../../decorators'
import { isUndefined } from "../../utils"
import { ZWPApplicationFacade, ZWPRouterFacade } from "../facades"

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'ZWPRouterEffects', options: { skipMethodDebugger: true } })
export class ZWPRouterEffects {
    constructor(private actions$: Actions, private routerFacade: ZWPRouterFacade, private applicationFacade: ZWPApplicationFacade) {
        // super('ZWPRouterEffects', { skipMethodDebugger: true })
    }

    // currentRoute$ = createEffect(() => this.routerFacade.currentRoute$.pipe(
    //     tap(value => {
    //         console.log('RouterEffects', 'Current Route', value)
    //     })
    // ), { dispatch: false })

    // fragment$ = createEffect(() => this.routerFacade.fragment$.pipe(
    //     tap(value => {
    //         console.log('RouterEffects', 'Fragment', value)
    //     })
    // ), { dispatch: false })

    // queryParams$ = createEffect(() => this.routerFacade.queryParams$.pipe(
    //     tap(value => {
    //         console.log('RouterEffects', 'Query Params', value)
    //     })
    // ), { dispatch: false })

    // routeParams$ = createEffect(() => this.routerFacade.routeParams$.pipe(
    //     tap(value => {
    //         console.log('RouterEffects', 'Route Params', value)
    //     })
    // ), { dispatch: false })

    updateRouteSEOData$ = createEffect(() => this.routerFacade.routeSEOData$.pipe(
        tap(seoData => {
            // console.log('RouterEffects', 'Route SEO Data', seoData)
            if (!isUndefined(seoData)) {
                if (!isUndefined(seoData.title)) { this.applicationFacade.updateMetaTitle(seoData.title) }
                if (!isUndefined(seoData.description)) { this.applicationFacade.upsertMetaTag({name: 'description', content: seoData.description}) }
                if (!isUndefined(seoData.keywords)) { this.applicationFacade.upsertMetaTag({name: 'keywords', content: seoData.keywords}) }
                if (!isUndefined(seoData.robots)) { this.applicationFacade.upsertMetaTag({name: 'robots', content: seoData.robots}) }
                if (!isUndefined(seoData.canonical)) { this.applicationFacade.upsertCanonicalLink(seoData.canonical) }
                if (!isUndefined(seoData.openGraph)) { 
                    if (!isUndefined(seoData.openGraph.ogTitle)) { this.applicationFacade.upsertMetaTag({property: 'og:title', content: seoData.openGraph.ogTitle}) }
                    if (!isUndefined(seoData.openGraph.ogDescription)) { this.applicationFacade.upsertMetaTag({property: 'og:description', content: seoData.openGraph.ogDescription}) }
                    if (!isUndefined(seoData.openGraph.ogImage)) { this.applicationFacade.upsertMetaTag({property: 'og:image', content: seoData.openGraph.ogImage}) }
                    if (!isUndefined(seoData.openGraph.ogUrl)) { this.applicationFacade.upsertMetaTag({property: 'og:url', content: seoData.openGraph.ogUrl}) }
                    if (!isUndefined(seoData.openGraph.ogType)) { this.applicationFacade.upsertMetaTag({property: 'og:type', content: seoData.openGraph.ogType}) }
                    if (!isUndefined(seoData.openGraph.ogSiteName)) { this.applicationFacade.upsertMetaTag({property: 'og:site_name', content: seoData.openGraph.ogSiteName}) }
                    if (!isUndefined(seoData.openGraph.ogLocale)) { this.applicationFacade.upsertMetaTag({property: 'og:locale', content: seoData.openGraph.ogLocale}) }
                }
            }
        })
    ), { dispatch: false })

    // url$ = createEffect(() => this.routerFacade.url$.pipe(
    //     tap(value => {
    //         console.log('RouterEffects', 'URL', value)
    //     })
    // ), { dispatch: false })

    // title$ = createEffect(() => this.routerFacade.title$.pipe(
    //     tap(value => {
    //         console.log('RouterEffects', 'Title', value)
    //     })
    // ), { dispatch: false })
}