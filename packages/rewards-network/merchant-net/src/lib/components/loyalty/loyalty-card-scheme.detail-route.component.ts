import { Component, ChangeDetectionStrategy, OnInit, inject, OnDestroy } from '@angular/core'

import { ActivatedRoute } from '@angular/router'
import { State } from '../../+state'
import { Model } from '../../model'
import { ZWPPopupLayoutFacade } from '@zwp/platform.layout'
import { tap } from 'rxjs'
import { isUndefined, ZWPRouterFacade } from '@zwp/platform.common'

@Component({
    selector: 'urnet-mnet-loyalty-card-scheme-detail-route',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="row" fxLayoutAlign="start stretch" fxFlexFill>
            <zwp-actioned-detail-panel panelWidth="400px">
                <ng-container detail *ngIf="selectedLoyaltyCardScheme$ | async as loyaltyCardScheme">
                    <div
                        fxLayout="column"
                        fxLayoutAlign="start start"
                        zwpPadding="10"
                        fxLayoutGap="5px"
                        zwpCorners="5"
                        zwpBackgroundColor="quaternary-system-fill"
                    >
                        <span [zwpTextStyle]="'subheadline'" zwpColor="label">{{
                            loyaltyCardScheme.displayName
                        }}</span>
                        <span [zwpTextStyle]="'caption2'" zwpColor="secondary-label">Loyalty Card Scheme</span>
                        <span [zwpTextStyle]="'caption1'" zwpColor="tertiary-label">{{
                            loyaltyCardScheme.id
                        }}</span>
                    </div>
                    <zwp-labelled-property
                        [label]="'Display Name'"
                        [property]="loyaltyCardScheme.displayName"
                    />
                    <zwp-labelled-property
                        [label]="'Created At'"
                        [property]="loyaltyCardScheme.dbCreatedAt | date : 'yyyy/MM/dd HH:mm:ss'"
                    />
                    <zwp-labelled-property
                        [label]="'Updated At'"
                        [property]="loyaltyCardScheme.dbUpdatedAt | date : 'yyyy/MM/dd HH:mm:ss'"
                    />
                    <zwp-labelled-property
                        [label]="'Status'"
                        [property]="loyaltyCardScheme.status | zwpTransformEnum : statusEnumSignature"
                    />
                    <zwp-labelled-property
                        [label]="'Logo URL'"
                        [property]="loyaltyCardScheme.logoUrl ?? ''"
                        layout="column"
                    />
                    <div fxFlexAlign="stretch" fxFlexOffset="10px" [style.position]="'relative'">
                        <img
                            zwpCorners="5"
                            [ngSrc]="loyaltyCardScheme.logoUrl ?? ''"
                            fill
                            [style.height]="'auto'"
                            [style.position]="'relative'"
                            priority
                        />
                    </div>
                    <urnet-mnet-loyalty-card-scheme-brand-selector [merchantId]="loyaltyCardScheme.merchantId" [loyaltyCardSchemeId]="loyaltyCardScheme.id"/>
                </ng-container>

                <ng-container actions *ngIf="selectedLoyaltyCardScheme$ | async as loyaltyCardScheme">
                    <zwp-md-button
                        label="Open Ticket"
                        icon="message"
                        [iconTextStyle]="'subheadline'"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme"
                    ></zwp-md-button>
                    <zwp-md-button
                        label="Delete Loyalty Card Scheme"
                        icon="delete"
                        [iconTextStyle]="'subheadline'"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme"
                        [labelColor]="'destructive' | zwpColorTheme"
                        (btnClick)="deleteLoyaltyCardScheme(loyaltyCardScheme)"
                    ></zwp-md-button>
                </ng-container>
            </zwp-actioned-detail-panel>
            <zwp-divider [vertical]="true"></zwp-divider>
            <zwp-tabbed-nav-panel fxFlex="grow"></zwp-tabbed-nav-panel>
        </div>
    `,
})
export class LoyaltyCardSchemeDetailRouteComponent implements OnInit, OnDestroy {
    private route = inject(ActivatedRoute)
    private loyaltyCardSchemeFacade = inject(State.Facades.LoyaltyCardSchemeFacade)
    private merchantFacade = inject(State.Facades.MerchantFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)

    selectedLoyaltyCardScheme$ = this.loyaltyCardSchemeFacade.selectedLoyaltyCardScheme$
    
    statusEnumSignature = Model.loyaltyCardSchemeStatusLabelPipeSignature
    

    ngOnInit() {
        this.loyaltyCardSchemeFacade.selectLoyaltyCardScheme(this.route.snapshot.params['loyaltyCardSchemeId'])
    }

    ngOnDestroy() {
        this.loyaltyCardSchemeFacade.deselectLoyaltyCardScheme()
    }

    printRouteChildren() {
        console.log(this.route.routeConfig?.children)
    }

    deleteLoyaltyCardScheme(loyaltyCardScheme: Model.LoyaltyCardSchemeResponse) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete LoyaltyCardScheme',
                message: `Are you sure you want to delete ${loyaltyCardScheme.displayName}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
                confirmPermanentButtonLabel: 'Delete Permanently'
            },
            () => {
                this.loyaltyCardSchemeFacade.deleteLoyaltyCardScheme(loyaltyCardScheme.id, false)
            },
            () => {
                this.loyaltyCardSchemeFacade.deleteLoyaltyCardScheme(loyaltyCardScheme.id, true)
            }
        )
    }

    
}
