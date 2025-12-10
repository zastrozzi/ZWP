import { animate, state, style, transition, trigger } from "@angular/animations"
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input } from "@angular/core"
import { MatSlideToggleChange } from "@angular/material/slide-toggle"
import { ZWPApplicationFacade } from "@zwp/platform.common"
import { ZWPPrivacyFacade } from "../+state/facades"
import { ZWPCookieCategory, ZWPCookieStatus, ZWPPrivacyModuleRootConfig, ZWP_PRIVACY_MODULE_ROOT_CONFIG } from "../model"

@Component({
    selector: 'zwp-cookie-banner',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxLayoutAlign="start stretch" fxLayoutGap="3px" [style.marginLeft]="'10px'" [style.marginRight]="'10px'" [style.backgroundColor]="cookieBannerConfig.backgroundColor | zwpColorTheme" zwpPadding="15 15 10 15" zwpCorners="10" [style.boxShadow]="'0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'">
            <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="5px">
                <span [zwpTextStyle]="cookieBannerConfig.titleTextStyle" [style.color]="cookieBannerConfig.titleTextColor | zwpColorTheme">{{cookieBannerConfig.title}}</span>
                <zwp-md-icon-button 
                    (btnClick)="toggleCategoriesShown()" 
                    [textStyle]="cookieBannerConfig.titleTextStyle" [materialType]="'flat'" [label]="'Custom Preferences'" [icon]="(categoriesShown === 'shown') ? 'info' : 'info'"
                    [iconColor]="cookieBannerConfig.titleTextColor | zwpColorTheme:{opacity: 0.7}" [backgroundColor]="'clear' | zwpColorTheme" [iconPadding]="5"
                ></zwp-md-icon-button>
            </div>
            <span [zwpTextStyle]="cookieBannerConfig.messageTextStyle" [style.color]="cookieBannerConfig.messageTextColor | zwpColorTheme">{{cookieBannerConfig.message}}</span>
            <ng-container *ngIf="currentScreenBreakpointSize$ | async as breakpointSize">
                <ng-container *ngIf="breakpointSize === 'EXTRA_SMALL' || breakpointSize === 'SMALL'">
                </ng-container>
                <!-- <ng-container *ngIf="breakpointSize !== 'EXTRA_SMALL' && breakpointSize !== 'SMALL'"> -->
                    <div fxLayout="row wrap" [@categoriesShown]="categoriesShown">
                        <zwp-md-button 
                            *ngIf="personalisationStatus$ | async as personalisationStatus" (btnClick)="updateCookieCategoryStatus(categories.PERSONALISATION, personalisationStatus)"
                            [textStyle]="cookieBannerConfig.acceptButtonTextStyle" [materialType]="'flat'" [label]="'Personalisation'" [icon]="personalisationStatus === 'allow' ? 'check_box' : 'check_box_outline_blank'" [layoutGap]="'5px'"
                            [backgroundColor]="(personalisationStatus === 'allow' ? (cookieBannerConfig.categoryAllowToggleBackgroundColor | zwpColorTheme:{lightness: 300}) : cookieBannerConfig.categoryRejectToggleBackgroundColor | zwpColorTheme)" 
                            [labelColor]="(personalisationStatus === 'allow' ? cookieBannerConfig.categoryAllowToggleLabelColor : cookieBannerConfig.categoryRejectToggleLabelColor) | zwpColorTheme" 
                            [style.marginTop]="'5px !important'" [style.marginRight]="'5px !important'"
                        ></zwp-md-button>
                        <zwp-md-button 
                            *ngIf="analyticsStatus$ | async as analyticsStatus" (btnClick)="updateCookieCategoryStatus(categories.ANALYTICS, analyticsStatus)"
                            [textStyle]="cookieBannerConfig.acceptButtonTextStyle" [materialType]="'flat'" [label]="'Analytics'" [icon]="analyticsStatus === 'allow' ? 'check_box' : 'check_box_outline_blank'" [layoutGap]="'5px'"
                            [backgroundColor]="(analyticsStatus === 'allow' ? (cookieBannerConfig.categoryAllowToggleBackgroundColor | zwpColorTheme:{lightness: 300}) : cookieBannerConfig.categoryRejectToggleBackgroundColor | zwpColorTheme)" 
                            [labelColor]="(analyticsStatus === 'allow' ? cookieBannerConfig.categoryAllowToggleLabelColor : cookieBannerConfig.categoryRejectToggleLabelColor) | zwpColorTheme" 
                            [style.marginTop]="'5px !important'" [style.marginRight]="'5px !important'"
                        ></zwp-md-button>
                        <zwp-md-button 
                            *ngIf="marketingStatus$ | async as marketingStatus" (btnClick)="updateCookieCategoryStatus(categories.MARKETING, marketingStatus)"
                            [textStyle]="cookieBannerConfig.acceptButtonTextStyle" [materialType]="'flat'" [label]="'Marketing'" [icon]="marketingStatus === 'allow' ? 'check_box' : 'check_box_outline_blank'" [layoutGap]="'5px'"
                            [backgroundColor]="(marketingStatus === 'allow' ? (cookieBannerConfig.categoryAllowToggleBackgroundColor | zwpColorTheme:{lightness: 300}) : cookieBannerConfig.categoryRejectToggleBackgroundColor | zwpColorTheme)" 
                            [labelColor]="(marketingStatus === 'allow' ? cookieBannerConfig.categoryAllowToggleLabelColor : cookieBannerConfig.categoryRejectToggleLabelColor) | zwpColorTheme" 
                            [style.marginTop]="'5px !important'" [style.marginRight]="'5px !important'"
                        ></zwp-md-button>
                        <zwp-md-button 
                            *ngIf="performanceStatus$ | async as performanceStatus" (btnClick)="updateCookieCategoryStatus(categories.PERFORMANCE, performanceStatus)"
                            [textStyle]="cookieBannerConfig.acceptButtonTextStyle" [materialType]="'flat'" [label]="'Performance'" [icon]="performanceStatus === 'allow' ? 'check_box' : 'check_box_outline_blank'" [layoutGap]="'5px'"
                            [backgroundColor]="(performanceStatus === 'allow' ? (cookieBannerConfig.categoryAllowToggleBackgroundColor | zwpColorTheme:{lightness: 300}) : cookieBannerConfig.categoryRejectToggleBackgroundColor | zwpColorTheme)" 
                            [labelColor]="(performanceStatus === 'allow' ? cookieBannerConfig.categoryAllowToggleLabelColor : cookieBannerConfig.categoryRejectToggleLabelColor) | zwpColorTheme" 
                            [style.marginTop]="'5px !important'" [style.marginRight]="'5px !important'"
                        ></zwp-md-button>
                        <zwp-md-button 
                            *ngIf="functionalStatus$ | async as functionalStatus" (btnClick)="updateCookieCategoryStatus(categories.FUNCTIONAL, functionalStatus)"
                            [textStyle]="cookieBannerConfig.acceptButtonTextStyle" [materialType]="'flat'" [label]="'Functional'" [icon]="functionalStatus === 'allow' ? 'check_box' : 'check_box_outline_blank'" [layoutGap]="'5px'"
                            [backgroundColor]="(functionalStatus === 'allow' ? (cookieBannerConfig.categoryAllowToggleBackgroundColor | zwpColorTheme:{lightness: 300}) : cookieBannerConfig.categoryRejectToggleBackgroundColor | zwpColorTheme)" 
                            [labelColor]="(functionalStatus === 'allow' ? cookieBannerConfig.categoryAllowToggleLabelColor : cookieBannerConfig.categoryRejectToggleLabelColor) | zwpColorTheme" 
                            [style.marginTop]="'5px !important'" [style.marginRight]="'5px !important'"
                        ></zwp-md-button>
                        
                        <!-- <mat-slide-toggle [style.marginRight]="'15px'" [checked]="(cookieConsentPersonalisationStatus$ | async) === 'allow'" (change)="setCookieCategoryStatus(cookieCategoryPersonalisation, $event)"><span [style.color]="'label' | zwpColorTheme">Personalisation</span></mat-slide-toggle>
                        <mat-slide-toggle [style.marginRight]="'15px'" [checked]="(cookieConsentAnalyticsStatus$ | async) === 'allow'" (change)="setCookieCategoryStatus(cookieCategoryAnalytics, $event)"><span [style.color]="'label' | zwpColorTheme">Analytics</span></mat-slide-toggle>
                        <mat-slide-toggle [style.marginRight]="'15px'" [checked]="(cookieConsentMarketingStatus$ | async) === 'allow'" (change)="setCookieCategoryStatus(cookieCategoryMarketing, $event)"><span [style.color]="'label' | zwpColorTheme">Marketing</span></mat-slide-toggle>
                        <mat-slide-toggle [style.marginRight]="'15px'" [checked]="(cookieConsentPerformanceStatus$ | async) === 'allow'" (change)="setCookieCategoryStatus(cookieCategoryPerformance, $event)"><span [style.color]="'label' | zwpColorTheme">Performance</span></mat-slide-toggle>
                        <mat-slide-toggle [style.marginRight]="'15px'" [checked]="(cookieConsentFunctionalStatus$ | async) === 'allow'" (change)="setCookieCategoryStatus(cookieCategoryFunctional, $event)"><span [style.color]="'label' | zwpColorTheme">Functional</span></mat-slide-toggle> -->
                        
                    </div>
                <!-- </ng-container> -->
            </ng-container>
            
            <!-- <span [zwpTextStyle]="'body1'" [style.color]="'label' | zwpColorTheme">This website uses stores data such as cookies to enable essential site functionality, as well as marketing, personalisation and analytics. You may change your settings at any time or accept the default settings.</span> -->
                
                <div fxLayoutAlign="start stretch" fxLayoutGap="5px" fxFlexOffset="10px">
                    <zwp-md-button 
                        (btnClick)="denyAllCookies()" 
                        [textStyle]="cookieBannerConfig.rejectButtonTextStyle" [materialType]="'flat'" [label]="cookieBannerConfig.rejectButtonText" [icon]="null"
                        [backgroundColor]="cookieBannerConfig.rejectButtonBackgroundColor | zwpColorTheme:{lightness: 300}" [labelColor]="cookieBannerConfig.rejectButtonLabelColor | zwpColorTheme"
                    ></zwp-md-button>
                    <div fxFlex="grow"></div>
                    <zwp-md-button 
                        (btnClick)="toggleCategoriesShown()" 
                        [textStyle]="cookieBannerConfig.saveButtonTextStyle" [materialType]="'flat'" [label]="'Customise'" [icon]="null"
                        [backgroundColor]="cookieBannerConfig.saveButtonBackgroundColor | zwpColorTheme:{lightness: 300}" [labelColor]="cookieBannerConfig.saveButtonLabelColor | zwpColorTheme"
                    ></zwp-md-button>
                    <zwp-md-button 
                        *ngIf="categoriesShown === 'shown'"
                        (btnClick)="confirmPreferences()" 
                        [textStyle]="cookieBannerConfig.acceptButtonTextStyle" [materialType]="'flat'" [label]="cookieBannerConfig.saveButtonText" [icon]="null"
                        [backgroundColor]="cookieBannerConfig.acceptButtonBackgroundColor | zwpColorTheme:{lightness: 300}" [labelColor]="cookieBannerConfig.acceptButtonLabelColor | zwpColorTheme"
                    ></zwp-md-button>
                    <zwp-md-button 
                        *ngIf="categoriesShown === 'hidden'"
                        (btnClick)="acceptAllCookies()" 
                        [textStyle]="cookieBannerConfig.acceptButtonTextStyle" [materialType]="'flat'" [label]="cookieBannerConfig.acceptButtonText" [icon]="null"
                        [backgroundColor]="cookieBannerConfig.acceptButtonBackgroundColor | zwpColorTheme:{lightness: 300}" [labelColor]="cookieBannerConfig.acceptButtonLabelColor | zwpColorTheme"
                    ></zwp-md-button>
                    <!-- <zwp-md-button (btnClick)="confirmPreferences()" [textStyle]="'button1'" [materialType]="'flat'" [label]="'Save Preferences'" icon="save" [layoutGap]="'7px'" [backgroundColor]="'primary' | zwpColorTheme:{lightness: 300}" [labelColor]="'system-white' | zwpColorTheme"></zwp-md-button> -->
                    
                </div>
                
            
        </div>
    `,
    animations: [
        trigger('categoriesShown', [
            state('shown', style({ opacity: 1, height: '*' })),
            state('hidden', style({ opacity: 0, height: '0px' })),
            transition('shown => hidden', animate('200ms ease-in')),
            transition('hidden => shown', animate('200ms ease-out'))
        ])
    ]
})
export class ZWPCookieBannerComponent {
    constructor(@Inject(ZWP_PRIVACY_MODULE_ROOT_CONFIG) private privacyModuleConfig: ZWPPrivacyModuleRootConfig, private privacyFacade: ZWPPrivacyFacade, private applicationFacade: ZWPApplicationFacade, private cd: ChangeDetectorRef) {

    }

    cookieBannerConfig = this.privacyModuleConfig.cookieBanner

    ipLocationCountryCookiesShowCategories$ = this.privacyFacade.ipLocationCountryCookiesShowCategories$
    personalisationStatus$ = this.privacyFacade.cookieConsentPersonalisationStatus$
    analyticsStatus$ = this.privacyFacade.cookieConsentAnalyticsStatus$
    marketingStatus$ = this.privacyFacade.cookieConsentMarketingStatus$
    performanceStatus$ = this.privacyFacade.cookieConsentPerformanceStatus$
    functionalStatus$ = this.privacyFacade.cookieConsentFunctionalStatus$

    currentScreenBreakpointSize$ = this.applicationFacade.currentScreenBreakpointSize$

    categories = ZWPCookieCategory

    cookieCategoriesShown = false
    cookieCategoryPersonalisation = ZWPCookieCategory.PERSONALISATION
    cookieCategoryAnalytics = ZWPCookieCategory.ANALYTICS
    cookieCategoryMarketing = ZWPCookieCategory.MARKETING
    cookieCategoryPerformance = ZWPCookieCategory.PERFORMANCE
    cookieCategoryFunctional = ZWPCookieCategory.FUNCTIONAL

    @Input() categoriesShown: 'shown' | 'hidden' = 'hidden'
    // cookieCategories = allEnumCases(ZWPCookieCategory)
    
    confirmPreferences() {
        this.privacyFacade.confirmCookiePreferences()
        this.privacyFacade.hideCookieConsentBanner()
    }

    toggleCategoriesShown() {
        // console.log('toggleCategoriesShown')
        this.categoriesShown = this.categoriesShown === 'shown' ? 'hidden' : 'shown'
        // this.cd.markForCheck()
    }

    acceptAllCookies() {
        this.privacyFacade.setCategoryStatus(ZWPCookieCategory.PERSONALISATION, ZWPCookieStatus.ALLOW)
        this.privacyFacade.setCategoryStatus(ZWPCookieCategory.ANALYTICS, ZWPCookieStatus.ALLOW)
        this.privacyFacade.setCategoryStatus(ZWPCookieCategory.MARKETING, ZWPCookieStatus.ALLOW)
        this.privacyFacade.setCategoryStatus(ZWPCookieCategory.PERFORMANCE, ZWPCookieStatus.ALLOW)
        this.privacyFacade.setCategoryStatus(ZWPCookieCategory.FUNCTIONAL, ZWPCookieStatus.ALLOW)
        this.privacyFacade.setCategoryStatus(ZWPCookieCategory.UNCATEGORISED, ZWPCookieStatus.ALLOW)
        this.privacyFacade.confirmCookiePreferences()
        this.privacyFacade.hideCookieConsentBanner()
    }

    denyAllCookies() {
        this.privacyFacade.setCategoryStatus(ZWPCookieCategory.PERSONALISATION, ZWPCookieStatus.DENY)
        this.privacyFacade.setCategoryStatus(ZWPCookieCategory.ANALYTICS, ZWPCookieStatus.DENY)
        this.privacyFacade.setCategoryStatus(ZWPCookieCategory.MARKETING, ZWPCookieStatus.DENY)
        this.privacyFacade.setCategoryStatus(ZWPCookieCategory.PERFORMANCE, ZWPCookieStatus.DENY)
        this.privacyFacade.setCategoryStatus(ZWPCookieCategory.FUNCTIONAL, ZWPCookieStatus.DENY)
        this.privacyFacade.setCategoryStatus(ZWPCookieCategory.UNCATEGORISED, ZWPCookieStatus.DENY)
        this.privacyFacade.confirmCookiePreferences()
        this.privacyFacade.hideCookieConsentBanner()
    }

    updateCookieCategoryStatus(category: ZWPCookieCategory, currentStatus: ZWPCookieStatus) {
        if (this.categoriesShown === 'hidden') { return }
        this.privacyFacade.setCategoryStatus(category, (currentStatus === ZWPCookieStatus.ALLOW) ? ZWPCookieStatus.DENY : ZWPCookieStatus.ALLOW)
    }

    setCookieCategoryStatus(category: ZWPCookieCategory, event: MatSlideToggleChange) {
        if (this.categoriesShown === 'hidden') { return }
        this.privacyFacade.setCategoryStatus(category, event.checked ? ZWPCookieStatus.ALLOW : ZWPCookieStatus.DENY)
    }
}