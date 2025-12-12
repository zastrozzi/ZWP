import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core'
import { ZWPRouterFacade, ZWPScreenBreakpointSize, ZWPThemingFacade } from '@zwp/platform.common'
import { PlatformIdentity } from '@zwp/platform.identity'
import { AppConfig } from '../config'

@Component({
    selector: 'zwp-desktop-demo-root',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <router-outlet></router-outlet>
    `
})
export class RootComponent implements OnInit {
    private themingFacade = inject(ZWPThemingFacade)
    private adminUserFacade = inject(PlatformIdentity.State.Facades.AdminUserFacade)
    private router = inject(ZWPRouterFacade)

    adminUsers$ = this.adminUserFacade.adminUsers$
    loggedInAdminUser$ = this.adminUserFacade.loggedInAdminUser$

    ngOnInit() {
        this.themingFacade.setInitialThemeColors(AppConfig.ColorThemeConfig)
        this.themingFacade.setAutomaticDarkModePreference(false)
        this.themingFacade.setTextStyles(AppConfig.TextStyleConfig.mobile, ZWPScreenBreakpointSize.EXTRA_SMALL)
        this.themingFacade.setTextStyles(AppConfig.TextStyleConfig.mobile, ZWPScreenBreakpointSize.SMALL)
        this.themingFacade.setTextStyles(AppConfig.TextStyleConfig.tablet, ZWPScreenBreakpointSize.MEDIUM)
        this.themingFacade.setTextStyles(AppConfig.TextStyleConfig.web, ZWPScreenBreakpointSize.LARGE)
        this.themingFacade.setTextStyles(AppConfig.TextStyleConfig.web, ZWPScreenBreakpointSize.EXTRA_LARGE)
    }
}

