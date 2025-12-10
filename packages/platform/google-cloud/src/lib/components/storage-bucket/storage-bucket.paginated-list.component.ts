import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core'
import { State } from '../../+state'
import { FilterChipEvent, FilterDefinition, handleFilterChipEvent, ZWPFilterChipInputType, ZWPRouterFacade, TransformEnumPipeSignature } from '@zwp/platform.common'
import { ColumnInterface, ZWPPanelLayoutFacade, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { Sort, SortDirection } from '@angular/material/sort'
import { Model } from '../../model'
import { PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'kgc-storage-bucket-paginated-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
            <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>
            <zwp-md-button 
                label="New Storage Bucket" icon="add" 
                textStyle="button1" [iconTextStyle]="'subheadline'"
                [labelColor]="'system-white' | zwpColorTheme"
                [backgroundColor]="'system-green' | zwpColorTheme"
                (btnClick)="onNewStorageBucketClicked()"
            ></zwp-md-button>
            
            
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(paginatedFilteredStorageBuckets$ | async) || []" [selectable]="true" [actionable]="true"
            [pagination]="storageBucketRemotePagination$ | async"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"
        >
            <ng-template #rowActions let-row>
                <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                    <zwp-md-icon-button
                        icon="open_in_full" label="Open Storage Bucket Details"
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
export class StorageBucketPaginatedListComponent implements OnInit, OnDestroy {
    private storageBucketFacade = inject(State.Facades.GoogleCloudStorageBucketFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)

    paginatedFilteredStorageBuckets$ = this.storageBucketFacade.paginatedFilteredStorageBuckets$
    storageBucketRemotePagination$ = this.storageBucketFacade.storageBucketRemotePagination$

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.Responses.StorageBucketResponse = 'name'

    // storageBucketStatusPipeSignature: TransformEnumPipeSignature = { input: Model.StorageBucketStatus, output: Model.StorageBucketStatusLabel }

    columns: ColumnInterface<Model.Responses.StorageBucketResponse>[] = [
        { displayName: 'Name', dataLabel: 'name', sortable: true },
        { displayName: 'Created At', dataLabel: 'dbCreatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
        { displayName: 'Updated At', dataLabel: 'dbUpdatedAt', sortable: true, style: { minWidth: 180 }, datePipe: { format: 'yyyy/MM/dd HH:mm:ss' } },
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Name', name: 'name', type: ZWPFilterChipInputType.STRING, enumDefinition: null }
    ]

    // Lifecycle Hooks
    ngOnInit() {
        this.storageBucketFacade.resetStorageBucketFilters(false)
        this.storageBucketFacade.listStorageBuckets()
    }

    ngOnDestroy() {
        this.storageBucketFacade.resetPagination()
    }

    // Event Handlers
        onInspectorClicked(row: Model.Responses.StorageBucketResponse) {
            this.panelLayoutFacade.addRightPanel({
                id: `${row.id}-bucket-details`,
                label: `Storage Bucket Details`,
                icon: 'perm_media',
                componentName: 'StorageBucketDetailRightPanelComponent',
                data: {
                    bucketId: row.id
                }
            })
        }

        onNavigationClicked(row: Model.Responses.StorageBucketResponse) {
            this.routerFacade.navigate(['cms', 'kgc', 'storage-buckets', row.id])
        }

        onClipboardClicked(row: Model.Responses.StorageBucketResponse) {
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

        onNewStorageBucketClicked() {
            this.windowLayoutFacade.addWindow({
                label: 'New Storage Bucket',
                icon: 'perm_media',
                componentName: 'CreateStorageBucketWindowComponent',
                position: { top: 'calc(50vh - 125px)', left: 'calc(50vw - 250px)', width: '500px', height: '250px'},
                data: {}
            })
        }
    
        onSortChanged(sort: Sort) {
            this.sortKey = sort.active as keyof Model.Responses.StorageBucketResponse
            this.sortDirection = sort.direction
            this.storageBucketFacade.listStorageBuckets({ 
                order: this.sortDirection === 'asc' ? 'asc' : 'desc',
                orderBy: this.sortKey
            })
        }
    
        onFiltersChanged(filterEvent: FilterChipEvent) {
            const filterChange: Partial<Model.Filters.StorageBucketFilters> = handleFilterChipEvent(filterEvent)
            this.storageBucketFacade.updateStorageBucketFilters(filterChange)
        }
    
        onPaginationChanged(pagination: PageEvent) {
            this.storageBucketFacade.listStorageBuckets({
                limit: pagination.pageSize,
                offset: pagination.pageIndex * pagination.pageSize
            })
        }
}