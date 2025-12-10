import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { EnduserCredentialFacade, EnduserFacade, EnduserSessionFacade } from '../../../+state/facades'
import { Subscription } from 'rxjs'
import { Nullable } from '@zwp/platform.common'
import { Sort, SortDirection } from '@angular/material/sort'
import { Model } from '../../../model'
import { ColumnInterface, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'cdp-users-enduser-account-security',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start center" zwpPadding="5" fxLayoutGap="5px">
            <zwp-md-button
                [textStyle]="'button1'"
                label="Credentials" materialType="flat" icon="lock"
                [backgroundColor]="viewMode === 'credentials' ? ('secondary' | zwpColorTheme) : ('quaternary-system-fill' | zwpColorTheme)"
                [labelColor]="viewMode === 'credentials' ? ('system-white' | zwpColorTheme) : ('secondary' | zwpColorTheme)"
                padding="14px 15px"
                (btnClick)="onCredentialModeClicked()"
            ></zwp-md-button>
            <zwp-md-button
                [textStyle]="'button1'"
                label="Sessions" materialType="flat" icon="schedule"
                [backgroundColor]="viewMode === 'sessions' ? ('secondary' | zwpColorTheme) : ('quaternary-system-fill' | zwpColorTheme)"
                [labelColor]="viewMode === 'sessions' ? ('system-white' | zwpColorTheme) : ('secondary' | zwpColorTheme)"
                padding="14px 15px"
                (btnClick)="onSessionModeClicked()"
            ></zwp-md-button>
            
            <mat-form-field 
                appearance="outline" fxFlex="grow"
                class="noHintFormField flexFormField noOutlineFormField" 
                zwpCorners="4" zwpBackgroundColor="quaternary-system-fill"
            >
                <input matInput [placeholder]="viewMode === 'credentials' ? 'Filter credentials...' : 'Filter sessions...'" cdkFocusInitial zwpColor="label"/>
            </mat-form-field>
            <zwp-md-button 
                label="Create New Password" icon="add" 
                textStyle="button1" [iconTextStyle]="'subheadline'"
                [labelColor]="'system-white' | zwpColorTheme"
                [backgroundColor]="'system-green' | zwpColorTheme"
                (btnClick)="newPassword()"
            ></zwp-md-button>
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)" *ngIf="viewMode === 'credentials'"
            [columns]="credentialColumns" [data]="(filteredEnduserCredentials$ | async) || []"
            [pagination]="enduserCredentialRemotePagination$ | async"
            (sortChanged)="onCredentialSortChanged($event)"
            (paginationChanged)="onCredentialPaginationChanged($event)"
            (rowClicked)="onCredentialRowClicked($event)"
        >
        </zwp-paginated-table>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)" *ngIf="viewMode === 'sessions'"
            [columns]="sessionColumns" [data]="(filteredEnduserSessions$ | async) || []" [actionable]="true"
            [pagination]="enduserSessionRemotePagination$ | async"
            (sortChanged)="onSessionSortChanged($event)"
            (paginationChanged)="onSessionPaginationChanged($event)"
            (rowClicked)="onSessionRowClicked($event)"
        >
            <ng-template #rowActions let-row>
                <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="5px">
                    <zwp-md-icon-button
                        icon="delete" [iconPadding]="5" label="Invalidate Session"
                        [textStyle]="'subheadline'"
                        [iconColor]="'destructive' | zwpColorTheme"
                        [backgroundColor]="'clear' | zwpColorTheme"
                        (btnClick)="onInvalidateSessionClicked(row)"
                    ></zwp-md-icon-button>
                </div>  
            </ng-template>
        </zwp-paginated-table>
    </div>
    `
})
export class EnduserAccountSecurityComponent implements OnInit, OnDestroy {
    private enduserFacade = inject(EnduserFacade)
    private enduserCredentialFacade = inject(EnduserCredentialFacade)
    private enduserSessionFacade = inject(EnduserSessionFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)

    private subscriptions = new Subscription()

    selectedEnduser$ = this.enduserFacade.selectedEnduser$
    filteredEnduserCredentials$ = this.enduserCredentialFacade.filteredEnduserCredentials$
    filteredEnduserSessions$ = this.enduserSessionFacade.filteredEnduserSessions$

    enduserCredentialRemotePagination$ = this.enduserCredentialFacade.enduserCredentialRemotePagination$
    enduserSessionRemotePagination$ = this.enduserSessionFacade.enduserSessionRemotePagination$

    selectedEnduserId: Nullable<string> = null
    viewMode: 'credentials' | 'sessions' = 'credentials'

    credentialSortDirection: SortDirection = 'asc'
    credentialSortKey: keyof Model.EnduserCredentialResponse = 'dbCreatedAt'

    sessionSortDirection: SortDirection = 'asc'
    sessionSortKey: keyof Model.EnduserSessionResponse = 'dbCreatedAt'

    credentialColumns: ColumnInterface<Model.EnduserCredentialResponse>[] = [
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Type', dataLabel: 'credentialType', sortable: true },
        { displayName: 'Is Valid', dataLabel: 'isValid', sortable: true }
    ]

    sessionColumns: ColumnInterface<Model.EnduserSessionResponse>[] = [
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Last Updated', dataLabel: 'dbUpdatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Is Active', dataLabel: 'isActive', sortable: true }
    ]

    identifyCredential(index: number, credential: Model.EnduserCredentialResponse) {
        return credential.id
    }

    identifySession(index: number, session: Model.EnduserSessionResponse) {
        return session.id
    }

    ngOnInit() {
        this.subscriptions.add(this.selectedEnduser$.subscribe(enduser => {
            if (enduser) {
                this.selectedEnduserId = enduser.id
                this.enduserCredentialFacade.listEnduserCredentials(enduser.id)
                this.enduserSessionFacade.listEnduserSessions(enduser.id)
            }
        }))
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }

    onCredentialModeClicked() {
        this.viewMode = 'credentials'
    }

    onSessionModeClicked() {
        this.viewMode = 'sessions'
    }

    onCredentialRowClicked(credential: Model.EnduserCredentialResponse) {
        console.log('credential', credential)
    }

    onSessionRowClicked(session: Model.EnduserSessionResponse) {
        console.log('session', session)
    }

    onCredentialSortChanged(sort: Sort) {
        this.credentialSortDirection = sort.direction
        this.credentialSortKey = sort.active as keyof Model.EnduserCredentialResponse
        if (this.selectedEnduserId) {
            this.enduserCredentialFacade.listEnduserCredentials(this.selectedEnduserId, { 
                order: this.credentialSortDirection === 'asc' ? 'asc' : 'desc',
                orderBy: this.credentialSortKey
            })
        }
    }

    onSessionSortChanged(sort: Sort) {
        this.sessionSortDirection = sort.direction
        this.sessionSortKey = sort.active as keyof Model.EnduserSessionResponse
        if (this.selectedEnduserId) {
            this.enduserSessionFacade.listEnduserSessions(this.selectedEnduserId, { 
                order: this.sessionSortDirection === 'asc' ? 'asc' : 'desc',
                orderBy: this.sessionSortKey
            })
        }
    }

    onCredentialPaginationChanged(pagination: PageEvent) {
        if (this.selectedEnduserId) {
            this.enduserCredentialFacade.listEnduserCredentials(this.selectedEnduserId, { 
                limit: pagination.pageSize,
                offset: pagination.pageIndex * pagination.pageSize
            })
        }
    }

    onSessionPaginationChanged(pagination: PageEvent) {
        if (this.selectedEnduserId) {
            this.enduserSessionFacade.listEnduserSessions(this.selectedEnduserId, { 
                limit: pagination.pageSize,
                offset: pagination.pageIndex * pagination.pageSize
            })
        }
    }

    onInvalidateSessionClicked(session: Model.EnduserSessionResponse) {
        this.enduserSessionFacade.invalidateEnduserSession(session.id)
    }

    newPassword() {
        this.windowLayoutFacade.addWindow({
            label: 'New Password',
            icon: 'person_add',
            componentName: 'CreateEnduserCredentialWindowComponent',
            data: {
                enduserId: this.selectedEnduserId ?? ''
            }
        })
    }
}