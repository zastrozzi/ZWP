import { Component, OnInit, ChangeDetectionStrategy, inject, ChangeDetectorRef, OnDestroy } from '@angular/core'
import { State } from '../../+state'
import { CDPUsers } from '@zwp/cdp.users'
import { ColumnInterface, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { Model } from '../../model'
import { DateQueryFilter, EnumQueryFilter, FilterChip, FilterChipEvent, FilterDefinition, handleFilterChipEvent, ZWPFilterChipInputType, ZWPRouterFacade, Nullable, NumberQueryFilter, PaginatedQueryParams, StringQueryFilter } from '@zwp/platform.common'
import { map } from 'rxjs'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'
import { ActivatedRoute } from '@angular/router'
import { ComponentRouteContext } from '../../model/enums'

@Component({
    selector: 'urnet-mnet-invoice-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
            <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>
            
            <zwp-md-button 
                label="Create Invoice" icon="add" 
                textStyle="button1" [iconTextStyle]="'subheadline'"
                [labelColor]="'system-white' | zwpColorTheme"
                [backgroundColor]="'system-green' | zwpColorTheme"
                (btnClick)="newInvoice()"
            ></zwp-md-button>
            
            
            
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(invoices$ | async) || []" [selectable]="true"
            [pagination]="invoicesRemotePagination$ | async"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"
            (rowClicked)="onRowClicked($event)"
            [draggable]="true"
        >
            <ng-template #dragPreview let-dataRow="dataRow">
                <div 
                    fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px" 
                    zwpCorners="5" zwpBackgroundColor="primary" zwpPadding="10 15 10 10"
                    class="mat-elevation-z4"
                >
                    <mat-icon zwpColor="system-white">receipt</mat-icon>
                    <div fxLayout="column" fxLayoutAlign="start stretch">
                        <span zwpTextStyle="caption1" zwpFontWeight="500" zwpColor="system-white">Invoice</span>
                        <span zwpTextStyle="body1" zwpColor="system-white">{{ dataRow.invoiceNumber }}</span>
                    </div>
                </div>
            </ng-template>
        </zwp-paginated-table>
    </div>
    `
})
export class InvoiceListComponent implements OnInit, OnDestroy {
    
    private invoiceFacade = inject(State.Facades.InvoiceFacade)
    private adminUserFacade = inject(CDPUsers.State.AdminUserFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private route = inject(ActivatedRoute)

    private invoiceListContext: ComponentRouteContext = this.route.snapshot.data['invoiceListContext']

    invoices$ = this.invoiceFacade.invoices$
    invoicesRemotePagination$ = this.invoiceFacade.invoiceRemotePagination$
    loggedInAdminUser$ = this.adminUserFacade.loggedInAdminUser$

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.InvoiceResponse = 'invoiceNumber'

    columns: ColumnInterface<Model.InvoiceResponse>[] = [
        { displayName: 'Invoice Number', dataLabel: 'invoiceNumber', sortable: true },
        { displayName: 'Invoice Date', dataLabel: 'invoiceDate', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Invoice Status', dataLabel: 'invoiceStatus', sortable: true, transformEnumPipe: { input: Model.InvoiceStatus, output: Model.InvoiceStatusLabel } },
        { displayName: 'Due Date', dataLabel: 'dueDate', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Updated At', dataLabel: 'dbUpdatedAt', sortable: true, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } }
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Invoice Number', name: 'invoiceNumber', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Invoice Date', name: 'invoiceDate', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Invoice Status', name: 'invoiceStatus', type: ZWPFilterChipInputType.ENUM, enumDefinition: { input: Model.InvoiceStatus, output: Model.InvoiceStatusLabel } },
        { displayName: 'Due Date', name: 'dueDate', type: ZWPFilterChipInputType.DATE, enumDefinition: null }
    ]

    ngOnInit() {
        
        this.loggedInAdminUser$.subscribe((user) => {
            if (user) {
                this.invoiceFacade.resetInvoiceFilters(false)
                this.listInvoicesForContext()
            }
        })
    }

    ngOnDestroy() {
        this.invoiceFacade.resetInvoicePagination()
    }

    listInvoicesForContext(pagination: Nullable<Partial<PaginatedQueryParams<Model.InvoiceResponse>>> = null) {
        switch (this.invoiceListContext) {
            case ComponentRouteContext.MERCHANT_DETAIL:
                this.invoiceFacade.listInvoices('auto', pagination)
                break
            default:
                this.invoiceFacade.listInvoices(null, pagination)
                break
        }
    }

    onRowClicked(row: Model.InvoiceResponse) {
        console.log(row, 'row clicked')
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.InvoiceResponse
        this.sortDirection = sort.direction
        this.listInvoicesForContext({ 
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.InvoiceFilters> = handleFilterChipEvent(filterEvent)
        this.invoiceFacade.updateInvoiceFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.listInvoicesForContext({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize
        })
    }

    newInvoice() {
        this.windowLayoutFacade.addWindow({
            label: 'New Invoice',
            icon: 'person_add',
            componentName: 'CreateInvoiceWindowComponent',
            position: { top: 'calc(50vh - 150px)', left: 'calc(50vw - 250px)', width: '500px', height: '300px'},
            data: {}
        })
    }
}