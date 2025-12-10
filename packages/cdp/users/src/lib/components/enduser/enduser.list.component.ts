import { Component, OnInit, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core'
import { AdminUserFacade, EnduserFacade } from '../../+state/facades'
import { ColumnInterface } from '@zwp/platform.layout'
import { Model } from '../../model'
import { DateQueryFilter, EnumQueryFilter, FilterChipEvent, FilterDefinition, ZWPFilterChipInputType, ZWPRouterFacade, Nullable, NumberQueryFilter, StringQueryFilter, TRANSFORM_ENUM_PIPE } from '@zwp/platform.common'
import { map } from 'rxjs'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'
import { UserTitle, UserTitleLabel } from '../../model/enums'

@Component({
    selector: 'cdp-users-enduser-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start center" zwpPadding="5" fxLayoutGap="5px">
        <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>
            
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(endusers$ | async) || []" [selectable]="true"
            [pagination]="endusersRemotePagination$ | async"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"
            (rowClicked)="onRowClicked($event)"
        >
        </zwp-paginated-table>
    </div>
    `
})
export class EnduserListComponent implements OnInit {
    
    private enduserFacade = inject(EnduserFacade)
    private adminUserFacade = inject(AdminUserFacade)
    private routerFacade = inject(ZWPRouterFacade)

    endusers$ = this.enduserFacade.endusers$
    endusersRemotePagination$ = this.enduserFacade.enduserRemotePagination$
    loggedInAdminUser$ = this.adminUserFacade.loggedInAdminUser$

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.EnduserResponse = 'firstName'

    columns: ColumnInterface<Model.EnduserResponse>[] = [
        { displayName: 'Title', sortable: true, dataLabel: 'title', transformEnumPipe: { input: UserTitle, output: UserTitleLabel } },
        { displayName: 'First Name', sortable: true, dataLabel: 'firstName' },
        { displayName: 'Last Name', sortable: true, dataLabel: 'lastName' },
        { displayName: 'Date of Birth', dataLabel: 'dateOfBirth', sortable: true, datePipe: { format: 'yyyy/MM/dd' } },
        { displayName: 'National Insurance Number', dataLabel: 'nino', sortable: true },
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Updated At', dataLabel: 'dbUpdatedAt', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'First Name', name: 'firstName', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Last Name', name: 'lastName', type: ZWPFilterChipInputType.STRING, enumDefinition: null }
    ]

    ngOnInit() {
        
        this.loggedInAdminUser$.subscribe((user) => {
            if (user) {
                this.enduserFacade.listEndusers()
            }
        })
    }

    onRowClicked(row: Model.EnduserResponse) {
        this.routerFacade.navigate([`/customers/users/${row.id}`])
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.EnduserResponse
        this.sortDirection = sort.direction
        this.enduserFacade.listEndusers({ 
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey
        })
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
        this.enduserFacade.updateEnduserFilters(filterObj)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.enduserFacade.listEndusers({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize
        })
    }

    newUser() {
        console.log('new user')
    }
}