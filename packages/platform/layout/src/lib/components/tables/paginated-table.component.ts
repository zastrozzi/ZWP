import { SelectionModel } from '@angular/cdk/collections'
import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop'
import { DatePipe } from '@angular/common'
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter, inject, ContentChild, TemplateRef, ContentChildren, QueryList, AfterContentInit } from '@angular/core'
import { MatPaginator, PageEvent } from '@angular/material/paginator'
import { MatSort, Sort, SortDirection } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { NestedKeyOf, Nilable, Nullable, PaginatedQueryParams, RemotePaginationState, TRANSFORM_ENUM_ARRAY_PIPE, TRANSFORM_ENUM_PIPE, TableCellTemplateDirective, TransformEnumPipeSignature, Undefinable, coerceString, getNestedValue, isNil } from '@zwp/platform.common'
import { ColumnInterface } from '../../model'

@Component({
    selector: 'zwp-paginated-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div fxLayout="column" fxLayoutAlign="start stretch" fxFlexFill>
        <div fxLayout="column" fxLayoutAlign="start stretch" fxFlex="grow" zwpCustomScroll [scrollDirection]="'bidirectional'" [scrollbarMode]="'custom'">
            <table
                mat-table recycleRows
                [dataSource]="this.dataSource"
                class="zwp-table"
                matSort
                [matSortActive]="this.getSortActive()"
                [matSortDirection]="this.getSortDirection()"
                #sort
                matSortDisableClear
                (matSortChange)="updateSorting($event)"
                cdkDropList [cdkDropListSortingDisabled]="true"
            >
                <ng-container *ngIf="selectable" matColumnDef="select">
                    <th mat-header-cell *matHeaderCellDef [style.width]="'30px'">
                        <mat-checkbox class="checkboxInheritColor" [zwpBorderColor]="'secondary-label'"
                            (change)="$event ? toggleAllSelected() : null"
                            [checked]="selection.hasValue() && allSelected()"
                            [indeterminate]="selection.hasValue() && !allSelected()"
                        />
                    </th>
                    <td mat-cell *matCellDef="let row" [style.width]="'30px'">
                        <mat-checkbox class="checkboxInheritColor" [zwpBorderColor]="'secondary-label'"
                            (click)="$event.stopPropagation()"
                            (change)="$event ? selection.toggle(row) : null"
                            [checked]="selection.isSelected(row)"
                        />
                    </td>
                </ng-container>
                <ng-container *ngFor="let column of this.columns; trackBy: identifyColumn" [matColumnDef]="column.dataLabel.toString()">
                    <ng-container *ngIf="column.sortable">
                        <th 
                            mat-header-cell *matHeaderCellDef mat-sort-header 
                            zwpTextStyle="body1" zwpFontWeight="600" zwpColor="secondary-label" 
                            [style.minWidth]="getColumnMinWidth(column)"
                            [style.width]="getColumnWidth(column)"
                            [style.textWrap]="getCellTextWrapMode(column)"
                            [style.textOverflow]="getCellTextOverflow(column)"
                        >{{ column.displayName }}</th>
                    </ng-container>
                    <ng-container *ngIf="!column.sortable">
                        <th 
                            mat-header-cell *matHeaderCellDef 
                            zwpTextStyle="body1" zwpFontWeight="600" zwpColor="secondary-label" 
                            [style.minWidth]="getColumnMinWidth(column)"
                            [style.width]="getColumnWidth(column)"
                            [style.textWrap]="getCellTextWrapMode(column)"
                            [style.textOverflow]="getCellTextOverflow(column)"
                        >{{ column.displayName }}</th>
                    </ng-container>
                    <ng-container *ngIf="column.hasCustomTemplate">
                    <td 
                        mat-cell *matCellDef="let row;"
                        [style.minWidth]="getColumnMinWidth(column)" 
                        [style.maxWidth]="getColumnMaxWidth(column)"
                        [style.width]="getColumnWidth(column)"
                    >
                        <ng-container [ngTemplateOutlet]="getCellTemplate(column)" [ngTemplateOutletContext]="{row:row}"/>
                    </td>
                    </ng-container>
                    
                    <ng-container *ngIf="!column.hasCustomTemplate">
                        <td 
                            mat-cell *matCellDef="let row;" zwpTextStyle="body1" zwpColor="label" [zwpFontWeight]="getCellFontWeight(column)"
                            [style.minWidth]="getColumnMinWidth(column)" 
                            [style.maxWidth]="getColumnMaxWidth(column)"
                            [style.width]="getColumnWidth(column)"
                            [style.textWrap]="getCellTextWrapMode(column)"
                            [style.textOverflow]="getCellTextOverflow(column)"
                            [class.zwp-table-cell-copyable]="column.copyable"
                            (click)="onCellClicked($event, row, column)"
                        >{{ formatCell(row, column) }}</td>
                    </ng-container>
                    
                </ng-container>
                <ng-container *ngIf="actionable" matColumnDef="actions" stickyEnd>
                    <th 
                        mat-header-cell *matHeaderCellDef [style.borderLeft]="'1px solid ' + ('separator' | zwpColorTheme)"
                        zwpTextStyle="body1" zwpFontWeight="600" zwpColor="secondary-label" 
                    >Actions</th>
                    <td mat-cell *matCellDef="let row">
                        <ng-template [ngTemplateOutlet]="rowActions" [ngTemplateOutletContext]="{$implicit: row}"></ng-template>
                    </td>
                </ng-container>
                <tr 
                    mat-header-row *matHeaderRowDef="getColumnDataLabels(columns); sticky: true" 
                    zwpBackgroundColor="system-background" 
                    [style.height]="'45px'"
                ></tr>
                               
                <ng-container *ngIf="draggable">
                    <tr 
                        cdkDrag mat-row *matRowDef="let row; columns: getColumnDataLabels(columns); let i = index" (cdkDragStarted)="handleDragStart($event)" (cdkDragEnded)="handleDragEnd($event)"
                        [zwpBackgroundColor]="i % 2 === 0 ? 'secondary-system-background' : 'system-background'"
                        [style.height]="'45px'"
                        [cdkDragStartDelay]="{touch: 150, mouse: 0}"
                        (click)="onRowClicked($event, row)"
                    >
                        <ng-template *cdkDragPreview [ngTemplateOutlet]="dragPreview" [ngTemplateOutletContext]="{dataRow: row}"></ng-template>
                    </tr>
                </ng-container>
               
                <ng-container *ngIf="!draggable">
                    <tr 
                        mat-row *matRowDef="let row; columns: getColumnDataLabels(columns); let i = index" 
                        [zwpBackgroundColor]="i % 2 === 0 ? 'secondary-system-background' : 'system-background'"
                        [style.height]="'45px'"    
                        (click)="onRowClicked($event, row)"
                    >
                    </tr>
                </ng-container>
                
            </table>
            
        </div>
        <zwp-divider></zwp-divider>
        <div fxLayout="row" fxFlex="55px" fxLayoutAlign="end center" fxLayoutGap="10px">
            <span *ngIf="this.selectable" zwpTextStyle="body1" fxFlexAlign="center" fxFlex="noshrink" zwpPadding="0 10" zwpColor="label">
                Total Selected: {{ selection.selected.length }} {{selection.selected.length === 1 ? 'record' : 'records'}}
            </span>
            <div *ngIf="selectionActionable" fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px" fxFlex="noshrink">
                <ng-template [ngTemplateOutlet]="selectionActions" [ngTemplateOutletContext]="{selected: selection.selected}"/>
            </div>
            <div fxFlex="grow"></div>
            <mat-paginator
                class="paginatorInheritColor"
                fxFlex="noshrink"
                [length]="pagination?.total ?? 0" 
                [pageSize]="pagination?.limit ?? 0" 
                (page)="updatePagination($event)"
                [pageSizeOptions]="[10, 30, 50]"
                zwpBackgroundColor="system-background"
                zwpColor="label"
                [style.borderColor]="'separator' | zwpColorTheme"
                showFirstLastButtons
            ></mat-paginator>
        </div>
    </div>
    `,
    styles: [
        `
        .mdc-data-table__cell.zwp-table-cell-copyable {
            cursor: copy;
        }
        `
    ]
})
export class PaginatedTableComponent<T extends object> {
    @ViewChild(MatSort, { static: false }) sort: MatSort = new MatSort()
    @ContentChild('rowActions') rowActions!: TemplateRef<any>
    @ContentChild('selectionActions') selectionActions!: TemplateRef<any>
    @ContentChild('dragPreview') dragPreview!: TemplateRef<any>
    @ContentChildren(TableCellTemplateDirective) cellTemplates: QueryList<TableCellTemplateDirective> = new QueryList()

    private _data: T[] = []
    private _dataSource: MatTableDataSource<T> = new MatTableDataSource()
    private _columnDataLabels: string[] = []
    private _columns: ColumnInterface<T>[] = []
    private _pagination: Nullable<RemotePaginationState<T>> = null
    datePipe = inject(DatePipe)
    transformEnumPipe = inject(TRANSFORM_ENUM_PIPE)
    transformEnumArrayPipe = inject(TRANSFORM_ENUM_ARRAY_PIPE)
    selection = new SelectionModel<T>(true, [])

    @Input() set columns(value: ColumnInterface<T>[]) { this._columns = value }
    get columns(): ColumnInterface<T>[] { return this._columns }
    
    @Input() set data(value: T[]) { this.initializeData(value ? [...value] : []) }
    get dataSource(): MatTableDataSource<T> { return this._dataSource }

    @Input() set sortDirection(value: Undefinable<SortDirection>) { 
        if (value && value !== this.sort.direction) { this.sort.direction = value }
    }
    @Input() set sortKey(value: Undefinable<keyof T | NestedKeyOf<T> | Nullable<string>>) { 
        if (value && value !== this.sort.active) { this.sort.active = value as string }
    }

    @Input() draggable = false
   
    


    @Input() selectable = false
    @Input() selectionActionable = false
    @Input() actionable = false
    

    @Input() set pagination(value: Nullable<RemotePaginationState<T>>) {
        this._pagination = value
        const orderBy = value?.orderBy
        const order = value?.order
        if (orderBy && orderBy !== this.sort.active) { this.sort.active = coerceString(orderBy) }
        if (order && order !== this.sort.direction) { this.sort.direction = order }
    } get pagination(): Nullable<RemotePaginationState<T>> { return this._pagination }

    @Output() rowClicked = new EventEmitter<T>()
    @Output() sortChanged = new EventEmitter<Sort>()
    @Output() paginationChanged = new EventEmitter<PageEvent>()
    @Output() cellCopyClicked = new EventEmitter<{ row: T; column: ColumnInterface<T>; value: unknown }>()

    getSortActive(): string { return this.sort.active }
    getSortDirection(): SortDirection { return this.sort.direction }

    @Input() selectableBy: (row: T) => string = (row: T) => ''

    updateSorting(sortChange: Sort) { this.sortChanged.emit(sortChange) }
    updatePagination(pageChange: PageEvent) { this.paginationChanged.emit(pageChange) }

    // indexEven = (index: number) => index % 2 === 0
    // indexOdd = (index: number) => index % 2 !== 0

    getDataLabelString = (column: ColumnInterface<T>) => column.dataLabel.toString()
    getColumnDataLabels = (columns: ColumnInterface<T>[]) => {
        const dataLabels: string[] = []
        if (this.selectable) { dataLabels.push('select') }
        
        columns.forEach(column => dataLabels.push(this.getDataLabelString(column)))
        if (this.actionable) { dataLabels.push('actions') }
        return dataLabels
    }

    formatCell = (row: T, column: ColumnInterface<T>) => { 
        const rawValue = getNestedValue(row, column.dataLabel) as Nilable<unknown>
        if (isNil(rawValue)) { return undefined }
        if (column.datePipe) { return this.datePipe.transform(rawValue as string | number | Date, column.datePipe.format, column.datePipe.timezone, column.datePipe.timezone) }
        if (column.transformEnumPipe && (column.multi === true)) { return this.transformEnumArrayPipe.transform(rawValue as string[], column.transformEnumPipe, 'concatenated') }
        if (column.transformEnumPipe) { return this.transformEnumPipe.transform(rawValue as string, column.transformEnumPipe) }
        if (column.currencyPipe) { return `${column.currencyPipe.prefix}${(rawValue as number) / column.currencyPipe.unit  }` }
        else { return rawValue }
    }

    getColumnMinWidth(column: ColumnInterface<T>) { return column.style?.minWidth ? `${column.style?.minWidth}px` : 'initial' }
    getColumnMaxWidth(column: ColumnInterface<T>) { return column.style?.maxWidth ? `${column.style?.maxWidth}px` : 'initial' }
    getColumnWidth(column: ColumnInterface<T>) { return column.style?.width ? `${column.style?.width}px` : 'initial' }
    getCellTextOverflow(column: ColumnInterface<T>) { return column.style?.textOverflow ?? 'initial' }
    getCellTextWrapMode(column: ColumnInterface<T>) { return column.style?.textWrapMode ?? 'nowrap' }
    getCellFontWeight(column: ColumnInterface<T>) { return column.style?.fontWeight }
    makeTemplateClassName = (column: ColumnInterface<T>) => `[${column.dataLabel.toString()}]`

    getCellTemplate(column: ColumnInterface<T>): Nullable<TemplateRef<any>> {
        const template = this.cellTemplates.find(t => t.zwpTableCellTemplate === column.dataLabel.toString())
        return template ? template.templateRef : null
    }

    onRowClicked(event: MouseEvent, row: T) {
        event.preventDefault()
        event.stopPropagation()
        this.rowClicked.emit(row)
    }

    onCellClicked(event: MouseEvent, row: T, column: ColumnInterface<T>) {
        if (column.copyable) {
            event.stopPropagation()
            const value = this.formatCell(row, column)
            this.cellCopyClicked.emit({ row, column, value })
        }
    }

    toggleAllSelected() {
        if (this.allSelected()) { this.selection.clear() }
        else { this.selection.select(...this.dataSource.data) }
    }

    allSelected() {
        const numSelected = this.selection.selected.length
        const numRows = this.dataSource.data.length
        return numSelected === numRows && numRows !== 0
    }

    handleDragStart(event: CdkDragStart) {
        // console.log('drag start', event)
        event.event.preventDefault()
        event.event.stopPropagation()
    }

    handleDragEnd(event: CdkDragEnd) {
        // console.log('drag start', event)
        event.event.preventDefault()
        event.event.stopPropagation()
    }

    identifyColumn(index: number, column: ColumnInterface<T>) {
        return column.displayName
    }

    private initializeData(records: T[]): void {
        this._data = records
        this._dataSource.data = records
        this.selection.clear()
    }
}

