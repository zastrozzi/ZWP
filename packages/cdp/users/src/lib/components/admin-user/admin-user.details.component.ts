import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, inject } from '@angular/core'
import { AdminUserFacade } from '../../+state/facades'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { ZWPRouterFacade, Nullable } from '@zwp/platform.common'

@Component({
    selector: 'cdp-users-admin-user-details',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="row" fxLayoutAlign="start stretch" fxFlexFill>
            <zwp-actioned-detail-panel panelWidth="400px">
                <ng-container detail>
                <div 
                    fxLayout="column" fxLayoutAlign="start start"
                    zwpPadding="10" fxLayoutGap="5px" zwpCorners="10"
                    [style.backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                >
                    <span [zwpTextStyle]="'subheadline'" zwpColor="label">Account Details</span>       
                    <span [zwpTextStyle]="'caption1'" [style.color]="'system-gray3' | zwpColorTheme">{{ (selectedAdminUser$ | async)?.id }}</span>
                    <span fxFlexOffset="10px" [zwpTextStyle]="'caption1'" zwpColor="label">First Name</span>    
                    <span [zwpTextStyle]="'body1'" [style.color]="'primary' | zwpColorTheme">{{ (selectedAdminUser$ | async)?.firstName }}</span>
                    <span [zwpTextStyle]="'caption1'" zwpColor="label">Last Name</span>
                    <span [zwpTextStyle]="'body1'" [style.color]="'primary' | zwpColorTheme">{{ (selectedAdminUser$ | async)?.lastName }}</span>
                    <span [zwpTextStyle]="'caption1'" zwpColor="label">Role</span>
                    <span [zwpTextStyle]="'body1'" [style.color]="'primary' | zwpColorTheme">{{ (selectedAdminUser$ | async)?.role }}</span>
                    <span [zwpTextStyle]="'caption1'" zwpColor="label">Current Status</span>
                    <span [zwpTextStyle]="'body1'" [style.color]="'primary' | zwpColorTheme">Offline</span>
                    <span [zwpTextStyle]="'caption1'" zwpColor="label">Last Seen At</span>
                    <span [zwpTextStyle]="'body1'" [style.color]="'primary' | zwpColorTheme">{{ (selectedAdminUser$ | async)?.dbCreatedAt | date: 'yyyy/MM/dd HH:mm:ss' }}</span>
                    <div fxLayout="row" fxFlexAlign="end" fxLayoutAlign="start stretch" fxFlex fxLayoutGap="5px" [style.color]="'system-gray3' | zwpColorTheme">
                        <span [zwpTextStyle]="'caption1'">Created</span>
                        <span [zwpTextStyle]="'caption1'">{{ (selectedAdminUser$ | async)?.dbCreatedAt | date: 'yyyy/MM/dd HH:mm:ss' }}</span>
                    </div>
                    <div fxLayout="row" fxFlexAlign="end" fxLayoutAlign="start stretch" fxFlex fxLayoutGap="5px" [style.color]="'system-gray3' | zwpColorTheme">
                        <span [zwpTextStyle]="'caption1'">Last Updated</span>
                        <span [zwpTextStyle]="'caption1'">{{ (selectedAdminUser$ | async)?.dbUpdatedAt | date: 'yyyy/MM/dd HH:mm:ss' }}</span>
                    </div>
                </div>
                </ng-container>

                <ng-container actions>
                    <zwp-md-button
                        label="Send Email" icon="email" [iconTextStyle]="'subheadline'"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme" 
                    ></zwp-md-button>
                    <zwp-md-button
                        label="Open Ticket" icon="message" [iconTextStyle]="'subheadline'"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme" 
                    ></zwp-md-button>
                    <zwp-md-button
                        label="Delete Account" icon="delete" [iconTextStyle]="'subheadline'"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme" [labelColor]="'destructive' | zwpColorTheme"
                        (btnClick)="deleteAdminUser()"
                    ></zwp-md-button>
                </ng-container>
            </zwp-actioned-detail-panel>
            <zwp-divider [vertical]="true"></zwp-divider>
            <zwp-tabbed-nav-panel fxFlex="grow"></zwp-tabbed-nav-panel>
        </div>
        
    `
})
export class AdminUserDetailsComponent implements OnInit, OnDestroy {
    constructor(private adminUserFacade: AdminUserFacade, private route: ActivatedRoute) {}
    private router = inject(ZWPRouterFacade)

    selectedAdminUser$ = this.adminUserFacade.selectedAdminUser$
    loggedInAdminUser$ = this.adminUserFacade.loggedInAdminUser$

    private subcsriptions = new Subscription()

    selectedAdminUserId: Nullable<string> = null
    loggedInAdminUserId: Nullable<string> = null

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.adminUserFacade.selectAdminUser(params['id'])
        })

        this.subcsriptions.add(this.selectedAdminUser$.subscribe(adminUser => {
            this.selectedAdminUserId = adminUser?.id ?? null
        }))
        this.subcsriptions.add(this.loggedInAdminUser$.subscribe(adminUser => {
            this.loggedInAdminUserId = adminUser?.id ?? null
        }))
    }

    ngOnDestroy() {
        this.subcsriptions.unsubscribe()
    }

    printRouteChildren() {
        console.log(this.route.routeConfig?.children)
    }

    deleteAdminUser() {
        if (this.selectedAdminUserId) {
            this.adminUserFacade.deleteAdminUser(this.selectedAdminUserId)
        }
    }
}