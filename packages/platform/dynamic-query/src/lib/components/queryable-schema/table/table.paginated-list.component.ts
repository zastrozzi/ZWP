import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core'
import { State } from '../../../+state'
import { FilterChipEvent, FilterDefinition, handleFilterChipEvent, ZWPFilterChipInputType, ZWPRouterFacade } from '@zwp/platform.common'
import { ColumnInterface, ZWPPanelLayoutFacade } from '@zwp/platform.layout'
import { Sort, SortDirection } from '@angular/material/sort'
import { Model } from '../../../model'
import { PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'kdq-queryable-schema-table-paginated-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
            <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>
            
            
            
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(paginatedFilteredTables$ | async) || []" [selectable]="true" [actionable]="true"
            [pagination]="tablesRemotePagination$ | async"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"
        >
            <ng-template #rowActions let-row>
                <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="5px">
                    <zwp-md-icon-button
                        icon="chevron_right" label="Open in Inspector"
                        [iconPadding]="5"
                        [textStyle]="'subheadline'"
                        [iconColor]="'primary' | zwpColorTheme"
                        [backgroundColor]="'clear' | zwpColorTheme"
                        (btnClick)="onRowClicked(row)"
                    ></zwp-md-icon-button>
                </div>
            </ng-template>
        </zwp-paginated-table>
    </div>
    `
})
export class QueryableSchemaTablePaginatedListComponent implements OnInit, OnDestroy {
    private tableFacade = inject(State.Facades.QueryableSchemaTableFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)

    paginatedFilteredTables$ = this.tableFacade.paginatedFilteredTables$
    tablesRemotePagination$ = this.tableFacade.tableRemotePagination$

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.QueryableSchemaTableResponse = 'displayName'

    columns: ColumnInterface<Model.QueryableSchemaTableResponse>[] = [
        { displayName: 'Name', dataLabel: 'displayName', sortable: true },
        { displayName: 'Database Schema', dataLabel: 'tableIdentifiers.schema', sortable: true },
        { displayName: 'Database Table', dataLabel: 'tableIdentifiers.table', sortable: true }
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Name', name: 'displayName', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Database Schema', name: 'schemaName', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Database Table', name: 'tableName', type: ZWPFilterChipInputType.STRING, enumDefinition: null }
    ]

    // Lifecycle Hooks
    ngOnInit() {
        this.tableFacade.resetTableFilters(false)
        this.tableFacade.listTables()
    }

    ngOnDestroy() {
        this.tableFacade.resetPagination()
    }

    // Event Handlers
    onRowClicked(row: Model.QueryableSchemaTableResponse) {
        this.panelLayoutFacade.addRightPanel({
            id: `${row.id}-table-details`,
            label: `Table Details - ${row.displayName}`,
            icon: 'schema',
            componentName: 'QueryableSchemaTableDetailsRightPanelComponent',
            data: {
                table: row
            }
        })
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.QueryableSchemaTableResponse
        this.sortDirection = sort.direction
        this.tableFacade.listTables({ 
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.QueryableSchemaTableFilters> = handleFilterChipEvent(filterEvent)
        this.tableFacade.updateTableFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.tableFacade.listTables({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize
        })
    }
}