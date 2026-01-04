import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core'
import { ColumnInterface, ZWPPopupLayoutFacade, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import {
    FilterChipEvent,
    FilterDefinition,
    ZWPFilterChipInputType,
    ZWPRouterFacade,
    handleFilterChipEvent,
} from '@zwp/platform.common'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'
import { State } from '../../+state'
import { Model } from '../../model'

@Component({
    selector: 'zwp-dummy-data-project-paginated-list',
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
                    label="Create Project"
                    icon="add"
                    textStyle="button1"
                    [iconTextStyle]="'subheadline'"
                    [labelColor]="'system-white' | zwpColorTheme"
                    [backgroundColor]="'system-green' | zwpColorTheme"
                    (btnClick)="newProject()"
                ></zwp-md-button>
            </div>
            <zwp-divider></zwp-divider>
            <zwp-paginated-table
                fxFlex="1 1 calc(100% - 55px)"
                [columns]="columns"
                [data]="(paginatedFilteredProjects$ | async) || []"
                [selectable]="true"
                [actionable]="true"
                [selectionActionable]="true"
                [pagination]="projectRemotePagination$ | async"
                (sortChanged)="onSortChanged($event)"
                (paginationChanged)="onPaginationChanged($event)"
                (rowClicked)="onRowClicked($event)"
            >
                <ng-template zwpTableCellTemplate="status" let-row="row">
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="10">
                        <span
                            zwpCorners="5"
                            zwpPadding="5 10"
                            zwpTextStyle="body1"
                            zwpFontWeight="700"
                            [zwpColor]="row.status | zwpTransformEnum : statusColorEnum"
                            [zwpBackgroundColor]="row.status | zwpTransformEnum : statusColorEnum"
                            [zwpBackgroundColorOptions]="{opacity: 0.2}"
                            >{{ row.status | zwpTransformEnum : statusLabelEnum }}
                        </span>
                    </div>
                </ng-template>
                <ng-template zwpTableCellTemplate="budget" let-row="row">
                    <span
                            
                            >{{ row.budget | currency }}
                        </span>
                </ng-template>
                <ng-template #rowActions let-row>
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                        <zwp-md-icon-button
                            icon="delete"
                            label="Delete"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'destructive' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onDeleteClicked($event, row)"
                        ></zwp-md-icon-button>
                    </div>
                </ng-template>
                <ng-template #selectionActions let-selected="selected">
                    <zwp-md-button
                        *ngIf="selected.length > 0"
                        [label]="'Delete Projects'"
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
export class ProjectPaginatedListComponent implements OnInit {
    private dummyDataFacade = inject(State.Facades.DummyDataFacade)
    private projectFacade = inject(State.Facades.PlatformDummyDataProjectFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)

    paginatedFilteredProjects$ = this.projectFacade.paginatedFilteredProjects$
    projectRemotePagination$ = this.projectFacade.projectRemotePagination$

    statusColorEnum = Model.projectStatusColorPipeSignature
    statusLabelEnum = Model.projectStatusLabelPipeSignature

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.ProjectResponse = 'name'

    columns: ColumnInterface<Model.ProjectResponse>[] = [
        { displayName: 'Name', dataLabel: 'name', sortable: true },
        { displayName: 'Description', dataLabel: 'description', sortable: true },
        {
            displayName: 'Status',
            dataLabel: 'status',
            sortable: true,
            hasCustomTemplate: true,
            transformEnumPipe: this.statusLabelEnum,
        },
        {
            displayName: 'Created At',
            dataLabel: 'dbCreatedAt',
            sortable: true,
            datePipe: { format: 'yyyy/MM/dd HH:mm:ss' },
        },
        {
            displayName: 'Updated At',
            dataLabel: 'dbUpdatedAt',
            sortable: true,
            datePipe: { format: 'yyyy/MM/dd HH:mm:ss' },
        },
        { displayName: 'Budget', dataLabel: 'budget', sortable: true, hasCustomTemplate: true },
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Name', name: 'name', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        {
            displayName: 'Status',
            name: 'status',
            type: ZWPFilterChipInputType.ENUM,
            enumDefinition: this.statusLabelEnum,
        },
        { displayName: 'Budget', name: 'budget', type: ZWPFilterChipInputType.NUMBER, enumDefinition: null },
    ]

    ngOnInit() {
        this.projectFacade.resetProjectFilters(false)
        this.projectFacade.listProjects()
    }

    onRowClicked(row: Model.ProjectResponse) {
        // console.log('Table Row Clicked')
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.ProjectResponse
        this.sortDirection = sort.direction
        this.projectFacade.listProjects({
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey,
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.ProjectFilters> = handleFilterChipEvent(filterEvent)
        this.projectFacade.updateProjectFilters(filterChange)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.projectFacade.listProjects({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
        })
    }

    newProject() {
        this.windowLayoutFacade.addWindow({
            label: 'New Project',
            icon: 'pages',
            componentName: 'PlatformDummyDataCreateProjectWindowComponent',
            position: { top: 'calc(50vh - 225px)', left: 'calc(50vw - 190px)', width: '380px', height: '450px' },
            data: {},
        })
    }

    onDeleteClicked(event: MouseEvent | TouchEvent, row: Model.ProjectResponse) {
        event.preventDefault()
        event.stopPropagation()
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Project',
                message: `Are you sure you want to delete the project ${row.name}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
            },
            () => { this.projectFacade.deleteProject(row.id) }
        )
    }

    onDeleteManyClicked(selected: Model.ProjectResponse[]) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Projects',
                message: `Are you sure you want to delete ${selected.length} project${
                    selected.length === 1 ? '' : 's'
                }?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
            },
            () => { this.projectFacade.deleteProjects(selected.map((item) => item.id)) }
        )
    }
}
