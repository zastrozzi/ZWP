import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core'
import { State } from '../../+state'
import { FileExtension, FilterChipEvent, FilterDefinition, handleFilterChipEvent, ZWPFilterChipInputType, TransformEnumPipeSignature } from '@zwp/platform.common'
import { ColumnInterface } from '@zwp/platform.layout'
import { Sort, SortDirection } from '@angular/material/sort'
import { Model } from '../../model'
import { PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'cdp-partnernet-asset-paginated-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
            <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>
            
            
            
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(paginatedFilteredAssets$ | async) || []" [selectable]="true" [actionable]="true"
            [pagination]="assetRemotePagination$ | async"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"
        >
            <ng-template #rowActions let-row>
                <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                    <zwp-md-icon-button
                        icon="open_in_full" label="Open Asset Details"
                        [iconPadding]="5"
                        [textStyle]="'subheadline'"
                        [iconColor]="'primary' | zwpColorTheme"
                        [backgroundColor]="'clear' | zwpColorTheme"
                        (btnClick)="onNavigationClicked(row)"
                    ></zwp-md-icon-button>
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
                </div>
            </ng-template>
        </zwp-paginated-table>
    </div>
    `
})
export class AssetPaginatedListComponent implements OnInit, OnDestroy {
    private assetFacade = inject(State.Facades.PartnerNetAssetFacade)

    paginatedFilteredAssets$ = this.assetFacade.paginatedFilteredAssets$
    assetRemotePagination$ = this.assetFacade.assetRemotePagination$

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.AssetResponse = 'name'

    assetStatusPipeSignature: TransformEnumPipeSignature = { input: Model.AssetStatus, output: Model.AssetStatusLabel }
    assetTypePipeSignature: TransformEnumPipeSignature = { input: FileExtension, output: FileExtension }

    columns: ColumnInterface<Model.AssetResponse>[] = [
        { displayName: 'Name', dataLabel: 'name', sortable: true },
        { displayName: 'Status', dataLabel: 'status', sortable: true, transformEnumPipe: this.assetStatusPipeSignature },
        { displayName: 'Type', dataLabel: 'type', sortable: true, transformEnumPipe: this.assetTypePipeSignature },
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Updated At', dataLabel: 'dbUpdatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Name', name: 'name', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        { displayName: 'Status', name: 'status', type: ZWPFilterChipInputType.ENUM, enumDefinition: this.assetStatusPipeSignature },
        { displayName: 'Type', name: 'type', type: ZWPFilterChipInputType.ENUM, enumDefinition: this.assetTypePipeSignature }
    ]

    // Lifecycle Hooks
    ngOnInit() {
        this.assetFacade.resetAssetFilters(false)
        this.assetFacade.listAssets()
    }

    ngOnDestroy() {
        this.assetFacade.resetPagination()
    }

    // Event Handlers
        onInspectorClicked(row: Model.AssetResponse) {
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

        onNavigationClicked(row: Model.AssetResponse) {
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

        onClipboardClicked(row: Model.AssetResponse) {
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
    
        onSortChanged(sort: Sort) {
            this.sortKey = sort.active as keyof Model.AssetResponse
            this.sortDirection = sort.direction
            this.assetFacade.listAssets(null, 'none', { 
                order: this.sortDirection === 'asc' ? 'asc' : 'desc',
                orderBy: this.sortKey
            })
        }
    
        onFiltersChanged(filterEvent: FilterChipEvent) {
            const filterChange: Partial<Model.AssetFilters> = handleFilterChipEvent(filterEvent)
            this.assetFacade.updateAssetFilters(filterChange)
        }
    
        onPaginationChanged(pagination: PageEvent) {
            this.assetFacade.listAssets(null, 'none', {
                limit: pagination.pageSize,
                offset: pagination.pageIndex * pagination.pageSize
            })
        }
}