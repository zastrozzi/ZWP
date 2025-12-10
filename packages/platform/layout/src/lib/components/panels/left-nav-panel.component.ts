import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, Scroll, UrlSegment } from '@angular/router'
import { ZWPPanelLayoutFacade } from '../../+state/facades'
import { ZWPRouterFacade } from '@zwp/platform.common'
import { Observable, filter, map } from 'rxjs'

@Component({
    selector: 'zwp-left-nav-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div 
            fxLayout="column" fxLayoutGap="5px" fxFlexFill
            zwpPadding="5" zwpBackgroundColor="system-background" 
            
        >
            <zwp-md-button *ngFor="let child of routeChildren | async" 
                [routerLink]="child.path" routerLinkActive #rla="routerLinkActive"
                materialType="flat" 
                [label]="child.navTitle" materialType="flat" [icon]="child.navIcon"
                [textStyle]="'button1'" [iconTextStyle]="'headline'"
                [backgroundColor]="rla.isActive ? ('primary' | zwpColorTheme) : ('system-background' | zwpColorTheme)"
                [labelColor]="rla.isActive ? ('system-white' | zwpColorTheme) : ('primary' | zwpColorTheme)"
                [horizontalAlign]="(leftPanelExpanded$ | async) === true ? 'start' : 'center'"
                [padding]="(leftPanelExpanded$ | async) === true ? '12 14' : '12 0'"
                [isCollapsed]="(leftPanelExpanded$ | async) === false"
                [matTooltip]="child.navTitle" matTooltipPosition="after" [matTooltipDisabled]="(tooltipDisabled$ | async)"
            ></zwp-md-button>
        </div>
    `
})
export class LeftNavPanelComponent {
    private route: ActivatedRoute = inject(ActivatedRoute)
    private router = inject(Router)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    leftPanelExpanded$ = this.panelLayoutFacade.leftPanelExpanded$
    leftPanelDisplayMode$ = this.panelLayoutFacade.leftPanelDisplayMode$

    tooltipDisabled$ = this.leftPanelDisplayMode$.pipe(map((mode) => mode !== 'inline'))


    // routeChildren = this.route.routeConfig?.children?.filter((child) => child.data?.['leftNavPanelShown'] === true)
    //     .map(child =>
    //         ({ path: `./${child.path}`, navTitle: child.data?.['navTitle'] ?? '', navIcon: child.data?.['navIcon'] ?? 'atr' })
    //     )

    constructor() {
        this.routeChildren = this.router.events.pipe(
            filter((e): e is NavigationEnd | Scroll => e instanceof NavigationEnd || e instanceof Scroll),
            map(() => {
                return (this.route.pathFromRoot[1].routeConfig?.children ?? []).flatMap((child) => child.children?.map((subChild) => ({parentPath: child.path, ...subChild})) ?? [])
                    .filter((child) => child.data?.['leftNavPanelShown'] === true)
                    .filter((child) => (this.route.firstChild?.routeConfig?.path ?? '') === child.parentPath)
                    .map(child =>
                        ({ path: `./${child.parentPath}/${child.path}`, navTitle: child.data?.['navTitle'] ?? '', navIcon: child.data?.['navIcon'] ?? 'atr' })
                    )
                
            })
        )
        
    }

    routeChildren: Observable<{ path: string; navTitle: any; navIcon: any; }[]>
}