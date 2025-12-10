import { Component, ChangeDetectionStrategy, OnInit, inject, OnDestroy } from '@angular/core'

import { ActivatedRoute } from '@angular/router'
import { UKGovernmentHMRC } from '@zwp/ukgov.hmrc'
import { State } from '../../+state'
import { MatDialog } from '@angular/material/dialog'
import { DeleteConfirmationDialogComponent, ZWPDeleteConfirmationData } from '@zwp/platform.common'
import { Model } from '../../model'
import { ZWPPopupLayoutFacade } from '@zwp/platform.layout'

@Component({
    selector: 'urnet-mnet-merchant-detail-route',
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
                    <span [zwpTextStyle]="'subheadline'" zwpColor="label">Merchant Details</span>       
                    <span [zwpTextStyle]="'caption1'" [style.color]="'system-gray3' | zwpColorTheme">{{ (selectedMerchant$ | async)?.id }}</span>
                    <span fxFlexOffset="10px" [zwpTextStyle]="'caption1'" zwpColor="label">Name</span>    
                    <span [zwpTextStyle]="'body1'" [style.color]="'primary' | zwpColorTheme">{{ (selectedMerchant$ | async)?.merchantName }}</span>
                    <div fxLayout="row" fxFlexAlign="end" fxLayoutAlign="start stretch" fxFlex fxLayoutGap="5px" [style.color]="'system-gray3' | zwpColorTheme">
                        <span [zwpTextStyle]="'caption1'">Created</span>
                        <span [zwpTextStyle]="'caption1'">{{ (selectedMerchant$ | async)?.dbCreatedAt | date: 'yyyy/MM/dd HH:mm:ss' }}</span>
                    </div>
                    <div fxLayout="row" fxFlexAlign="end" fxLayoutAlign="start stretch" fxFlex fxLayoutGap="5px" [style.color]="'system-gray3' | zwpColorTheme">
                        <span [zwpTextStyle]="'caption1'">Last Updated</span>
                        <span [zwpTextStyle]="'caption1'">{{ (selectedMerchant$ | async)?.dbUpdatedAt | date: 'yyyy/MM/dd HH:mm:ss' }}</span>
                    </div>
                </div>
                
                <div 
                    fxLayout="column" fxLayoutAlign="start start"
                    zwpPadding="10" fxLayoutGap="5px" zwpCorners="10" fxFlexOffset="5px"
                    [style.backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                >
                    <span [zwpTextStyle]="'subheadline'" >Preferences</span>       
                    <!-- <span fxFlexOffset="10px" [zwpTextStyle]="'caption1'">Primary Email</span>     -->
                </div>
                </ng-container>

                <ng-container *ngIf="selectedMerchant$ | async as merchant" actions>
                    <!-- <zwp-md-button
                        label="Send Email" icon="email" [iconTextStyle]="'subheadline'"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme" 
                    ></zwp-md-button> -->
                    <zwp-md-button
                        label="Open Ticket" icon="message" [iconTextStyle]="'subheadline'"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme" 
                    ></zwp-md-button>
                    <zwp-md-button
                        label="Delete Merchant" icon="delete" [iconTextStyle]="'subheadline'" (btnClick)="deleteMerchant(merchant)"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme" [labelColor]="'destructive' | zwpColorTheme"
                    ></zwp-md-button>
                </ng-container>
            </zwp-actioned-detail-panel>
            <zwp-divider [vertical]="true"></zwp-divider>
            <zwp-tabbed-nav-panel fxFlex="grow"></zwp-tabbed-nav-panel>
        </div>
        
    `
})
export class MerchantDetailRouteComponent implements OnInit, OnDestroy {
    private route = inject(ActivatedRoute)
    private merchantFacade = inject(State.Facades.MerchantFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)

    selectedMerchant$ = this.merchantFacade.selectedMerchant$

    ngOnInit() {
        this.merchantFacade.selectMerchant(this.route.snapshot.params['merchantId'])
    }

    ngOnDestroy() {
        this.merchantFacade.deselectMerchant()
    }

    printRouteChildren() {
        console.log(this.route.routeConfig?.children)
    }

    deleteMerchant(merchant: Model.MerchantResponse) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Merchant',
                message: `Are you sure you want to delete ${merchant.merchantName}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete'
            },
            () => {
                this.merchantFacade.deleteMerchant(merchant.id)
            }
        )
    }
}