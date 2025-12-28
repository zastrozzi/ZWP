import { Component, ChangeDetectionStrategy, OnInit, inject, OnDestroy } from '@angular/core'

import { ActivatedRoute } from '@angular/router'
import { State } from '../../+state'
import { Model } from '../../model'
import { DeleteConfirmationDialogComponent, ZWPDeleteConfirmationData } from '@zwp/platform.common'
import { MatDialog } from '@angular/material/dialog'
import { ZWPPopupLayoutFacade } from '@zwp/platform.layout'

@Component({
    selector: 'urnet-mnet-category-detail-route',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="row" fxLayoutAlign="start stretch" fxFlexFill>
            <zwp-actioned-detail-panel panelWidth="400px">
                <ng-container detail *ngIf="selectedCategory$ | async as category">
                    <div
                        fxLayout="column"
                        fxLayoutAlign="start start"
                        zwpPadding="10"
                        fxLayoutGap="5px"
                        zwpCorners="10"
                        [style.backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                    >
                        <span [zwpTextStyle]="'subheadline'" zwpColor="label">Category Details</span>
                        <span [zwpTextStyle]="'caption1'" [style.color]="'system-gray3' | zwpColorTheme">{{
                            category.id
                        }}</span>
                        <span fxFlexOffset="10px" [zwpTextStyle]="'caption1'" zwpColor="label">Name</span>
                        <span [zwpTextStyle]="'body1'" [style.color]="'primary' | zwpColorTheme">{{
                            category.name
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
                                category.dbCreatedAt | date : 'yyyy/MM/dd HH:mm:ss'
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
                                category.dbUpdatedAt | date : 'yyyy/MM/dd HH:mm:ss'
                            }}</span>
                        </div>
                    </div>

                    <div
                        fxLayout="column"
                        fxLayoutAlign="start start"
                        zwpPadding="10"
                        fxLayoutGap="5px"
                        zwpCorners="10"
                        fxFlexOffset="5px"
                        [style.backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                    >
                        <span [zwpTextStyle]="'subheadline'">Preferences</span>
                        <!-- <span fxFlexOffset="10px" [zwpTextStyle]="'caption1'">Primary Email</span>     -->
                    </div>
                </ng-container>

                <ng-container actions *ngIf="selectedCategory$ | async as category">
                    <zwp-md-button
                        label="Open Ticket"
                        icon="message"
                        [iconTextStyle]="'subheadline'"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme"
                    ></zwp-md-button>
                    <zwp-md-button
                        label="Delete Category"
                        icon="delete"
                        [iconTextStyle]="'subheadline'"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme"
                        [labelColor]="'destructive' | zwpColorTheme"
                        (btnClick)="deleteCategory(category)"
                    ></zwp-md-button>
                </ng-container>
            </zwp-actioned-detail-panel>
            <zwp-divider [vertical]="true"></zwp-divider>
            <zwp-tabbed-nav-panel fxFlex="grow"></zwp-tabbed-nav-panel>
        </div>
    `,
})
export class CategoryDetailRouteComponent implements OnInit, OnDestroy {
    private route = inject(ActivatedRoute)
    private categoryFacade = inject(State.Facades.CategoryFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)

    selectedCategory$ = this.categoryFacade.selectedCategory$

    ngOnInit() {
        this.categoryFacade.selectCategory(this.route.snapshot.params['categoryId'])
    }

    ngOnDestroy() {
        this.categoryFacade.deselectCategory()
    }

    printRouteChildren() {
        // console.log(this.route.routeConfig?.children)
    }

    deleteCategory(category: Model.CategoryResponse) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Category',
                message: `Are you sure you want to delete ${category.name}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
            },
            () => {
                this.categoryFacade.deleteCategory(category.id)
            }
        )
    }
}
