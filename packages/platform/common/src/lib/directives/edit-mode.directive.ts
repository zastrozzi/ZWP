import { Directive, TemplateRef } from '@angular/core'

@Directive({
    selector: '[zwpEditMode]',
})
export class EditModeDirective {
    constructor(public tpl: TemplateRef<any>) {}
}