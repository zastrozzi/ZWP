import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"
import { DOCUMENT } from "@angular/common"
import { Inject, Injectable, OnDestroy, Renderer2, RendererFactory2, ViewEncapsulation } from "@angular/core"
import { Meta, MetaDefinition, Title } from "@angular/platform-browser"
import { Store, select } from "@ngrx/store"
import { Subscription } from "rxjs"
import { ZWPDebuggableInjectable } from '../../decorators/zwp.debuggable.decorator'
import { isNull, isUndefined, screenBreakpointDeviceFromCDKBreakpoint, screenBreakpointSizeFromCDKBreakpoint } from "../../utils"
import { ApplicationActions, PersistenceActions } from "../actions"
import { ApplicationSelectors } from "../selectors"

@Injectable()
@ZWPDebuggableInjectable({serviceName: 'ZWPApplicationFacade', options: { skipMethodDebugger: true }})
export class ZWPApplicationFacade implements OnDestroy {
    private readonly subscriptions = new Subscription()
    private _renderer: Renderer2

    constructor(
        private store: Store, 
        private meta: Meta, 
        private title: Title, 
        private breakpointObserver: BreakpointObserver,
        private rendererFactory: RendererFactory2,
        @Inject(DOCUMENT) private document: Document
    ) {
        // super('ZWPApplicationFacade', { skipMethodDebugger: true })
        this.setupScreenBreakpointObservers()
        this._renderer = this.rendererFactory.createRenderer(this.document, {
            id: '-1',
            encapsulation: ViewEncapsulation.None,
            styles: [],
            data: {}
        })
    }

    applicationName$ = this.store.pipe(select(ApplicationSelectors.applicationName))
    applicationVersion$ = this.store.pipe(select(ApplicationSelectors.applicationVersion))
    currentScreenBreakpointSize$ = this.store.pipe(select(ApplicationSelectors.currentScreenBreakpointSize))
    currentScreenBreakpointDevice$ = this.store.pipe(select(ApplicationSelectors.currentScreenBreakpointDevice))
    currentScreenBreakpointSizeMinWidth$ = this.store.pipe(select(ApplicationSelectors.currentScreenBreakpointSizeMinWidth))
    currentScreenBreakpointSizeMaxWidth$ = this.store.pipe(select(ApplicationSelectors.currentScreenBreakpointSizeMaxWidth))
    currentScreenBreakpointDeviceMinWidth$ = this.store.pipe(select(ApplicationSelectors.currentScreenBreakpointDeviceMinWidth))
    currentScreenBreakpointDeviceMaxWidth$ = this.store.pipe(select(ApplicationSelectors.currentScreenBreakpointDeviceMaxWidth))
    currentScreenBreakpointDeviceIsPortrait$ = this.store.pipe(select(ApplicationSelectors.currentScreenBreakpointDeviceIsPortrait))
    currentScreenBreakpointDeviceIsLandscape$ = this.store.pipe(select(ApplicationSelectors.currentScreenBreakpointDeviceIsLandscape))

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
        // this.debuggableServiceDestroy()
    }

    setApplicationName(name: string) {
        this.store.dispatch(ApplicationActions.setApplicationName({ applicationName: name }))
    }

    setApplicationVersion(version: string) {
        this.store.dispatch(ApplicationActions.setApplicationVersion({ applicationVersion: version }))
    }

    clearLocalStorage() {
        this.store.dispatch(PersistenceActions.clearLocalStorage())
    }

    upsertMetaTag(tag: MetaDefinition) {
        if (isUndefined(tag.name)) { return }
        if (this.meta.getTag(`name=${tag.name}`) !== null) {
            this.meta.updateTag(tag, `name=${tag.name}`)
        } else {
            this.meta.addTag(tag)
        }
    }

    upsertCanonicalLink(url: string) {
        const link = this.document.querySelector(`link[rel="canonical"]`)
        if (!isNull(link)) {
            this._renderer.removeChild(this.document.head, link)
        }
        const newLink = this._renderer.createElement('link')
        this._renderer.setAttribute(newLink, 'rel', 'canonical')
        this._renderer.setAttribute(newLink, 'href', url)
        this._renderer.appendChild(this.document.head, newLink)
    }

    updateMetaTitle(title: string) {
        this.title.setTitle(title)
    }


    private setupScreenBreakpointObservers() {
        const breakpointSizeObserverSub = this.breakpointObserver.observe([
            Breakpoints.XSmall,
            Breakpoints.Small,
            Breakpoints.Medium,
            Breakpoints.Large,
            Breakpoints.XLarge,
            Breakpoints.HandsetPortrait,
            Breakpoints.HandsetLandscape,
            Breakpoints.TabletPortrait,
            Breakpoints.TabletLandscape,
            Breakpoints.WebPortrait,
            Breakpoints.WebLandscape
        ]).subscribe((result) => {
            if (!result.matches) { return }
            Object.entries(result.breakpoints).forEach(([breakpoint, isMatched]) => {
                if (isMatched) {
                    const breakpointSize = screenBreakpointSizeFromCDKBreakpoint(breakpoint)
                    if (!isNull(breakpointSize)) { this.store.dispatch(ApplicationActions.setCurrentScreenBreakpointSize({ breakpointSize })) }
                }
            })
        })

        const breakpointDeviceObserverSub = this.breakpointObserver.observe([
            Breakpoints.HandsetPortrait,
            Breakpoints.HandsetLandscape,
            Breakpoints.TabletPortrait,
            Breakpoints.TabletLandscape,
            Breakpoints.WebPortrait,
            Breakpoints.WebLandscape
        ]).subscribe((result) => {
            if (!result.matches) { return }
            Object.entries(result.breakpoints).forEach(([breakpoint, isMatched]) => {
                if (isMatched) {
                    const breakpointDevice = screenBreakpointDeviceFromCDKBreakpoint(breakpoint)
                    if (!isNull(breakpointDevice)) { this.store.dispatch(ApplicationActions.setCurrentScreenBreakpointDevice({ breakpointDevice })) }
                }
            })
        })

        this.subscriptions.add(breakpointSizeObserverSub)
        this.subscriptions.add(breakpointDeviceObserverSub)
    }
}