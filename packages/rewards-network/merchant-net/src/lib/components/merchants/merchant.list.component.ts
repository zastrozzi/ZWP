import { Component, OnInit, ChangeDetectionStrategy, inject, OnDestroy } from '@angular/core'
import { State } from '../../+state'
import { CDPUsers } from '@zwp/cdp.users'
import { ColumnInterface, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { Model } from '../../model'
import {
    FilterChipEvent,
    FilterDefinition,
    handleFilterChipEvent,
    ZWPFilterChipInputType,
    ZWPRouterFacade,
    Nullable,
    PaginatedQueryParams,
} from '@zwp/platform.common'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'urnet-mnet-merchant-list',
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
                    label="Create Merchant"
                    icon="add_business"
                    textStyle="button1"
                    [iconTextStyle]="'subheadline'"
                    [labelColor]="'system-white' | zwpColorTheme"
                    [backgroundColor]="'system-green' | zwpColorTheme"
                    (btnClick)="newMerchant()"
                ></zwp-md-button>
            </div>
            <zwp-divider></zwp-divider>
            <zwp-paginated-table
                fxFlex="1 1 calc(100% - 55px)"
                [columns]="columns"
                [data]="(merchants$ | async) || []"
                [selectable]="true"
                [pagination]="merchantsRemotePagination$ | async"
                (sortChanged)="onSortChanged($event)"
                (paginationChanged)="onPaginationChanged($event)"
                (rowClicked)="onRowClicked($event)"
                [draggable]="true"
            >
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
                        <mat-icon zwpColor="system-white">storefront</mat-icon>
                        <div fxLayout="column" fxLayoutAlign="start stretch">
                            <span zwpTextStyle="caption1" zwpFontWeight="500" zwpColor="system-white">Merchant</span>
                            <span zwpTextStyle="body1" zwpColor="system-white">{{ dataRow.merchantName }}</span>
                        </div>
                    </div>
                </ng-template>
            </zwp-paginated-table>
        </div>
    `,
})
export class MerchantListComponent implements OnInit, OnDestroy {
    private merchantFacade = inject(State.Facades.MerchantFacade)
    private adminUserFacade = inject(CDPUsers.State.AdminUserFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)

    merchants$ = this.merchantFacade.paginatedFilteredMerchants$
    merchantsRemotePagination$ = this.merchantFacade.merchantRemotePagination$

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.MerchantResponse = 'merchantName'

    columns: ColumnInterface<Model.MerchantResponse>[] = [
        { displayName: 'Merchant Name', dataLabel: 'merchantName', sortable: true },
        {
            displayName: 'Status',
            dataLabel: 'status',
            sortable: true,
            transformEnumPipe: { input: Model.MerchantStatus, output: Model.MerchantStatusLabel },
        },
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
        {
            displayName: 'Merchant Name',
            name: 'merchantName',
            type: ZWPFilterChipInputType.STRING,
            enumDefinition: null,
        },
        {
            displayName: 'Status',
            name: 'status',
            type: ZWPFilterChipInputType.ENUM,
            enumDefinition: { input: Model.MerchantStatus, output: Model.MerchantStatusLabel },
        },
    ]

    async ngOnInit() {
        this.merchantFacade.resetMerchantFilters(false)
        this.listMerchantsForContext()
    }

    ngOnDestroy() {
        this.merchantFacade.resetPagination()
    }

    async listMerchantsForContext(pagination: Nullable<Partial<PaginatedQueryParams<Model.MerchantResponse>>> = null) {
        this.merchantFacade.listMerchants(pagination)
    }

    onRowClicked(row: Model.MerchantResponse) {
        this.routerFacade.navigate([`/merchant-net/merchants/${row.id}`])
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.MerchantResponse
        this.sortDirection = sort.direction
        this.listMerchantsForContext({
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey,
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.MerchantFilters> = handleFilterChipEvent(filterEvent)
        this.merchantFacade.updateMerchantFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.listMerchantsForContext({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
        })
    }

    newMerchant() {
        this.windowLayoutFacade.addWindow({
            label: 'New Merchant',
            icon: 'add_business',
            componentName: 'CreateMerchantWindowComponent',
            position: { top: 'calc(50vh - 160px)', left: 'calc(50vw - 250px)', width: '500px', height: '320px' },
            data: {},
        })
    }
}
