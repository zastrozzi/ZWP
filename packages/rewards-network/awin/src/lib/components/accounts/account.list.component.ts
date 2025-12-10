import { Component, OnInit, ChangeDetectionStrategy, inject, OnDestroy } from "@angular/core";
import { State } from "../../+state";
import { CDPUsers } from '@zwp/cdp.users'
import { ColumnInterface, ZWPWindowLayoutFacade } from "@zwp/platform.layout";
import { Model } from "../../model";
import { DateQueryFilter, EnumQueryFilter, FilterChip, FilterChipEvent, FilterDefinition, handleFilterChipEvent, ZWPFilterChipInputType, ZWPRouterFacade, Nullable, NumberQueryFilter, PaginatedQueryParams, StringQueryFilter, TransformEnumPipeSignature } from '@zwp/platform.common' 
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'
import { ActivatedRoute } from "@angular/router";
// import { ComponentRouteContext } from '../../model/enums'

@Component({
    selector: 'urnet-awin-account-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxFlexFill>
        <div fxLayout="row" fxLayoutAlign="start stretch" zwpPadding="5" fxLayouyGap="5px">
            <zwp-filter-chip-input fxFlex="grow" [filterDefinitions]="filterDefinitions" (filterChange)="onFiltersChanged($event)"></zwp-filter-chip-input>
            <zwp-md-button 
                label="Create Brand" icon="pages" 
                textStyle="button1" [iconTextStyle]="'subheadline'"
                [labelColor]="'system-white' | zwpColorTheme"
                [backgroundColor]="'system-green' | zwpColorTheme"
                (btnClick)="newBrand()"
            ></zwp-md-button>
        </div>
        <zwp-divider></zwp-divider>
        <zwp-paginated-table fxFlex="1 1 calc(100% - 55px)"
            [columns]="columns" [data]="(brands$ | async) || []" [selectable]="true"
            [pagination]="brandsRemotePagination$ | async"
            (sortChanged)="onSortChanged($event)"
            (paginationChanged)="onPaginationChanged($event)"
            (rowClicked)="onRowClicked($event)"
            [draggable]="true"
        >
            <ng-template zwpTableCellTemplate="status" let-row="row">
                <div fxLayout="row" fxLayoutAlign="start center">
                    <span 
                        zwpCorners="5" zwpPadding="5 10" zwpTextStyle="body1" zwpColor="system-white"
                        [zwpBackgroundColor]="row.status | zwpTransformEnum: statusColorEnumSignature" 
                    >{{ row.status | zwpTransformEnum: statusLabelEnumSignature }}
                    </span>
                </div>
            </ng-template>
        
            <ng-template #dragPreview let-dataRow="dataRow">
                <div 
                    fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px" 
                    zwpCorners="5" zwpBackgroundColor="primary" zwpPadding="10 15 10 10"
                    class="mat-elevation-z4"
                >
                    <mat-icon zwpColor="system-white">pages</mat-icon>
                    <div fxLayout="column" fxLayoutAlign="start stretch">
                        <span zwpTextStyle="caption1" zwpFontWeight="500" zwpColor="system-white">Brand</span>
                        <span zwpTextStyle="body1" zwpColor="system-white">{{ dataRow.brandName }}</span>
                    </div>
                </div>
            </ng-template>
        </zwp-paginated-table>
    </div>
    `
})
export class AccountListComponent implements OnInit, OnDestroy {
    private accountFacade = inject(State.Facades.AWinAccountFacade)
}
