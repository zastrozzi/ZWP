import { Component, OnInit, ChangeDetectionStrategy, inject, OnDestroy } from '@angular/core'
import { State } from '../../+state'
import { ColumnInterface, ZWPPanelLayoutFacade, ZWPPopupLayoutFacade, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { Model } from '../../model'
import {
    FilterChipEvent,
    FilterDefinition,
    handleFilterChipEvent,
    iso4217CurrencyNameEnumPipe,
    ZWPFilterChipInputType,
    zwpISO3166Alpha2LabelEnumPipe,
    ZWPRouterFacade,
    Nullable,
    PaginatedQueryParams,
} from '@zwp/platform.common'
import { Observable, of } from 'rxjs'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'
import { ActivatedRoute } from '@angular/router'
import { Clipboard } from '@angular/cdk/clipboard'

@Component({
    selector: 'fsn-tink-merchant-paginated-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlexFill>
            <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
                <zwp-filter-chip-input
                    fxFlex="grow"
                    [filterDefinitions]="filterDefinitions"
                    (filterChange)="onFiltersChanged($event)"
                ></zwp-filter-chip-input>
            </div>
            <zwp-divider></zwp-divider>
            <zwp-paginated-table
                fxFlex="1 1 calc(100% - 55px)"
                [columns]="columns"
                [data]="(merchants$ | async) || []"
                [selectable]="true"
                [actionable]="true"
                [draggable]="true"
                [selectionActionable]="true"
                [pagination]="merchantsRemotePagination$ | async"
                (sortChanged)="onSortChanged($event)"
                (paginationChanged)="onPaginationChanged($event)"
                (rowClicked)="onRowClicked($event)"
            >
                <ng-template #rowActions let-row>
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                        <zwp-md-icon-button
                            icon="open_in_full"
                            label="Open Merchant Details"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onNavigationClicked($event, row)"
                        ></zwp-md-icon-button>
                        <zwp-md-icon-button
                            icon="visibility"
                            label="Open in Inspector"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onInspectorClicked($event, row)"
                        ></zwp-md-icon-button>
                        <zwp-md-icon-button
                            icon="content_copy"
                            label="Add to Clipboard"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onClipboardClicked($event, row)"
                        ></zwp-md-icon-button>
                        <!-- <zwp-md-icon-button
                            icon="delete"
                            label="Delete"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onDeleteClicked($event, row)"
                        ></zwp-md-icon-button> -->
                    </div>
                </ng-template>
                <ng-template #dragPreview let-dataRow="dataRow">
                    <div fxLayout="column" fxLayoutAlign="start start" fxLayoutGap="5px">
                        <div
                            fxLayout="row"
                            fxLayoutAlign="start stretch"
                            fxLayoutGap="10px"
                            zwpPadding="10 15 10 10"
                            zwpCorners="5"
                            zwpBackgroundColor="primary"
                            class="mat-elevation-z4"
                        >
                            <mat-icon zwpColor="system-white">credit_card</mat-icon>
                            <div fxLayout="column" fxLayoutAlign="start stretch">
                                <span zwpTextStyle="caption1" zwpFontWeight="500" zwpColor="system-white"
                                    >Merchant</span
                                >
                                <span zwpTextStyle="body1" zwpColor="system-white">{{ dataRow.name }}</span>
                            </div>
                        </div>
                    </div>
                </ng-template>
                <ng-template #selectionActions let-selected="selected">
                    <!-- <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px" fxFlex="noshrink"> -->
                    <!-- <span zwpTextStyle="body1" zwpColor="primary">Selected {{ selected.length }} Storage Objects</span> -->
                    <zwp-md-button
                        *ngIf="selected.length > 0"
                        [label]="'Delete Merchants'"
                        icon="delete"
                        [iconTextStyle]="'button1'"
                        [textStyle]="'button1'"
                        [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                        [labelColor]="'system-red' | zwpColorTheme"
                        (btnClick)="onDeleteManyClicked(selected)"
                    ></zwp-md-button>
                    <!-- </div> -->
                </ng-template>
            </zwp-paginated-table>
        </div>
    `,
})
export class MerchantPaginatedListComponent implements OnInit, OnDestroy {
    private merchantFacade = inject(State.Facades.TinkMerchantFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)
    private activatedRoute = inject(ActivatedRoute)
    private clipboard = inject(Clipboard)
    private merchantListContext: Model.Enums.MerchantPaginatedListComponentContext =
        this.activatedRoute.snapshot.data['merchantListContext']

    merchants$: Observable<Model.ServerAPIModel.Merchant.TinkMerchantResponse[]> = of([])
    merchantsRemotePagination$ = this.merchantFacade.merchantRemotePagination$

    merchantListContextIsMerchantList =
        this.merchantListContext ===
        Model.Enums.MerchantPaginatedListComponentContext.MERCHANT_LIST

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.ServerAPIModel.Merchant.TinkMerchantResponse = 'dbCreatedAt'

    columns: ColumnInterface<Model.ServerAPIModel.Merchant.TinkMerchantResponse>[] = [
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
        {
            displayName: 'Name',
            dataLabel: 'name',
            sortable: true
        },
        {
            displayName: 'Status',
            dataLabel: 'status',
            sortable: true,
            transformEnumPipe: Model.ClientAPIModel.PartnerIntegration.Merchants.merchantStatusLabelEnumPipe,
        },
        {
            displayName: 'Category',
            dataLabel: 'categoryCode',
            sortable: true,
            transformEnumPipe: Model.ClientAPIModel.PartnerIntegration.Merchants.merchantCategoryNameEnumPipe,
        },
        {
            displayName: 'Country',
            dataLabel: 'countryCode',
            sortable: true,
            transformEnumPipe: zwpISO3166Alpha2LabelEnumPipe,
        },
        {
            displayName: 'Organisation Number',
            dataLabel: 'organizationNumber',
            sortable: true,
        },
        {
            displayName: 'URL',
            dataLabel: 'url',
            sortable: true
        }
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null }
    ]

    async ngOnInit() {
        if (this.merchantListContextIsMerchantList) {
            this.merchants$ = this.merchantFacade.paginatedFilteredMerchants$
        }
        this.merchantFacade.resetMerchantFilters(
            false
        )
        await this.listMerchantsForContext()
    }

    ngOnDestroy() {
        this.merchantFacade.resetPagination()
    }

    async listMerchantsForContext(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Merchant.TinkMerchantResponse>>> = null
    ) {
        if (this.merchantListContextIsMerchantList) {
            this.merchantFacade.listMerchants(pagination)
        }
    }

    onRowClicked(row: Model.ServerAPIModel.Merchant.TinkMerchantResponse) {
        // event.preventDefault()
        // event.stopPropagation()
        // this.routerFacade.navigate(['tink', 'merchants', row.id])
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.ServerAPIModel.Merchant.TinkMerchantResponse
        this.sortDirection = sort.direction
        this.listMerchantsForContext({
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey,
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.MerchantFilters> = handleFilterChipEvent(filterEvent)
        this.merchantFacade.updateMerchantFilters(filterChange, true)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.listMerchantsForContext({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
        })
    }

    onInspectorClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Merchant.TinkMerchantResponse) {
        event.preventDefault()
        event.stopPropagation()
        // this.panelLayoutFacade.addRightPanel({
        //     id: `${row.id}-merchant-detail`,
        //     label: `Merchant Details`,
        //     icon: 'account_balance',
        //     componentName: 'TinkMerchantDetailRightPanelComponent',
        //     data: {
        //         merchantId: row.id,
        //     },
        // })
    }

    onNavigationClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Merchant.TinkMerchantResponse) {
        event.preventDefault()
        event.stopPropagation()
        // this.routerFacade.navigate(['tink', 'merchants', row.id])
    }

    onClipboardClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Merchant.TinkMerchantResponse) {
        event.preventDefault()
        event.stopPropagation()
        this.clipboard.copy(JSON.stringify(row))
    }

    onDeleteClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Merchant.TinkMerchantResponse) {
        event.preventDefault()
        event.stopPropagation()
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Merchant',
                message: `Are you sure you want to delete the merchant ${row.name}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
            },
            // () => { this.merchantFacade.deleteMerchant(row.id) },
            // () => { this.merchantFacade.deleteMerchant(row.id, true) }
        )
    }

    onDeleteManyClicked(selected: Model.ServerAPIModel.Merchant.TinkMerchantResponse[]) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Merchants',
                message: `Are you sure you want to delete ${selected.length} merchant${
                    selected.length === 1 ? '' : 's'
                }?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
            },
            () => {
                //
            }
        )
    }
}
