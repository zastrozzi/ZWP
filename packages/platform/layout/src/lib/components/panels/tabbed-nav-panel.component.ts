import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { ActivatedRoute, Route } from '@angular/router'
import { isNull, resolveChildRouteSnapshots, resolveRelativeChildRoutePath, RouteData } from '@zwp/platform.common'

@Component({
    selector: 'zwp-tabbed-nav-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            fxLayout="column"
            fxLayoutAlign="start stretch"
            fxFlex="grow"
            [style.width]="'0px'"
        >
            <div
                fxLayout="row"
                zwpCustomScroll
                [scrollDirection]="'horizontal'"
                [scrollbarMode]="'custom'"
                fxLayoutAlign="start stretch"
            >
                <div
                    fxLayout="row"
                    fxLayoutAlign="start stretch"
                    fxLayoutGap="10px"
                    zwpPadding="5"
                >
                    <ng-container *ngFor="let child of routeChildren">
                        <zwp-md-button
                            *ngIf="!child.tabbedDropdown"
                            [routerLink]="child.path"
                            routerLinkActive
                            #rla="routerLinkActive"
                            [textStyle]="'button1'"
                            [label]="child.navTitle"
                            materialType="flat"
                            [icon]="child.navIcon"
                            [backgroundColor]="
                                rla.isActive
                                    ? ('primary' | zwpColorTheme)
                                    : ('quaternary-system-fill' | zwpColorTheme)
                            "
                            [labelColor]="
                                rla.isActive
                                    ? ('system-white' | zwpColorTheme)
                                    : ('primary' | zwpColorTheme)
                            "
                        >
                        </zwp-md-button>
                        <zwp-md-button
                            *ngIf="child.tabbedDropdown"
                            [textStyle]="'button1'"
                            [label]="getTabName(child)"
                            materialType="flat"
                            [icon]="child.navIcon"
                            [matMenuTriggerFor]="tabbedDropdownMenu"
                            #tabbedDropdownMenuTrigger="matMenuTrigger"
                            routerLinkActive
                            #rla="routerLinkActive"
                            [backgroundColor]="
                                tabbedDropdownMenuTrigger.menuOpen || rla.isActive
                                    ? ('primary' | zwpColorTheme)
                                    : ('quaternary-system-fill' | zwpColorTheme)
                            "
                            [labelColor]="
                                tabbedDropdownMenuTrigger.menuOpen || rla.isActive
                                    ? ('system-white' | zwpColorTheme)
                                    : ('primary' | zwpColorTheme)
                            "
                        >
                            <mat-menu #tabbedDropdownMenu="matMenu" >
                                <div 
                                    fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="8px" 
                                    zwpBackgroundColor="tertiary-system-background" [style.marginTop]="'-8px'" [style.marginBottom]="'-8px'" zwpPadding="10px">
                                    <ng-container *ngFor="let dropdownChild of child.children">
                                        <zwp-md-button 
                                            [routerLink]="dropdownChild.path"
                                            [backgroundColor]="'clear' | zwpColorTheme" 
                                            [labelColor]="'primary' | zwpColorTheme"
                                            [label]="dropdownChild.navTitle"
                                            [icon]="dropdownChild.navIcon"
                                            (btnClick)="tabbedDropdownMenuTrigger.closeMenu()"
                                        ></zwp-md-button>
                                    </ng-container>
                                </div>
                            </mat-menu>
                        </zwp-md-button>
                    </ng-container>

                    <!-- <span [style.color]="rla.isActive ? ('primary' | zwpColorTheme) : ('system-gray2' | zwpColorTheme)" [zwpTextStyle]="'button2'">{{ child.navTitle }}</span> -->
                </div>
            </div>
            <zwp-divider></zwp-divider>
            <div fxFlex="grow" zwpFullHeight>
                <router-outlet></router-outlet>
            </div>
        </div>
    `,
})
export class TabbedNavPanelComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}

    routeChildren: RouteData[] = []

    ngOnInit() {
        this.routeChildren = this.route
            .routeConfig?.children?.filter((child) => child.data?.['tabbedNavShown'] ?? false)
            .map((child) => {
                if (child.data?.['tabbedDropdown'] ?? false) {
                    return {
                        path: `./${child.path}`,
                        tabbedDropdown: true,
                        navTitle: child.data?.['navTitle'] ?? '',
                        navIcon: child.data?.['navIcon'] ?? 'atr',
                        children: child.children?.map((dropdownChild) => {
                            return {
                                path: `./${child.path}/${dropdownChild.path}`,
                                tabbedDropdown: false,
                                navTitle: dropdownChild.data?.['navTitle'] ?? '',
                                navIcon: dropdownChild.data?.['navIcon'] ?? 'atr'
                            }
                        })
                    }
                } else {
                    return {
                        path: `./${child.path}`,
                        tabbedDropdown: false,
                        navTitle: child.data?.['navTitle'] ?? '',
                        navIcon: child.data?.['navIcon'] ?? 'atr',
                    }
                }
            }) ?? []
    }

    getTabName(child: RouteData) {
        const activeRelativePath = resolveRelativeChildRoutePath(this.route.snapshot)
        const flattenedRouteData = this.flattenRouteData(child)
        const matchedRoute = flattenedRouteData.find((route) => route.path === activeRelativePath) ?? null
        if (isNull(matchedRoute)) { return child.navTitle } 
        else { return matchedRoute.navTitle }
    }

    flattenRouteData(routeData: RouteData): RouteData[] {
        const flattened: RouteData[] = []
        if (routeData.children) {
            routeData.children.forEach((child) => {
                flattened.push(child)
                flattened.push(...this.flattenRouteData(child))
            })
        }
        return flattened
    }
}