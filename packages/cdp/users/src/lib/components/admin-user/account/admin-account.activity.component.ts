import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { AdminUserActivityFacade, AdminUserFacade } from '../../../+state/facades'
import { AuditEventResponse, FilterDefinition, ZWPFilterChipInputType, ZWPRouterFacade, NestedKeyOf, Nullable, RemotePaginationState, TransformEnumPipeSignature } from '@zwp/platform.common'
import { Sort, SortDirection } from '@angular/material/sort'
import { ColumnInterface } from '@zwp/platform.layout'
import { CDPCommon } from '@zwp/cdp.common'
import { Model } from '../../../model'
import { PageEvent } from '@angular/material/paginator'
import { map, Subscription } from 'rxjs'



@Component({
    selector: 'cdp-users-admin-account-activity',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <!-- <div fxLayout="column" fxLayoutAlign="start stretch" fxLayoutGap="10px" zwpPadding="10">
        <div 
            *ngFor="let activity of (filteredAdminUserActivity$ | async); trackBy: identifyActivity"
            fxLayout="column" fxLayoutAlign="start stretch" fxLayoutGap="5px"
            [style.backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
            zwpPadding="10" zwpCorners="10"
        >
            <div fxLayout="row" fxLayoutAlign="start stretch" fxLayoutGap="10px">
                <div fxLayout="column" fxFlex="grow" fxLayoutAlign="start stretch" fxLayoutGap="5px">
                    <span fxFlexOffset="5px" [zwpTextStyle]="'subheadline'" zwpColor="label">{{activity.eventType}}</span>
                    <span [zwpTextStyle]="'caption1'" zwpColor="system-gray3">{{activity.id}}</span>
                    <div fxLayout="row" fxFlexOffset="10px" fxLayoutGap="10px">
                        <span [zwpTextStyle]="'caption1'" zwpColor="system-gray3">Schema</span>
                        <span [zwpTextStyle]="'caption1'">{{activity.schema}}</span>
                        <span [zwpTextStyle]="'caption1'" zwpColor="system-gray3">{{activity.affectedId}}</span>
                    </div>
                    <span [zwpTextStyle]="'caption1'" zwpColor="system-gray3">{{activity.eventData | json}}</span>
                </div>
            </div>
            <div fxLayout="row" fxFlexAlign="end" fxLayoutAlign="start stretch" fxLayoutGap="5px" [style.color]="'system-gray3' | zwpColorTheme">
                <span [zwpTextStyle]="'caption1'">Created</span>
                <span [zwpTextStyle]="'caption1'">{{ activity.dbCreatedAt | date: 'yyyy/MM/dd HH:mm:ss' }}</span>
            </div>
        </div>
    </div> -->
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
            <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions"></zwp-filter-chip-input>
            <zwp-md-button 
                label="Clear Filters" icon="history" 
                textStyle="button1" [iconTextStyle]="'subheadline'"
                [labelColor]="'system-white' | zwpColorTheme"
                [backgroundColor]="'system-orange' | zwpColorTheme"
            ></zwp-md-button>
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(adminUserActivityWithAdminUser$ | async) || []" [actionable]="true"
            [pagination]="adminUserActivityRemotePagination$ | async"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"
            (rowClicked)="onRowClicked($event)"
        >
            <ng-template #rowActions let-row>
                <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="5px">
                    <zwp-md-icon-button
                        icon="expand_more" [iconPadding]="5"
                        [textStyle]="'subheadline'"
                        [iconColor]="'primary' | zwpColorTheme"
                        [backgroundColor]="'clear' | zwpColorTheme"
                        (btnClick)="testExpand(row)"
                    ></zwp-md-icon-button>
                </div>
            </ng-template>
        </zwp-paginated-table>
    </div>
    `
})
export class AdminAccountActivityComponent implements OnInit, OnDestroy {

    private adminUserFacade = inject(AdminUserFacade)
    private adminUserActivityFacade = inject(AdminUserActivityFacade)
    private routerFacade = inject(ZWPRouterFacade)

    private subscriptions = new Subscription()

    selectedAdminUser$ = this.adminUserFacade.selectedAdminUser$
    adminUserActivityWithAdminUser$ = this.adminUserActivityFacade.adminUserActivityWithAdminUser$
    adminUserActivityRemotePagination$ = this.adminUserActivityFacade.adminUserActivityRemotePagination$.pipe(
        map(pagination => {
            return {
                limit: pagination.limit,
                offset: pagination.offset,
                order: pagination.order,
                orderBy: null,
                total: pagination.total
            } as RemotePaginationState<Model.AdminUserActivityWithAdminUserResponse>
        })
    )
    
    selectedAdminUserId: Nullable<string> = null

    sortDirection: SortDirection = 'asc'
    sortKey: NestedKeyOf<Model.AdminUserActivityWithAdminUserResponse> = 'activity.dbCreatedAt'

    columns: ColumnInterface<Model.AdminUserActivityWithAdminUserResponse>[] = [
        { displayName: 'Event', dataLabel: 'description', sortable: false, style: { fontWeight: 600 } },
        { displayName: 'Affected Id', dataLabel: 'activity.affectedId', sortable: true },
        { displayName: 'Timestamp', dataLabel: 'activity.dbCreatedAt', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } }
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Timestamp', name: 'activity.dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null }
    ]

    identifyActivity(index: number, activityWithAdminUser: Model.AdminUserActivityWithAdminUserResponse) {
        return activityWithAdminUser.activity.id
    }

    ngOnInit() {
        this.subscriptions.add(
            this.selectedAdminUser$.subscribe(adminUser => {
                if (adminUser) {
                    this.adminUserActivityFacade.listAdminUserActivity(adminUser.id)
                    this.selectedAdminUserId = adminUser.id
                }
                else { this.selectedAdminUserId = null }
            })
        )
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }

    onRowClicked(row: Model.AdminUserActivityWithAdminUserResponse) {
        console.log('row clicked', row)
        // this.routerFacade.navigate([`/admin/users/${row.id}`])
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as NestedKeyOf<Model.AdminUserActivityWithAdminUserResponse>
        this.sortDirection = sort.direction
        if (this.selectedAdminUserId) {
            this.adminUserActivityFacade.listAdminUserActivity(this.selectedAdminUserId, { 
                order: this.sortDirection === 'asc' ? 'asc' : 'desc',
                orderBy: this.sortKey.split('.')[1] as keyof AuditEventResponse
            })
        }
    }

    onPaginationChanged(pagination: PageEvent) {
        if (this.selectedAdminUserId) {
            this.adminUserActivityFacade.listAdminUserActivity(this.selectedAdminUserId, { 
                limit: pagination.pageSize,
                offset: pagination.pageIndex * pagination.pageSize
            })
        }
    }

    testDelete(row: Model.AdminUserActivityWithAdminUserResponse) {
        console.log('delete', row)
    }

    testExpand(row: Model.AdminUserActivityWithAdminUserResponse) {
        console.log('expand', row)
    }
}