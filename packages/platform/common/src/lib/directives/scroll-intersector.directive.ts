import { Directive, OnInit, OnDestroy, Input, ElementRef } from "@angular/core";
import { ZWPScrollingService } from "../services";
import { ScrollIntersectableDirective } from "./scroll-intersectable.directive";

@Directive({
    selector: '[zwpScrollIntersector]'
})
export class ScrollIntersectorDirective implements OnInit, OnDestroy {
    @Input() zwpScrollIntersector = ''
    @Input() zwpScrollIntersectorIntersectable = ''

    constructor(public el: ElementRef, private scrollingService: ZWPScrollingService) {}

    ngOnInit(): void {
        this.scrollingService.registerScrollIntersector(this.el, this.zwpScrollIntersector, this.zwpScrollIntersectorIntersectable)
    }

    ngOnDestroy(): void {
        this.scrollingService.deregisterScrollIntersector(this.zwpScrollIntersector)
    }
}