import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    NgZone,
    OnDestroy,
    QueryList,
    ViewChild,
    inject,
} from '@angular/core'
import { BehaviorSubject, map, Subscription } from 'rxjs'
import { FlowGridItemDirective } from './flow-grid-item.directive'

@Component({
    selector: 'zwp-flow-grid',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            #flowGrid
            fxFlex="column"
            zwpVScroll
            *ngIf="{ gridWidth: (gridWidth$ | async) ?? 0, gridColumns: gridColumns$ | async } as gridData"
        >
            <mat-grid-list
                [cols]="gridData.gridColumns"
                [rowHeight]="tileHeight + 'px'"
                [gutterSize]="gutterSize + 'px'"
                [style.width]="gridData.gridWidth + 'px'"
            >
                <ng-container *ngFor="let item of flowItems">
                    <mat-grid-tile
                        [colspan]="calcCol(item.gridItemCols, gridData.gridColumns)"
                        [rowspan]="calcRow(item.gridItemRows)"
                    >
                        <ng-template [ngTemplateOutlet]="item.template"></ng-template>
                    </mat-grid-tile>
                </ng-container>
            </mat-grid-list>
        </div>
    `,
    styles: [`
        :host {
  display: block;
}
        `]
})
export class FlowGridComponent implements AfterViewInit, OnDestroy {
    @ViewChild('flowGrid', { static: false }) flowGrid!: ElementRef
    @ContentChildren(FlowGridItemDirective, { descendants: true })
    flowItems: QueryList<FlowGridItemDirective> = new QueryList()

    @Input() tileWidth = 115
    @Input() tileHeight = 110
    @Input() gutterSize = 10

    private readonly subscriptions = new Subscription()

    gridWidthObserver: ResizeObserver | undefined
    gridWidth$ = new BehaviorSubject<number>(0)
    gridColumns$ = this.gridWidth$.pipe(map((w) => Math.max(1, Math.floor((w - 20) / this.tileWidth))))

    private zone = inject(NgZone)

    ngAfterViewInit(): void {
        this.gridWidthObserver = new ResizeObserver((entries) => {
            this.zone.run(() => {
                this.gridWidth$.next(entries[0].contentRect.width)
            })
        })

        this.gridWidthObserver.observe(this.flowGrid.nativeElement)
    }

    calcCol(itemCols: number | undefined | null, availableCols: number | undefined | null): number {
        const want = Math.max(1, itemCols ?? 1)
        const avail = Math.max(1, availableCols ?? 1)
        return Math.min(want, avail)
    }

    calcRow(itemRows: number | undefined | null): number {
        return Math.max(1, itemRows ?? 1)
    }

    ngOnDestroy(): void {
        try {
            this.gridWidthObserver?.unobserve(this.flowGrid?.nativeElement)
        } catch (e) {
            console.error('gridwidth observer', e)
        }
        this.subscriptions.unsubscribe()
    }
}
