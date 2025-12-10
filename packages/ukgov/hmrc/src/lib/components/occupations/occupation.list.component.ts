import { Component, OnInit, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core'
import { EIM32712OccupationFacade } from '../../+state/facades'
import { ColumnInterface, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { Model } from '../../model'
import {
    DateQueryFilter,
    EnumQueryFilter,
    FilterChip,
    FilterChipEvent,
    FilterDefinition,
    ZWPFilterChipInputType,
    ZWPRouterFacade,
    Nullable,
    NumberQueryFilter,
    StringQueryFilter,
} from '@zwp/platform.common'
import { map } from 'rxjs'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'ukgov-hmrc-occupation-list',
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
                    label="Create Deduction"
                    icon="add"
                    textStyle="button1"
                    [iconTextStyle]="'subheadline'"
                    [labelColor]="'system-white' | zwpColorTheme"
                    [backgroundColor]="'system-green' | zwpColorTheme"
                    (btnClick)="newOccupation()"
                ></zwp-md-button>
            </div>
            <zwp-divider></zwp-divider>
            <zwp-paginated-table
                fxFlex="1 1 calc(100% - 55px)"
                [columns]="columns"
                [data]="(occupations$ | async) || []"
                [selectable]="true"
                [actionable]="true"
                [pagination]="occupationsRemotePagination$ | async"
                (sortChanged)="onSortChanged($event)"
                (paginationChanged)="onPaginationChanged($event)"
                (rowClicked)="onRowClicked($event)"
            >
                <ng-template #rowActions let-row>
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="5px">
                        <zwp-md-icon-button
                            icon="delete"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'destructive' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="deleteOccupation(row)"
                        ></zwp-md-icon-button>
                    </div>
                </ng-template>
            </zwp-paginated-table>
        </div>
    `,
})
export class OccupationListComponent implements OnInit {
    private occupationFacade = inject(EIM32712OccupationFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)

    occupations$ = this.occupationFacade.occupations$
    occupationsRemotePagination$ = this.occupationFacade.occupationRemotePagination$

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.EIM32712OccupationResponse = 'industry'

    columns: ColumnInterface<Model.EIM32712OccupationResponse>[] = [
        { displayName: 'Name', dataLabel: 'name', sortable: true },
        {
            displayName: 'Industry',
            dataLabel: 'industry',
            sortable: true,
            transformEnumPipe: { input: Model.EIM32712Industry, output: Model.EIM32712IndustryLabel },
        },
        {
            displayName: 'Deduction',
            dataLabel: 'deduction',
            sortable: true,
            currencyPipe: { prefix: '£', thousands: ',', decimal: '.', unit: 100 },
        },
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deduction', name: 'deduction', type: ZWPFilterChipInputType.NUMBER, enumDefinition: null },
        { displayName: 'Name', name: 'name', type: ZWPFilterChipInputType.STRING, enumDefinition: null },
        {
            displayName: 'Industry',
            name: 'industry',
            type: ZWPFilterChipInputType.ENUM,
            enumDefinition: { input: Model.EIM32712Industry, output: Model.EIM32712IndustryLabel },
        },
    ]

    ngOnInit() {
        this.occupationFacade.listOccupations()
    }

    onRowClicked(row: Model.EIM32712OccupationResponse) {
        // this.routerFacade.navigate([`/admin/users/${row.id}`])
        console.log(row)
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.EIM32712OccupationResponse
        this.sortDirection = sort.direction
        this.occupationFacade.listOccupations({
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey,
        })
    }

    onPaginationChanged(pagination: PageEvent) {
        this.occupationFacade.listOccupations({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterObj: Partial<Model.EIM32712OccupationFilters> = {}
        const filter = filterEvent.filter
        switch (filter.type) {
            case ZWPFilterChipInputType.DATE:
                ;(filterObj[filter.name as keyof Model.EIM32712OccupationFilters] as Nullable<DateQueryFilter>) =
                    filterEvent.action === 'add' ? filter.dateFilter : null
                break
            case ZWPFilterChipInputType.STRING:
                ;(filterObj[filter.name as keyof Model.EIM32712OccupationFilters] as Nullable<StringQueryFilter>) =
                    filterEvent.action === 'add' ? filter.stringFilter : null
                break
            case ZWPFilterChipInputType.ENUM:
                ;(filterObj[filter.name as keyof Model.EIM32712OccupationFilters] as Nullable<
                    EnumQueryFilter<unknown>
                >) = filterEvent.action === 'add' ? filter.enumFilter : null
                break
            case ZWPFilterChipInputType.NUMBER:
                ;(filterObj[filter.name as keyof Model.EIM32712OccupationFilters] as Nullable<NumberQueryFilter>) =
                    filterEvent.action === 'add' ? filter.numberFilter : null
                break
        }
        this.occupationFacade.updateFilters(filterObj)
    }

    newOccupation() {
        this.windowLayoutFacade.addWindow({
            label: 'New Deduction',
            icon: 'add_circle',
            componentName: 'CreateOccupationWindowComponent',
            position: { top: 'calc(50vh - 150px)', left: 'calc(50vw - 250px)', width: '500px', height: '300px' },
            data: {},
        })
    }

    deleteOccupation(occupation: Model.EIM32712OccupationResponse) {
        this.occupationFacade.deleteOccupation(occupation.id)
    }
}
