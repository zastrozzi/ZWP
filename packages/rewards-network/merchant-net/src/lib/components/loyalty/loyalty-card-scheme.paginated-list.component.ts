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
import { ComponentRouteContext } from '../../model/enums'

@Component({
    selector: 'urnet-mnet-loyalty-card-scheme-list',
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
                    *ngIf="loyaltyCardSchemeListContextIsBrandDetail || loyaltyCardSchemeListContextIsMerchantDetail"
                    label="Create Card Scheme"
                    icon="add"
                    textStyle="button1"
                    [iconTextStyle]="'subheadline'"
                    [labelColor]="'system-white' | zwpColorTheme"
                    [backgroundColor]="'system-green' | zwpColorTheme"
                    (btnClick)="onNewLoyaltyCardSchemeClicked()"
                ></zwp-md-button>
            </div>
            <zwp-divider></zwp-divider>
            <zwp-paginated-table
                fxFlex="1 1 calc(100% - 55px)"
                [columns]="columns"
                [data]="(loyaltyCardSchemes$ | async) || []"
                [selectable]="true"
                [actionable]="true"
                [draggable]="true"
                [selectionActionable]="true"
                [pagination]="loyaltyCardSchemesRemotePagination$ | async"
                (sortChanged)="onSortChanged($event)"
                (paginationChanged)="onPaginationChanged($event)"
                (rowClicked)="onRowClicked($event)"
            >
                <ng-template #rowActions let-row>
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                        <zwp-md-icon-button
                            icon="open_in_full"
                            label="Open Card Scheme Details"
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
                        <zwp-md-icon-button
                            icon="delete"
                            label="Delete"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onDeleteClicked($event, row)"
                        ></zwp-md-icon-button>
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
                        [label]="'Delete Card Schemes'"
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
export class LoyaltyCardSchemePaginatedListComponent implements OnInit, OnDestroy {
    private loyaltyCardSchemeFacade = inject(State.Facades.LoyaltyCardSchemeFacade)
    private loyaltyCardSchemeBrandFacade = inject(State.Facades.LoyaltyCardSchemeBrandFacade)
    private adminUserFacade = inject(CDPUsers.State.AdminUserFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)
    private activatedRoute = inject(ActivatedRoute)
    private loyaltyCardSchemeListContext: Model.LoyaltyCardSchemePaginatedListComponentContext =
        this.activatedRoute.snapshot.data['loyaltyCardSchemeListContext']

    loyaltyCardSchemes$: Observable<Model.LoyaltyCardSchemeResponse[]> = of([])
    loyaltyCardSchemesRemotePagination$ = this.loyaltyCardSchemeFacade.loyaltyCardSchemeRemotePagination$

    loyaltyCardSchemeListContextIsBrandDetail =
        this.loyaltyCardSchemeListContext === Model.LoyaltyCardSchemePaginatedListComponentContext.BRAND_DETAIL
    loyaltyCardSchemeListContextIsMerchantDetail =
        this.loyaltyCardSchemeListContext === Model.LoyaltyCardSchemePaginatedListComponentContext.MERCHANT_DETAIL
    loyaltyCardSchemeListContextIsLoyaltyCardSchemeList =
        this.loyaltyCardSchemeListContext ===
        Model.LoyaltyCardSchemePaginatedListComponentContext.LOYALTY_CARD_SCHEME_LIST

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.LoyaltyCardSchemeResponse = 'displayName'

    columns: ColumnInterface<Model.LoyaltyCardSchemeResponse>[] = [
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
            transformEnumPipe: { input: Model.LoyaltyCardSchemeStatus, output: Model.LoyaltyCardSchemeStatusLabel },
        },
        { displayName: 'Display Name', dataLabel: 'displayName', sortable: true },
        { displayName: 'Has Barcode', dataLabel: 'hasBarcode', sortable: true },
        {
            displayName: 'Barcode Type',
            dataLabel: 'barcodeType',
            sortable: true,
            transformEnumPipe: { input: BarcodeType, output: BarcodeTypeLabel },
        },
        { displayName: 'Logo URL', dataLabel: 'logoUrl', sortable: true, copyable: true, style: { maxWidth: 300 } },
        { displayName: 'Primary Color', dataLabel: 'primaryColorHexString', sortable: false },
        { displayName: 'Secondary Color', dataLabel: 'secondaryColorHexString', sortable: false },
        { displayName: 'Background Color', dataLabel: 'backgroundColorHexString', sortable: false },
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        {
            displayName: 'Status',
            name: 'status',
            type: ZWPFilterChipInputType.ENUM,
            enumDefinition: { input: Model.LoyaltyCardSchemeStatus, output: Model.LoyaltyCardSchemeStatusLabel },
        },
        {
            displayName: 'Display Name',
            name: 'displayName',
            type: ZWPFilterChipInputType.STRING,
            enumDefinition: null,
        },
        // { displayName: 'Has Barcode', name: 'hasBarcode', type: ZWPFilterChipInputType.ENUM, enumDefinition: { input: [true, false], output: ['Yes', 'No'] } },
        {
            displayName: 'Barcode Type',
            name: 'barcodeType',
            type: ZWPFilterChipInputType.ENUM,
            enumDefinition: { input: BarcodeType, output: BarcodeTypeLabel },
        },
        { displayName: 'Logo URL', name: 'logoUrl', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
    ]

    async ngOnInit() {
        if (this.loyaltyCardSchemeListContextIsMerchantDetail) {
            this.loyaltyCardSchemes$ = this.loyaltyCardSchemeFacade.loyaltyCardSchemesForSelectedMerchant$
        } else if (this.loyaltyCardSchemeListContextIsBrandDetail) {
            this.loyaltyCardSchemes$ = this.loyaltyCardSchemeFacade.loyaltyCardSchemesForSelectedBrand$
        } else if (this.loyaltyCardSchemeListContextIsLoyaltyCardSchemeList) {
            this.loyaltyCardSchemes$ = this.loyaltyCardSchemeFacade.loyaltyCardSchemes$
        }
        this.loyaltyCardSchemeFacade.resetLoyaltyCardSchemeFiltersForPaginatedListComponent(
            this.loyaltyCardSchemeListContext,
            false
        )
        await this.listLoyaltyCardSchemesForContext()
    }

    ngOnDestroy() {
        this.loyaltyCardSchemeFacade.resetLoyaltyCardSchemePagination()
    }

    async listLoyaltyCardSchemesForContext(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardSchemeResponse>>> = null
    ) {
        if (this.loyaltyCardSchemeListContextIsMerchantDetail) {
            this.loyaltyCardSchemeFacade.listLoyaltyCardSchemes(null, await this.getMerchantIdFromRoute(), pagination)
        }
        if (this.loyaltyCardSchemeListContextIsBrandDetail) {
            this.loyaltyCardSchemeFacade.listLoyaltyCardSchemes(await this.getBrandIdFromRoute(), null, pagination)
            this.loyaltyCardSchemeBrandFacade.listLoyaltyCardSchemeBrands(null, await this.getBrandIdFromRoute(), null)
        }
        if (this.loyaltyCardSchemeListContextIsLoyaltyCardSchemeList) {
            this.loyaltyCardSchemeFacade.listLoyaltyCardSchemes(null, null, pagination)
        }
    }

    onRowClicked(row: Model.LoyaltyCardSchemeResponse) {
        // event.preventDefault()
        // event.stopPropagation()
        this.routerFacade.navigate(['merchant-net', 'loyalty-card-schemes', row.id])
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.LoyaltyCardSchemeResponse
        this.sortDirection = sort.direction
        this.listLoyaltyCardSchemesForContext({
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey,
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.LoyaltyCardSchemeFilters> = handleFilterChipEvent(filterEvent)
        this.loyaltyCardSchemeFacade.updateLoyaltyCardSchemeFiltersForPaginatedListComponent(
            filterChange,
            this.loyaltyCardSchemeListContext
        )
    }

    onPaginationChanged(pagination: PageEvent) {
        this.listLoyaltyCardSchemesForContext({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
        })
    }

    onInspectorClicked(event: MouseEvent | TouchEvent, row: Model.LoyaltyCardSchemeResponse) {
        event.preventDefault()
        event.stopPropagation()
        this.panelLayoutFacade.addRightPanel({
            id: `${row.id}-loyalty-card-scheme-details`,
            label: `Loyalty Card Scheme Details`,
            icon: 'payments',
            componentName: 'LoyaltyCardSchemeDetailRightPanelComponent',
            data: {
                loyaltyCardSchemeId: row.id,
            },
        })
    }

    onNavigationClicked(event: MouseEvent | TouchEvent, row: Model.LoyaltyCardSchemeResponse) {
        event.preventDefault()
        event.stopPropagation()
        this.routerFacade.navigate(['merchant-net', 'loyalty-card-schemes', row.id])
    }

    onClipboardClicked(event: MouseEvent | TouchEvent, row: Model.LoyaltyCardSchemeResponse) {
        event.preventDefault()
        event.stopPropagation()
        //
    }

    onDeleteClicked(event: MouseEvent | TouchEvent, row: Model.LoyaltyCardSchemeResponse) {
        event.preventDefault()
        event.stopPropagation()
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Loyalty Card Scheme',
                message: `Are you sure you want to delete the card scheme ${row.displayName}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
            },
            () => { this.loyaltyCardSchemeFacade.deleteLoyaltyCardScheme(row.id, false) },
            () => { this.loyaltyCardSchemeFacade.deleteLoyaltyCardScheme(row.id, true) }
        )
    }

    onDeleteManyClicked(selected: Model.LoyaltyCardSchemeResponse[]) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Loyalty Card Schemes',
                message: `Are you sure you want to delete ${selected.length} card scheme${
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

    onNewLoyaltyCardSchemeClicked() {
        this.windowLayoutFacade.addWindow({
            label: 'New Card Scheme',
            icon: 'payments',
            componentName: 'CreateLoyaltyCardSchemeWindowComponent',
            position: { top: 'calc(50vh - 200px)', left: 'calc(50vw - 350px)', width: '700px', height: '400px' },
            data: {
                brandId: this.getBrandIdFromRoute(),
                merchantId: this.getMerchantIdFromRoute()
            },
        })
    }

    async getBrandIdFromRoute(): Promise<Nullable<string>> {
        // const brandId = this.activatedRoute.parent?.parent?.snapshot.params['brandId'] ?? null
        return await this.routerFacade.getNestedRouteParam('brandId') ?? null
    }

    async getMerchantIdFromRoute(): Promise<Nullable<string>> {
        return await this.routerFacade.getNestedRouteParam('merchantId') ?? null
    }
}
