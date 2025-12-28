import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core'
import { State } from '../../+state'
import { FilterChipEvent, FilterDefinition, handleFilterChipEvent, ZWPFilterChipInputType, ZWPRouterFacade, Nullable, TransformEnumPipeSignature } from '@zwp/platform.common'
import { ColumnInterface, FlattenedTreeInterface, ZWPPanelLayoutFacade, ZWPPopupLayoutFacade, ZWPWindowLayoutFacade, NestedTreeInterface } from '@zwp/platform.layout'
import { Sort, SortDirection } from '@angular/material/sort'
import { Model } from '../../model'
import { PageEvent } from '@angular/material/paginator'
import { ActivatedRoute } from '@angular/router'
import { Observable, of, Subscription, switchMap, tap } from 'rxjs'

@Component({
    selector: 'urnet-mnet-category-paginated-tree',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
            <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>
            <zwp-md-button 
                label="New Category" icon="add" 
                textStyle="button1" [iconTextStyle]="'subheadline'"
                [labelColor]="'system-white' | zwpColorTheme"
                [backgroundColor]="'system-green' | zwpColorTheme"
                (btnClick)="onNewCategoryClicked()"
            ></zwp-md-button>
            
            
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-tree fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(paginatedFilteredCategories$ | async) || []" [selectable]="true" [actionable]="true"
            [pagination]="categoryRemotePagination$ | async"
            
            (getNestedChildren)="onCategoryRowExpanded($event)"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"
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
        
            <ng-template #rowActions let-row>
                <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                    <zwp-md-icon-button
                        icon="open_in_full" label="Open Category Details"
                        [iconPadding]="5"
                        [textStyle]="'subheadline'"
                        [iconColor]="'primary' | zwpColorTheme"
                        [backgroundColor]="'clear' | zwpColorTheme"
                        (btnClick)="onNavigationClicked(row)"
                    ></zwp-md-icon-button>
                    <zwp-md-icon-button
                        icon="visibility" label="Open in Inspector"
                        [iconPadding]="5"
                        [textStyle]="'subheadline'"
                        [iconColor]="'primary' | zwpColorTheme"
                        [backgroundColor]="'clear' | zwpColorTheme"
                        (btnClick)="onInspectorClicked(row)"
                    ></zwp-md-icon-button>
                    <zwp-md-icon-button
                        icon="content_copy" label="Add to Clipboard"
                        [iconPadding]="5"
                        [textStyle]="'subheadline'"
                        [iconColor]="'primary' | zwpColorTheme"
                        [backgroundColor]="'clear' | zwpColorTheme"
                        (btnClick)="onClipboardClicked(row)"
                    ></zwp-md-icon-button>
                    <zwp-md-icon-button
                        icon="add_circle" label="Add Subcategory"
                        [iconPadding]="5"
                        [textStyle]="'subheadline'"
                        [iconColor]="'primary' | zwpColorTheme"
                        [backgroundColor]="'clear' | zwpColorTheme"
                        (btnClick)="onAddSubcategoryClicked(row)"
                    ></zwp-md-icon-button>
                    <zwp-md-icon-button
                        icon="delete" label="Delete"
                        [iconPadding]="5"
                        [textStyle]="'subheadline'"
                        [iconColor]="'system-red' | zwpColorTheme"
                        [backgroundColor]="'clear' | zwpColorTheme"
                        (btnClick)="onDeleteClicked(row)"
                    ></zwp-md-icon-button>
                </div>
            </ng-template>
        </zwp-paginated-tree>
    </div>
    `
})
export class CategoryPaginatedTreeComponent implements OnInit, OnDestroy {
    private categoryFacade = inject(State.Facades.AWinCategoryFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)
    private activatedRoute = inject(ActivatedRoute)

    private readonly subscriptions = new Subscription()

    paginatedFilteredCategories$: Observable<NestedTreeInterface<Model.CategoryResponse>[]> = of([])
    categoryRemotePagination$ = this.categoryFacade.categoryRemotePagination$
    

    private categoryListContext: Model.CategoryPaginatedListComponentContext = this.activatedRoute.snapshot.data['categoryListContext']
    categoryListContextIsCategoryDetail = this.categoryListContext === Model.CategoryPaginatedListComponentContext.CATEGORY_DETAIL
    categoryListContextIsOfferDetail = this.categoryListContext === Model.CategoryPaginatedListComponentContext.OFFER_DETAIL
    categoryListContextIsCategoryTree = this.categoryListContext === Model.CategoryPaginatedListComponentContext.CATEGORY_TREE

    statusLabelEnumSignature = Model.categoryStatusLabelPipeSignature
    statusColorEnumSignature = Model.categoryStatusColorPipeSignature

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.CategoryResponse = 'name'

    columns: ColumnInterface<Model.CategoryResponse>[] = [
        { displayName: 'Name', dataLabel: 'name', sortable: true },
        { displayName: 'Status', dataLabel: 'status', sortable: true, hasCustomTemplate: true, transformEnumPipe: this.statusLabelEnumSignature },
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Updated At', dataLabel: 'dbUpdatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Status', name: 'status', type: ZWPFilterChipInputType.ENUM, enumDefinition: this.statusLabelEnumSignature },
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Name', name: 'name', type: ZWPFilterChipInputType.STRING, enumDefinition: null }
    ]

    subcategoriesForCategory$ = (category: Model.CategoryResponse) => this.categoryFacade.subcategoriesForCategory$(category.id)
    trackBy = (dataNode: FlattenedTreeInterface<NestedTreeInterface<Model.CategoryResponse>>) => dataNode.id

    // Lifecycle Hooks
    ngOnInit() {
        if (this.categoryListContextIsCategoryTree) {
            // console.log('Category List Context is Category Tree')
            this.paginatedFilteredCategories$ = this.categoryFacade.topLevelPaginatedFilteredCategoriesWithSubcategoriesNested$
        } else {
            this.paginatedFilteredCategories$ = this.categoryFacade.paginatedFilteredCategories$
        }
        this.categoryFacade.resetCategoryFilters(false)
        this.categoryFacade.listCategories(
            this.getParentParamsFromRoute()
        )
    }

    ngOnDestroy() {
        this.categoryFacade.resetPagination()
        this.subscriptions.unsubscribe()
        
    }

    // Event Handlers
    onInspectorClicked(row: Model.CategoryResponse) {
        this.panelLayoutFacade.addRightPanel({
            id: `${row.id}-category-details`,
            label: `Category Details - ${row.name}`,
            icon: 'category',
            componentName: 'CategoryDetailRightPanelComponent',
            data: {
                categoryId: row.id
            }
        })
    }

    onNavigationClicked(row: Model.CategoryResponse) {
        this.routerFacade.navigate(['merchant-net', 'categories', row.id])
    }

    onClipboardClicked(row: Model.CategoryResponse) {
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

    onNewCategoryClicked() {
        this.windowLayoutFacade.addWindow({
            label: 'New Category',
            icon: 'category',
            componentName: 'CreateCategoryWindowComponent',
            position: { top: 'calc(50vh - 150px)', left: 'calc(50vw - 250px)', width: '500px', height: '300px'},
            data: {}
        })
    }

    onAddSubcategoryClicked(row: Model.CategoryResponse) {
        this.windowLayoutFacade.addWindow({
            label: 'New Subcategory',
            icon: 'category',
            componentName: 'CreateCategoryWindowComponent',
            position: { top: 'calc(50vh - 175px)', left: 'calc(50vw - 250px)', width: '500px', height: '350px'},
            data: {
                categoryId: row.id
            }
        })
    }

    onDeleteClicked(row: Model.CategoryResponse) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Category',
                message: `Are you sure you want to delete the category ${row.name}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
            }, 
            () => { this.categoryFacade.deleteCategory(row.id) }
        )
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.CategoryResponse
        this.sortDirection = sort.direction
        this.categoryFacade.listCategories(
            this.getParentParamsFromRoute(),
            { 
                order: this.sortDirection === 'asc' ? 'asc' : 'desc',
                orderBy: this.sortKey
            }
        )
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.CategoryFilters> = handleFilterChipEvent(filterEvent)
        this.categoryFacade.updateCategoryFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.categoryFacade.listCategories(
            this.getParentParamsFromRoute(),
            {
                limit: pagination.pageSize,
                offset: pagination.pageIndex * pagination.pageSize
            }
        )
    }

    onCategoryRowExpanded(row: Model.CategoryResponse) {
        this.categoryFacade.listSubcategories(
            row.id,
            {
                limit: 30,
                offset: 0
            }
        )
    }

    getCategoryIdFromRoute(): Nullable<string> {
        return this.activatedRoute.parent?.snapshot.params['categoryId'] ?? null
    }

    getOfferIdFromRoute(): Nullable<string> {
        return this.activatedRoute.parent?.snapshot.params['offerId'] ?? null
    }

    getParentParamsFromRoute(): { categoryId: Nullable<string>, offerId: Nullable<string> } {
        return {
            categoryId: this.getCategoryIdFromRoute(),
            offerId: this.getOfferIdFromRoute()
        }
    }
}