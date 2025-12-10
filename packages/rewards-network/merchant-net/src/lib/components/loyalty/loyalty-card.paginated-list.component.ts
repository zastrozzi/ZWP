import { Component, OnInit, ChangeDetectionStrategy, inject, OnDestroy } from '@angular/core'
import { State } from '../../+state'
import { CDPUsers } from '@zwp/cdp.users'
import { ColumnInterface, ZWPPanelLayoutFacade, ZWPPopupLayoutFacade, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { Model } from '../../model'
import {
    FilterChipEvent,
    FilterDefinition,
    handleFilterChipEvent,
    isUndefined,
    ZWPFilterChipInputType,
    ZWPRouterFacade,
    Nullable,
    PaginatedQueryParams,
} from '@zwp/platform.common'
import { Observable, of, tap } from 'rxjs'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'urnet-mnet-loyalty-card-paginated-list',
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
                    *ngIf="loyaltyCardListContextIsEnduserDetail"
                    label="Create Loyalty Card"
                    icon="add"
                    textStyle="button1"
                    [iconTextStyle]="'subheadline'"
                    [labelColor]="'system-white' | zwpColorTheme"
                    [backgroundColor]="'system-green' | zwpColorTheme"
                    (btnClick)="onNewLoyaltyCardClicked()"
                ></zwp-md-button>
            </div>
            <zwp-divider></zwp-divider>
            <zwp-paginated-table
                fxFlex="1 1 calc(100% - 55px)"
                [columns]="columns"
                [data]="(loyaltyCards$ | async) || []"
                [selectable]="true"
                [actionable]="true"
                [pagination]="loyaltyCardsRemotePagination$ | async"
                (sortChanged)="onSortChanged($event)"
                (paginationChanged)="onPaginationChanged($event)"
                (rowClicked)="onRowClicked($event)"
            >
                <ng-template zwpTableCellTemplate="enduserId" let-row="row">
                    <ng-container *ngIf="enduserById$(row.enduserId) | async as enduser">
                        <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                            <zwp-md-button
                                [label]="enduser.firstName + ' ' + enduser.lastName"
                                icon="face"
                                [iconTextStyle]="'button3'"
                                [textStyle]="'button3'"
                                postfixIcon="chevron_right"
                                [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                                [labelColor]="'primary' | zwpColorTheme"
                                (btnClick)="onNavigateEnduserClicked($event, enduser.id)"
                            ></zwp-md-button>
                        </div>
                    </ng-container>
                </ng-template>
                <ng-template zwpTableCellTemplate="cardSchemeId" let-row="row">
                    <ng-container *ngIf="loyaltyCardSchemeById$(row.cardSchemeId) | async as cardScheme">
                        <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                            <zwp-md-button
                                [label]="cardScheme.displayName"
                                icon="face"
                                [iconTextStyle]="'button3'"
                                [textStyle]="'button3'"
                                postfixIcon="chevron_right"
                                [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                                [labelColor]="'primary' | zwpColorTheme"
                                (btnClick)="onNavigateLoyaltyCardSchemeClicked($event, cardScheme.id)"
                            ></zwp-md-button>
                        </div>
                    </ng-container>
                </ng-template>
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
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onDeleteClicked(row)"
                        ></zwp-md-icon-button>
                    </div>
                </ng-template>
            </zwp-paginated-table>
        </div>
    `,
})
export class LoyaltyCardPaginatedListComponent implements OnInit, OnDestroy {
    private loyaltyCardFacade = inject(State.Facades.LoyaltyCardFacade)
    private loyaltyCardSchemeBrandFacade = inject(State.Facades.LoyaltyCardSchemeBrandFacade)
    private loyaltyCardSchemeFacade = inject(State.Facades.LoyaltyCardSchemeFacade)
    private enduserFacade = inject(CDPUsers.State.EnduserFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)
    private activatedRoute = inject(ActivatedRoute)
    private loyaltyCardListContext: Model.LoyaltyCardPaginatedListComponentContext =
        this.activatedRoute.snapshot.data['loyaltyCardListContext']

    loyaltyCards$: Observable<Model.LoyaltyCardResponse[]> = of([])
    loyaltyCardsRemotePagination$ = this.loyaltyCardFacade.loyaltyCardRemotePagination$
    requestedEnduserIds: Set<string> = new Set()
    requestedLoyaltyCardSchemeIds: Set<string> = new Set()
    
    loyaltyCardListContextIsBrandDetail =
        this.loyaltyCardListContext === Model.LoyaltyCardPaginatedListComponentContext.BRAND_DETAIL
    loyaltyCardListContextIsMerchantDetail =
        this.loyaltyCardListContext === Model.LoyaltyCardPaginatedListComponentContext.MERCHANT_DETAIL
    loyaltyCardListContextIsCardSchemeDetail =
        this.loyaltyCardListContext ===
        Model.LoyaltyCardPaginatedListComponentContext.LOYALTY_CARD_SCHEME_DETAIL
    loyaltyCardListContextIsEnduserDetail =
        this.loyaltyCardListContext === Model.LoyaltyCardPaginatedListComponentContext.ENDUSER_DETAIL
    loyaltyCardListContextIsLoyaltyCardList =
        this.loyaltyCardListContext === Model.LoyaltyCardPaginatedListComponentContext.LOYALTY_CARD_LIST

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.LoyaltyCardResponse = 'displayName'

    columns: ColumnInterface<Model.LoyaltyCardResponse>[] = [
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
            transformEnumPipe: Model.loyaltyCardStatusLabelPipeSignature,
        },
        { displayName: 'Display Name', dataLabel: 'displayName', sortable: true },
        { displayName: 'User', dataLabel: 'enduserId', sortable: false, hasCustomTemplate: true },
        { displayName: 'Card Scheme', dataLabel: 'cardSchemeId', sortable: false, hasCustomTemplate: true }
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        {
            displayName: 'Status',
            name: 'status',
            type: ZWPFilterChipInputType.ENUM,
            enumDefinition: Model.loyaltyCardStatusLabelPipeSignature,
        },
        {
            displayName: 'Display Name',
            name: 'displayName',
            type: ZWPFilterChipInputType.STRING,
            enumDefinition: null,
        },
    ]

    async ngOnInit() {
        if (this.loyaltyCardListContextIsBrandDetail) {
            console.log('Loyalty Card List Context is Brand Detail')
            this.loyaltyCards$ = this.loyaltyCardFacade.loyaltyCardsForSelectedBrand$
        }
        if (this.loyaltyCardListContextIsMerchantDetail) {
            this.loyaltyCards$ = this.loyaltyCardFacade.loyaltyCardsForSelectedMerchant$
        }
        if (this.loyaltyCardListContextIsCardSchemeDetail) {
            this.loyaltyCards$ = this.loyaltyCardFacade.loyaltyCardsForSelectedLoyaltyCardScheme$
        }
        if (this.loyaltyCardListContextIsEnduserDetail) {
            this.loyaltyCards$ = this.loyaltyCardFacade.loyaltyCardsForSelectedEnduser$
        }
        if (this.loyaltyCardListContextIsLoyaltyCardList) {
            this.loyaltyCards$ = this.loyaltyCardFacade.loyaltyCards$
        }
        await this.listLoyaltyCardSchemesForContext()
        await this.listLoyaltyCardSchemeBrandsForContext()
        await this.listLoyaltyCardsForContext()
        
    }

    async ngOnDestroy() {
        this.loyaltyCardFacade.resetLoyaltyCardPagination()
    }

    async listLoyaltyCardsForContext(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardResponse>>> = null
    ) {
        this.loyaltyCardFacade.listLoyaltyCards(
            await this.getLoyaltyCardSchemeIdFromRoute(),
            await this.getEnduserIdFromRoute(),
            await this.getBrandIdFromRoute(),
            await this.getMerchantIdFromRoute(),
            pagination
        )
    }

    async listLoyaltyCardSchemesForContext(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardSchemeResponse>>> = null
    ) {
        this.loyaltyCardSchemeFacade.listLoyaltyCardSchemes(
            await this.getBrandIdFromRoute(),
            await this.getMerchantIdFromRoute(),
            pagination
        )
    }

    async listLoyaltyCardSchemeBrandsForContext(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.LoyaltyCardSchemeBrandResponse>>> = null
    ) {
        if (this.loyaltyCardListContextIsBrandDetail) {
            this.loyaltyCardSchemeBrandFacade.listLoyaltyCardSchemeBrands(null, await this.getBrandIdFromRoute(), null)
        }
        
    }

    enduserById$ = (enduserId: string) =>
        this.enduserFacade.enduserById$(enduserId).pipe(
            tap((enduser) => {
                if (isUndefined(enduser) && !this.requestedEnduserIds.has(enduserId)) {
                    this.requestedEnduserIds.add(enduserId)
                    this.enduserFacade.getEnduser(enduserId)
                }
            })
        )

    loyaltyCardSchemeById$ = (cardSchemeId: string) =>
        this.loyaltyCardSchemeFacade.loyaltyCardSchemeById$(cardSchemeId).pipe(
            tap((cardScheme) => {
                if (isUndefined(cardScheme) && !this.requestedLoyaltyCardSchemeIds.has(cardSchemeId)) {
                    this.requestedLoyaltyCardSchemeIds.add(cardSchemeId)
                    this.loyaltyCardSchemeFacade.getLoyaltyCardScheme(cardSchemeId)
                }
            })
        )

    onRowClicked(row: Model.LoyaltyCardResponse) {
        console.log(row, 'row clicked')
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.LoyaltyCardResponse
        this.sortDirection = sort.direction
        this.listLoyaltyCardsForContext({
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey,
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.LoyaltyCardFilters> = handleFilterChipEvent(filterEvent)
        this.loyaltyCardFacade.updateLoyaltyCardFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.listLoyaltyCardsForContext({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
        })
    }

    async onNewLoyaltyCardClicked() {
        this.windowLayoutFacade.addWindow({
            label: 'New Loyalty Card',
            icon: 'credit_card',
            componentName: 'CreateLoyaltyCardWindowComponent',
            position: { top: 'calc(50vh - 200px)', left: 'calc(50vw - 350px)', width: '700px', height: '400px' },
            data: {
                enduserId: await this.getEnduserIdFromRoute()
            },
        })
    }

    onInspectorClicked(row: Model.LoyaltyCardResponse) {
        this.panelLayoutFacade.addRightPanel({
            id: `${row.id}-loyalty-card-details`,
            label: `Loyalty Card Details`,
            icon: 'credit_card',
            componentName: 'LoyaltyCardDetailRightPanelComponent',
            data: {
                loyaltyCardId: row.id,
            },
        })
    }

    onClipboardClicked(row: Model.LoyaltyCardResponse) {
        //
    }

    onDeleteClicked(row: Model.LoyaltyCardResponse) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Loyalty Card',
                message: `Are you sure you want to delete the card ${row.displayName}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
                confirmPermanentButtonLabel: 'Delete Permanently',
            },
            () => { this.loyaltyCardFacade.deleteLoyaltyCard(row.id, false) },
            () => { this.loyaltyCardFacade.deleteLoyaltyCard(row.id, true) }
        )
    }

    onDeleteManyClicked(selected: Model.LoyaltyCardSchemeResponse[]) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Loyalty Cards',
                message: `Are you sure you want to delete ${selected.length} card${
                    selected.length === 1 ? '' : 's'
                }?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
                confirmPermanentButtonLabel: 'Delete Permanently'
            },
            () => {
                //
            }
        )
    }

    onNavigateEnduserClicked(event: MouseEvent | TouchEvent, enduserId: string) {
        event.stopPropagation()
        event.preventDefault()
        this.routerFacade.navigate([`/customers/users/${enduserId}`])
    }

    onNavigateLoyaltyCardSchemeClicked(event: MouseEvent | TouchEvent, loyaltyCardSchemeId: string) {
        event.stopPropagation()
        event.preventDefault()
        this.routerFacade.navigate([`/merchant-net/loyalty-card-schemes/${loyaltyCardSchemeId}`])
    }

    async getBrandIdFromRoute(): Promise<Nullable<string>> {
        // const brandId = this.activatedRoute.parent?.parent?.snapshot.params['brandId'] ?? null
        return await this.routerFacade.getNestedRouteParam('brandId')
    }

    async getMerchantIdFromRoute(): Promise<Nullable<string>> {
        return await this.routerFacade.getNestedRouteParam('merchantId')
    }

    async getLoyaltyCardSchemeIdFromRoute(): Promise<Nullable<string>> {
        return await this.routerFacade.getNestedRouteParam('loyaltyCardSchemeId')
    }

    async getEnduserIdFromRoute(): Promise<Nullable<string>> {
        return await this.routerFacade.getNestedRouteParam('enduserId')
    }
}
