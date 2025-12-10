import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core'
import { State } from '../../+state';
import { FileExtension, FilterChipEvent, FilterDefinition, handleFilterChipEvent, ZWPFilterChipInputType, ISO4217ActiveCurrencyCode, ISO4217ActiveCurrencyName, TransformEnumPipeSignature, ZWPISO3166Alpha2, ZWPISO3166Alpha2Label, ZWPRouterFacade, Nullable, PaginatedQueryParams } from '@zwp/platform.common';
import { ColumnInterface, ZWPPanelLayoutFacade, ZWPWindowLayoutFacade, ZWPPopupLayoutFacade } from '@zwp/platform.layout'
import { Sort, SortDirection } from '@angular/material/sort'
import { Model } from '../../model';
import { PageEvent } from '@angular/material/paginator';
import { Clipboard } from '@angular/cdk/clipboard';
import { ActivatedRoute } from '@angular/router'
import { ComponentRouteContext } from '../../model/enums'
import { Observable, of } from 'rxjs'

@Component({
    selector: 'rewards-network-tillo-store-card-paginated-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlexFill> 
            <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
                <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>     
            </div>

        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(storeCards$ | async) || []" [selectable]="true" [actionable]="true"
            [pagination]="storeCardRemotePagination$ | async"
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
export class TilloStoreCardPaginatedListComponent implements OnInit, OnDestroy {
    private clipboard = inject(Clipboard)
    private tilloStoreCardFacade = inject(State.Facades.TilloStoreCardFacade)
    private tilloBrandFacade = inject(State.Facades.TilloBrandFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)
    private route = inject(ActivatedRoute)
    private routerFacade = inject(ZWPRouterFacade)
    private storeCardListContext: Model.StoreCardPaginatedListComponentContext = this.route.snapshot.data['storeCardListContext']

    storeCards$: Observable<Model.StoreCardResponse[]> = of([])
    storeCardRemotePagination$ = this.tilloStoreCardFacade.storeCardRemotePagination$

    storeCardListContextIsTilloBrandDetail = this.storeCardListContext === Model.StoreCardPaginatedListComponentContext.TILLO_BRAND_DETAIL
    storeCardListContextIsStoreCardList = this.storeCardListContext === Model.StoreCardPaginatedListComponentContext.STORE_CARD_LIST
    storeCardListContextIsEndUserDetail = this.storeCardListContext === Model.StoreCardPaginatedListComponentContext.ENDUSER_DETAIL

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.StoreCardResponse = 'dbCreatedAt'

    columns: ColumnInterface<Model.StoreCardResponse>[] = [
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Updated At', dataLabel: 'dbUpdatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Status', dataLabel: 'status', sortable: true,  transformEnumPipe: Model.storeCardLabelPipeSignature},
        { displayName: 'Tillo Brand', dataLabel: 'brandId', sortable: true },
        { displayName: 'User', dataLabel: 'enduserId', sortable: true }
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Status', name: 'status', type: ZWPFilterChipInputType.ENUM, enumDefinition: Model.storeCardLabelPipeSignature },
        { displayName: 'Brand ID', name: 'brandId', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'End User ID', name: 'enduserId', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
    ]

    async ngOnInit() {
        if (this.storeCardListContextIsTilloBrandDetail) {
            this.storeCards$ = this.tilloStoreCardFacade.storeCardsForSelectedTilloBrand$
        } else if (this.storeCardListContextIsStoreCardList) {
            this.storeCards$ = this.tilloStoreCardFacade.paginatedFilteredStoreCards$
        } else if (this.storeCardListContextIsEndUserDetail) {
            this.storeCards$ = this.tilloStoreCardFacade.storeCardsForSelectedTilloBrand$
        }
        this.listStoreCardsForContext()
    }

    async ngOnDestroy() {
        this.tilloStoreCardFacade.resetPagination()
    }

    async listStoreCardsForContext(pagination: Nullable<Partial<PaginatedQueryParams<Model.StoreCardResponse>>> = null) {
        if (this.storeCardListContextIsTilloBrandDetail) {
            this.tilloStoreCardFacade.listStoreCards(await this.getBrandIdFromRoute(), null, pagination)
        } else if (this.storeCardListContextIsStoreCardList) {
            this.tilloStoreCardFacade.listStoreCards(null, null, pagination)
        } else if (this.storeCardListContextIsEndUserDetail) {
            this.tilloStoreCardFacade.listStoreCards(null, await this.getEnduserIdFromRoute(), pagination)
        }
    }

    
    onDeleteClicked(row: Model.StoreCardResponse) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Store Card',
                message: `Are you sure you want to delete the store card ${row.id}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
                confirmPermanentButtonLabel: 'Delete Permanently'
            },
            () => { this.tilloStoreCardFacade.deleteStoreCard(row.id) }
        )
    }

    onInspectorClicked(row: Model.StoreCardResponse) {
        this.panelLayoutFacade.addRightPanel({
            id: `${row.id}-storeCard-details`,
            label: `Store Card Details`,
            icon: 'perm_media',
            componentName: 'TilloStoreCardDetailsRightPanelComponent',
            data: {
                storeCardId: row.id
            }
        })
    }


    onClipboardClicked(row: Model.StoreCardResponse) {
        const rowText = JSON.stringify(row, null, 2)
        this.clipboard.copy(rowText);
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.StoreCardResponse
        this.sortDirection = sort.direction
        this.listStoreCardsForContext({ 
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.StoreCardFilters> = handleFilterChipEvent(filterEvent)
        this.tilloStoreCardFacade.updateStoreCardFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.listStoreCardsForContext({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize
        })
    }

    async getBrandIdFromRoute(): Promise<Nullable<string>> {
        return await this.routerFacade.getNestedRouteParam('brandId') ?? null
    }

    async getEnduserIdFromRoute(): Promise<Nullable<string>> {
        return await this.routerFacade.getNestedRouteParam('enduserId') ?? null
    }

}