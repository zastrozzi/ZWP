import { Component, ChangeDetectionStrategy, OnInit, inject, OnDestroy } from '@angular/core'

import { ActivatedRoute } from '@angular/router'
import { State } from '../../+state'
import { Model } from '../../model'
import { DeleteConfirmationDialogComponent, ZWPDeleteConfirmationData } from '@zwp/platform.common'
import { MatDialog } from '@angular/material/dialog'
import { ZWPPopupLayoutFacade } from '@zwp/platform.layout'

@Component({
    selector: 'urnet-mnet-offer-detail-route',
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
                    <span [zwpTextStyle]="'subheadline'" zwpColor="label">Offer Details</span>       
                    <span [zwpTextStyle]="'caption1'" [style.color]="'system-gray3' | zwpColorTheme">{{ (selectedOffer$ | async)?.id }}</span>
                    <span fxFlexOffset="10px" [zwpTextStyle]="'caption1'" zwpColor="label">Name</span>    
                    <span [zwpTextStyle]="'body1'" [style.color]="'primary' | zwpColorTheme">{{ (selectedOffer$ | async)?.title }}</span>
                    <div fxLayout="row" fxFlexAlign="end" fxLayoutAlign="start stretch" fxFlex fxLayoutGap="5px" [style.color]="'system-gray3' | zwpColorTheme">
                        <span [zwpTextStyle]="'caption1'">Created</span>
                        <span [zwpTextStyle]="'caption1'">{{ (selectedOffer$ | async)?.dbCreatedAt | date: 'yyyy/MM/dd HH:mm:ss' }}</span>
                    </div>
                    <div fxLayout="row" fxFlexAlign="end" fxLayoutAlign="start stretch" fxFlex fxLayoutGap="5px" [style.color]="'system-gray3' | zwpColorTheme">
                        <span [zwpTextStyle]="'caption1'">Last Updated</span>
                        <span [zwpTextStyle]="'caption1'">{{ (selectedOffer$ | async)?.dbUpdatedAt | date: 'yyyy/MM/dd HH:mm:ss' }}</span>
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

                <ng-container actions *ngIf="selectedOffer$ | async as offer">
                    <!-- <zwp-md-button
                        label="Send Email" icon="email" [iconTextStyle]="'subheadline'"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme" 
                    ></zwp-md-button> -->
                    <zwp-md-button
                        label="Open Ticket" icon="message" [iconTextStyle]="'subheadline'"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme" 
                    ></zwp-md-button>
                    <zwp-md-button
                        label="Delete Offer" icon="delete" [iconTextStyle]="'subheadline'"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme" [labelColor]="'destructive' | zwpColorTheme"
                        (btnClick)="deleteOffer(offer)"
                    ></zwp-md-button>
                </ng-container>
            </zwp-actioned-detail-panel>
            <zwp-divider [vertical]="true"></zwp-divider>
            <zwp-tabbed-nav-panel fxFlex="grow"></zwp-tabbed-nav-panel>
        </div>
        
    `
})
export class OfferDetailRouteComponent implements OnInit, OnDestroy {
    private route = inject(ActivatedRoute)
    private offerFacade = inject(State.Facades.OfferFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)

    selectedOffer$ = this.offerFacade.selectedOffer$

    ngOnInit() {
        this.offerFacade.selectOffer(this.route.snapshot.params['offerId'])
    }

    ngOnDestroy() {
        this.offerFacade.deselectOffer()
    }

    printRouteChildren() {
        // console.log(this.route.routeConfig?.children)
    }

    deleteOffer(offer: Model.OfferResponse) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Offer',
                message: `Are you sure you want to delete ${offer.title}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete'
            },
            () => { this.offerFacade.deleteOffer(offer.id) }
        )
    }
}