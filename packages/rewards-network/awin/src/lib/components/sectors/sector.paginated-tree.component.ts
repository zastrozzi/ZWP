import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core'
import { State } from '../../+state'
import {
    FilterChipEvent,
    FilterDefinition,
    handleFilterChipEvent,
    ZWPFilterChipInputType,
    ZWPRouterFacade,
    Nullable,
    TransformEnumPipeSignature,
} from '@zwp/platform.common'
import {
    ColumnInterface,
    FlattenedTreeInterface,
    ZWPPanelLayoutFacade,
    ZWPPopupLayoutFacade,
    ZWPWindowLayoutFacade,
    NestedTreeInterface,
} from '@zwp/platform.layout'
import { Sort, SortDirection } from '@angular/material/sort'
import { Model } from '../../model'
import { PageEvent } from '@angular/material/paginator'
import { ActivatedRoute } from '@angular/router'
import { Observable, of, Subscription, switchMap, tap } from 'rxjs'

@Component({
    selector: 'urnet-mnet-sector-paginated-tree',
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
                    label="New Sector"
                    icon="add"
                    textStyle="button1"
                    [iconTextStyle]="'subheadline'"
                    [labelColor]="'system-white' | zwpColorTheme"
                    [backgroundColor]="'system-green' | zwpColorTheme"
                    (btnClick)="onNewSectorClicked()"
                ></zwp-md-button>
            </div>
            <zwp-divider></zwp-divider>
            <zwp-paginated-tree
                fxFlex="1 1 calc(100% - 55px)"
                [columns]="columns"
                [data]="(paginatedFilteredSectors$ | async) || []"
                [selectable]="true"
                [actionable]="true"
                [pagination]="sectorRemotePagination$ | async"
                (getNestedChildren)="onSectorRowExpanded($event)"
                (sortChanged)="onSortChanged($event)"
                (paginationChanged)="onPaginationChanged($event)"
            >
                <ng-template zwpTableCellTemplate="status" let-row="row">
                    <div fxLayout="row" fxLayoutAlign="start center">
                        <span
                            zwpCorners="5"
                            zwpPadding="5 10"
                            zwpTextStyle="body1"
                            zwpColor="system-white"
                            [zwpBackgroundColor]="row.status | zwpTransformEnum : statusColorEnumSignature"
                            >{{ row.status | zwpTransformEnum : statusLabelEnumSignature }}
                        </span>
                    </div>
                </ng-template>

                <ng-template #rowActions let-row>
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                        <zwp-md-icon-button
                            icon="open_in_full"
                            label="Open Sector Details"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onNavigationClicked(row)"
                        ></zwp-md-icon-button>
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
                            icon="add_circle"
                            label="Add Subsector"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onAddSubsectorClicked(row)"
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
            </zwp-paginated-tree>
        </div>
    `,
})
export class SectorPaginatedTreeComponent implements OnInit, OnDestroy {
    private sectorFacade = inject(State.Facades.AWinSectorFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)
    private activatedRoute = inject(ActivatedRoute)

    private readonly subscriptions = new Subscription()

    paginatedFilteredSectors$: Observable<NestedTreeInterface<Model.SectorResponse>[]> = of([])
    sectorRemotePagination$ = this.sectorFacade.sectorRemotePagination$

    private sectorListContext: Model.SectorPaginatedListComponentContext =
        this.activatedRoute.snapshot.data['sectorListContext']
    sectorListContextIsSectorDetail = this.sectorListContext === Model.SectorPaginatedListComponentContext.SECTOR_DETAIL
    sectorListContextIsBrandDetail = this.sectorListContext === Model.SectorPaginatedListComponentContext.SECTOR_LIST
    sectorListContextIsSectorTree = this.sectorListContext === Model.SectorPaginatedListComponentContext.SECTOR_TREE

    statusLabelEnumSignature = Model.sectorStatusLabelPipeSignature
    statusColorEnumSignature = Model.sectorStatusColorPipeSignature

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.SectorResponse = 'name'

    columns: ColumnInterface<Model.SectorResponse>[] = [
        { displayName: 'Name', dataLabel: 'name', sortable: true },
        {
            displayName: 'Status',
            dataLabel: 'status',
            sortable: true,
            hasCustomTemplate: true,
            transformEnumPipe: this.statusLabelEnumSignature,
        },
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
    ]

    filterDefinitions: FilterDefinition[] = [
        {
            displayName: 'Status',
            name: 'status',
            type: ZWPFilterChipInputType.ENUM,
            enumDefinition: this.statusLabelEnumSignature,
        },
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Name', name: 'name', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
    ]

    subsectorsForSector$ = (sector: Model.SectorResponse) => this.sectorFacade.subsectorsForSector$(sector.id)
    trackBy = (dataNode: FlattenedTreeInterface<NestedTreeInterface<Model.SectorResponse>>) => dataNode.id

    // Lifecycle Hooks
    ngOnInit() {
        if (this.sectorListContextIsSectorTree) {
            this.paginatedFilteredSectors$ = this.sectorFacade.topLevelPaginatedFilteredSectorsWithSubsectorsNested$
        } else {
            this.paginatedFilteredSectors$ = this.sectorFacade.paginatedFilteredSectors$
        }
        this.sectorFacade.resetSectorFilters(false)
        this.sectorFacade.listSectors(this.getParentParamsFromRoute())
    }

    ngOnDestroy() {
        this.sectorFacade.resetPagination()
        this.subscriptions.unsubscribe()
    }

    // Event Handlers
    onInspectorClicked(row: Model.SectorResponse) {
        this.panelLayoutFacade.addRightPanel({
            id: `${row.id}-sector-details`,
            label: `Sector Details - ${row.name}`,
            icon: 'filter_alt',
            componentName: 'SectorDetailRightPanelComponent',
            data: {
                sectorId: row.id,
            },
        })
    }

    onNavigationClicked(row: Model.SectorResponse) {
        this.routerFacade.navigate(['merchant-net', 'sectors', row.id])
    }

    onClipboardClicked(row: Model.SectorResponse) {
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

    onNewSectorClicked() {
        this.windowLayoutFacade.addWindow({
            label: 'New Sector',
            icon: 'filter_alt',
            componentName: 'CreateSectorWindowComponent',
            position: { top: 'calc(50vh - 150px)', left: 'calc(50vw - 250px)', width: '500px', height: '300px' },
            data: {},
        })
    }

    onAddSubsectorClicked(row: Model.SectorResponse) {
        this.windowLayoutFacade.addWindow({
            label: 'New Subsector',
            icon: 'filter_alt',
            componentName: 'CreateSectorWindowComponent',
            position: { top: 'calc(50vh - 175px)', left: 'calc(50vw - 250px)', width: '500px', height: '350px' },
            data: {
                sectorId: row.id,
            },
        })
    }

    onDeleteClicked(row: Model.SectorResponse) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Sector',
                message: `Are you sure you want to delete the sector ${row.name}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
                confirmPermanentButtonLabel: 'Delete Permanently'
            },
            () => { this.sectorFacade.deleteSector(row.id) }
        )
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.SectorResponse
        this.sortDirection = sort.direction
        this.sectorFacade.listSectors(this.getParentParamsFromRoute(), {
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey,
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.SectorFilters> = handleFilterChipEvent(filterEvent)
        this.sectorFacade.updateSectorFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.sectorFacade.listSectors(this.getParentParamsFromRoute(), {
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
        })
    }

    onSectorRowExpanded(row: Model.SectorResponse) {
        this.sectorFacade.listSubsectors(row.id, {
            limit: 30,
            offset: 0,
        })
    }

    getSectorIdFromRoute(): Nullable<string> {
        return this.activatedRoute.parent?.snapshot.params['sectorId'] ?? null
    }

    getBrandIdFromRoute(): Nullable<string> {
        return this.activatedRoute.parent?.snapshot.params['brandId'] ?? null
    }

    getParentParamsFromRoute(): { sectorId: Nullable<string>; brandId: Nullable<string> } {
        return {
            sectorId: this.getSectorIdFromRoute(),
            brandId: this.getBrandIdFromRoute(),
        }
    }
}
