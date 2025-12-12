import { ChangeDetectionStrategy, Component, inject, Input, ViewEncapsulation } from '@angular/core'
import { KeyboardKey, ZWPKeyboardFacade } from '@zwp/platform.common'

@Component({
    selector: 'zwp-keyboard-key',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <span
            *ngIf="{ isActive: keyCodeIsActive$(keyboardKey.keyCode) | async } as keyCode"
            fxFlex="noshrink"
            fxLayoutAlign="center center"
            [zwpTextStyle]="'body3'"
            [style.height]="keyboardKey.height+'px'"
            [style.width]="keyboardKey.width+'px'"
            [style.color]="(keyCode.isActive === true ? 'system-white' : 'primary') | zwpColorTheme"
            [style.backgroundColor]="(keyCode.isActive === true ? 'primary' : 'system-fill') | zwpColorTheme"
            zwpCorners="5"
            zwpPadding="5"
            >{{ keyboardKey.label }}</span
        >
    `,
})
export class KeyboardKeyComponent {
    private keyboardFacade = inject(ZWPKeyboardFacade)

    @Input() keyboardKey!: KeyboardKey

    keyCodeIsActive$ = this.keyboardFacade.keyCodeIsActive$
}
