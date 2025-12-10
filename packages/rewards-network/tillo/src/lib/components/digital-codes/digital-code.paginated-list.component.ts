import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core'
import { State } from '../../+state';
import { FileExtension, FilterChipEvent, FilterDefinition, handleFilterChipEvent, ZWPFilterChipInputType, ZWPRouterFacade, TransformEnumPipeSignature, ZWPISO3166Alpha2, ZWPISO3166Alpha2Label, ISO4217ActiveCurrencyCode, ISO4217ActiveCurrencyName } from '@zwp/platform.common';
import { ColumnInterface, ZWPPanelLayoutFacade, ZWPPopupLayoutFacade } from '@zwp/platform.layout'
import { Sort, SortDirection } from '@angular/material/sort'
import { Model } from '../../model';
import { PageEvent } from '@angular/material/paginator';
import { Clipboard } from '@angular/cdk/clipboard';



@Component({
    selector: 'rewards-network-tillo-digital-giftcode-paginated-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
         <div fxLayout="column" fxFlexFill> 
            <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
                <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>     
            </div>

        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(paginatedFilteredDigitalCodes$ | async) || []" [selectable]="true" [actionable]="true"
            [pagination]="digitalCodeRemotePagination$ | async"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"> 

            
            <ng-template #rowActions let-row>
                <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                    
                    <zwp-md-icon-button
                        icon="visibility" label="Open in Inspector"
                        [iconPadding]="5"
                        [textStyle]="'subheadline'"
                        [iconColor]="'primary' | zwpColorTheme"
                        [backgroundColor]="'clear' | zwpColorTheme"
                        (btnClick)="onInspectorClicked(row)"
                    ></zwp-md-icon-button>
                    <zwp-md-icon-button
                        icon="content_copy" label="Add to Clipboard"
                        [iconPadding]="5"
                        [textStyle]="'subheadline'"
                        [iconColor]="'primary' | zwpColorTheme"
                        [backgroundColor]="'clear' | zwpColorTheme"
                        (btnClick)="onClipboardClicked(row)"
                    ></zwp-md-icon-button>
        
                        <zwp-md-icon-button
                            icon="delete"
                            label="Delete"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'system-red' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onDeleteClicked(row)"
                        ></zwp-md-icon-button>
                </div>
            </ng-template>
        </zwp-paginated-table> 
        </div>
    `
})
export class TilloDigitalCodePaginatedListComponent implements OnInit, OnDestroy {
    private clipboard = inject(Clipboard)
    private digitalCodeFacade = inject(State.Facades.TilloDigitalCodeFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)


    paginatedFilteredDigitalCodes$ = this.digitalCodeFacade.paginatedFilteredDigitalCodes$
    digitalCodeRemotePagination$ = this.digitalCodeFacade.digitalCodeRemotePagination$

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.DigitalGiftCodeResponse = 'id'

    orderStatusPipeSignature: TransformEnumPipeSignature = { input: Model.OrderStatus, output: Model.OrderStatusLabel }
    faceAndCostValuePipeSignature: TransformEnumPipeSignature = { input: ISO4217ActiveCurrencyCode, output: ISO4217ActiveCurrencyName }
    barcodePipeSignature: TransformEnumPipeSignature = { input: Model.BarcodeType, output: Model.BarcodeTypeLabel }

    columns: ColumnInterface<Model.DigitalGiftCodeResponse>[] = [
        { displayName: 'Status', dataLabel: 'status', sortable: true, transformEnumPipe: this.orderStatusPipeSignature },
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Updated At', dataLabel: 'dbUpdatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        // { displayName: 'Deleted At', dataLabel: 'dbDeletedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Face Value', dataLabel: 'faceValue.amount', sortable: true, currencyPipe: { prefix: '£', thousands: ',', decimal: '.', unit: 1 } },
        { displayName: 'Cost Value', dataLabel: 'costValue.amount', sortable: true, currencyPipe: { prefix: '£', thousands: ',', decimal: '.', unit: 1 } },
        { displayName: 'URL', dataLabel: 'url', sortable: true },
        { displayName: 'Code', dataLabel: 'code', sortable: true },
        { displayName: 'Discount', dataLabel: 'discount', sortable: true },
        { displayName: 'Expiration Date', dataLabel: 'expirationDate', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' }},
        { displayName: 'Barcode', dataLabel: 'barcode.type', sortable: true, transformEnumPipe: this.barcodePipeSignature }
    ]

    filterDefinitions: FilterDefinition[] = [ 
        { displayName: 'Status', name: 'status', type: ZWPFilterChipInputType.ENUM, enumDefinition: this.orderStatusPipeSignature },
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Face Value', name: 'faceValue.amount', type: ZWPFilterChipInputType.NUMBER, enumDefinition: null },
        { displayName: 'Cost Value', name: 'costValue.amount', type: ZWPFilterChipInputType.NUMBER, enumDefinition: null },
        { displayName: 'URL', name: 'url', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Code', name: 'code', type: ZWPFilterChipInputType.STRING, enumDefinition: null},
        { displayName: 'Discount', name: 'discount', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Expiration Date', name: 'expirationDate', type: ZWPFilterChipInputType.DATE, enumDefinition: null},
        { displayName: 'Barcode', name: 'barcode.type', type: ZWPFilterChipInputType.STRING, enumDefinition: this.barcodePipeSignature }
    ]

    ngOnInit() {
        this.digitalCodeFacade.resetDigitalCodeFilters(false)
        this.digitalCodeFacade.listDigitalCode()
    }

    ngOnDestroy() {
        this.digitalCodeFacade.resetPagination()
    }

    onInspectorClicked(row: Model.DigitalGiftCodeResponse) {
        this.panelLayoutFacade.addRightPanel({
            id: `${row.id}-table-details`,
            label: `Digital GiftCode Details`,
            icon: 'schema',
            componentName: 'DigitalGiftCodeDetailsRightPanelComponent',
            data: {
                digitalCodeId: row.id
            }
        })
    }

    onNavigationClicked(row: Model.DigitalGiftCodeResponse) {
        // this.panelLayoutFacade.addRightPanel({
        //     id: `${row.id}-table-details`,
        //     label: `Table Details - ${row.displayName}`,
        //     icon: 'schema',
        //     componentName: 'QueryableSchemaTableDetailsRightPanelComponent',
        //     data: {
        //         table: row
        //     }
        // })
    }

    
    onDeleteClicked(row: Model.BrandResponse) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Digital Gift Code',
                message: `Are you sure you want to delete the Digital Gift Code ${row.id}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
                confirmPermanentButtonLabel: 'Delete Permanently'
            },
            () => { this.digitalCodeFacade.deleteDigitalCode(row.id) }
        )
    }


    onClipboardClicked(row: Model.DigitalGiftCodeResponse) {
        const rowText = JSON.stringify(row, null, 2)
        this.clipboard.copy(rowText);
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.DigitalGiftCodeResponse
        this.sortDirection = sort.direction
        this.digitalCodeFacade.listDigitalCode(null, { 
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.DigitalCodeFilters> = handleFilterChipEvent(filterEvent)
        this.digitalCodeFacade.updateDigitalCodeFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.digitalCodeFacade.listDigitalCode(null,{
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize
        })
    }

}