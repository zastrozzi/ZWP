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
        <div #flowGrid *ngIf="{ gridWidth: (gridWidth$ | async) ?? 0, gridColumns: gridColumns$ | async } as gridData" zwpVScroll>
            <mat-grid-list
                [cols]="gridData.gridColumns"
                [rowHeight]="tileHeight + 'px'"
                [gutterSize]="gutterSize + 'px'"
                [style.width]="(gridData.gridWidth) + 'px'"
            >
                <mat-grid-tile [colspan]="1" [rowspan]="1" *ngFor="let item of flowItems">
                    <ng-container *ngTemplateOutlet="item.template" ></ng-container>
                </mat-grid-tile>
            </mat-grid-list>
        </div>
    `
})
export class FlowGridComponent implements AfterViewInit, OnDestroy {
    @ViewChild('flowGrid', { static: false }) flowGrid!: ElementRef
    @ContentChildren(FlowGridItemDirective, { descendants: true }) flowItems!: QueryList<FlowGridItemDirective>

    @Input() tileWidth = 115
    @Input() tileHeight = 110
    @Input() gutterSize = 10

    private readonly subscriptions = new Subscription()

    gridWidthObserver: ResizeObserver | undefined
    gridWidth$ = new BehaviorSubject<number>(0)
    gridColumns$ = this.gridWidth$.pipe(
        map((w) => Math.max(1, Math.floor((w - 20) / this.tileWidth)))
    )

    private zone = inject(NgZone)

    ngAfterViewInit(): void {
        this.gridWidthObserver = new ResizeObserver((entries) => {
            this.zone.run(() => {
                this.gridWidth$.next(entries[0].contentRect.width)
            })
        })

        if (this.flowGrid?.nativeElement) {
            this.gridWidthObserver.observe(this.flowGrid.nativeElement)
        }
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