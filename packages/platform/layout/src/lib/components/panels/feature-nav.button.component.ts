import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, Scroll, UrlSegment } from '@angular/router'
import { ZWPPanelLayoutFacade } from '../../+state/facades'
import { ZWPRouterFacade } from '@zwp/platform.common'
import { Observable, filter, map } from 'rxjs'
import { PanelPosition } from '../../model'

@Component({
    selector: 'zwp-feature-nav-button',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-md-button                     
            materialType="flat" [label]="currentRouteTitle()" [icon]="currentRouteIcon()" [iconTextStyle]="'subheadline'" [textStyle]="'button1'"
            [layoutGap]="'8px'"
            [backgroundColor]="'secondary-system-background' | zwpColorTheme" [labelColor]="'primary' | zwpColorTheme"
            [matMenuTriggerFor]="featureNavMenu"
            #featureNavMenuTrigger="matMenuTrigger"
        ></zwp-md-button>
        <mat-menu #featureNavMenu="matMenu" >
            <div 
                fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="8px" 
                zwpBackgroundColor="tertiary-system-background" [style.marginTop]="'-8px'" [style.marginBottom]="'-8px'" zwpPadding="10px">
                <zwp-md-button *ngFor="let child of routeChildren | async"
                    (btnClick)="navigateRoute(child.path)"
                    [label]="child.navTitle" [icon]="child.navIcon" [iconTextStyle]="'subheadline'" [textStyle]="'button1'"
                    [textStyle]="'button1'"
                    [backgroundColor]="'clear' | zwpColorTheme" 
                    [labelColor]="'primary' | zwpColorTheme"
                    [padding]="'10 50 10 15'"
                    [layoutGap]="'10px'"
                ></zwp-md-button>
            </div>
        </mat-menu>
    `
})
export class FeatureNavButtonComponent {
    private route: ActivatedRoute = inject(ActivatedRoute)
    private router = inject(Router)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)

    // routeChildren = this.route.routeConfig?.children?.filter((child) => child.data?.['leftNavPanelShown'] === true)
    //     .map(child =>
    //         ({ path: `./${child.path}`, navTitle: child.data?.['navTitle'] ?? '', navIcon: child.data?.['navIcon'] ?? 'atr' })
    //     )

    constructor() {
        this.routeChildren = this.router.events.pipe(
            filter((e): e is NavigationEnd | Scroll => e instanceof NavigationEnd || e instanceof Scroll),
            map(() => {
                return (this.route.routeConfig?.children ?? [])
                    .filter((child) => child.data?.['featureNavShown'] === true)
                    .map(child =>
                        ({ path: `./${child.path}`, navTitle: child.data?.['featureNavTitle'] ?? '', navIcon: child.data?.['featureNavIcon'] ?? 'atr' })
                    )
            })
        )
    }

    routeChildren: Observable<{ path: string; navTitle: any; navIcon: any; }[]>

    navigateRoute(path: string) {
        this.panelLayoutFacade.collapsePanel(PanelPosition.left)
        this.router.navigate([path])
    }

    currentRouteTitle = () => {
        return this.route.firstChild?.routeConfig?.data?.['featureNavTitle'] ?? ''
    }

    currentRouteIcon = () => {
        return this.route.firstChild?.routeConfig?.data?.['featureNavIcon'] ?? ''
    }
}