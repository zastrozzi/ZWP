import { Component, ChangeDetectionStrategy, OnInit, inject, OnDestroy } from '@angular/core'

import { ActivatedRoute } from '@angular/router'
import { UKGovernmentHMRC } from '@zwp/ukgov.hmrc'
import { State } from '../../+state'
import { Model } from '../../model'
import { DeleteConfirmationDialogComponent, ZWPDeleteConfirmationData } from '@zwp/platform.common'
import { MatDialog } from '@angular/material/dialog'
import { ZWPPopupLayoutFacade } from '@zwp/platform.layout'

@Component({
    selector: 'kgc-storage-bucket-detail-route',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="row" fxLayoutAlign="start stretch" fxFlexFill>
            <zwp-actioned-detail-panel panelWidth="350px">
                <ng-container detail *ngIf="selectedStorageBucket$ | async as storageBucket">
                    <div
                        fxLayout="column"
                        fxLayoutAlign="start stretch"
                        zwpPadding="10"
                        fxLayoutGap="5px"
                        zwpCorners="10"
                        [style.backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                    >
                        <span [zwpTextStyle]="'subheadline'" zwpColor="label">Storage Bucket Details</span>
                        <span [zwpTextStyle]="'caption1'" [style.color]="'system-gray3' | zwpColorTheme">{{
                            storageBucket.id
                        }}</span>
                        <div
                            fxLayout="row"
                            fxFlexAlign="end"
                            fxLayoutAlign="start stretch"
                            fxFlex
                            fxLayoutGap="5px"
                            [style.color]="'system-gray3' | zwpColorTheme"
                        >
                            <span [zwpTextStyle]="'caption1'">Created</span>
                            <span [zwpTextStyle]="'caption1'">{{
                                storageBucket.dbCreatedAt | date : 'yyyy/MM/dd HH:mm:ss'
                            }}</span>
                        </div>
                        <div
                            fxLayout="row"
                            fxFlexAlign="end"
                            fxLayoutAlign="start stretch"
                            fxFlex
                            fxLayoutGap="5px"
                            [style.color]="'system-gray3' | zwpColorTheme"
                        >
                            <span [zwpTextStyle]="'caption1'">Last Updated</span>
                            <span [zwpTextStyle]="'caption1'">{{
                                storageBucket.dbUpdatedAt | date : 'yyyy/MM/dd HH:mm:ss'
                            }}</span>
                        </div>
                    </div>
                    <zwp-labelled-property [label]="'Name'" [property]="storageBucket.name ?? ''" />
                    <zwp-labelled-property [label]="'Kind'" [property]="storageBucket.kind ?? ''" />
                    <zwp-labelled-property [label]="'Location'" [property]="storageBucket.location ?? ''" />
                    <zwp-labelled-property [label]="'Google ID'" [property]="storageBucket.googleId ?? ''" />
                </ng-container>

                <ng-container actions *ngIf="selectedStorageBucket$ | async as storageBucket">
                    <zwp-md-button
                        label="Delete Bucket"
                        icon="delete"
                        [iconTextStyle]="'subheadline'"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme"
                        [labelColor]="'destructive' | zwpColorTheme"
                        (btnClick)="deleteStorageBucket(storageBucket)"
                    ></zwp-md-button>
                </ng-container>
            </zwp-actioned-detail-panel>
            <zwp-divider [vertical]="true"></zwp-divider>
            <zwp-tabbed-nav-panel fxFlex="grow"></zwp-tabbed-nav-panel>
        </div>
    `,
})
export class StorageBucketDetailRouteComponent implements OnInit, OnDestroy {
    private route = inject(ActivatedRoute)
    private storageBucketFacade = inject(State.Facades.GoogleCloudStorageBucketFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)

    selectedStorageBucket$ = this.storageBucketFacade.selectedStorageBucket$

    ngOnInit() {
        this.storageBucketFacade.selectStorageBucket(this.route.snapshot.params['bucketId'])
    }

    ngOnDestroy() {
        this.storageBucketFacade.deselectStorageBucket()
    }

    printRouteChildren() {
        // console.log(this.route.routeConfig?.children)
    }

    deleteStorageBucket(storageBucket: Model.Responses.StorageBucketResponse) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Storage Bucket',
                message: `Are you sure you want to delete ${storageBucket.name}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
            },
            () => {
                this.storageBucketFacade.deleteStorageBucket(storageBucket.id)
            }
        )
    }
}
