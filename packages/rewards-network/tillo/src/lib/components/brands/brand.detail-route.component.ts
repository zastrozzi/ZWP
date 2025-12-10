import { Component, ChangeDetectionStrategy, OnInit, inject, OnDestroy } from '@angular/core'

import { ActivatedRoute } from '@angular/router'
import { State } from '../../+state'
import { Model } from '../../model'
import { DeleteConfirmationDialogComponent, ZWPDeleteConfirmationData } from '@zwp/platform.common'
import { MatDialog } from '@angular/material/dialog'
import { ZWPPopupLayoutFacade } from '@zwp/platform.layout'

@Component({
    selector: 'rewards-network-tillo-brand-detail-route',
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
                            brand.name
                        }}</span>
                        <span [zwpTextStyle]="'caption2'" zwpColor="secondary-label">Tillo Brand</span>
                        <span [zwpTextStyle]="'caption1'" zwpColor="tertiary-label">{{
                            brand.id
                        }}</span>
                    </div>
                    <zwp-labelled-property
                        [label]="'Brand Name'"
                        [property]="brand.name"
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
                        [property]="brand.status.code | zwpTransformEnum : statusEnumSignature"
                    />
                    <zwp-divider/>
                    <router-outlet name="tillo-brand-detail"></router-outlet>
                </ng-container>

                <ng-container actions *ngIf="selectedBrand$ | async as brand">
                    <zwp-md-button
                        label="Open Ticket" icon="message" [iconTextStyle]="'subheadline'"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme" 
                    ></zwp-md-button>
                    <zwp-md-button
                        label="Delete Brand" icon="delete" [iconTextStyle]="'subheadline'"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme" [labelColor]="'destructive' | zwpColorTheme"
                        (btnClick)="onDeleteClicked(brand)"
                    ></zwp-md-button>
                </ng-container>
            </zwp-actioned-detail-panel>
            <zwp-divider [vertical]="true"></zwp-divider>
            <zwp-tabbed-nav-panel fxFlex="grow"></zwp-tabbed-nav-panel>
        </div>
    `
})
export class TilloBrandDetailRouteComponent implements OnInit, OnDestroy {
    private route = inject(ActivatedRoute)
    private tilloBrandFacade = inject(State.Facades.TilloBrandFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)

    statusEnumSignature = Model.brandStatusLabelPipeSignature

    selectedBrand$ = this.tilloBrandFacade.selectedBrand$

    ngOnInit() {
        this.tilloBrandFacade.selectBrand(this.route.snapshot.params['brandId'])
    }

    ngOnDestroy() {
        this.tilloBrandFacade.deselectBrand()
    }

    
    onDeleteClicked(row: Model.BrandResponse) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Brand',
                message: `Are you sure you want to delete the brand ${row.name}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
                confirmPermanentButtonLabel: 'Delete Permanently'
            },
            () => { this.tilloBrandFacade.deleteBrand(row.id) }
        )
    }
}