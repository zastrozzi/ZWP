import { Provider, APP_BOOTSTRAP_LISTENER, ComponentRef } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter, skip } from "rxjs/operators";
import { ZWP_GOOGLE_ANALYTICS_ROUTING_SETTINGS, ZWPGoogleAnalyticsRoutingSettings } from "../model";
import { ZWPGoogleAnalyticsService } from "../services";

export const normalisePathRules = (rules: Array<string | RegExp>): Array<RegExp> => {
    return rules.map(rule => (rule instanceof RegExp) ? rule : new RegExp(`^${rule.replace('*', '.*')}$`, 'i'))
}

export const zwpGoogleAnalyticsRouterInitialiserFactory = (settings: ZWPGoogleAnalyticsRoutingSettings, zwpGoogleAnalyticsService: ZWPGoogleAnalyticsService) => {
    return async (componentRef: ComponentRef<any>) => {
        const router = componentRef.injector.get(Router)
        const { include = [], exclude = [] } = settings ?? {};
        const includeRules = normalisePathRules(include);
        const excludeRules = normalisePathRules(exclude);
        const navigationEndSubscription = router.events
            .pipe(
                filter((ev: any) => ev instanceof NavigationEnd),
                skip(1),
                filter((ev: NavigationEnd) => includeRules.length > 0 ? includeRules.some(rule => rule.test(ev.urlAfterRedirects)) : true),
                filter((ev: NavigationEnd) => excludeRules.length > 0 ? !excludeRules.some(rule => rule.test(ev.urlAfterRedirects)) : true)
            )
            .subscribe(ev => zwpGoogleAnalyticsService.pageView(ev.urlAfterRedirects, undefined))

        componentRef.onDestroy(() => navigationEndSubscription.unsubscribe())
    }
}

export const ZWP_GOOGLE_ANALYTICS_ROUTER_INITIALISER: Provider = {
    provide: APP_BOOTSTRAP_LISTENER,
    multi: true,
    useFactory: zwpGoogleAnalyticsRouterInitialiserFactory,
    deps: [ZWP_GOOGLE_ANALYTICS_ROUTING_SETTINGS, ZWPGoogleAnalyticsService]
}