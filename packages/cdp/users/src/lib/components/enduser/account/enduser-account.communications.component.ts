import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { EnduserEmailFacade, EnduserFacade } from '../../../+state/facades'
import { Subscription } from 'rxjs'
import { Nullable } from '@zwp/platform.common'
import { Sort, SortDirection } from '@angular/material/sort'
import { Model } from '../../../model'
import { ColumnInterface, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'cdp-users-enduser-account-communications',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start center" zwpPadding="5" fxLayoutGap="5px">
            <mat-form-field 
                appearance="outline" fxFlex="grow"
                class="noHintFormField flexFormField noOutlineFormField" 
                zwpCorners="4" zwpBackgroundColor="quaternary-system-fill"
            >
                <input matInput placeholder="Filter emails..." cdkFocusInitial zwpColor="label"/>
            </mat-form-field>
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
            [columns]="emailColumns" [data]="(filteredEnduserEmails$ | async) || []"
            [pagination]="enduserEmailRemotePagination$ | async"
            (sortChanged)="onEmailSortChanged($event)"
            (paginationChanged)="onEmailPaginationChanged($event)"
            (rowClicked)="onEmailRowClicked($event)"
        >
        </zwp-paginated-table>
    </div>
    `
})
export class EnduserAccountCommunicationsComponent implements OnInit, OnDestroy {
    private enduserFacade = inject(EnduserFacade)
    private enduserEmailFacade = inject(EnduserEmailFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)

    private subscriptions = new Subscription()

    selectedEnduser$ = this.enduserFacade.selectedEnduser$
    filteredEnduserEmails$ = this.enduserEmailFacade.filteredEnduserEmails$
    enduserEmailRemotePagination$ = this.enduserEmailFacade.enduserEmailRemotePagination$

    selectedEnduserId: Nullable<string> = null

    emailSortDirection: SortDirection = 'asc'
    emailSortKey: keyof Model.EnduserEmailResponse = 'dbCreatedAt'

    emailColumns: ColumnInterface<Model.EnduserEmailResponse>[] = [
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Email Address', dataLabel: 'emailAddressValue', sortable: true, style: { textOverflow: 'ellipsis', maxWidth: 100 } },
        { displayName: 'Verified', dataLabel: 'isVerified', sortable: true }
    ]

    identifyDevice(index: number, device: Model.EnduserDeviceResponse) {
        return device.id
    }

    ngOnInit() {
        this.subscriptions.add(
            this.selectedEnduser$.subscribe(enduser => {
                if (enduser) {
                    this.selectedEnduserId = enduser.id
                    this.enduserEmailFacade.listEnduserEmails(enduser.id)
                }
            })
        )
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }

    onEmailRowClicked(email: Model.EnduserEmailResponse) {
        console.log('email', email)
    }

    onEmailSortChanged(sort: Sort) {
        this.emailSortDirection = sort.direction
        this.emailSortKey = sort.active as keyof Model.EnduserEmailResponse
        if (this.selectedEnduserId) {
            this.enduserEmailFacade.listEnduserEmails(this.selectedEnduserId, { 
                order: this.emailSortDirection === 'asc' ? 'asc' : 'desc',
                orderBy: this.emailSortKey
            })
        }
    }

    onEmailPaginationChanged(pagination: PageEvent) {
        if (this.selectedEnduserId) {
            this.enduserEmailFacade.listEnduserEmails(this.selectedEnduserId, { 
                limit: pagination.pageSize,
                offset: pagination.pageIndex * pagination.pageSize
            })
        }
    }

    newEmailAddress() {
        this.windowLayoutFacade.addWindow({
            label: 'New Email Address',
            icon: 'person_add',
            componentName: 'CreateEnduserEmailWindowComponent',
            data: {
                enduserId: this.selectedEnduserId ?? ''
            }
        })
    }
}