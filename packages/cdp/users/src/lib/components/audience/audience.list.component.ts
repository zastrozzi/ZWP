import { Component, OnInit, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core'
import { AdminUserFacade, EnduserFacade } from '../../+state/facades'
import { ColumnInterface } from '@zwp/platform.layout'
import { Model } from '../../model'
import { DateQueryFilter, EnumQueryFilter, FilterChipEvent, FilterDefinition, ZWPFilterChipInputType, ZWPRouterFacade, Nullable, NumberQueryFilter, StringQueryFilter } from '@zwp/platform.common'
import { map } from 'rxjs'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'
import { UserTitle, UserTitleLabel } from '../../model/enums'

interface AudienceResponse {
    id: string
    dbCreatedAt?: Date
    dbUpdatedAt?: Date
    dbDeletedAt?: Date
    name: string
    description: string
    status: string
}

@Component({
    selector: 'cdp-users-audience-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start center" zwpPadding="5" fxLayoutGap="5px">
        <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>
            
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="[]" [selectable]="true"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"
            (rowClicked)="onRowClicked($event)"
        >
        </zwp-paginated-table>
    </div>
    `
})
export class AudienceListComponent implements OnInit {

    sortDirection: SortDirection = 'asc'
    sortKey: keyof AudienceResponse = 'name'

    columns: ColumnInterface<AudienceResponse>[] = [
        { displayName: 'ID', dataLabel: 'id', sortable: true },
        { displayName: 'Name', dataLabel: 'name', sortable: true },
        { displayName: 'Description', dataLabel: 'description', sortable: true },
        { displayName: 'Status', dataLabel: 'status', sortable: true },
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Updated At', dataLabel: 'dbUpdatedAt', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Name', name: 'name', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Description', name: 'description', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Status', name: 'status', type: ZWPFilterChipInputType.STRING, enumDefinition: null }
    ]

    ngOnInit() {
        console.log("AudienceListComponent")
    }

    onRowClicked(row: unknown) {
        console.log('row clicked', row)
    }

    onSortChanged(sort: Sort) {
        console.log('sort changed', sort)
        // this.sortKey = sort.active as keyof Model.EnduserResponse
        // this.sortDirection = sort.direction
        // this.enduserFacade.listEndusers({ 
        //     order: this.sortDirection === 'asc' ? 'asc' : 'desc',
        //     orderBy: this.sortKey
        // })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterObj: Partial<Model.EnduserFilters> = {}
        const filter = filterEvent.filter
        switch (filter.type) {
            case ZWPFilterChipInputType.DATE:
                (filterObj[filter.name as keyof Model.EnduserFilters] as Nullable<DateQueryFilter>) = filterEvent.action === 'add' ? filter.dateFilter : null
                break
            case ZWPFilterChipInputType.STRING:
                (filterObj[filter.name as keyof Model.EnduserFilters] as Nullable<StringQueryFilter>) = filterEvent.action === 'add' ? filter.stringFilter : null
                break
            case ZWPFilterChipInputType.ENUM:
                (filterObj[filter.name as keyof Model.EnduserFilters] as Nullable<EnumQueryFilter<unknown>>) = filterEvent.action === 'add' ? filter.enumFilter : null
                break
            case ZWPFilterChipInputType.NUMBER:
                (filterObj[filter.name as keyof Model.EnduserFilters] as Nullable<NumberQueryFilter>) = filterEvent.action === 'add' ? filter.numberFilter : null
                break
        }
        // this.enduserFacade.updateEnduserFilters(filterObj)
    }

    onPaginationChanged(pagination: PageEvent) {
        console.log('pagination changed', pagination)
        // this.enduserFacade.listEndusers({
        //     limit: pagination.pageSize,
        //     offset: pagination.pageIndex * pagination.pageSize
        // })
    }

    newUser() {
        console.log('new user')
    }
}