import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZWPCommonModule } from '@zwp/platform.common';
import { ZWPGoogleAnalyticsModule } from './zwp.google-analytics.module';
import { ZWP_GOOGLE_ANALYTICS_ROUTER_INITIALISER } from '../initialisers';
import { ZWP_GOOGLE_ANALYTICS_ROUTING_SETTINGS, ZWPGoogleAnalyticsRoutingSettings } from '../model';

@NgModule({
    imports: [
        CommonModule,
        ZWPCommonModule,
        ZWPGoogleAnalyticsModule
    ],
    providers: [
        ZWP_GOOGLE_ANALYTICS_ROUTER_INITIALISER
    ]
})
export class ZWPGoogleAnalyticsRouterModule {
    static forRoot(settings?: ZWPGoogleAnalyticsRoutingSettings): ModuleWithProviders<ZWPGoogleAnalyticsRouterModule> {
        return {
            ngModule: ZWPGoogleAnalyticsRouterModule,
            providers: [
                { provide: ZWP_GOOGLE_ANALYTICS_ROUTING_SETTINGS, useValue: settings ?? {} }
            ]
        }
    }
}
