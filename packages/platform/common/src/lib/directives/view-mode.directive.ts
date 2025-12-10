import { Directive, TemplateRef } from '@angular/core'

@Directive({
    selector: '[zwpViewMode]',
})
export class ViewModeDirective {
    constructor(public tpl: TemplateRef<any>) {}
}
