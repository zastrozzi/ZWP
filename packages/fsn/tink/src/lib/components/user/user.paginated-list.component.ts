import { Component, OnInit, ChangeDetectionStrategy, inject, ChangeDetectorRef, OnDestroy } from '@angular/core'
import { State } from '../../+state'
import { CDPUsers } from '@zwp/cdp.users'
import { ColumnInterface, ZWPPanelLayoutFacade, ZWPPopupLayoutFacade, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { Model } from '../../model'
import {
    BarcodeType,
    BarcodeTypeLabel,
    DateQueryFilter,
    EnumQueryFilter,
    FilterChip,
    FilterChipEvent,
    FilterDefinition,
    handleFilterChipEvent,
    iso4217CurrencyNameEnumPipe,
    ZWPFilterChipInputType,
    ZWPISO3166Alpha2,
    ZWPISO3166Alpha2Label,
    zwpISO3166Alpha2LabelEnumPipe,
    ZWPRouterFacade,
    Nullable,
    NumberQueryFilter,
    PaginatedQueryParams,
    StringQueryFilter,
} from '@zwp/platform.common'
import { map, Observable, of } from 'rxjs'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'fsn-tink-user-paginated-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlexFill>
            <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayoutGap="5px">
                <zwp-filter-chip-input
                    fxFlex="grow"
                    [filterDefinitions]="filterDefinitions"
                    (filterChange)="onFiltersChanged($event)"
                ></zwp-filter-chip-input>
            </div>
            <zwp-divider></zwp-divider>
            <zwp-paginated-table
                fxFlex="1 1 calc(100% - 55px)"
                [columns]="columns"
                [data]="(users$ | async) || []"
                [selectable]="true"
                [actionable]="true"
                [draggable]="true"
                [selectionActionable]="true"
                [pagination]="usersRemotePagination$ | async"
                (sortChanged)="onSortChanged($event)"
                (paginationChanged)="onPaginationChanged($event)"
                (rowClicked)="onRowClicked($event)"
            >
                <ng-template zwpTableCellTemplate="enduserId" let-row="row">
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="5px">
                    <span
                        *ngIf="row.enduserId"
                        [zwpTextStyle]="'body1'"
                        [zwpColor]="'primary'"
                        [zwpFontWeight]="500"
                    >{{ row.enduserId }}</span>
                    </div>
                </ng-template>
            
                <ng-template #rowActions let-row>
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                        <zwp-md-icon-button
                            icon="open_in_full"
                            label="Open User Details"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onNavigationClicked($event, row)"
                        ></zwp-md-icon-button>
                        <zwp-md-icon-button
                            icon="visibility"
                            label="Open in Inspector"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onInspectorClicked($event, row)"
                        ></zwp-md-icon-button>
                        <zwp-md-icon-button
                            icon="content_copy"
                            label="Add to Clipboard"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onClipboardClicked($event, row)"
                        ></zwp-md-icon-button>
                        <!-- <zwp-md-icon-button
                            icon="delete"
                            label="Delete"
                            [iconPadding]="5"
                            [textStyle]="'subheadline'"
                            [iconColor]="'primary' | zwpColorTheme"
                            [backgroundColor]="'clear' | zwpColorTheme"
                            (btnClick)="onDeleteClicked($event, row)"
                        ></zwp-md-icon-button> -->
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
                            <mat-icon zwpColor="system-white">credit_card</mat-icon>
                            <div fxLayout="column" fxLayoutAlign="start stretch">
                                <span zwpTextStyle="caption1" zwpFontWeight="500" zwpColor="system-white"
                                    >Loyalty Card Scheme</span
                                >
                                <span zwpTextStyle="body1" zwpColor="system-white">{{ dataRow.displayName }}</span>
                            </div>
                        </div>
                    </div>
                </ng-template>
                <ng-template #selectionActions let-selected="selected">
                    <!-- <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px" fxFlex="noshrink"> -->
                    <!-- <span zwpTextStyle="body1" zwpColor="primary">Selected {{ selected.length }} Storage Objects</span> -->
                    <zwp-md-button
                        *ngIf="selected.length > 0"
                        [label]="'Delete Users'"
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
export class UserPaginatedListComponent implements OnInit, OnDestroy {
    private userFacade = inject(State.Facades.TinkUserFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)
    private activatedRoute = inject(ActivatedRoute)
    private userListContext: Model.Enums.UserPaginatedListComponentContext =
        this.activatedRoute.snapshot.data['userListContext']

    users$: Observable<Model.ServerAPIModel.User.TinkUserResponse[]> = of([])
    usersRemotePagination$ = this.userFacade.userRemotePagination$

    userListContextIsUserList =
        this.userListContext ===
        Model.Enums.UserPaginatedListComponentContext.USER_LIST

    userListContextIsEnduserDetail = this.userListContext === Model.Enums.UserPaginatedListComponentContext.ENDUSER_DETAIL

    sortDirection: SortDirection = 'asc'
    sortKey: keyof Model.ServerAPIModel.User.TinkUserResponse = 'dbCreatedAt'

    columns: ColumnInterface<Model.ServerAPIModel.User.TinkUserResponse>[] = [
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
        {
            displayName: 'Linked Date',
            dataLabel: 'created',
            sortable: true,
            datePipe: { format: 'yyyy/MM/dd HH:mm:ss' },
        },
        
        {
            displayName: 'User Name',
            dataLabel: 'username',
            sortable: true
        },
        {
            displayName: 'National ID',
            dataLabel: 'nationalId',
            sortable: true
        },
        {
            displayName: 'Enduser',
            dataLabel: 'enduserId',
            sortable: true,
            style: { minWidth: 400 },
            hasCustomTemplate: true
        },
        {
            displayName: 'Currency',
            dataLabel: 'profile.currency',
            sortable: true,
            transformEnumPipe: iso4217CurrencyNameEnumPipe
        },
        {
            displayName: 'Market',
            dataLabel: 'profile.market',
            sortable: true,
            transformEnumPipe: zwpISO3166Alpha2LabelEnumPipe
        },
        {
            displayName: 'Flags',
            dataLabel: 'flags',
            sortable: false,
            multi: true
        },
    ]

    filterDefinitions: FilterDefinition[] = [
        { displayName: 'Created At', name: 'dbCreatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Updated At', name: 'dbUpdatedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null },
        { displayName: 'Deleted At', name: 'dbDeletedAt', type: ZWPFilterChipInputType.DATE, enumDefinition: null }
    ]

    async ngOnInit() {
        if (this.userListContextIsUserList) {
            this.users$ = this.userFacade.paginatedFilteredUsers$
        } else if (this.userListContextIsEnduserDetail) {
            this.users$ = this.userFacade.paginatedFilteredUsers$
        }
        this.userFacade.resetUserFilters(
            false
        )
        await this.listUsersForContext()
    }

    ngOnDestroy() {
        this.userFacade.resetPagination()
    }

    async listUsersForContext(
        pagination: Nullable<Partial<PaginatedQueryParams<Model.ServerAPIModel.User.TinkUserResponse>>> = null
    ) {
        if (this.userListContextIsUserList) {
            this.userFacade.listUsers(null, pagination)
        }
        if (this.userListContextIsEnduserDetail) {
            this.userFacade.listUsers(await this.getEnduserIdFromRoute(), pagination)
        }
    }

    onRowClicked(row: Model.ServerAPIModel.User.TinkUserResponse) {
        // event.preventDefault()
        // event.stopPropagation()
        // this.routerFacade.navigate(['merchant-net', 'loyalty-card-schemes', row.id])
    }

    onSortChanged(sort: Sort) {
        this.sortKey = sort.active as keyof Model.ServerAPIModel.User.TinkUserResponse
        this.sortDirection = sort.direction
        this.listUsersForContext({
            order: this.sortDirection === 'asc' ? 'asc' : 'desc',
            orderBy: this.sortKey,
        })
    }

    onFiltersChanged(filterEvent: FilterChipEvent) {
        const filterChange: Partial<Model.Filters.UserFilters> = handleFilterChipEvent(filterEvent)
        this.userFacade.updateUserFilters(filterChange, true)
    }

    onPaginationChanged(pagination: PageEvent) {
        this.listUsersForContext({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
        })
    }

    onInspectorClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.User.TinkUserResponse) {
        event.preventDefault()
        event.stopPropagation()
        // this.panelLayoutFacade.addRightPanel({
        //     id: `${row.id}-loyalty-card-scheme-details`,
        //     label: `Loyalty Card Scheme Details`,
        //     icon: 'payments',
        //     componentName: 'UserDetailRightPanelComponent',
        //     data: {
        //         userId: row.id,
        //     },
        // })
    }

    onNavigationClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.User.TinkUserResponse) {
        event.preventDefault()
        event.stopPropagation()
        // this.routerFacade.navigate(['merchant-net', 'loyalty-card-schemes', row.id])
    }

    onClipboardClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.User.TinkUserResponse) {
        event.preventDefault()
        event.stopPropagation()
        //
    }

    onDeleteClicked(event: MouseEvent | TouchEvent, row: Model.ServerAPIModel.User.TinkUserResponse) {
        event.preventDefault()
        event.stopPropagation()
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete User',
                message: `Are you sure you want to delete the user ${row.username ?? ''}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
            },
            () => { this.userFacade.deleteUser(row.id) },
            // () => { this.userFacade.deleteUser(row.id, true) }
        )
    }

    onDeleteManyClicked(selected: Model.ServerAPIModel.User.TinkUserResponse[]) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Delete Users',
                message: `Are you sure you want to delete ${selected.length} user${
                    selected.length === 1 ? '' : 's'
                }?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Delete',
            },
            () => {
                //
            }
        )
    }

    async getEnduserIdFromRoute(): Promise<Nullable<string>> {
        // const brandId = this.activatedRoute.parent?.parent?.snapshot.params['brandId'] ?? null
        return await this.routerFacade.getNestedRouteParam('enduserId') ?? null
    }
}
