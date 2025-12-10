import { Component, OnInit, ChangeDetectionStrategy, inject, ChangeDetectorRef, OnDestroy } from '@angular/core'
import { State } from '../../+state'
import { CDPUsers } from '@zwp/cdp.users'
import { ColumnInterface, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { Model } from '../../model'
import {
    DateQueryFilter,
    EnumQueryFilter,
    FilterChip,
    FilterChipEvent,
    FilterDefinition,
    handleFilterChipEvent,
    ZWPFilterChipInputType,
    ZWPRouterFacade,
    Nullable,
    NumberQueryFilter,
    PaginatedQueryParams,
    StringQueryFilter,
} from '@zwp/platform.common'
import { map } from 'rxjs'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'
import { ActivatedRoute } from '@angular/router'
import { ComponentRouteContext } from '../../model/enums'

@Component({
    selector: 'urnet-mnet-offer-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlexFill>
            <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
                <zwp-filter-chip-input
                    fxFlex="grow"
                    [filterDefinitions]="filterDefinitions"
                    (filterChange)="onFiltersChanged($event)"
                ></zwp-filter-chip-input>

                <zwp-md-button
                    label="Create Offer"
                    icon="add"
                    textStyle="button1"
                    [iconTextStyle]="'subheadline'"
                    [labelColor]="'system-white' | zwpColorTheme"
                    [backgroundColor]="'system-green' | zwpColorTheme"
                    (btnClick)="newOffer()"
                ></zwp-md-button>
            </div>
            <zwp-divider></zwp-divider>
            <zwp-paginated-table
                fxFlex="1 1 calc(100% - 55px)"
                [columns]="columns"
                [data]="(offers$ | async) || []"
                [selectable]="true"
                [pagination]="offersRemotePagination$ | async"
                (sortChanged)="onSortChanged($event)"
                (paginationChanged)="onPaginationChanged($event)"
                (rowClicked)="onRowClicked($event)"
                [draggable]="true"
            >
                <ng-template zwpTableCellTemplate="daysOfWeek" let-row="row">
                    <urnet-mnet-offer-weekday-group [weekdays]="row.daysOfWeek"></urnet-mnet-offer-weekday-group>
                </ng-template>
                <ng-template zwpTableCellTemplate="status" let-row="row">
                    <div fxLayout="row" fxLayoutAlign="start center">
                        <span
                            zwpCorners="5"
                            zwpPadding="5 10"
                            zwpTextStyle="body1"
                            zwpColor="system-white"
                            [zwpBackgroundColor]="row.status | zwpTransformEnum : statusColorEnumSignature"
                            >{{ row.status | zwpTransformEnum : statusLabelEnumSignature }}
                        </span>
                    </div>
                </ng-template>
                <ng-template zwpTableCellTemplate="operation" let-row="row">
                    <div fxLayout="row" fxLayoutAlign="start center">
                        <span
                            zwpCorners="5"
                            zwpPadding="5 10"
                            zwpTextStyle="body1"
                            zwpColor="system-white"
                            [zwpBackgroundColor]="row.operation | zwpTransformEnum : operationColorEnumSignature"
                            >{{ row.operation | zwpTransformEnum : operationLabelEnumSignature }}
                        </span>
                    </div>
                </ng-template>
                <ng-template #dragPreview let-dataRow="dataRow">
                    <div
                        fxLayout="row"
                        fxLayoutAlign="center center"
                        fxLayoutGap="10px"
                        zwpCorners="5"
                        zwpBackgroundColor="primary"
                        zwpPadding="10 15 10 10"
                        class="mat-elevation-z4"
                    >
                        <mat-icon zwpColor="system-white">local_offer</mat-icon>
                        <div fxLayout="column" fxLayoutAlign="start stretch">
                            <span zwpTextStyle="caption1" zwpFontWeight="500" zwpColor="system-white">Offer</span>
                            <span zwpTextStyle="body1" zwpColor="system-white">{{ dataRow.title }}</span>
                        </div>
                    </div>
                </ng-template>
            </zwp-paginated-table>
        </div>
    `,
})
export class OfferListComponent implements OnInit, OnDestroy {
    private offerFacade = inject(State.Facades.OfferFacade)
    private adminUserFacade = inject(CDPUsers.State.AdminUserFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private route = inject(ActivatedRoute)

    private offerListContext: ComponentRouteContext = this.route.snapshot.data['offerListContext']

    offers$ = this.offerFacade.offers$
    offersRemotePagination$ = this.offerFacade.offerRemotePagination$
    loggedInAdminUser$ = this.adminUserFacade.loggedInAdminUser$

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.OfferResponse = 'title'

    statusLabelEnumSignature = Model.offerStatusLabelPipeSignature
    statusColorEnumSignature = Model.offerStatusColorPipeSignature
    operationLabelEnumSignature = Model.offerOperationLabelPipeSignature
    operationColorEnumSignature = Model.offerOperationColorPipeSignature
    weekdayLabelEnumSignature = Model.offerWeekdayLabelPipeSignature
    weekdayInitialEnumSignature = Model.offerWeekdayInitialPipeSignature

    columns: ColumnInterface<Model.OfferResponse>[] = [
        { displayName: 'Title', dataLabel: 'title', sortable: true },

        // { displayName: 'Category', dataLabel: 'category', sortable: true },
        {
            displayName: 'Status',
            dataLabel: 'status',
            sortable: true,
            hasCustomTemplate: true,
            transformEnumPipe: this.statusLabelEnumSignature,
        },
        {
            displayName: 'Reward Type',
            dataLabel: 'operation',
            sortable: false,
            style: { minWidth: 180 },
            hasCustomTemplate: true,
            transformEnumPipe: this.operationLabelEnumSignature,
        },
        // { displayName: 'Operand', dataLabel: 'operand', sortable: true },
        // { displayName: 'Purchase Max', dataLabel: 'purchaseMax', sortable: true, currencyPipe: { prefix: '£', thousands: ',', decimal: '.', unit: 1 } },
        // { displayName: 'Purchase Min', dataLabel: 'purchaseMin', sortable: true, currencyPipe: { prefix: '£', thousands: ',', decimal: '.', unit: 1 } },
        // { displayName: 'Reward Max', dataLabel: 'rewardMax', sortable: true, currencyPipe: { prefix: '£', thousands: ',', decimal: '.', unit: 1 } },
        {
            displayName: 'Weekdays',
            dataLabel: 'daysOfWeek',
            sortable: false,
            hasCustomTemplate: true,
            transformEnumPipe: this.weekdayLabelEnumSignature,
        },
        {
            displayName: 'Start Date',
            dataLabel: 'startDate',
            sortable: true,
            datePipe: { format: 'yyyy/MM/dd HH:mm:ss' },
        },
        { displayName: 'End Date', dataLabel: 'endDate', sortable: true, copyable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },

        {
            displayName: 'Created At',
            dataLabel: 'dbCreatedAt',
            sortable: true,
            datePipe: { format: 'yyyy/MM/dd HH:mm:ss' },
        },
        {
            displayName: 'Updated At',
            dataLabel: 'dbUpdatedAt',
            sortable: true,
            datePipe: { format: 'yyyy/MM/dd HH:mm:ss' },
        },
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Title', name: 'title', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        // { displayName: 'Category', name: 'category', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        {
            displayName: 'Reward Type',
            name: 'operation',
            type: ZWPFilterChipInputType.ENUM,
            enumDefinition: this.operationLabelEnumSignature,
        },
        // { displayName: 'Operand', name: 'operand', type: ZWPFilterChipInputType.NUMBER, enumDefinition: null },
        // { displayName: 'Purchase Max', name: 'purchaseMax', type: ZWPFilterChipInputType.NUMBER, enumDefinition: null },
        // { displayName: 'Purchase Min', name: 'purchaseMin', type: ZWPFilterChipInputType.NUMBER, enumDefinition: null },
        // { displayName: 'Reward Max', name: 'rewardMax', type: ZWPFilterChipInputType.NUMBER, enumDefinition: null },
        {
            displayName: 'Weekdays',
            name: 'daysOfWeek',
            type: ZWPFilterChipInputType.ENUM,
            enumDefinition: this.weekdayLabelEnumSignature,
        },
        { displayName: 'Start Date', name: 'startDate', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'End Date', name: 'endDate', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        {
            displayName: 'Status',
            name: 'status',
            type: ZWPFilterChipInputType.ENUM,
            enumDefinition: this.statusLabelEnumSignature,
        },
    ]

    ngOnInit() {
        this.loggedInAdminUser$.subscribe((user) => {
            if (user) {
                this.offerFacade.resetOfferFilters(false)
                this.listOffersForContext()
            }
        })
    }

    ngOnDestroy() {
        this.offerFacade.resetOfferPagination()
    }

    onRowClicked(row: Model.OfferResponse) {
        this.routerFacade.navigate(['merchant-net', 'offers', row.id])
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.OfferResponse
        this.sortDirection = sort.direction
        this.listOffersForContext({
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey,
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.OfferFilters> = handleFilterChipEvent(filterEvent)
        this.offerFacade.updateOfferFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.listOffersForContext({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
        })
    }

    listOffersForContext(pagination: Nullable<Partial<PaginatedQueryParams<Model.OfferResponse>>> = null) {
        switch (this.offerListContext) {
            case ComponentRouteContext.MERCHANT_DETAIL:
                this.offerFacade.listOffers(null, 'auto', pagination)
                break
            case ComponentRouteContext.BRAND_DETAIL:
                this.offerFacade.listOffers('auto', null, pagination)
                break
            default:
                this.offerFacade.listOffers(null, null, pagination)
                break
        }
    }

    newOffer() {
        this.windowLayoutFacade.addWindow({
            label: 'New Offer',
            icon: 'local_offer',
            componentName: 'CreateOfferWindowComponent',
            position: {
                top: 'calc(50vh - 400px)',
                left: 'calc(100vw - 510px)',
                width: 'calc(0vw + 500px)',
                height: 'calc(0vh + 800px)',
            },
            data: {},
        })
    }
}
