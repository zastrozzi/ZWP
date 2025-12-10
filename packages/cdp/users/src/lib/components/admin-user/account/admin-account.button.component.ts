import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AdminUserFacade } from "../../../+state/facades";
import { ZWPRouterFacade } from "@zwp/platform.common";

@Component({
    selector: 'cdp-users-admin-account-button',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-md-button 
            [label]="loggedInAdminUserName$ | async" icon="account_circle" [iconTextStyle]="'subheadline'" [textStyle]="'button1'"
            [labelColor]="'system-white' | zwpColorTheme" [iconColor]="'system-white' | zwpColorTheme" [backgroundColor]="'primary' | zwpColorTheme" 
            [matMenuTriggerFor]="adminAccountMenu"
            #adminAccountMenuTrigger="matMenuTrigger"
        ></zwp-md-button>
        <mat-menu #adminAccountMenu="matMenu" >
            <div 
                fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="8px" 
                zwpBackgroundColor="tertiary-system-background" [style.marginTop]="'-8px'" [style.marginBottom]="'-8px'" zwpPadding="10px">
                <zwp-md-button 
                    (btnClick)="navigateAccountDetails()" 
                    icon="badge" 
                    label="Account Details" 
                    [backgroundColor]="'clear' | zwpColorTheme" 
                    [labelColor]="'primary' | zwpColorTheme"
                ></zwp-md-button>
                
                <zwp-md-button 
                    (btnClick)="logout()" 
                    icon="logout" 
                    label="Logout" 
                    [backgroundColor]="'clear' | zwpColorTheme" 
                    [labelColor]="'primary' | zwpColorTheme"
                ></zwp-md-button>
            </div>
        </mat-menu>
    `
})
export class AdminAccountButtonComponent {
    constructor(private adminUserFacade: AdminUserFacade, private router: ZWPRouterFacade) {}

    loggedInAdminUserName$ = this.adminUserFacade.loggedInAdminUserName$

    navigateAccountDetails() {
        this.router.navigate(['/admin/account-details'])
    }

    

    logout() {
        this.adminUserFacade.logoutAdminUser()
    }
}