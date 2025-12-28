import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { AdminUserEmailFacade, AdminUserFacade } from '../../../+state/facades'
import { Subscription } from 'rxjs'
import { FilterDefinition, ZWPFilterChipInputType, Nullable } from '@zwp/platform.common'
import { Sort, SortDirection } from '@angular/material/sort'
import { Model } from '../../../model'
import { ColumnInterface, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'cdp-users-admin-account-communications',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
            <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions"></zwp-filter-chip-input>
            <zwp-md-button 
                label="Create Email Address" icon="add" 
                textStyle="button1" [iconTextStyle]="'subheadline'"
                [labelColor]="'system-white' | zwpColorTheme"
                [backgroundColor]="'system-green' | zwpColorTheme"
                (btnClick)="newEmailAddress()"
            ></zwp-md-button>
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="emailColumns" [data]="(adminUserEmailsForSelectedAdminUser$ | async) || []"
            [pagination]="adminUserEmailRemotePagination$ | async"
            (sortChanged)="onEmailSortChanged($event)"
            (paginationChanged)="onEmailPaginationChanged($event)"
            (rowClicked)="onEmailRowClicked($event)"
        >
        </zwp-paginated-table>
    </div>
    `
})
export class AdminAccountCommunicationsComponent implements OnInit, OnDestroy {
    private adminUserFacade = inject(AdminUserFacade)
    private adminUserEmailFacade = inject(AdminUserEmailFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)

    private subscriptions = new Subscription()

    selectedAdminUser$ = this.adminUserFacade.selectedAdminUser$
    adminUserEmailsForSelectedAdminUser$ = this.adminUserEmailFacade.adminUserEmailsForSelectedAdminUser$
    adminUserEmailRemotePagination$ = this.adminUserEmailFacade.adminUserEmailRemotePagination$

    selectedAdminUserId: Nullable<string> = null

    emailSortDirection: SortDirection = 'asc'
    emailSortKey: keyof Model.AdminUserEmailResponse = 'dbCreatedAt'

    emailColumns: ColumnInterface<Model.AdminUserEmailResponse>[] = [
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Email Address', dataLabel: 'emailAddressValue', sortable: true, style: { textOverflow: 'ellipsis', maxWidth: 100 } },
        { displayName: 'Verified', dataLabel: 'isVerified', sortable: true }
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Email Address', name: 'emailAddressValue', type: ZWPFilterChipInputType.STRING, enumDefinition: null }
    ]

    identifyDevice(index: number, device: Model.AdminUserDeviceResponse) {
        return device.id
    }

    ngOnInit() {
        this.subscriptions.add(
            this.selectedAdminUser$.subscribe(adminUser => {
                if (adminUser) {
                    this.selectedAdminUserId = adminUser.id
                    this.adminUserEmailFacade.listAdminUserEmails(adminUser.id)
                }
            })
        )
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }

    onEmailRowClicked(email: Model.AdminUserEmailResponse) {
        // console.log('email', email)
    }

    onEmailSortChanged(sort: Sort) {
        this.emailSortDirection = sort.direction
        this.emailSortKey = sort.active as keyof Model.AdminUserEmailResponse
        if (this.selectedAdminUserId) {
            this.adminUserEmailFacade.listAdminUserEmails(this.selectedAdminUserId, { 
                order: this.emailSortDirection === 'asc' ? 'asc' : 'desc',
                orderBy: this.emailSortKey
            })
        }
    }

    onEmailPaginationChanged(pagination: PageEvent) {
        if (this.selectedAdminUserId) {
            this.adminUserEmailFacade.listAdminUserEmails(this.selectedAdminUserId, { 
                limit: pagination.pageSize,
                offset: pagination.pageIndex * pagination.pageSize
            })
        }
    }

    newEmailAddress() {
        this.windowLayoutFacade.addWindow({
            label: 'New Email Address',
            icon: 'person_add',
            componentName: 'CreateAdminUserEmailWindowComponent',
            position: { top: 'calc(50vh - 100px)', left: 'calc(50vw - 250px)', width: '500px', height: '200px' },
            data: {
                adminUserId: this.selectedAdminUserId ?? ''
            }
        })
    }
}