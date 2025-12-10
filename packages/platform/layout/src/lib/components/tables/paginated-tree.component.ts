import { SelectionModel } from '@angular/cdk/collections'
import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop'
import { FlatTreeControl } from '@angular/cdk/tree'
import { CollectionViewer } from '@angular/cdk/collections'
import { DatePipe } from '@angular/common'
import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    Input,
    Output,
    EventEmitter,
    inject,
    ContentChild,
    TemplateRef,
    ContentChildren,
    QueryList,
    OnInit,
    OnDestroy,
} from '@angular/core'
import { PageEvent } from '@angular/material/paginator'
import { MatSort, Sort, SortDirection } from '@angular/material/sort'
import {
    FlexibleKeyOf,
    NestedKeyOf,
    Nullable,
    RemotePaginationState,
    TRANSFORM_ENUM_PIPE,
    TableCellTemplateDirective,
    Undefinable,
    XOR,
    coerceString,
    getNestedValue,
} from '@zwp/platform.common'
import { ColumnInterface, FlattenedTreeInterface, NestedTreeInterface } from '../../model'
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree'
import { Observable, of, Subscription, take } from 'rxjs'

@Component({
    selector: 'zwp-paginated-tree',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxLayoutAlign="start stretch" fxFlexFill>
            <div
                fxLayout="column"
                fxLayoutAlign="start stretch"
                fxFlex="grow"
                zwpCustomScroll [scrollDirection]="'bidirectional'" [scrollbarMode]="'custom'"
            >
                <table
                    mat-table
                    recycleRows
                    [dataSource]="this.dataSource"
                    class="kernel-table"
                    matSort
                    [matSortActive]="this.getSortActive()"
                    [matSortDirection]="this.getSortDirection()"
                    #sort
                    matSortDisableClear
                    (matSortChange)="updateSorting($event)"
                    cdkDropList
                    [cdkDropListSortingDisabled]="true"
                >
                    <ng-container matColumnDef="expand">
                        <th mat-header-cell *matHeaderCellDef [style.width]="'80px'" [style.maxWidth]="'80px'"></th>
                        <td mat-cell *matCellDef="let row" [style.width]="'80px'" [style.maxWidth]="'80px'">
                            <div fxLayout="row" fxLayoutAlign="start center">
                            <zwp-md-icon-button
                                [fxFlexOffset]="row.treeMetadata.level * 15 + 'px'"
                                [icon]="treeControl.isExpanded(row) ? 'expand_more' : 'chevron_right'"
                                [iconPadding]="5"
                                [textStyle]="'subheadline'"
                                [iconColor]="'primary' | zwpColorTheme"
                                [backgroundColor]="'clear' | zwpColorTheme"
                                (btnClick)="toggleTreeNode(row)"
                            ></zwp-md-icon-button>
                            </div>
                        </td>
                    </ng-container>
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
                    <ng-container
                        *ngFor="let column of this.columns; trackBy: identifyColumn"
                        [matColumnDef]="column.dataLabel.toString()"
                    >
                        <ng-container *ngIf="column.sortable">
                            <th
                                mat-header-cell
                                *matHeaderCellDef
                                mat-sort-header
                                zwpTextStyle="body1"
                                zwpFontWeight="600"
                                zwpColor="secondary-label"
                                [style.minWidth]="getColumnMinWidth(column)"
                                [style.width]="getColumnWidth(column)"
                                [style.textWrap]="getCellTextWrapMode(column)"
                                [style.textOverflow]="getCellTextOverflow(column)"
                            >
                                {{ column.displayName }}
                            </th>
                        </ng-container>
                        <ng-container *ngIf="!column.sortable">
                            <th
                                mat-header-cell
                                *matHeaderCellDef
                                zwpTextStyle="body1"
                                zwpFontWeight="600"
                                zwpColor="secondary-label"
                                [style.minWidth]="getColumnMinWidth(column)"
                                [style.width]="getColumnWidth(column)"
                                [style.textWrap]="getCellTextWrapMode(column)"
                                [style.textOverflow]="getCellTextOverflow(column)"
                            >
                                {{ column.displayName }}
                            </th>
                        </ng-container>
                        <ng-container *ngIf="column.hasCustomTemplate">
                            <td
                                mat-cell
                                *matCellDef="let row"
                                [style.minWidth]="getColumnMinWidth(column)"
                                [style.maxWidth]="getColumnMaxWidth(column)"
                                [style.width]="getColumnWidth(column)"
                                (click)="rowClicked.emit(row)"
                            >
                                <ng-container
                                    [ngTemplateOutlet]="getCellTemplate(column)"
                                    [ngTemplateOutletContext]="{ row: row }"
                                />
                            </td>
                        </ng-container>

                        <ng-container *ngIf="!column.hasCustomTemplate">
                            <td
                                mat-cell
                                *matCellDef="let row"
                                zwpTextStyle="body1"
                                zwpColor="label"
                                [zwpFontWeight]="getCellFontWeight(column)"
                                [style.minWidth]="getColumnMinWidth(column)"
                                [style.maxWidth]="getColumnMaxWidth(column)"
                                [style.width]="getColumnWidth(column)"
                                [style.textWrap]="getCellTextWrapMode(column)"
                                [style.textOverflow]="getCellTextOverflow(column)"
                                (click)="rowClicked.emit(row)"
                            >
                                {{ formatCell(row, column) }}
                            </td>
                        </ng-container>
                    </ng-container>
                    <ng-container *ngIf="actionable" matColumnDef="actions" stickyEnd>
                        <th
                            mat-header-cell
                            *matHeaderCellDef
                            [style.borderLeft]="'1px solid ' + ('separator' | zwpColorTheme)"
                        >
                            Actions
                        </th>
                        <td mat-cell *matCellDef="let row">
                            <ng-template
                                [ngTemplateOutlet]="rowActions"
                                [ngTemplateOutletContext]="{ $implicit: row }"
                            ></ng-template>
                        </td>
                    </ng-container>
                    <tr
                        mat-header-row
                        *matHeaderRowDef="getColumnDataLabels(columns); sticky: true"
                        zwpBackgroundColor="system-background"
                        [style.height]="'45px'"
                    ></tr>

                    <ng-container *ngIf="draggable">
                        <tr
                            cdkDrag
                            mat-row
                            *matRowDef="let row; columns: getColumnDataLabels(columns); let i = index"
                            (cdkDragStarted)="handleDragStart($event)"
                            (cdkDragEnded)="handleDragEnd($event)"
                            [zwpBackgroundColor]="i % 2 === 0 ? 'secondary-system-background' : 'system-background'"
                            [style.height]="'45px'"
                            [cdkDragStartDelay]="{ touch: 150, mouse: 0 }"
                        >
                            <ng-template
                                *cdkDragPreview
                                [ngTemplateOutlet]="dragPreview"
                                [ngTemplateOutletContext]="{ dataRow: row }"
                            ></ng-template>
                        </tr>
                    </ng-container>

                    <ng-container *ngIf="!draggable">
                        <tr
                            mat-row
                            *matRowDef="let row; columns: getColumnDataLabels(columns); let i = index"
                            [zwpBackgroundColor]="i % 2 === 0 ? 'secondary-system-background' : 'system-background'"
                            [style.height]="'45px'"
                        ></tr>
                    </ng-container>
                </table>
            </div>
            <zwp-divider></zwp-divider>
            <div fxLayout="row" fxFlex="55px" fxLayoutAlign="end center" fxLayoutGap="10px">
                <span
                    *ngIf="this.selectable"
                    zwpTextStyle="body1"
                    fxFlexAlign="center"
                    fxFlex="noshrink"
                    zwpPadding="0 10"
                    zwpColor="label"
                >
                    Total Selected: {{ selection.selected.length }}
                    {{ selection.selected.length === 1 ? 'record' : 'records' }}
                </span>
                <div
                    *ngIf="selectionActionable"
                    fxLayout="row"
                    fxLayoutAlign="start center"
                    fxLayoutGap="8px"
                    fxFlex="noshrink"
                >
                    <ng-template
                        [ngTemplateOutlet]="selectionActions"
                        [ngTemplateOutletContext]="{ selected: selection.selected }"
                    />
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
                ></mat-paginator>
            </div>
        </div>
    `,
})
export class PaginatedTreeComponent<T extends object, K = string> {
    @ViewChild(MatSort, { static: false }) sort: MatSort = new MatSort()
    @ContentChild('rowActions') rowActions!: TemplateRef<any>
    @ContentChild('selectionActions') selectionActions!: TemplateRef<any>
    @ContentChild('dragPreview') dragPreview!: TemplateRef<any>
    @ContentChildren(TableCellTemplateDirective) cellTemplates: QueryList<TableCellTemplateDirective> = new QueryList()

    treeButtonSize = '20px'
    treeButtonOuterSize = '30px'

    private _data: NestedTreeInterface<T>[] = []
    private _treeControl: FlatTreeControl<FlattenedTreeInterface<NestedTreeInterface<T>>, K> = new FlatTreeControl<FlattenedTreeInterface<NestedTreeInterface<T>>, K>(
        (node) => node.treeMetadata.level,
        (node) => node.treeMetadata.expandable,
        { trackBy: (dataNode: FlattenedTreeInterface<NestedTreeInterface<T>>) => {
            return dataNode.id as K
        } }
    )
    
    private flattener: MatTreeFlattener<NestedTreeInterface<T>, FlattenedTreeInterface<NestedTreeInterface<T>>, K> = new MatTreeFlattener(
        (node: NestedTreeInterface<T>, level: number) => {
            return {
                ...node,
                treeMetadata: {
                    expandable: true,
                    level
                }
            } as FlattenedTreeInterface<NestedTreeInterface<T>>
        },
        node => node.treeMetadata.level,
        node => node.treeMetadata.expandable,
        node => node.children
    )

    private _dataSource: MatTreeFlatDataSource<NestedTreeInterface<T>, FlattenedTreeInterface<NestedTreeInterface<T>>> = new MatTreeFlatDataSource(
        this.treeControl,
        this.flattener
    )
    private _columnDataLabels: string[] = []
    private _columns: ColumnInterface<T>[] = []
    private _pagination: Nullable<RemotePaginationState<T>> = null

    datePipe = inject(DatePipe)
    transformEnumPipe = inject(TRANSFORM_ENUM_PIPE)
    selection = new SelectionModel<T>(true, [])

    @Input() set columns(value: ColumnInterface<T>[]) {
        this._columns = value
    }
    get columns(): ColumnInterface<T>[] {
        return this._columns
    }

    @Input() set data(value: NestedTreeInterface<T>[]) {
        this.initializeData(value ? [...value] : [])
    }
    get dataSource(): MatTreeFlatDataSource<NestedTreeInterface<T>, FlattenedTreeInterface<NestedTreeInterface<T>>> {
        return this._dataSource
    }
    get treeControl(): FlatTreeControl<FlattenedTreeInterface<NestedTreeInterface<T>>, K> {
        return this._treeControl
    }

    @Input() set sortDirection(value: Undefinable<SortDirection>) {
        if (value && value !== this.sort.direction) {
            this.sort.direction = value
        }
    }
    @Input() set sortKey(value: Undefinable<keyof T | NestedKeyOf<T> | Nullable<string>>) {
        if (value && value !== this.sort.active) {
            this.sort.active = value as string
        }
    }

    @Input() draggable = false
    @Input() selectable = false
    @Input() selectionActionable = false
    @Input() actionable = false

    @Input() set pagination(value: Nullable<RemotePaginationState<T>>) {
        this._pagination = value
        const orderBy = value?.orderBy
        const order = value?.order
        if (orderBy && orderBy !== this.sort.active) {
            this.sort.active = coerceString(orderBy)
        }
        if (order && order !== this.sort.direction) {
            this.sort.direction = order
        }
    }
    get pagination(): Nullable<RemotePaginationState<T>> {
        return this._pagination
    }

    @Output() rowClicked = new EventEmitter<T>()
    @Output() getNestedChildren = new EventEmitter<FlattenedTreeInterface<T>>()
    @Output() sortChanged = new EventEmitter<Sort>()
    @Output() paginationChanged = new EventEmitter<PageEvent>()

    

    getSortActive(): string {
        return this.sort.active
    }
    getSortDirection(): SortDirection {
        return this.sort.direction
    }

    @Input() selectableBy: (row: T) => string = (_row: T) => ''
    @Input() parentSelectableBy: (row: T) => string = (_row: T) => ''

    updateSorting(sortChange: Sort) {
        this.sortChanged.emit(sortChange)
    }
    updatePagination(pageChange: PageEvent) {
        this.paginationChanged.emit(pageChange)
    }

    toggleTreeNode(node: FlattenedTreeInterface<NestedTreeInterface<T>>) {
        this.treeControl.toggle(node)
        if (this.treeControl.isExpanded(node)) {
            this.getNestedChildren.emit(node)
        } else {
            this.treeControl.collapseDescendants(node)
        }
    }

    indexEven = (index: number) => index % 2 === 0
    indexOdd = (index: number) => index % 2 !== 0

    getDataLabelString = (column: ColumnInterface<T>) => column.dataLabel.toString()
    getColumnDataLabels = (columns: ColumnInterface<T>[]) => {
        const dataLabels: string[] = []
        dataLabels.push('expand')
        if (this.selectable) {
            dataLabels.push('select')
        }

        columns.forEach((column) => dataLabels.push(this.getDataLabelString(column)))
        if (this.actionable) {
            dataLabels.push('actions')
        }
        return dataLabels
    }

    formatCell = (row: T, column: ColumnInterface<T>) => {
        const rawValue = getNestedValue(row, column.dataLabel) as unknown
        if (column.datePipe) {
            return this.datePipe.transform(
                rawValue as string | number | Date,
                column.datePipe.format,
                column.datePipe.timezone,
                column.datePipe.timezone
            )
        }
        if (column.transformEnumPipe) {
            return this.transformEnumPipe.transform(rawValue as string, column.transformEnumPipe)
        }
        if (column.currencyPipe) {
            return `${column.currencyPipe.prefix}${(rawValue as number) / column.currencyPipe.unit}`
        } else {
            return rawValue
        }
    }

    getColumnMinWidth(column: ColumnInterface<T>) {
        return column.style?.minWidth ? `${column.style?.minWidth}px` : 'initial'
    }
    getColumnMaxWidth(column: ColumnInterface<T>) {
        return column.style?.maxWidth ? `${column.style?.maxWidth}px` : 'initial'
    }
    getColumnWidth(column: ColumnInterface<T>) {
        return column.style?.width ? `${column.style?.width}px` : 'initial'
    }
    getCellTextOverflow(column: ColumnInterface<T>) {
        return column.style?.textOverflow ?? 'initial'
    }
    getCellTextWrapMode(column: ColumnInterface<T>) {
        return column.style?.textWrapMode ?? 'nowrap'
    }
    getCellFontWeight(column: ColumnInterface<T>) {
        return column.style?.fontWeight
    }
    makeTemplateClassName = (column: ColumnInterface<T>) => `[${column.dataLabel.toString()}]`

    getCellTemplate(column: ColumnInterface<T>): Nullable<TemplateRef<any>> {
        const template = this.cellTemplates.find((t) => t.zwpTableCellTemplate === column.dataLabel.toString())
        return template ? template.templateRef : null
    }

    toggleAllSelected() {
        if (this.allSelected()) {
            this.selection.clear()
        } else {
            this.selection.select(...this.dataSource.data)
        }
    }

    allSelected() {
        const numSelected = this.selection.selected.length
        const numRows = this.dataSource.data.length
        return numSelected === numRows && numRows !== 0
    }

    handleDragStart(event: CdkDragStart) {
        event.event.preventDefault()
        event.event.stopPropagation()
    }

    handleDragEnd(event: CdkDragEnd) {
        event.event.preventDefault()
        event.event.stopPropagation()
    }

    identifyColumn(_index: number, column: ColumnInterface<T>) {
        return column.displayName
    }

    private initializeData(records: NestedTreeInterface<T>[]): void {
        this._data = records
        this._dataSource.data = records
        this.selection.clear()
    }
}

// export type NestedChildrenAccessor<T> = (dataNode: T) => Observable<T[]>
