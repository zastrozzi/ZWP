import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { EnduserDeviceFacade, EnduserFacade } from '../../../+state/facades'
import { Model } from '../../../model'
import { Nullable, TransformEnumPipeSignature } from '@zwp/platform.common'
import { Subscription } from 'rxjs'
import { Sort, SortDirection } from '@angular/material/sort'
import { ColumnInterface } from '@zwp/platform.layout'
import { PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'cdp-users-enduser-account-devices',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start center" zwpPadding="5" fxLayoutGap="5px">
            <mat-form-field 
                appearance="outline" fxFlex="grow"
                class="noHintFormField flexFormField noOutlineFormField" 
                zwpCorners="4" zwpBackgroundColor="quaternary-system-fill"
            >
                <input matInput placeholder="Filter devices..." cdkFocusInitial zwpColor="label"/>
            </mat-form-field>
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(filteredEnduserDevices$ | async) || []"
            [pagination]="enduserDeviceRemotePagination$ | async"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"
            (rowClicked)="onRowClicked($event)"
        >
        </zwp-paginated-table>
    </div>
    `
})
export class EnduserAccountDevicesComponent implements OnInit, OnDestroy {

    private enduserFacade = inject(EnduserFacade)
    private enduserDeviceFacade = inject(EnduserDeviceFacade)

    private subscriptions = new Subscription()

    selectedEnduser$ = this.enduserFacade.selectedEnduser$
    filteredEnduserDevices$ = this.enduserDeviceFacade.filteredEnduserDevices$
    enduserDeviceRemotePagination$ = this.enduserDeviceFacade.enduserDeviceRemotePagination$

    selectedEnduserId: Nullable<string> = null

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.EnduserDeviceResponse = 'dbCreatedAt'

    deviceIconPipeSignature: TransformEnumPipeSignature = { input: Model.DeviceSystem, output: Model.DeviceSystemIcon }
    deviceLabelPipeSignature: TransformEnumPipeSignature = { input: Model.DeviceSystem, output: Model.DeviceSystemLabel }

    columns: ColumnInterface<Model.EnduserDeviceResponse>[] = [
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Last Seen At', dataLabel: 'lastSeenAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'System', dataLabel: 'system', sortable: true, style: { minWidth: 130 }, transformEnumPipe: this.deviceLabelPipeSignature},
        { displayName: 'Local Device Identifier', dataLabel: 'localDeviceIdentifier', sortable: true, style: { textOverflow: 'ellipsis', maxWidth: 100 } },
        { displayName: 'OS Version', dataLabel: 'osVersion', sortable: true },
        { displayName: 'User Agent', dataLabel: 'userAgent', sortable: true },
        { displayName: 'APNS Push Token', dataLabel: 'apnsPushToken', sortable: true },
        { displayName: 'FCM Push Token', dataLabel: 'fcmPushToken', sortable: true }
    ]

    identifyDevice(index: number, device: Model.EnduserDeviceResponse) {
        return device.id
    }

    ngOnInit() {
        this.subscriptions.add(
            this.selectedEnduser$.subscribe(enduser => {
                if (enduser) {
                    this.selectedEnduserId = enduser.id
                    this.enduserDeviceFacade.listEnduserDevices(enduser.id)
                }
            })
        )
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }

    onRowClicked(device: Model.EnduserDeviceResponse) {
        // console.log('device', device)
    }

    onSortChanged(sort: Sort) {
        this.sortDirection = sort.direction
        this.sortKey = sort.active as keyof Model.EnduserDeviceResponse
        if (this.selectedEnduserId) {
            this.enduserDeviceFacade.listEnduserDevices(this.selectedEnduserId, { 
                order: this.sortDirection === 'asc' ? 'asc' : 'desc',
                orderBy: this.sortKey
            })
        }
    }

    onPaginationChanged(pagination: PageEvent) {
        if (this.selectedEnduserId) {
            this.enduserDeviceFacade.listEnduserDevices(this.selectedEnduserId, { 
                limit: pagination.pageSize,
                offset: pagination.pageIndex * pagination.pageSize
            })
        }
    }
}