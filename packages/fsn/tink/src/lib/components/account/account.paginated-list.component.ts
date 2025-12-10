import { Component, OnInit, ChangeDetectionStrategy, inject, ChangeDetectorRef, OnDestroy } from '@angular/core'
import { State } from '../../+state'
import { CDPUsers } from '@zwp/cdp.users'
import { ColumnInterface, ZWPPanelLayoutFacade, ZWPPopupLayoutFacade, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { Model } from '../../model'
import {
    BarcodeType,
    BarcodeTypeLabel,
    DateQueryFilter,
    EnumQueryFilter,
    FilterChip,
    FilterChipEvent,
    FilterDefinition,
    handleFilterChipEvent,
    ZWPFilterChipInputType,
    ZWPISO3166Alpha2,
    ZWPISO3166Alpha2Label,
    ZWPRouterFacade,
    Nullable,
    NumberQueryFilter,
    PaginatedQueryParams,
    StringQueryFilter,
} from '@zwp/platform.common'
import { map, Observable, of } from 'rxjs'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'fsn-tink-account-paginated-list',
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
                [data]="(accounts$ | async) || []"
                [selectable]="true"
                [actionable]="true"
                [draggable]="true"
                [selectionActionable]="true"
                [pagination]="accountsRemotePagination$ | async"
                (sortChanged)="onSortChanged($event)"
                (paginationChanged)="onPaginationChanged($event)"
                (rowClicked)="onRowClicked($event)"
            >
                <ng-template zwpTableCellTemplate="balances.available.amount" let-row="row">
                    <fsn-tink-currency-denominated-amount-label
                        [amount]="row.balances.available.amount"
                    ></fsn-tink-currency-denominated-amount-label>
                </ng-template>
                <ng-template zwpTableCellTemplate="balances.booked.amount" let-row="row">
                    <fsn-tink-currency-denominated-amount-label
                        [amount]="row.balances.booked.amount"
                    ></fsn-tink-currency-denominated-amount-label>
                </ng-template>
            
                <ng-template #rowActions let-row>
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                        <zwp-md-icon-button
                            icon="open_in_full"
                            label="Open Account Details"
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
                                    >Loyalty Card Scheme</span
                                >
                                <span zwpTextStyle="body1" zwpColor="system-white">{{ dataRow.displayName }}</span>
                            </div>
                        </div>
                    </div>
                </ng-template>
                <ng-template #selectionActions let-selected="selected">
                    <!-- <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px" fxFlex="noshrink"> -->
                    <!-- <span zwpTextStyle="body1" zwpColor="primary">Selected {{ selected.length }} Storage Objects</span> -->
                    <zwp-md-button
                        *ngIf="selected.length > 0"
                        [label]="'Delete Accounts'"
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
export class AccountPaginatedListComponent implements OnInit, OnDestroy {
    private accountFacade = inject(State.Facades.TinkAccountFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)
    private activatedRoute = inject(ActivatedRoute)
    private accountListContext: Model.Enums.AccountPaginatedListComponentContext =
        this.activatedRoute.snapshot.data['accountListContext']

    accounts$: Observable<Model.ServerAPIModel.Account.TinkV2AccountResponse[]> = of([])
    accountsRemotePagination$ = this.accountFacade.accountRemotePagination$

    accountListContextIsUserDetail =
        this.accountListContext === Model.Enums.AccountPaginatedListComponentContext.USER_DETAIL
    accountListContextIsAccountList =
        this.accountListContext ===
        Model.Enums.AccountPaginatedListComponentContext.ACCOUNT_LIST

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.ServerAPIModel.Account.TinkV2AccountResponse = 'dbCreatedAt'

    columns: ColumnInterface<Model.ServerAPIModel.Account.TinkV2AccountResponse>[] = [
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
            displayName: 'Available Balance',
            dataLabel: 'balances.available.amount',
            sortable: true,
            hasCustomTemplate: true
        },
        {
            displayName: 'Booked Balance',
            dataLabel: 'balances.booked.amount',
            sortable: true,
            hasCustomTemplate: true
        },
        { displayName: 'Customer Segment', dataLabel: 'customerSegment', sortable: true, transformEnumPipe: Model.ClientAPIModel.DataV2.Account.customerSegmentLabelEnumPipe },
        { displayName: 'Last Refreshed', dataLabel: 'dates.lastRefreshed', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } }, 
        {
            displayName: 'IBAN',
            dataLabel: 'identifiers.iban.iban',
            sortable: true
        },
        {
            displayName: 'Account Identifier',
            dataLabel: 'identifiers.financialInstitution.accountNumber',
            sortable: true
        },
        {
            displayName: 'UK Account Number',
            dataLabel: 'identifiers.sortCode.accountNumber',
            sortable: true
        },
        {
            displayName: 'UK Sort Code',
            dataLabel: 'identifiers.sortCode.code',
            sortable: true
        },
        {
            displayName: 'Name',
            dataLabel: 'name',
            sortable: true,
        },
        {
            displayName: 'Type',
            dataLabel: 'type',
            sortable: true,
            transformEnumPipe: Model.ClientAPIModel.DataV2.Account.accountTypeLabelEnumPipe,
        }
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null }
    ]

    async ngOnInit() {
        if (this.accountListContextIsAccountList) {
            this.accounts$ = this.accountFacade.paginatedFilteredAccounts$
        } else if (this.accountListContextIsUserDetail) {
            this.accounts$ = this.accountFacade.paginatedFilteredAccounts$
        }
        this.accountFacade.resetAccountFilters(
            false
        )
        await this.listAccountsForContext()
    }

    ngOnDestroy() {
        this.accountFacade.resetPagination()
    }

    async listAccountsForContext(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Account.TinkV2AccountResponse>>> = null
    ) {
        if (this.accountListContextIsAccountList) {
            this.accountFacade.listAccounts(null, pagination)
        }
        if (this.accountListContextIsUserDetail) {
            this.accountFacade.listAccounts(await this.getUserIdFromRoute(), pagination)
        }
    }

    onRowClicked(row: Model.ServerAPIModel.Account.TinkV2AccountResponse) {
        // event.preventDefault()
        // event.stopPropagation()
        // this.routerFacade.navigate(['merchant-net', 'loyalty-card-schemes', row.id])
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.ServerAPIModel.Account.TinkV2AccountResponse
        this.sortDirection = sort.direction
        this.listAccountsForContext({
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey,
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.AccountFilters> = handleFilterChipEvent(filterEvent)
        this.accountFacade.updateAccountFilters(filterChange, true)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.listAccountsForContext({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
        })
    }

    onInspectorClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Account.TinkV2AccountResponse) {
        event.preventDefault()
        event.stopPropagation()
        // this.panelLayoutFacade.addRightPanel({
        //     id: `${row.id}-loyalty-card-scheme-details`,
        //     label: `Loyalty Card Scheme Details`,
        //     icon: 'payments',
        //     componentName: 'AccountDetailRightPanelComponent',
        //     data: {
        //         accountId: row.id,
        //     },
        // })
    }

    onNavigationClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Account.TinkV2AccountResponse) {
        event.preventDefault()
        event.stopPropagation()
        // this.routerFacade.navigate(['merchant-net', 'loyalty-card-schemes', row.id])
    }

    onClipboardClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Account.TinkV2AccountResponse) {
        event.preventDefault()
        event.stopPropagation()
        //
    }

    onDeleteClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Account.TinkV2AccountResponse) {
        event.preventDefault()
        event.stopPropagation()
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Account',
                message: `Are you sure you want to delete the account ${row.name}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
            },
            // () => { this.accountFacade.deleteAccount(row.id) },
            // () => { this.accountFacade.deleteAccount(row.id, true) }
        )
    }

    onDeleteManyClicked(selected: Model.ServerAPIModel.Account.TinkV2AccountResponse[]) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Accounts',
                message: `Are you sure you want to delete ${selected.length} account${
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

    async getUserIdFromRoute(): Promise<Nullable<string>> {
        // const brandId = this.activatedRoute.parent?.parent?.snapshot.params['brandId'] ?? null
        return await this.routerFacade.getNestedRouteParam('tinkUserId') ?? null
    }
}
