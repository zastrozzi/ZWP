import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core'
import { ColumnInterface, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { FilterChipEvent, FilterDefinition, ZWPFilterChipInputType, ZWPRouterFacade, handleFilterChipEvent } from '@zwp/platform.common'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'
import { PlatformDummyData } from '@zwp/platform.dummy-data'

@Component({
    selector: 'zwp-tables-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div
            fxFlexFill
            zwpBackgroundColor="system-background"
            fxLayout="column"
            fxLayoutAlign="center center"
            fxLayoutGap="10px"
        >
            <span zwpTextStyle="title1" zwpColor="label">ZWP Demo</span>
            <span zwpTextStyle="title2" zwpColor="label">Tables Page</span>
        </div>
    `
})
export class TablesPageComponent {
    
}