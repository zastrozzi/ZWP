import { Directive, OnInit, OnDestroy, Input, ElementRef } from "@angular/core"
import { ZWPScrollingService } from "../services"
import { ScrollHostDirective } from "./scroll-host.directive"

@Directive({
    selector: '[zwpScrollDestination]'
})
export class ScrollDestinationDirective implements OnInit, OnDestroy {
    @Input() zwpScrollDestination = ''

    constructor(public el: ElementRef, private scrollingService: ZWPScrollingService, private host: ScrollHostDirective) {}

    ngOnInit(): void {
        this.scrollingService.registerScrollDestination(this.el, this.zwpScrollDestination, this.host.zwpScrollHost)
    }

    ngOnDestroy(): void {
        this.scrollingService.deregisterScrollDestination(this.zwpScrollDestination)
    }
}