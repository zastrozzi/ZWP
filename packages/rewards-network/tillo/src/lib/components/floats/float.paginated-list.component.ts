import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core'
import { State } from '../../+state'
import {
    ISO4217CurrencyCode,
    FilterChipEvent,
    FilterDefinition,
    handleFilterChipEvent,
    ZWPFilterChipInputType,
    ISO4217ActiveCurrencyCode,
    ISO4217ActiveCurrencyName,
    TransformEnumPipeSignature,
    ZWPISO3166Alpha2,
    ZWPISO3166Alpha2Label,
} from '@zwp/platform.common'
import { ColumnInterface, ZWPPanelLayoutFacade, ZWPPopupLayoutFacade } from '@zwp/platform.layout'
import { Sort, SortDirection } from '@angular/material/sort'
import { Model } from '../../model'
import { PageEvent } from '@angular/material/paginator'
import { Clipboard } from '@angular/cdk/clipboard'

@Component({
    selector: 'rewards-network-tillo-float-paginated-list',
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
                [data]="(paginatedFilteredFloats$ | async) || []"
                [selectable]="true"
                [actionable]="true"
                [pagination]="floatRemotePagination$ | async"
                (sortChanged)="onSortChanged($event)"
                (paginationChanged)="onPaginationChanged($event)"
            >
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
    `,
})
export class TilloFloatPaginatedListComponent implements OnInit, OnDestroy {
    private clipboard = inject(Clipboard)

    private floatFacade = inject(State.Facades.TilloFloatFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)

    paginatedFilteredFloats$ = this.floatFacade.paginatedFilteredFloats$
    floatRemotePagination$ = this.floatFacade.floatRemotePagination$

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.FloatResponse = 'id'

    currencyPipeSignature: TransformEnumPipeSignature = {
        input: ISO4217CurrencyCode,
        output: ISO4217ActiveCurrencyName,
    }

    columns: ColumnInterface<Model.FloatResponse>[] = [
        {
            displayName: 'Created At',
            dataLabel: 'dbCreatedAt',
            sortable: true,
            style: { minWidth: 180 },
            datePipe: { format: 'yyyy/MM/dd HH:mm:ss' },
        },
        {
            displayName: 'Updated At',
            dataLabel: 'dbUpdatedAt',
            sortable: true,
            style: { minWidth: 180 },
            datePipe: { format: 'yyyy/MM/dd HH:mm:ss' },
        },
        {
            displayName: 'Deleted At',
            dataLabel: 'dbDeletedAt',
            sortable: true,
            style: { minWidth: 180 },
            datePipe: { format: 'yyyy/MM/dd HH:mm:ss' },
        },
        { displayName: 'Universal', dataLabel: 'universal', sortable: true },
        {
            displayName: 'Currency',
            dataLabel: 'currency',
            sortable: true,
            transformEnumPipe: this.currencyPipeSignature,
        },
        { displayName: 'Available Balance', dataLabel: 'availableBalance.amount', sortable: true },
        { displayName: 'Pending Payments', dataLabel: 'pendingPayments.amount', sortable: true },
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Universal', name: 'universal', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        {
            displayName: 'Currency',
            name: 'currency',
            type: ZWPFilterChipInputType.ENUM,
            enumDefinition: this.currencyPipeSignature,
        },
        {
            displayName: 'Available Balance',
            name: 'availableBalance.amount',
            type: ZWPFilterChipInputType.NUMBER,
            enumDefinition: null,
        },
        {
            displayName: 'Pending Payments',
            name: 'pendingPayments.amount',
            type: ZWPFilterChipInputType.NUMBER,
            enumDefinition: null,
        },
    ]

    ngOnInit() {
        this.floatFacade.resetFloatFilters(false)
        this.floatFacade.listFloats()
    }

    ngOnDestroy() {
        this.floatFacade.resetPagination()
    }

    onInspectorClicked(row: Model.FloatResponse) {
        this.panelLayoutFacade.addRightPanel({
            id: `${row.id}-float-details`,
            label: `Float Details`,
            icon: 'schema',
            componentName: 'FloatsDetailsRightPanelComponent',
            data: {
                floatId: row.id,
            },
        })
    }

    onDeleteClicked(row: Model.BrandResponse) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Float',
                message: `Are you sure you want to delete the float ${row.id}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
                confirmPermanentButtonLabel: 'Delete Permanently',
            },
            () => {
                this.floatFacade.deleteFloat(row.id)
            }
        )
    }

    onNavigationClicked(row: Model.BrandResponse) {
        // this.panelLayoutFacade.addRightPanel({
        //     id: `${row.id}-table-details`,
        //     label: `Table Details - ${row.displayName}`,
        //     icon: 'schema',
        //     componentName: 'QueryableSchemaTableDetailsRightPanelComponent',
        //     data: {
        //         table: row
        //     }
        // })
    }

    onClipboardClicked(row: Model.FloatResponse) {
        const rowText = JSON.stringify(row, null, 2)
        this.clipboard.copy(rowText)
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.FloatResponse
        this.sortDirection = sort.direction
        this.floatFacade.listFloats({
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey,
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.FloatFilters> = handleFilterChipEvent(filterEvent)
        this.floatFacade.updateFloatFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.floatFacade.listFloats({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
        })
    }
}
