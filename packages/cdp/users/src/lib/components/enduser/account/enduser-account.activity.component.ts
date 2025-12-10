import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { EnduserActivityFacade, EnduserFacade } from '../../../+state/facades'
import { AuditEventResponse, FilterChipEvent, FilterDefinition, ZWPFilterChipInputType, ZWPRouterFacade, NestedKeyOf, Nullable, RemotePaginationState, TransformEnumPipeSignature, auditEventActionTypeLabelPipe, handleFilterChipEvent, isNull } from '@zwp/platform.common'
import { Sort, SortDirection } from '@angular/material/sort'
import { ColumnInterface } from '@zwp/platform.layout'
import { CDPCommon } from '@zwp/cdp.common'
import { Model } from '../../../model'
import { PageEvent } from '@angular/material/paginator'
import { map, Subscription } from 'rxjs'



@Component({
    selector: 'cdp-users-enduser-account-activity',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
            <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(enduserActivityWithEnduser$ | async) || []" [actionable]="true"
            [pagination]="enduserActivityRemotePagination$ | async"
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
export class EnduserAccountActivityComponent implements OnInit {

    private enduserFacade = inject(EnduserFacade)
    private enduserActivityFacade = inject(EnduserActivityFacade)
    private routerFacade = inject(ZWPRouterFacade)

    selectedEnduser$ = this.enduserFacade.selectedEnduser$
    enduserActivityWithEnduser$ = this.enduserActivityFacade.enduserActivityWithEnduser$
    enduserActivityRemotePagination$ = this.enduserActivityFacade.enduserActivityRemotePagination$.pipe(
            map(pagination => {
                return {
                    limit: pagination.limit,
                    offset: pagination.offset,
                    order: pagination.order,
                    orderBy: null,
                    total: pagination.total
                } as RemotePaginationState<Model.EnduserActivityWithEnduserResponse>
            })
        )

    enduserActivity$ = this.enduserActivityFacade.enduserActivity$

    sortDirection: SortDirection = 'asc'
    sortKey: NestedKeyOf<Model.EnduserActivityWithEnduserResponse> = 'activity.dbCreatedAt'

    eventTypeLabelPipeSignature = auditEventActionTypeLabelPipe

    columns: ColumnInterface<Model.EnduserActivityWithEnduserResponse>[] = [
        { displayName: 'Event', dataLabel: 'description', sortable: false, style: { fontWeight: 600 } },
        { displayName: 'Affected Id', dataLabel: 'activity.affectedId', sortable: true },
        { displayName: 'Timestamp', dataLabel: 'activity.dbCreatedAt', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Timestamp', name: 'activity.dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Action Type', name: 'activity.eventType', type: ZWPFilterChipInputType.ENUM, enumDefinition: this.eventTypeLabelPipeSignature }
    ]

    identifyActivity(index: number, activityWithEnduser: Model.EnduserActivityWithEnduserResponse) {
        return activityWithEnduser.activity.id
    }

    async ngOnInit() {
        const enduserId = await this.getEnduserIdFromRoute()
        if (!isNull(enduserId)) {
            this.enduserActivityFacade.listEnduserActivity(enduserId)
        }
    }

    onRowClicked(row: Model.EnduserActivityWithEnduserResponse) {
        console.log('row clicked', row)
        // this.routerFacade.navigate([`/admin/users/${row.id}`])
    }

    async onSortChanged(sort: Sort) {
        this.sortKey = sort.active as NestedKeyOf<Model.EnduserActivityWithEnduserResponse>
        this.sortDirection = sort.direction
        const enduserId = await this.getEnduserIdFromRoute()
        if (!isNull(enduserId)) {
            this.enduserActivityFacade.listEnduserActivity(enduserId, { 
                order: this.sortDirection === 'asc' ? 'asc' : 'desc',
                orderBy: this.sortKey.split('.')[1] as keyof AuditEventResponse
            })
        }
    }

    async onPaginationChanged(pagination: PageEvent) {
        const enduserId = await this.getEnduserIdFromRoute()
        if (!isNull(enduserId)) {
            this.enduserActivityFacade.listEnduserActivity(enduserId, { 
                limit: pagination.pageSize,
                offset: pagination.pageIndex * pagination.pageSize
            })
        }
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.EnduserActivityWithEnduserFilters> = handleFilterChipEvent(filterEvent)
        console.log('filter change', filterChange)
    }

    testDelete(row: Model.EnduserActivityWithEnduserResponse) {
        console.log('delete', row)
    }

    testExpand(row: Model.EnduserActivityWithEnduserResponse) {
        console.log('expand', row)
    }

    async getEnduserIdFromRoute(): Promise<Nullable<string>> {
        return await this.routerFacade.getNestedRouteParam('enduserId')
    }
}