import { Directive, TemplateRef } from '@angular/core'

@Directive({ selector: '[zwpFlowGridItem]' })
export class FlowGridItemDirective {
    constructor(public template: TemplateRef<any>) {}
}
