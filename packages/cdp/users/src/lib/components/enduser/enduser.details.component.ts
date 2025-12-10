import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core'
import { EnduserFacade } from '../../+state/facades'
import { ActivatedRoute } from '@angular/router'
import { UKGovernmentHMRC } from '@zwp/ukgov.hmrc'
import { isNull, ZWPRouterFacade, Nullable } from '@zwp/platform.common'

@Component({
    selector: 'cdp-users-enduser-details',
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
                    <span [zwpTextStyle]="'caption1'" [style.color]="'system-gray3' | zwpColorTheme">{{ (selectedEnduser$ | async)?.id }}</span>
                    <span fxFlexOffset="10px" [zwpTextStyle]="'caption1'" zwpColor="label">First Name</span>    
                    <span [zwpTextStyle]="'body1'" [style.color]="'primary' | zwpColorTheme">{{ (selectedEnduser$ | async)?.firstName }}</span>
                    <span [zwpTextStyle]="'caption1'" zwpColor="label">Last Name</span>
                    <span [zwpTextStyle]="'body1'" [style.color]="'primary' | zwpColorTheme">{{ (selectedEnduser$ | async)?.lastName }}</span>
                    <span [zwpTextStyle]="'caption1'" zwpColor="label">Current Status</span>
                    <span [zwpTextStyle]="'body1'" [style.color]="'primary' | zwpColorTheme">Offline</span>
                    <span [zwpTextStyle]="'caption1'" zwpColor="label">Last Seen At</span>
                    <span [zwpTextStyle]="'body1'" [style.color]="'primary' | zwpColorTheme">{{ (selectedEnduser$ | async)?.dbCreatedAt | date: 'yyyy/MM/dd HH:mm:ss' }}</span>
                    <div fxLayout="row" fxFlexAlign="end" fxLayoutAlign="start stretch" fxFlex fxLayoutGap="5px" [style.color]="'system-gray3' | zwpColorTheme">
                        <span [zwpTextStyle]="'caption1'">Created</span>
                        <span [zwpTextStyle]="'caption1'">{{ (selectedEnduser$ | async)?.dbCreatedAt | date: 'yyyy/MM/dd HH:mm:ss' }}</span>
                    </div>
                    <div fxLayout="row" fxFlexAlign="end" fxLayoutAlign="start stretch" fxFlex fxLayoutGap="5px" [style.color]="'system-gray3' | zwpColorTheme">
                        <span [zwpTextStyle]="'caption1'">Last Updated</span>
                        <span [zwpTextStyle]="'caption1'">{{ (selectedEnduser$ | async)?.dbUpdatedAt | date: 'yyyy/MM/dd HH:mm:ss' }}</span>
                    </div>
                </div>
                
                <div 
                    fxLayout="column" fxLayoutAlign="start start"
                    zwpPadding="10" fxLayoutGap="5px" zwpCorners="10" fxFlexOffset="5px"
                    [style.backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                >
                    <span [zwpTextStyle]="'subheadline'" >Preferences</span>       
                    <span fxFlexOffset="10px" [zwpTextStyle]="'caption1'">Primary Email</span>    
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
                    ></zwp-md-button>
                </ng-container>
            </zwp-actioned-detail-panel>
            <zwp-divider [vertical]="true"></zwp-divider>
            <zwp-tabbed-nav-panel fxFlex="grow"></zwp-tabbed-nav-panel>
        </div>
        
    `
})
export class EnduserDetailsComponent implements OnInit {
    private enduserFacade = inject(EnduserFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private activatedRoute = inject(ActivatedRoute)

    selectedEnduser$ = this.enduserFacade.selectedEnduser$

    async ngOnInit() {
        const enduserId = await this.getEnduserIdFromRoute()
        if (!isNull(enduserId)) {
            this.enduserFacade.selectEnduser(enduserId)
        }
    }

    async getEnduserIdFromRoute(): Promise<Nullable<string>> {
        return await this.routerFacade.getNestedRouteParam('enduserId') ?? null
    }
}