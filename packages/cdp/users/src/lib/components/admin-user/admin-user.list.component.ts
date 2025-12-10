import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core'
import { AdminUserFacade } from '../../+state/facades'
import { ColumnInterface, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { Model } from '../../model'
import { DateQueryFilter, EnumQueryFilter, FilterChipEvent, FilterDefinition, ZWPFilterChipInputType, ZWPRouterFacade, Nullable, NumberQueryFilter, StringQueryFilter } from '@zwp/platform.common'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'cdp-users-admin-user-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
            <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>
            
            <zwp-md-button 
                label="Create Admin User" icon="add" 
                textStyle="button1" [iconTextStyle]="'subheadline'"
                [labelColor]="'system-white' | zwpColorTheme"
                [backgroundColor]="'system-green' | zwpColorTheme"
                (btnClick)="newUser()"
            ></zwp-md-button>
            
            
            
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(adminUsers$ | async) || []" [selectable]="true"
            [pagination]="adminUsersRemotePagination$ | async"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"
            (rowClicked)="onRowClicked($event)"
        >
        </zwp-paginated-table>
    </div>
    `
})
export class AdminUserListComponent implements OnInit {
    
    private adminUserFacade = inject(AdminUserFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)

    adminUsers$ = this.adminUserFacade.adminUsers$
    adminUsersRemotePagination$ = this.adminUserFacade.adminUserRemotePagination$
    loggedInAdminUser$ = this.adminUserFacade.loggedInAdminUser$

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.AdminUserResponse = 'role'

    columns: ColumnInterface<Model.AdminUserResponse>[] = [
        { displayName: 'First Name', dataLabel: 'firstName', sortable: true },
        { displayName: 'Last Name', dataLabel: 'lastName', sortable: true },
        { displayName: 'Role', dataLabel: 'role', sortable: true },
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Updated At', dataLabel: 'dbUpdatedAt', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } }
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'First Name', name: 'firstName', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Last Name', name: 'lastName', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Role', name: 'role', type: ZWPFilterChipInputType.STRING, enumDefinition: null }
    ]

    ngOnInit() {
        this.loggedInAdminUser$.subscribe((user) => {
            if (user) {
                this.adminUserFacade.listAdminUsers()
            }
        })
    }

    onRowClicked(row: Model.AdminUserResponse) {
        this.routerFacade.navigate([`/admin/users/${row.id}`])
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.AdminUserResponse
        this.sortDirection = sort.direction
        this.adminUserFacade.listAdminUsers({ 
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterObj: Partial<Model.AdminUserFilters> = {}
        const filter = filterEvent.filter
        switch (filter.type) {
            case ZWPFilterChipInputType.DATE:
                (filterObj[filter.name as keyof Model.AdminUserFilters] as Nullable<DateQueryFilter>) = filterEvent.action === 'add' ? filter.dateFilter : null
                break
            case ZWPFilterChipInputType.STRING:
                (filterObj[filter.name as keyof Model.AdminUserFilters] as Nullable<StringQueryFilter>) = filterEvent.action === 'add' ? filter.stringFilter : null
                break
            case ZWPFilterChipInputType.ENUM:
                (filterObj[filter.name as keyof Model.AdminUserFilters] as Nullable<EnumQueryFilter<unknown>>) = filterEvent.action === 'add' ? filter.enumFilter : null
                break
            case ZWPFilterChipInputType.NUMBER:
                (filterObj[filter.name as keyof Model.AdminUserFilters] as Nullable<NumberQueryFilter>) = filterEvent.action === 'add' ? filter.numberFilter : null
                break
        }
        this.adminUserFacade.updateAdminUserFilters(filterObj)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.adminUserFacade.listAdminUsers({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize
        })
    }

    newUser() {
        this.windowLayoutFacade.addWindow({
            label: 'New Admin User',
            icon: 'person_add',
            componentName: 'CreateAdminUserWindowComponent',
            position: { top: 'calc(50vh - 150px)', left: 'calc(50vw - 250px)', width: '500px', height: '300px'},
            data: {}
        })
    }
}