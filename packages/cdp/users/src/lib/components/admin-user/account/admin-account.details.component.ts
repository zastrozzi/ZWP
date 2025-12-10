import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { AdminUserFacade } from '../../../+state/facades'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'cdp-users-admin-account-details',
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
                    <span [zwpTextStyle]="'subheadline'" [style.color]="'label' | zwpColorTheme">Account Details</span>       
                    <span [zwpTextStyle]="'caption1'" [style.color]="'system-gray3' | zwpColorTheme">{{ (loggedInAdminUser$ | async)?.id }}</span>
                    <span fxFlexOffset="10px" [zwpTextStyle]="'caption1'" [style.color]="'label' | zwpColorTheme">First Name</span>    
                    <span [zwpTextStyle]="'body1'" [style.color]="'primary' | zwpColorTheme">{{ (loggedInAdminUser$ | async)?.firstName }}</span>
                    <span [zwpTextStyle]="'caption1'" [style.color]="'label' | zwpColorTheme">Last Name</span>
                    <span [zwpTextStyle]="'body1'" [style.color]="'primary' | zwpColorTheme">{{ (loggedInAdminUser$ | async)?.lastName }}</span>
                    <span [zwpTextStyle]="'caption1'" [style.color]="'label' | zwpColorTheme">Role</span>
                    <span [zwpTextStyle]="'body1'" [style.color]="'primary' | zwpColorTheme">{{ (loggedInAdminUser$ | async)?.role }}</span>
                    <span [zwpTextStyle]="'caption1'" [style.color]="'label' | zwpColorTheme">Current Status</span>
                    <span [zwpTextStyle]="'body1'" [style.color]="'primary' | zwpColorTheme">Offline</span>
                    <span [zwpTextStyle]="'caption1'" [style.color]="'label' | zwpColorTheme">Last Seen At</span>
                    <span [zwpTextStyle]="'body1'" [style.color]="'primary' | zwpColorTheme">{{ (loggedInAdminUser$ | async)?.dbCreatedAt | date: 'yyyy/MM/dd HH:mm:ss' }}</span>
                    <div fxLayout="row" fxFlexAlign="end" fxLayoutAlign="start stretch" fxFlex fxLayoutGap="5px" [style.color]="'system-gray3' | zwpColorTheme">
                        <span [zwpTextStyle]="'caption1'">Created</span>
                        <span [zwpTextStyle]="'caption1'">{{ (loggedInAdminUser$ | async)?.dbCreatedAt | date: 'yyyy/MM/dd HH:mm:ss' }}</span>
                    </div>
                    <div fxLayout="row" fxFlexAlign="end" fxLayoutAlign="start stretch" fxFlex fxLayoutGap="5px" [style.color]="'system-gray3' | zwpColorTheme">
                        <span [zwpTextStyle]="'caption1'">Last Updated</span>
                        <span [zwpTextStyle]="'caption1'">{{ (loggedInAdminUser$ | async)?.dbUpdatedAt | date: 'yyyy/MM/dd HH:mm:ss' }}</span>
                    </div>
                </div>
                </ng-container>

                <ng-container actions>
                    <zwp-md-button
                        label="Send Email" icon="email" [iconTextStyle]="'subheadline'"
                        [labelColor]="'primary' | zwpColorTheme"
                        
                    ></zwp-md-button>
                    <zwp-md-button
                        label="Open Ticket" icon="message" [iconTextStyle]="'subheadline'"
                        [labelColor]="'primary' | zwpColorTheme"
                        
                    ></zwp-md-button>
                    <zwp-md-button
                        label="Delete Account" icon="delete" [iconTextStyle]="'subheadline'"
                        [labelColor]="'destructive' | zwpColorTheme"
                    ></zwp-md-button>
                </ng-container>
            </zwp-actioned-detail-panel>
            <zwp-divider [vertical]="true"></zwp-divider>
            <zwp-tabbed-nav-panel fxFlex="grow"></zwp-tabbed-nav-panel>
        </div>
        
    `
})
export class AdminAccountDetailsComponent implements OnInit {
    constructor(private adminUserFacade: AdminUserFacade, private route: ActivatedRoute) {}

    loggedInAdminUser$ = this.adminUserFacade.loggedInAdminUser$

    ngOnInit() {
        this.loggedInAdminUser$.subscribe(adminUser => {
            if (adminUser) {
                this.adminUserFacade.selectAdminUser(adminUser.id)
                // this.adminUserFacade.listAdminUserEmails(adminUser.id)
                // this.adminUserFacade.listAdminUserCredentials(adminUser.id)
                // this.adminUserFacade.listAdminUserDevices(adminUser.id)
            }  
        })
    }

    printRouteChildren() {
        console.log(this.route.routeConfig?.children)
    }
}