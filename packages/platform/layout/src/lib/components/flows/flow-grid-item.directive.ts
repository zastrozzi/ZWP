import { Directive, ElementRef, inject, Input, TemplateRef } from '@angular/core'

export interface FlowGridItemLayout {
    cols?: number
    rows?: number
}

@Directive({ 
    selector: '[zwpFlowGridItem]'
})
export class FlowGridItemDirective {
    @Input() set zwpFlowGridItem(layout: FlowGridItemLayout) {
        this.gridItemCols = layout?.cols || 1
        this.gridItemRows = layout?.rows || 1
    }

    public template = inject(TemplateRef<unknown>)
    public gridItemCols = 1
    public gridItemRows = 1
}
