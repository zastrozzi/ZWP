import { Component, OnInit, ChangeDetectionStrategy, inject, OnDestroy } from '@angular/core'
import { State } from '../../+state'
import { ColumnInterface, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { Model } from '../../model'
import { FilterChipEvent, FilterDefinition, handleFilterChipEvent, ZWPFilterChipInputType, ZWPRouterFacade, Nullable, PaginatedQueryParams, TransformEnumPipeSignature } from '@zwp/platform.common'
import { Observable, of } from 'rxjs'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'urnet-mnet-brand-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
            <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>
            <zwp-md-button 
                label="Create Brand" icon="pages" 
                textStyle="button1" [iconTextStyle]="'subheadline'"
                [labelColor]="'system-white' | zwpColorTheme"
                [backgroundColor]="'system-green' | zwpColorTheme"
                (btnClick)="newBrand()"
            ></zwp-md-button>
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(brands$ | async) || []" [selectable]="true"
            [pagination]="brandsRemotePagination$ | async"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"
            (rowClicked)="onRowClicked($event)"
            [draggable]="true"
        >
            <ng-template zwpTableCellTemplate="status" let-row="row">
                <div fxLayout="row" fxLayoutAlign="start center">
                    <span 
                        zwpCorners="5" zwpPadding="5 10" zwpTextStyle="body1" zwpColor="system-white"
                        [zwpBackgroundColor]="row.status | zwpTransformEnum: statusColorEnumSignature" 
                    >{{ row.status | zwpTransformEnum: statusLabelEnumSignature }}
                    </span>
                </div>
            </ng-template>
        
            <ng-template #dragPreview let-dataRow="dataRow">
                <div 
                    fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px" 
                    zwpCorners="5" zwpBackgroundColor="primary" zwpPadding="10 15 10 10"
                    class="mat-elevation-z4"
                >
                    <mat-icon zwpColor="system-white">pages</mat-icon>
                    <div fxLayout="column" fxLayoutAlign="start stretch">
                        <span zwpTextStyle="caption1" zwpFontWeight="500" zwpColor="system-white">Brand</span>
                        <span zwpTextStyle="body1" zwpColor="system-white">{{ dataRow.brandName }}</span>
                    </div>
                </div>
            </ng-template>
        </zwp-paginated-table>
    </div>
    `
})
export class BrandListComponent implements OnInit, OnDestroy {
    
    private brandFacade = inject(State.Facades.BrandFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private route = inject(ActivatedRoute)

    statusColorEnumSignature: TransformEnumPipeSignature = { input: Model.BrandStatus, output: Model.BrandStatusThemeColor }
    statusLabelEnumSignature: TransformEnumPipeSignature = { input: Model.BrandStatus, output: Model.BrandStatusLabel }

    private brandListContext: Model.BrandPaginatedListComponentContext = this.route.snapshot.data['brandListContext']

    brands$: Observable<Model.BrandResponse[]> = of([])
    brandsRemotePagination$ = this.brandFacade.brandRemotePagination$

    brandListContextIsMerchantDetail = this.brandListContext === Model.BrandPaginatedListComponentContext.MERCHANT_DETAIL
    brandListContextIsBrandList = this.brandListContext === Model.BrandPaginatedListComponentContext.BRAND_LIST

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.BrandResponse = 'brandName'

    columns: ColumnInterface<Model.BrandResponse>[] = [
        { displayName: 'Brand Name', dataLabel: 'brandName', sortable: true },
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Updated At', dataLabel: 'dbUpdatedAt', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Status', dataLabel: 'status', sortable: true, hasCustomTemplate: true, transformEnumPipe: { input: Model.BrandStatus, output: Model.BrandStatusLabel } },
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Brand Name', name: 'brandName', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Status', name: 'status', type: ZWPFilterChipInputType.ENUM, enumDefinition: { input: Model.BrandStatus, output: Model.BrandStatusLabel } }
    ]

    async ngOnInit() {
        if (this.brandListContextIsMerchantDetail) {
            this.brands$ = this.brandFacade.paginatedFilteredBrandsForSelectedMerchant$
        } else if (this.brandListContextIsBrandList) {
            this.brands$ = this.brandFacade.paginatedFilteredBrands$
        }
        this.brandFacade.resetBrandFiltersForPaginatedListComponent(this.brandListContext, false)
        await this.listBrandsForContext()
    }

    ngOnDestroy() {
        this.brandFacade.resetPagination()
    }

    async listBrandsForContext(pagination: Nullable<Partial<PaginatedQueryParams<Model.BrandResponse>>> = null) {
        if (this.brandListContextIsMerchantDetail) {
            this.brandFacade.listBrands(await this.getMerchantIdFromRoute(), pagination)
        }
        if (this.brandListContextIsBrandList) {
            this.brandFacade.listBrands(null, pagination)
        }
    }

    onRowClicked(row: Model.BrandResponse) {
        this.routerFacade.navigate([`/merchant-net/brands/${row.id}`])
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.BrandResponse
        this.sortDirection = sort.direction
        this.listBrandsForContext({ 
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey
        })
        
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.BrandFilters> = handleFilterChipEvent(filterEvent)
        this.brandFacade.updateBrandFiltersForPaginatedListComponent(filterChange, this.brandListContext)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.listBrandsForContext({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize
        })
    }

    newBrand() {
        this.windowLayoutFacade.addWindow({
            label: 'New Brand',
            icon: 'pages',
            componentName: 'CreateBrandWindowComponent',
            position: { top: 'calc(50vh - 150px)', left: 'calc(50vw - 250px)', width: '500px', height: '300px'},
            data: {}
        })
    }

    async getMerchantIdFromRoute(): Promise<Nullable<string>> {
        return await this.routerFacade.getNestedRouteParam('merchantId') ?? null
    }
}