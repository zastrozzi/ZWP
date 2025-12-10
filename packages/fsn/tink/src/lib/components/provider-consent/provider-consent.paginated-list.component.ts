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
    selector: 'fsn-tink-provider-consent-paginated-list',
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
                [data]="(providerConsents$ | async) || []"
                [selectable]="true"
                [actionable]="true"
                [draggable]="true"
                [selectionActionable]="true"
                [pagination]="providerConsentsRemotePagination$ | async"
                (sortChanged)="onSortChanged($event)"
                (paginationChanged)="onPaginationChanged($event)"
                (rowClicked)="onRowClicked($event)"
            >
                <ng-template #rowActions let-row>
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                        <zwp-md-icon-button
                            icon="open_in_full"
                            label="Open ProviderConsent Details"
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
                                    >ProviderConsent</span
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
                        [label]="'Delete ProviderConsents'"
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
export class ProviderConsentPaginatedListComponent implements OnInit, OnDestroy {
    private providerConsentFacade = inject(State.Facades.TinkProviderConsentFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)
    private activatedRoute = inject(ActivatedRoute)
    private clipboard = inject(Clipboard)
    private providerConsentListContext: Model.Enums.ProviderConsentPaginatedListComponentContext =
        this.activatedRoute.snapshot.data['providerConsentListContext']

    providerConsents$: Observable<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse[]> = of([])
    providerConsentsRemotePagination$ = this.providerConsentFacade.providerConsentRemotePagination$

    providerConsentListContextIsUserDetail =
        this.providerConsentListContext === Model.Enums.ProviderConsentPaginatedListComponentContext.USER_DETAIL
        providerConsentListContextIsProviderDetail =
        this.providerConsentListContext === Model.Enums.ProviderConsentPaginatedListComponentContext.PROVIDER_DETAIL
    providerConsentListContextIsProviderConsentList =
        this.providerConsentListContext ===
        Model.Enums.ProviderConsentPaginatedListComponentContext.PROVIDER_CONSENT_LIST

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse = 'dbCreatedAt'

    columns: ColumnInterface<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse>[] = [
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
            displayName: 'Status',
            dataLabel: 'status',
            sortable: true,
            transformEnumPipe: Model.ClientAPIModel.ConnectivityV1.ProviderConsent.providerConsentStatusLabelEnumPipe,
        }
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null }
    ]

    async ngOnInit() {
        if (this.providerConsentListContextIsProviderConsentList) {
            this.providerConsents$ = this.providerConsentFacade.paginatedFilteredProviderConsents$
        } else if (this.providerConsentListContextIsUserDetail) {
            this.providerConsents$ = this.providerConsentFacade.paginatedFilteredProviderConsents$
        } else if (this.providerConsentListContextIsProviderDetail) {
            this.providerConsents$ = this.providerConsentFacade.paginatedFilteredProviderConsents$
        }
        this.providerConsentFacade.resetProviderConsentFilters(
            false
        )
        await this.listProviderConsentsForContext()
    }

    ngOnDestroy() {
        this.providerConsentFacade.resetPagination()
    }

    async listProviderConsentsForContext(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse>>> = null
    ) {
        if (this.providerConsentListContextIsProviderConsentList) {
            this.providerConsentFacade.listProviderConsents(null, pagination)
        }
        if (this.providerConsentListContextIsProviderDetail) {
            this.providerConsentFacade.listProviderConsents(null, pagination)
        }
        if (this.providerConsentListContextIsUserDetail) {
            this.providerConsentFacade.listProviderConsents(await this.getUserIdFromRoute(), pagination)
        }
    }

    onRowClicked(row: Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse) {
        // event.preventDefault()
        // event.stopPropagation()
        // this.routerFacade.navigate(['tink', 'providerConsents', row.id])
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse
        this.sortDirection = sort.direction
        this.listProviderConsentsForContext({
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey,
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.ProviderConsentFilters> = handleFilterChipEvent(filterEvent)
        this.providerConsentFacade.updateProviderConsentFilters(filterChange, true)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.listProviderConsentsForContext({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
        })
    }

    onInspectorClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse) {
        event.preventDefault()
        event.stopPropagation()
        // this.panelLayoutFacade.addRightPanel({
        //     id: `${row.id}-providerConsent-detail`,
        //     label: `ProviderConsent Details`,
        //     icon: 'account_balance',
        //     componentName: 'TinkProviderConsentDetailRightPanelComponent',
        //     data: {
        //         providerConsentId: row.id,
        //     },
        // })
    }

    onNavigationClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse) {
        event.preventDefault()
        event.stopPropagation()
        // this.routerFacade.navigate(['tink', 'providerConsents', row.id])
    }

    onClipboardClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse) {
        event.preventDefault()
        event.stopPropagation()
        this.clipboard.copy(JSON.stringify(row))
    }

    onDeleteClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse) {
        event.preventDefault()
        event.stopPropagation()
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete ProviderConsent',
                message: `Are you sure you want to delete the consent ${row.id}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
            },
            // () => { this.providerConsentFacade.deleteProviderConsent(row.id) },
            // () => { this.providerConsentFacade.deleteProviderConsent(row.id, true) }
        )
    }

    onDeleteManyClicked(selected: Model.ServerAPIModel.Consent.TinkV1ProviderConsentResponse[]) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete ProviderConsents',
                message: `Are you sure you want to delete ${selected.length} providerConsent${
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
        return await this.routerFacade.getNestedRouteParam('tinkUserId') ?? null
    }
}
