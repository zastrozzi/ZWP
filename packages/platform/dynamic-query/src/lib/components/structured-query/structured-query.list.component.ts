import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core'
import { State } from '../../+state'
import { FilterChipEvent, FilterDefinition, handleFilterChipEvent, ZWPFilterChipInputType, ZWPRouterFacade } from '@zwp/platform.common'
import { ColumnInterface, ZWPPanelLayoutFacade } from '@zwp/platform.layout'
import { Sort, SortDirection } from '@angular/material/sort'
import { Model } from '../../model'
import { PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'kdq-structured-query-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
            <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>
            
            <zwp-md-button 
                label="New Query" icon="add" 
                textStyle="button1" [iconTextStyle]="'subheadline'"
                [labelColor]="'system-white' | zwpColorTheme"
                [backgroundColor]="'system-green' | zwpColorTheme"
                (btnClick)="onNewStructuredQueryClicked()"
            ></zwp-md-button>
            
            
            
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(structuredQueries$ | async) || []" [selectable]="true"
            [pagination]="structuredQueriesRemotePagination$ | async"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"
            (rowClicked)="onRowClicked($event)"
        >
        </zwp-paginated-table>
    </div>
    `
})
export class StructuredQueryListComponent implements OnInit, OnDestroy {
    private structuredQueryFacade = inject(State.Facades.StructuredQueryFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)

    structuredQueries$ = this.structuredQueryFacade.structuredQueries$
    structuredQueriesRemotePagination$ = this.structuredQueryFacade.structuredQueryRemotePagination$

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.StructuredQueryResponse = 'dbCreatedAt'

    columns: ColumnInterface<Model.StructuredQueryResponse>[] = [
        { displayName: 'Name', dataLabel: 'name', sortable: true },
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Updated At', dataLabel: 'dbUpdatedAt', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } }
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Name', name: 'name', type: ZWPFilterChipInputType.STRING, enumDefinition: null }
    ]

    // Lifecycle Hooks
    ngOnInit() {
        this.structuredQueryFacade.resetStructuredQueryFilters(false)
        this.structuredQueryFacade.listStructuredQueries()
    }

    ngOnDestroy() {
        this.structuredQueryFacade.resetPagination()
    }

    // Event Handlers
    onRowClicked(row: Model.StructuredQueryResponse) {
        this.routerFacade.navigate([`/admin/kdq/structured-queries/${row.id}`])
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.StructuredQueryResponse
        this.sortDirection = sort.direction
        this.structuredQueryFacade.listStructuredQueries({ 
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.StructuredQueryFilters> = handleFilterChipEvent(filterEvent)
        this.structuredQueryFacade.updateStructuredQueryFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.structuredQueryFacade.listStructuredQueries({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize
        })
    }

    onNewStructuredQueryClicked() {
        // console.log('New Structured Query Clicked')
    }
}