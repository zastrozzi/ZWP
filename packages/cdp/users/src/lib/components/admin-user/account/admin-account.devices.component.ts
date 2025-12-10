import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { AdminUserDeviceFacade, AdminUserFacade } from '../../../+state/facades'
import { Model } from '../../../model'
import { DateQueryFilter, EnumQueryFilter, FilterChipEvent, FilterDefinition, ZWPFilterChipInputType, Nullable, NumberQueryFilter, StringQueryFilter, TransformEnumPipeSignature } from '@zwp/platform.common'
import { Subscription } from 'rxjs'
import { Sort, SortDirection } from '@angular/material/sort'
import { ColumnInterface } from '@zwp/platform.layout'
import { PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'cdp-users-admin-account-devices',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
            <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>
            <zwp-md-button 
                label="Clear Filters" icon="history" 
                textStyle="button1" [iconTextStyle]="'subheadline'"
                [labelColor]="'system-white' | zwpColorTheme"
                [backgroundColor]="'system-orange' | zwpColorTheme"
            ></zwp-md-button>
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(adminUserDevicesForSelectedAdminUser$ | async) || []"
            [pagination]="adminUserDeviceRemotePagination$ | async"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"
            (rowClicked)="onRowClicked($event)"
        >
        </zwp-paginated-table>
    </div>
    `
})
export class AdminAccountDevicesComponent implements OnInit, OnDestroy {

    private adminUserFacade = inject(AdminUserFacade)
    private adminUserDeviceFacade = inject(AdminUserDeviceFacade)

    private subscriptions = new Subscription()

    selectedAdminUser$ = this.adminUserFacade.selectedAdminUser$
    adminUserDevicesForSelectedAdminUser$ = this.adminUserDeviceFacade.adminUserDevicesForSelectedAdminUser$
    adminUserDeviceRemotePagination$ = this.adminUserDeviceFacade.adminUserDeviceRemotePagination$

    selectedAdminUserId: Nullable<string> = null

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.AdminUserDeviceResponse = 'dbCreatedAt'

    deviceIconPipeSignature: TransformEnumPipeSignature = { input: Model.DeviceSystem, output: Model.DeviceSystemIcon }
    deviceLabelPipeSignature: TransformEnumPipeSignature = { input: Model.DeviceSystem, output: Model.DeviceSystemLabel }

    columns: ColumnInterface<Model.AdminUserDeviceResponse>[] = [
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Last Seen At', dataLabel: 'lastSeenAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'System', dataLabel: 'system', sortable: true, style: { minWidth: 130 }, transformEnumPipe: this.deviceLabelPipeSignature},
        { displayName: 'Local Device Identifier', dataLabel: 'localDeviceIdentifier', sortable: true, style: { textOverflow: 'ellipsis', maxWidth: 100 } },
        { displayName: 'OS Version', dataLabel: 'osVersion', sortable: true },
        { displayName: 'User Agent', dataLabel: 'userAgent', sortable: true },
        { displayName: 'APNS Push Token', dataLabel: 'apnsPushToken', sortable: true },
        { displayName: 'FCM Push Token', dataLabel: 'fcmPushToken', sortable: true }
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Last Seen At', name: 'lastSeenAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'System', name: 'system', type: ZWPFilterChipInputType.ENUM, enumDefinition: this.deviceLabelPipeSignature },
        { displayName: 'Local Device Identifier', name: 'localDeviceIdentifier', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'OS Version', name: 'osVersion', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'User Agent', name: 'userAgent', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'APNS Push Token', name: 'apnsPushToken', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'FCM Push Token', name: 'fcmPushToken', type: ZWPFilterChipInputType.STRING, enumDefinition: null }
    ]

    identifyDevice(index: number, device: Model.AdminUserDeviceResponse) {
        return device.id
    }

    ngOnInit() {
        this.subscriptions.add(
            this.selectedAdminUser$.subscribe(adminUser => {
                if (adminUser) {
                    this.selectedAdminUserId = adminUser.id
                    this.adminUserDeviceFacade.listAdminUserDevices(adminUser.id)
                }
            })
        )
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }

    onRowClicked(device: Model.AdminUserDeviceResponse) {
        console.log('device', device)
    }

    onSortChanged(sort: Sort) {
        this.sortDirection = sort.direction
        this.sortKey = sort.active as keyof Model.AdminUserDeviceResponse
        if (this.selectedAdminUserId) {
            this.adminUserDeviceFacade.listAdminUserDevices(this.selectedAdminUserId, { 
                order: this.sortDirection === 'asc' ? 'asc' : 'desc',
                orderBy: this.sortKey
            })
        }
    }

    onPaginationChanged(pagination: PageEvent) {
        if (this.selectedAdminUserId) {
            this.adminUserDeviceFacade.listAdminUserDevices(this.selectedAdminUserId, { 
                limit: pagination.pageSize,
                offset: pagination.pageIndex * pagination.pageSize
            })
        }
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterObj: Partial<Model.AdminUserDeviceFilters> = {}
        const filter = filterEvent.filter
        switch (filter.type) {
            case ZWPFilterChipInputType.DATE:
                (filterObj[filter.name as keyof Model.AdminUserDeviceFilters] as Nullable<DateQueryFilter>) = filterEvent.action === 'add' ? filter.dateFilter : null
                break
            case ZWPFilterChipInputType.STRING:
                (filterObj[filter.name as keyof Model.AdminUserDeviceFilters] as Nullable<StringQueryFilter>) = filterEvent.action === 'add' ? filter.stringFilter : null
                break
            case ZWPFilterChipInputType.ENUM:
                (filterObj[filter.name as keyof Model.AdminUserDeviceFilters] as Nullable<EnumQueryFilter<unknown>>) = filterEvent.action === 'add' ? filter.enumFilter : null
                break
            case ZWPFilterChipInputType.NUMBER:
                (filterObj[filter.name as keyof Model.AdminUserDeviceFilters] as Nullable<NumberQueryFilter>) = filterEvent.action === 'add' ? filter.numberFilter : null
                break
        }
        this.adminUserDeviceFacade.updateAdminUserDeviceFilters(filterObj)
    }
}