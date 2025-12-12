import { environment } from '../environments/environment'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { ZWPAnimationsModule } from '@zwp/platform.animations'
import {
    COMMON_ENVIRONMENT,
    GLOBAL_API_LOCATION,
    GlobalAPILocation,
    ZWPCommonModule,
    ZWPConsoleLoggingService,
    ZWPLocalStorageService,
    ZWPNgrxModule,
    ModuleAPIState,
} from '@zwp/platform.common'
import { ZWPPrivacyModule, ZWPPrivacyModuleIPLocationAPIProvider } from '@zwp/platform.privacy'
import { COMPONENTS } from './components'
import { RouterModule } from '@angular/router'
import { ZWPLayoutModule, PanelLayoutActions } from '@zwp/platform.layout'
import { ZWPFlowsModule } from '@zwp/platform.flows'
import { ZWPGoogleAnalyticsModule, ZWPGoogleAnalyticsRouterModule } from '@zwp/platform.analytics/google'
import { ZWPAuthModule, PlatformAuth } from '@zwp/platform.auth'
import { PlatformIdentity, PlatformIdentityModule } from '@zwp/platform.identity'
import { AppConfig } from './config'
import { appRoutes } from './routes/app.routes'

@NgModule({
    declarations: [
        ...COMPONENTS.ALL
    ],
    imports: [
        BrowserModule,
        ZWPCommonModule.forRoot({
            environment: environment,
            enableRootServices: true,
            fontFamilyFallback: AppConfig.TextStyleConfig.fontFamilyFallback,
            loggingService: ZWPConsoleLoggingService,
            storageService: ZWPLocalStorageService,
        }),
        ZWPNgrxModule.forRoot({
            enablePersistence: true,
            enableApplicationState: true,
            enableHistoryState: true,
            enableKeyboardState: true,
            enablePersistenceProfileState: true,
            enableRouterState: true,
            enableThemingState: true,
            enableDevtools: !environment.production,
            devtoolsMaxAge: 100,
            actionsBlocklist: [
                PanelLayoutActions.focusBottomPanelDragHandle.type,
                PanelLayoutActions.focusLeftPanelDragHandle.type,
                PanelLayoutActions.focusRightPanelDragHandle.type,
                PanelLayoutActions.defocusBottomPanelDragHandle.type,
                PanelLayoutActions.defocusLeftPanelDragHandle.type,
                PanelLayoutActions.defocusRightPanelDragHandle.type,
            ],
        }),
        ZWPLayoutModule.forRoot({
            includeMenuLayout: true,
            includePanelLayout: true,
            includePopupLayout: true,
            includeWindowLayout: true,
            persistPanelLayout: true,
            persistWindowLayout: false,
            includeSnackbarLayout: true,
            includeMainPanelTabs: true,
            includeTableLayout: true
        }),
        ZWPPrivacyModule.forRoot({
            ipLocationEnabled: false,
            ipLocationAPIProvider: undefined,
            ipInfoApiKey: 'xxxx',
            ipInfoDBApiKey: undefined,
            cookieBanner: {
                backgroundColor: 'secondary-system-background',
                title: 'Cookie Preferences',
                titleTextStyle: 'subheadline',
                titleTextColor: 'label',
                message: `
                    This website uses and stores data such as cookies to enable essential site functionality, 
                    as well as marketing, personalisation and analytics. You may change your settings at 
                    any time or accept the default settings.
                `,
                messageTextStyle: 'caption2',
                messageTextColor: 'label',
                acceptButtonText: 'Allow All',
                acceptButtonTextStyle: 'button3',
                acceptButtonBackgroundColor: 'system-green',
                acceptButtonLabelColor: 'system-white',
                rejectButtonText: 'Deny All',
                rejectButtonTextStyle: 'button3',
                rejectButtonBackgroundColor: 'system-gray',
                rejectButtonLabelColor: 'system-white',
                saveButtonText: 'Save Selection',
                saveButtonTextStyle: 'button3',
                saveButtonBackgroundColor: 'system-teal',
                saveButtonLabelColor: 'system-white',
                categoryAllowToggleBackgroundColor: 'system-teal',
                categoryRejectToggleBackgroundColor: 'tertiary-system-fill',
                categoryAllowToggleLabelColor: 'system-white',
                categoryRejectToggleLabelColor: 'label',
            },
        }),
        ZWPAnimationsModule.init('intersectionObserver'),
        ZWPGoogleAnalyticsModule.forRoot({ trackingCode: '', initDelay: 10000 }),
        ZWPGoogleAnalyticsRouterModule.forRoot(),
        RouterModule.forRoot([...appRoutes], { useHash: false }),
        ZWPAuthModule.mock(),
        PlatformIdentityModule.forRoot({
            remoteBaseUrl: 'https://localhost:8080/identity/1.0',
            localBaseUrl: 'https://localhost:8080/identity/1.0',
            apiState: ModuleAPIState.MOCK
        }),
        ZWPFlowsModule.mock()
    ],
    providers: [
        { provide: COMMON_ENVIRONMENT, useValue: environment },
        { provide: GLOBAL_API_LOCATION, useValue: GlobalAPILocation.REMOTE },
        { provide: PlatformAuth.Model.ACCESS_TOKEN_ACCESSOR, useExisting: PlatformIdentity.AdminUserAccessTokenAccessor }
    ],
    bootstrap: [COMPONENTS.RootComponent],
})
export class AppModule {}
