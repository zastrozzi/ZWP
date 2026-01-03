import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core'
import { ColumnInterface, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { FilterChipEvent, FilterDefinition, ZWPFilterChipInputType, ZWPRouterFacade, handleFilterChipEvent } from '@zwp/platform.common'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'
import { PlatformDummyData } from '@zwp/platform.dummy-data'

@Component({
    selector: 'zwp-tables-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
            <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>
            
            <zwp-md-button 
                label="Generate Projects" icon="add" 
                textStyle="button1" [iconTextStyle]="'subheadline'"
                [labelColor]="'system-white' | zwpColorTheme"
                [backgroundColor]="'system-green' | zwpColorTheme"
                (btnClick)="generateProjects()"
            ></zwp-md-button>
            
            
            
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(projects$ | async) || []" [selectable]="true"
            [pagination]="projectRemotePagination$ | async"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"
            (rowClicked)="onRowClicked($event)"
        >
        </zwp-paginated-table>
    </div>
    `
})
export class TablesPageComponent implements OnInit {
    
    private dummyDataFacade = inject(PlatformDummyData.State.Facades.DummyDataFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)

    projects$ = this.dummyDataFacade.projects$
    projectRemotePagination$ = this.dummyDataFacade.projectRemotePagination$

    sortDirection: SortDirection = 'asc'
    sortKey: keyof PlatformDummyData.Model.ProjectResponse = 'name'

    columns: ColumnInterface<PlatformDummyData.Model.ProjectResponse>[] = [
        { displayName: 'Name', dataLabel: 'name', sortable: true },
        { displayName: 'Description', dataLabel: 'description', sortable: true },
        { displayName: 'Status', dataLabel: 'status', sortable: true, transformEnumPipe: PlatformDummyData.Model.projectStatusLabelPipeSignature },
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Updated At', dataLabel: 'dbUpdatedAt', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Budget', dataLabel: 'budget', sortable: true }
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Name', name: 'name', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Status', name: 'status', type: ZWPFilterChipInputType.ENUM, enumDefinition: PlatformDummyData.Model.projectStatusLabelPipeSignature },
        { displayName: 'Budget', name: 'budget', type: ZWPFilterChipInputType.NUMBER, enumDefinition: null }
    ]

    ngOnInit() {
        // console.log('Tables Page')
        return
    }

    onRowClicked(row: PlatformDummyData.Model.ProjectResponse) {
        // console.log('Table Row Clicked')
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof PlatformDummyData.Model.ProjectResponse
        this.sortDirection = sort.direction
        this.dummyDataFacade.listProjects({ 
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<PlatformDummyData.Model.ProjectFilters> = handleFilterChipEvent(filterEvent)
        // this.dummyDataFacade.updateProjectFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.dummyDataFacade.listProjects({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize
        })
    }

    generateProjects() {
        this.dummyDataFacade.generateProjects()
    }
}