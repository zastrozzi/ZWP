import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
    selector: 'zwp-flow-grid-item',
    template: `
        <div *zwpFlowGridItem="{cols: gridItemCols, rows: gridItemRows}"><ng-content></ng-content></div>
    `
})
export class FlowGridItemComponent {
    @Input() gridItemCols = 1
    @Input() gridItemRows = 1
}