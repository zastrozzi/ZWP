import { Component, ChangeDetectionStrategy, OnInit, inject, OnDestroy } from '@angular/core'

import { ActivatedRoute } from '@angular/router'
import { UKGovernmentHMRC } from '@zwp/ukgov.hmrc'
import { State } from '../../+state'
import { Model } from '../../model'
import { DeleteConfirmationDialogComponent, ZWPDeleteConfirmationData } from '@zwp/platform.common'
import { MatDialog } from '@angular/material/dialog'
import { ZWPPopupLayoutFacade } from '@zwp/platform.layout'

@Component({
    selector: 'urnet-mnet-brand-detail-route',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="row" fxLayoutAlign="start stretch" fxFlexFill>
            <zwp-actioned-detail-panel panelWidth="400px">
                <ng-container detail *ngIf="selectedBrand$ | async as brand">
                    <div
                        fxLayout="column"
                        fxLayoutAlign="start start"
                        zwpPadding="10"
                        fxLayoutGap="5px"
                        zwpCorners="5"
                        zwpBackgroundColor="quaternary-system-fill"
                    >
                        <span [zwpTextStyle]="'subheadline'" zwpColor="label">{{
                            brand.brandName
                        }}</span>
                        <span [zwpTextStyle]="'caption2'" zwpColor="secondary-label">Brand</span>
                        <span [zwpTextStyle]="'caption1'" zwpColor="tertiary-label">{{
                            brand.id
                        }}</span>
                    </div>
                    <zwp-labelled-property
                        [label]="'Brand Name'"
                        [property]="brand.brandName"
                    />
                    <zwp-labelled-property
                        [label]="'Created At'"
                        [property]="brand.dbCreatedAt | date : 'yyyy/MM/dd HH:mm:ss'"
                    />
                    <zwp-labelled-property
                        [label]="'Updated At'"
                        [property]="brand.dbUpdatedAt | date : 'yyyy/MM/dd HH:mm:ss'"
                    />
                    <zwp-labelled-property
                        [label]="'Status'"
                        [property]="brand.status | zwpTransformEnum : statusEnumSignature"
                    />
                    <zwp-divider/>
                    <urnet-mnet-brand-tillo-brand-selector [brandId]="brand.id"/>
                </ng-container>

                <ng-container actions *ngIf="selectedBrand$ | async as brand">
                    <zwp-md-button
                        label="Open Ticket"
                        icon="message"
                        [iconTextStyle]="'subheadline'"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme"
                    ></zwp-md-button>
                    <zwp-md-button
                        label="Delete Brand"
                        icon="delete"
                        [iconTextStyle]="'subheadline'"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme"
                        [labelColor]="'destructive' | zwpColorTheme"
                        (btnClick)="deleteBrand(brand)"
                    ></zwp-md-button>
                </ng-container>
            </zwp-actioned-detail-panel>
            <zwp-divider [vertical]="true"></zwp-divider>
            <zwp-tabbed-nav-panel fxFlex="grow"></zwp-tabbed-nav-panel>
        </div>
    `,
})
export class BrandDetailRouteComponent implements OnInit, OnDestroy {
    private route = inject(ActivatedRoute)
    private brandFacade = inject(State.Facades.BrandFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)

    statusEnumSignature = Model.brandStatusLabelPipeSignature

    selectedBrand$ = this.brandFacade.selectedBrand$

    ngOnInit() {
        this.brandFacade.selectBrand(this.route.snapshot.params['brandId'])
    }

    ngOnDestroy() {
        this.brandFacade.deselectBrand()
    }

    printRouteChildren() {
        // console.log(this.route.routeConfig?.children)
    }

    deleteBrand(brand: Model.BrandResponse) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Brand',
                message: `Are you sure you want to delete ${brand.brandName}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
            },
            () => {
                this.brandFacade.deleteBrand(brand.id)
            }
        )
    }
}
