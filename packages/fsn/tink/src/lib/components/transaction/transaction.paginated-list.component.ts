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
    selector: 'fsn-tink-transaction-paginated-list',
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
                [data]="(transactions$ | async) || []"
                [selectable]="true"
                [actionable]="true"
                [draggable]="true"
                [selectionActionable]="true"
                [pagination]="transactionsRemotePagination$ | async"
                (sortChanged)="onSortChanged($event)"
                (paginationChanged)="onPaginationChanged($event)"
                (rowClicked)="onRowClicked($event)"
            >
                <ng-template zwpTableCellTemplate="amount" let-row="row">
                    <fsn-tink-currency-denominated-amount-label
                        [amount]="row.amount"
                    ></fsn-tink-currency-denominated-amount-label>
                </ng-template>
                <ng-template #rowActions let-row>
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                        <zwp-md-icon-button
                            icon="open_in_full"
                            label="Open Transaction Details"
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
                                    >Transaction</span
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
                        [label]="'Delete Transactions'"
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
export class TransactionPaginatedListComponent implements OnInit, OnDestroy {
    private transactionFacade = inject(State.Facades.TinkTransactionFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)
    private activatedRoute = inject(ActivatedRoute)
    private clipboard = inject(Clipboard)
    private transactionListContext: Model.Enums.TransactionPaginatedListComponentContext =
        this.activatedRoute.snapshot.data['transactionListContext']

    transactions$: Observable<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse[]> = of([])
    transactionsRemotePagination$ = this.transactionFacade.transactionRemotePagination$

    transactionListContextIsAccountDetail =
        this.transactionListContext === Model.Enums.TransactionPaginatedListComponentContext.ACCOUNT_DETAIL
    transactionListContextIsTransactionList =
        this.transactionListContext ===
        Model.Enums.TransactionPaginatedListComponentContext.TRANSACTION_LIST

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.ServerAPIModel.Transaction.TinkV2TransactionResponse = 'dbCreatedAt'

    columns: ColumnInterface<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse>[] = [
        // {
        //     displayName: 'Transaction ID',
        //     dataLabel: 'id',
        //     sortable: true,
        // },
        // {
        //     displayName: 'Created At',
        //     dataLabel: 'dbCreatedAt',
        //     sortable: true,
        //     datePipe: { format: 'yyyy/MM/dd HH:mm:ss' },
        // },
        // {
        //     displayName: 'Updated At',
        //     dataLabel: 'dbUpdatedAt',
        //     sortable: true,
        //     datePipe: { format: 'yyyy/MM/dd HH:mm:ss' },
        // },
        {
            displayName: 'Transaction Date',
            dataLabel: 'bookedDateTime',
            sortable: true,
            datePipe: { format: 'yyyy/MM/dd HH:mm:ss' },
        },
        {
            displayName: 'Amount',
            dataLabel: 'amount',
            sortable: true,
            hasCustomTemplate: true
        },
        {
            displayName: 'Status',
            dataLabel: 'status',
            sortable: true,
            transformEnumPipe: Model.ClientAPIModel.DataV2.Transaction.transactionStatusLabelEnumPipe,
        },
        {
            displayName: 'Description',
            dataLabel: 'descriptions.display',
            sortable: true,
        },
        {
            displayName: 'Unstructured Description',
            dataLabel: 'descriptions.detailed.unstructured',
            sortable: true,
        },
        {
            displayName: 'Reference',
            dataLabel: 'reference',
            sortable: true
        },
        {
            displayName: 'Transaction Type',
            dataLabel: 'types.financialInstitutionTypeCode',
            sortable: true
        }
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null }
    ]

    async ngOnInit() {
        if (this.transactionListContextIsTransactionList) {
            this.transactions$ = this.transactionFacade.paginatedFilteredTransactions$
        } else if (this.transactionListContextIsAccountDetail) {
            this.transactions$ = this.transactionFacade.paginatedFilteredTransactions$
        }
        this.transactionFacade.resetTransactionFilters(
            false
        )
        await this.listTransactionsForContext()
    }

    ngOnDestroy() {
        this.transactionFacade.resetPagination()
    }

    async listTransactionsForContext(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Transaction.TinkV2TransactionResponse>>> = null
    ) {
        if (this.transactionListContextIsTransactionList) {
            this.transactionFacade.listTransactions(null, pagination)
        }
        if (this.transactionListContextIsAccountDetail) {
            this.transactionFacade.listTransactions(await this.getAccountIdFromRoute(), pagination)
        }
    }

    onRowClicked(row: Model.ServerAPIModel.Transaction.TinkV2TransactionResponse) {
        // event.preventDefault()
        // event.stopPropagation()
        // this.routerFacade.navigate(['tink', 'transactions', row.id])
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.ServerAPIModel.Transaction.TinkV2TransactionResponse
        this.sortDirection = sort.direction
        this.listTransactionsForContext({
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey,
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.TransactionFilters> = handleFilterChipEvent(filterEvent)
        this.transactionFacade.updateTransactionFilters(filterChange, true)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.listTransactionsForContext({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
        })
    }

    onInspectorClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Transaction.TinkV2TransactionResponse) {
        event.preventDefault()
        event.stopPropagation()
        // this.panelLayoutFacade.addRightPanel({
        //     id: `${row.id}-transaction-detail`,
        //     label: `Transaction Details`,
        //     icon: 'account_balance',
        //     componentName: 'TinkTransactionDetailRightPanelComponent',
        //     data: {
        //         transactionId: row.id,
        //     },
        // })
    }

    onNavigationClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Transaction.TinkV2TransactionResponse) {
        event.preventDefault()
        event.stopPropagation()
        // this.routerFacade.navigate(['tink', 'transactions', row.id])
    }

    onClipboardClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Transaction.TinkV2TransactionResponse) {
        event.preventDefault()
        event.stopPropagation()
        this.clipboard.copy(JSON.stringify(row))
    }

    onDeleteClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Transaction.TinkV2TransactionResponse) {
        event.preventDefault()
        event.stopPropagation()
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Transaction',
                message: `Are you sure you want to delete the transaction ${row.reference ?? ''}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
            },
            // () => { this.transactionFacade.deleteTransaction(row.id) },
            // () => { this.transactionFacade.deleteTransaction(row.id, true) }
        )
    }

    onDeleteManyClicked(selected: Model.ServerAPIModel.Transaction.TinkV2TransactionResponse[]) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Transactions',
                message: `Are you sure you want to delete ${selected.length} transaction${
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

    async getAccountIdFromRoute(): Promise<Nullable<string>> {
        // const brandId = this.activatedRoute.parent?.parent?.snapshot.params['brandId'] ?? null
        return await this.routerFacade.getNestedRouteParam('accountId') ?? null
    }
}
