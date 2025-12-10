import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core'
import { State } from '../../+state';
import { FileExtension, FilterChipEvent, FilterDefinition, handleFilterChipEvent, ZWPFilterChipInputType, ISO4217ActiveCurrencyCode, ISO4217ActiveCurrencyName, TransformEnumPipeSignature, ZWPISO3166Alpha2, ZWPISO3166Alpha2Label, ZWPRouterFacade } from '@zwp/platform.common';
import { ColumnInterface, ZWPPanelLayoutFacade, ZWPWindowLayoutFacade, ZWPPopupLayoutFacade } from '@zwp/platform.layout'
import { Sort, SortDirection } from '@angular/material/sort'
import { Model } from '../../model';
import { PageEvent } from '@angular/material/paginator';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
    selector: 'rewards-network-tillo-transaction-spread-paginated-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlexFill> 
            <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
                <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>     
            </div>

        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(paginatedFilteredTransactionSpread$ | async) || []" [selectable]="true" [actionable]="true"
            [pagination]="transactionSpreadRemotePagination$ | async"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"> 

            
            <ng-template #rowActions let-row>
                <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                        
                        <zwp-md-icon-button
                            icon="visibility"
                            label="Open in Inspector"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onInspectorClicked(row)"
                        ></zwp-md-icon-button>
                        <zwp-md-icon-button
                            icon="content_copy"
                            label="Add to Clipboard"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onClipboardClicked(row)"
                        ></zwp-md-icon-button>
                        
                        <zwp-md-icon-button
                            icon="delete"
                            label="Delete"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'system-red' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onDeleteClicked(row)"
                        ></zwp-md-icon-button>
                </div>
            </ng-template>
        </zwp-paginated-table> 
        </div>
    `
})
export class TilloTransactionSpreadPaginatedListComponent implements OnInit, OnDestroy {
    private clipboard = inject(Clipboard)
    private transactionSpreadFacade = inject(State.Facades.TilloTransactionSpreadFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)
    private routerFacade = inject(ZWPRouterFacade)

    paginatedFilteredTransactionSpread$ = this.transactionSpreadFacade.paginatedFilteredtransactionSpread$
    transactionSpreadRemotePagination$ = this.transactionSpreadFacade.transactionSpreadRemotePagination$

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.TransactionSpreadResponse = 'id'

    columns: ColumnInterface<Model.TransactionSpreadResponse>[] = [
        { displayName: 'ID', dataLabel: 'id', sortable: true },
        { displayName: 'Brand ID', dataLabel: 'brandId', sortable: true },
        { displayName: 'Fee', dataLabel: 'fee', sortable: true },
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Updated At', dataLabel: 'dbUpdatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Deleted At', dataLabel: 'dbDeletedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } }
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'ID', name: 'id', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Brand ID', name: 'brandId', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Fee', name: 'fee', type: ZWPFilterChipInputType.NUMBER, enumDefinition: null},
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null }
    ]

    ngOnInit() {
        this.transactionSpreadFacade.resetTransactionSpreadFilters(false)
        this.transactionSpreadFacade.listTransactionSpreads()
    }

    ngOnDestroy() {
        this.transactionSpreadFacade.resetPagination()
    }

    onDeleteClicked(row: Model.TransactionSpreadResponse) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Store Card',
                message: `Are you sure you want to delete the transaction spread ${row.id}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
                confirmPermanentButtonLabel: 'Delete Permanently'
            },
            () => { this.transactionSpreadFacade.deleteTransactionSpread(row.id) }
        )
    }

    onNavigationClicked(row: Model.TransactionSpreadResponse) {
        console.log('onNavigationClicked', row)
    }

    onInspectorClicked(row: Model.TransactionSpreadResponse) {
        console.log('onInspectorClicked', row)
    }

    onClipboardClicked(row: Model.TransactionSpreadResponse) {
        const rowText = JSON.stringify(row, null, 2)
        this.clipboard.copy(rowText);
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.TransactionSpreadResponse
        this.sortDirection = sort.direction
        this.transactionSpreadFacade.listTransactionSpreads({ 
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.StoreCardFilters> = handleFilterChipEvent(filterEvent)
        this.transactionSpreadFacade.updateTransactionSpreadFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.transactionSpreadFacade.listTransactionSpreads({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize
        })
    }


}