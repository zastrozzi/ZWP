import { Directive, OnInit, OnDestroy, Input, ElementRef, TemplateRef } from "@angular/core"
import { ZWPScrollingService } from "../services"
import { ScrollHostDirective } from "./scroll-host.directive"

@Directive({
    selector: '[zwpTableCellTemplate]'
})
export class TableCellTemplateDirective {
    @Input() zwpTableCellTemplate = ''

    constructor(public el: ElementRef, public templateRef: TemplateRef<unknown>) {}
}