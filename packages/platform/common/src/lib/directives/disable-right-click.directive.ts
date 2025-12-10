import { Directive, HostListener } from '@angular/core'

@Directive({
    selector: '[zwpDisableRightClick]'
})
export class DisableRightClickDirective {
    @HostListener('contextmenu', ['$event'])
    onRightClick(event: any) {
        event.preventDefault()
    }
}
