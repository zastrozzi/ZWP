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
    selector: 'fsn-tink-provider-paginated-list',
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
                [data]="(providers$ | async) || []"
                [selectable]="true"
                [actionable]="true"
                [draggable]="true"
                [selectionActionable]="true"
                [pagination]="providersRemotePagination$ | async"
                (sortChanged)="onSortChanged($event)"
                (paginationChanged)="onPaginationChanged($event)"
                (rowClicked)="onRowClicked($event)"
            >
                <ng-template #rowActions let-row>
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                        <zwp-md-icon-button
                            icon="open_in_full"
                            label="Open Provider Details"
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
                                    >Provider</span
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
                        [label]="'Delete Providers'"
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
export class ProviderPaginatedListComponent implements OnInit, OnDestroy {
    private providerFacade = inject(State.Facades.TinkProviderFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)
    private activatedRoute = inject(ActivatedRoute)
    private clipboard = inject(Clipboard)
    private providerListContext: Model.Enums.ProviderPaginatedListComponentContext =
        this.activatedRoute.snapshot.data['providerListContext']

    providers$: Observable<Model.ServerAPIModel.Provider.TinkV1ProviderResponse[]> = of([])
    providersRemotePagination$ = this.providerFacade.providerRemotePagination$

    providerListContextIsUserDetail =
        this.providerListContext === Model.Enums.ProviderPaginatedListComponentContext.USER_DETAIL
    providerListContextIsProviderList =
        this.providerListContext ===
        Model.Enums.ProviderPaginatedListComponentContext.PROVIDER_LIST

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.ServerAPIModel.Provider.TinkV1ProviderResponse = 'dbCreatedAt'

    columns: ColumnInterface<Model.ServerAPIModel.Provider.TinkV1ProviderResponse>[] = [
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
            dataLabel: 'displayName',
            sortable: true,
        },
        {
            displayName: 'Financial Institution',
            dataLabel: 'financialInstitutionName',
            sortable: true,
        },
        {
            displayName: 'Group Display Name',
            dataLabel: 'groupDisplayName',
            sortable: true,
        },
        {
            displayName: 'Market',
            dataLabel: 'market',
            sortable: true,
            transformEnumPipe: zwpISO3166Alpha2LabelEnumPipe,
        },
        {
            displayName: 'Access Type',
            dataLabel: 'accessType',
            sortable: true,
            transformEnumPipe: Model.ClientAPIModel.ConnectivityV1.Provider.accessTypeLabelEnumPipe,
        },
        {
            displayName: 'Authentication Flow',
            dataLabel: 'authenticationFlow',
            sortable: true,
            transformEnumPipe: Model.ClientAPIModel.ConnectivityV1.Provider.authenticationFlowLabelEnumPipe,
        },
        {
            displayName: 'User Type',
            dataLabel: 'authenticationUserType',
            sortable: true,
            transformEnumPipe: Model.ClientAPIModel.ConnectivityV1.Provider.authenticationUserTypeLabelEnumPipe,
        },
        {
            displayName: 'Capabilities',
            dataLabel: 'capabilities',
            sortable: true,
            transformEnumPipe: Model.ClientAPIModel.ConnectivityV1.Provider.capabilityLabelEnumPipe,
            multi: true
        },
        {
            displayName: 'Credentials Type',
            dataLabel: 'credentialsType',
            sortable: true,
            transformEnumPipe: Model.ClientAPIModel.ConnectivityV1.Credentials.credentialsTypeLabelEnumPipe,
        },
        {
            displayName: 'Currency',
            dataLabel: 'currency',
            sortable: true,
            transformEnumPipe: iso4217CurrencyNameEnumPipe,
        },
        // {
        //     displayName: 'Display Description',
        //     dataLabel: 'displayDescription',
        //     sortable: true,
        // },
        
        // {
        //     displayName: 'Name',
        //     dataLabel: 'name',
        //     sortable: true,
        // },
        {
            displayName: 'PIS Capabilities',
            dataLabel: 'pisCapabilities',
            sortable: true,
            transformEnumPipe: Model.ClientAPIModel.ConnectivityV1.Provider.pisCapabilityLabelEnumPipe,
            multi: true
        },
        {
            displayName: 'Status',
            dataLabel: 'status',
            sortable: true,
            transformEnumPipe: Model.ClientAPIModel.ConnectivityV1.Provider.providerStatusLabelEnumPipe,
        },
        {
            displayName: 'Provider Type',
            dataLabel: 'type',
            sortable: true,
            transformEnumPipe: Model.ClientAPIModel.ConnectivityV1.Provider.providerTypeLabelEnumPipe,
        }
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null }
    ]

    async ngOnInit() {
        if (this.providerListContextIsProviderList) {
            this.providers$ = this.providerFacade.paginatedFilteredProviders$
        } else if (this.providerListContextIsUserDetail) {
            this.providers$ = this.providerFacade.paginatedFilteredProviders$
        }
        this.providerFacade.resetProviderFilters(
            false
        )
        await this.listProvidersForContext()
    }

    ngOnDestroy() {
        this.providerFacade.resetPagination()
    }

    async listProvidersForContext(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Provider.TinkV1ProviderResponse>>> = null
    ) {
        if (this.providerListContextIsProviderList) {
            this.providerFacade.listProviders(null, pagination)
        }
        if (this.providerListContextIsUserDetail) {
            this.providerFacade.listProviders(await this.getUserIdFromRoute(), pagination)
        }
    }

    onRowClicked(row: Model.ServerAPIModel.Provider.TinkV1ProviderResponse) {
        // event.preventDefault()
        // event.stopPropagation()
        // this.routerFacade.navigate(['tink', 'providers', row.id])
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.ServerAPIModel.Provider.TinkV1ProviderResponse
        this.sortDirection = sort.direction
        this.listProvidersForContext({
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey,
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.ProviderFilters> = handleFilterChipEvent(filterEvent)
        this.providerFacade.updateProviderFilters(filterChange, true)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.listProvidersForContext({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
        })
    }

    onInspectorClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Provider.TinkV1ProviderResponse) {
        event.preventDefault()
        event.stopPropagation()
        this.panelLayoutFacade.addRightPanel({
            id: `${row.id}-provider-detail`,
            label: `Provider Details`,
            icon: 'account_balance',
            componentName: 'TinkProviderDetailRightPanelComponent',
            data: {
                providerId: row.id,
            },
        })
    }

    onNavigationClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Provider.TinkV1ProviderResponse) {
        event.preventDefault()
        event.stopPropagation()
        // this.routerFacade.navigate(['tink', 'providers', row.id])
    }

    onClipboardClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Provider.TinkV1ProviderResponse) {
        event.preventDefault()
        event.stopPropagation()
        this.clipboard.copy(JSON.stringify(row))
    }

    onDeleteClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Provider.TinkV1ProviderResponse) {
        event.preventDefault()
        event.stopPropagation()
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Provider',
                message: `Are you sure you want to delete the provider ${row.name}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
            },
            // () => { this.providerFacade.deleteProvider(row.id) },
            // () => { this.providerFacade.deleteProvider(row.id, true) }
        )
    }

    onDeleteManyClicked(selected: Model.ServerAPIModel.Provider.TinkV1ProviderResponse[]) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Providers',
                message: `Are you sure you want to delete ${selected.length} provider${
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
