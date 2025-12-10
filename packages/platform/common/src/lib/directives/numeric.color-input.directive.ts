import { Directive, HostListener } from '@angular/core'
import { NUMERIC_REGEX } from '../utils'

@Directive({
    selector: '[zwpNumericColorInput]',
})
export class NumericColorInputDirective {

    @HostListener('input', ['$event'])
    onInput($event: any) {
        this._formatInput($event.target)
    }

    private _formatInput(input: any) {
        let val = Number(input.value.replace(NUMERIC_REGEX, ''))
        val = isNaN(val) ? 0 : val
        input.value = val
    }
}
