import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core'
import { State } from '../../+state'
import {
    FilterChipEvent,
    FilterDefinition,
    handleFilterChipEvent,
    isNull,
    isUndefined,
    ZWPFilterChipInputType,
    ZWPRouterFacade,
    Nullable,
    TransformEnumPipeSignature,
} from '@zwp/platform.common'
import {
    ColumnInterface,
    ZWPPanelLayoutFacade,
    ZWPPopupLayoutFacade,
    ZWPWindowLayoutFacade,
} from '@zwp/platform.layout'
import { Sort, SortDirection } from '@angular/material/sort'
import { Model } from '../../model'
import { PageEvent } from '@angular/material/paginator'
import { ActivatedRoute } from '@angular/router'
import { CDPCommon } from '@zwp/cdp.common'
import { Clipboard } from '@angular/cdk/clipboard'
import { debounceTime, distinctUntilChanged, tap } from 'rxjs'

@Component({
    selector: 'kgc-storage-object-paginated-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlexFill>
            <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
                <zwp-filter-chip-input
                    fxFlex="grow"
                    [filterDefinitions]="filterDefinitions"
                    (filterChange)="onFiltersChanged($event)"
                ></zwp-filter-chip-input>
                <zwp-md-button
                    *ngIf="storageObjectListContextIsBucketDetail"
                    label="Upload Storage Object"
                    icon="add"
                    textStyle="button1"
                    [iconTextStyle]="'subheadline'"
                    layoutGap="10px"
                    [labelColor]="'system-white' | zwpColorTheme"
                    [backgroundColor]="'system-green' | zwpColorTheme"
                    (btnClick)="onNewStorageObjectClicked()"
                ></zwp-md-button>
            </div>
            <zwp-divider></zwp-divider>
            <zwp-paginated-table
                fxFlex="1 1 calc(100% - 55px)"
                [columns]="columns"
                [data]="(storageObjects$ | async) || []"
                [selectable]="true"
                [actionable]="true"
                [draggable]="true"
                [selectionActionable]="true"
                [pagination]="storageObjectRemotePagination$ | async"
                (sortChanged)="onSortChanged($event)"
                (paginationChanged)="onPaginationChanged($event)"
                (rowClicked)="onRowClicked($event)"
                (cellCopyClicked)="onCellCopyClicked($event)"
                [selectableBy]="selectableBy"
            >
                <ng-template zwpTableCellTemplate="storageBucketId" let-row="row">
                    <ng-container *ngIf="storageBucketById$(row.storageBucketId) | async as storageBucket">
                        <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                            <zwp-md-button
                                [label]="storageBucket.name ?? ''"
                                icon="perm_media"
                                [iconTextStyle]="'button3'"
                                [textStyle]="'button3'"
                                postfixIcon="chevron_right"
                                [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                                [labelColor]="'primary' | zwpColorTheme"
                                (btnClick)="onNavigateStorageBucketClicked(storageBucket.id)"
                            ></zwp-md-button>
                        </div>
                    </ng-container>
                </ng-template>
                <ng-template #rowActions let-row>
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                        <!-- <zwp-md-icon-button
                        icon="open_in_full" label="Open Storage Object Details"
                        [iconPadding]="5"
                        [textStyle]="'subheadline'"
                        [iconColor]="'primary' | zwpColorTheme"
                        [backgroundColor]="'clear' | zwpColorTheme"
                        (btnClick)="onNavigationClicked(row)"
                    ></zwp-md-icon-button> -->
                        <zwp-md-icon-button
                            icon="visibility"
                            label="Open in Inspector"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onInspectorClicked(row)"
                        ></zwp-md-icon-button>
                        <zwp-md-icon-button
                            icon="content_copy"
                            label="Add to Clipboard"
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
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onDeleteClicked(row)"
                        ></zwp-md-icon-button>
                    </div>
                </ng-template>
                <ng-template #dragPreview let-dataRow="dataRow">
                    <div fxLayout="column" fxLayoutAlign="start start" fxLayoutGap="5px">
                        <div
                            fxLayout="row"
                            fxLayoutAlign="start stretch"
                            fxLayoutGap="10px"
                            zwpPadding="10 15 10 10"
                            zwpCorners="5"
                            zwpBackgroundColor="primary"
                            class="mat-elevation-z4"
                        >
                            <mat-icon zwpColor="system-white">pages</mat-icon>
                            <div fxLayout="column" fxLayoutAlign="start stretch">
                                <span zwpTextStyle="caption1" zwpFontWeight="500" zwpColor="system-white"
                                    >Storage Object</span
                                >
                                <span zwpTextStyle="body1" zwpColor="system-white">{{ dataRow.name }}</span>
                            </div>
                        </div>
                        <div
                            fxLayout="row"
                            fxLayoutAlign="center center"
                            [style.position]="'relative'"
                            [style.maxWidth]="'200px'"
                        >
                            <img
                                [ngSrc]="dataRow.mediaLink"
                                fill
                                [style.height]="'auto'"
                                [style.position]="'relative'"
                                zwpCorners="5"
                            />
                        </div>
                    </div>
                </ng-template>
                <ng-template #selectionActions let-selected="selected">
                    <!-- <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px" fxFlex="noshrink"> -->
                    <!-- <span zwpTextStyle="body1" zwpColor="primary">Selected {{ selected.length }} Storage Objects</span> -->
                    <zwp-md-button
                        *ngIf="selected.length > 0"
                        [label]="'Delete Objects'"
                        icon="delete"
                        [iconTextStyle]="'button1'"
                        [textStyle]="'button1'"
                        [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                        [labelColor]="'system-red' | zwpColorTheme"
                        (btnClick)="onDeleteManyClicked(selected)"
                    ></zwp-md-button>
                    <!-- </div> -->
                </ng-template>
            </zwp-paginated-table>
        </div>
    `,
})
export class StorageObjectPaginatedListComponent implements OnInit, OnDestroy {
    private storageObjectFacade = inject(State.Facades.GoogleCloudStorageObjectFacade)
    private utlityDockFacade = inject(CDPCommon.State.Facades.CDPCommonUtilityDockFacade)
    private storageBucketFacade = inject(State.Facades.GoogleCloudStorageBucketFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)
    private activatedRoute = inject(ActivatedRoute)

    private clipboard = inject(Clipboard)

    storageObjects$ = this.storageObjectFacade.paginatedFilteredStorageObjects$
    storageObjectRemotePagination$ = this.storageObjectFacade.storageObjectRemotePagination$

    private storageObjectListContext: Model.Enums.StorageObjectPaginatedListComponentContext =
        this.activatedRoute.snapshot.data['storageObjectListContext']
    storageObjectListContextIsBucketDetail =
        this.storageObjectListContext === Model.Enums.StorageObjectPaginatedListComponentContext.STORAGE_BUCKET_DETAIL

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.Responses.StorageObjectResponse = 'name'

    // storageObjectStatusPipeSignature: TransformEnumPipeSignature = { input: Model.StorageObjectStatus, output: Model.StorageObjectStatusLabel }

    columns: ColumnInterface<Model.Responses.StorageObjectResponse>[] = [
        { displayName: 'Name', dataLabel: 'name', sortable: true },
        {
            displayName: 'Created At',
            dataLabel: 'dbCreatedAt',
            sortable: true,
            style: { minWidth: 180 },
            datePipe: { format: 'yyyy/MM/dd HH:mm:ss' },
        },
        {
            displayName: 'Updated At',
            dataLabel: 'dbUpdatedAt',
            sortable: true,
            style: { minWidth: 180 },
            datePipe: { format: 'yyyy/MM/dd HH:mm:ss' },
        },
        {
            displayName: 'Public URL',
            dataLabel: 'mediaLink',
            sortable: false,
            copyable: true,
            style: { maxWidth: 400, textOverflow: 'ellipsis' },
        },
        { displayName: 'Bucket', dataLabel: 'storageBucketId', sortable: false, hasCustomTemplate: true },
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Name', name: 'name', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
    ]
    requestedStorageBucketIds: Set<string> = new Set()
    selectableBy: (row: Model.Responses.StorageObjectResponse) => string = (
        row: Model.Responses.StorageObjectResponse
    ) => row.id
    
    storageBucketById$ = (id: string) => this.storageBucketFacade.storageBucketById$(id)
        .pipe(
            tap(storageBucket => {
                if (isUndefined(storageBucket) && !this.requestedStorageBucketIds.has(id)) {
                    this.requestedStorageBucketIds.add(id)
                    this.storageBucketFacade.getStorageBucket(id)
                }
            })
        )

    // Lifecycle Hooks
    ngOnInit() {
        this.storageObjectFacade.resetStorageObjectFilters(false)
        this.storageObjectFacade.listStorageObjects(this.getStorageBucketIdFromRoute())
        if (
            this.storageObjectListContext === Model.Enums.StorageObjectPaginatedListComponentContext.STORAGE_OBJECT_LIST
        ) {
            this.storageObjects$ = this.storageObjectFacade.paginatedFilteredStorageObjects$
        } else if (
            this.storageObjectListContext ===
            Model.Enums.StorageObjectPaginatedListComponentContext.STORAGE_BUCKET_DETAIL
        ) {
            this.storageObjects$ = this.storageObjectFacade.paginatedFilteredStorageObjectsForSelectedStorageBucket$
        }
    }

    ngOnDestroy() {
        this.storageObjectFacade.resetPagination()
    }

    onNavigateStorageBucketClicked(bucketId: string) {
        this.routerFacade.navigate([`/cms/kgc/storage-buckets/${bucketId}`])
    }

    // Event Handlers
    onInspectorClicked(row: Model.Responses.StorageObjectResponse) {
        this.panelLayoutFacade.addRightPanel({
            id: `${row.id}-object-details`,
            label: `Storage Object Details`,
            icon: 'photo_library',
            componentName: 'StorageObjectDetailRightPanelComponent',
            data: {
                objectId: row.id,
            },
        })
    }

    onNavigationClicked(row: Model.Responses.StorageObjectResponse) {
        //
    }

    onClipboardClicked(row: Model.Responses.StorageObjectResponse) {
        //
    }

    onRowClicked(row: Model.Responses.StorageObjectResponse) {
        // console.log('row clicked')
    }

    onCellCopyClicked(data: {
        row: Model.Responses.StorageObjectResponse
        column: ColumnInterface<Model.Responses.StorageObjectResponse>
        value: unknown
    }) {
        this.clipboard.copy(data.value as string)
    }

    onDeleteClicked(row: Model.Responses.StorageObjectResponse) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Storage Object',
                message: `Are you sure you want to delete the storage object ${row.name}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
            },
            () => {
                this.storageObjectFacade.deleteStorageObject(row.id)
            }
        )
    }

    onDeleteManyClicked(selected: Model.Responses.StorageObjectResponse[]) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Storage Objects',
                message: `Are you sure you want to delete ${selected.length} storage object${
                    selected.length === 1 ? '' : 's'
                }?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
            },
            () => {
                this.storageObjectFacade.deleteManyStorageObjects({ objectIds: selected.map((object) => object.id) })
            }
        )
    }

    onNewStorageObjectClicked() {
        this.windowLayoutFacade.addWindow({
            label: 'Upload Storage Object',
            icon: 'upload_file',
            componentName: 'CreateStorageObjectWindowComponent',
            position: { top: 'calc(50vh - 200px)', left: 'calc(50vw - 250px)', width: '500px', height: '400px' },
            data: {
                storageBucketId: this.getStorageBucketIdFromRoute(),
            },
        })
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.Responses.StorageObjectResponse
        this.sortDirection = sort.direction
        this.storageObjectFacade.listStorageObjects(this.getStorageBucketIdFromRoute(), {
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey,
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.StorageObjectFilters> = handleFilterChipEvent(filterEvent)
        this.storageObjectFacade.updateStorageObjectFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.storageObjectFacade.listStorageObjects(this.getStorageBucketIdFromRoute(), {
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
        })
    }

    getStorageBucketIdFromRoute(): Nullable<string> {
        return this.activatedRoute.parent?.snapshot.params['bucketId'] ?? null
    }
}
