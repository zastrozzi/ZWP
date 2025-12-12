import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core'
import { ZWPKeyboardFacade } from '@zwp/platform.common'
import { A, D, E, EIGHT, F, FIVE, FOUR, G, H, I, J, K, L, NINE, O, ONE, P, Q, R, S, SEMICOLON, SEVEN, SIX, T, THREE, TWO, U, W, Y, ZERO, FF_MINUS, FF_EQUALS, OPEN_SQUARE_BRACKET, CLOSE_SQUARE_BRACKET, APOSTROPHE, BACKSLASH, TILDE, Z, X, C, V, B, N, M, COMMA, PERIOD, SLASH, SINGLE_QUOTE } from '@angular/cdk/keycodes'

export interface KeyboardKey {
    keyCode: number,
    label: string
}

@Component({
    selector: 'zwp-keyboard-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <div
            fxLayout="column"
            fxLayoutAlign="start stretch"
            fxFlexFill
            [style.backgroundColor]="'system-background' | zwpColorTheme"
        >
            <div fxLayout="row" fxFlex="grow">
                <div fxLayout="column" fxFlex="grow" fxLayoutAlign="center center" fxLayoutGap="10px">
                    <div fxLayout="row" fxLayoutGap="10px">
                        <ng-container *ngFor="let numberRowKey of numberRowKeys">
                            <span
                                *ngIf="{ isActive: keyCodeIsActive$(numberRowKey.keyCode) | async } as keyCode"
                                fxFlex="noshrink"
                                [zwpTextStyle]="'headline'"
                                [style.height]="'auto'"
                                [style.width]="'30px'"
                                [style.textAlign]="'center'"
                                [style.color]="(keyCode.isActive === true ? 'system-white' : 'primary') | zwpColorTheme"
                                [style.backgroundColor]="(keyCode.isActive === true ? 'primary' : 'system-fill') | zwpColorTheme"
                                zwpCorners="5"
                                zwpPadding="5"
                                >{{ numberRowKey.label }}</span
                            >
                        </ng-container>
                    </div>
                    <div fxLayout="row" fxLayoutGap="10px">
                        <ng-container *ngFor="let topRowKey of topRowKeys">
                            <span
                                *ngIf="{ isActive: keyCodeIsActive$(topRowKey.keyCode) | async } as keyCode"
                                fxFlex="noshrink"
                                [zwpTextStyle]="'headline'"
                                [style.height]="'auto'"
                                [style.width]="'30px'"
                                [style.textAlign]="'center'"
                                [style.color]="(keyCode.isActive === true ? 'system-white' : 'primary') | zwpColorTheme"
                                [style.backgroundColor]="(keyCode.isActive === true ? 'primary' : 'system-fill') | zwpColorTheme"
                                zwpCorners="5"
                                zwpPadding="5"
                                >{{ topRowKey.label }}</span
                            >
                        </ng-container>
                    </div>
                    <div fxLayout="row" fxLayoutGap="10px">
                        <ng-container *ngFor="let middleRowKey of middleRowKeys">
                            <span
                                *ngIf="{ isActive: keyCodeIsActive$(middleRowKey.keyCode) | async } as keyCode"
                                fxFlex="noshrink"
                                [zwpTextStyle]="'headline'"
                                [style.height]="'auto'"
                                [style.width]="'30px'"
                                [style.textAlign]="'center'"
                                [style.color]="(keyCode.isActive === true ? 'system-white' : 'primary') | zwpColorTheme"
                                [style.backgroundColor]="(keyCode.isActive === true ? 'primary' : 'system-fill') | zwpColorTheme"
                                zwpCorners="5"
                                zwpPadding="5"
                                >{{ middleRowKey.label }}</span
                            >
                        </ng-container>
                    </div>
                    <div fxLayout="row" fxLayoutGap="10px">
                        <ng-container *ngFor="let bottomRowKey of bottomRowKeys">
                            <span
                                *ngIf="{ isActive: keyCodeIsActive$(bottomRowKey.keyCode) | async } as keyCode"
                                fxFlex="noshrink"
                                [zwpTextStyle]="'headline'"
                                [style.height]="'auto'"
                                [style.width]="'30px'"
                                [style.textAlign]="'center'"
                                [style.color]="(keyCode.isActive === true ? 'system-white' : 'primary') | zwpColorTheme"
                                [style.backgroundColor]="(keyCode.isActive === true ? 'primary' : 'system-fill') | zwpColorTheme"
                                zwpCorners="5"
                                zwpPadding="5"
                                >{{ bottomRowKey.label }}</span
                            >
                        </ng-container>
                    </div>
                    <div fxLayout="row" fxLayoutGap="10px">
                        <mat-icon
                            fxFlex="noshrink"
                            [zwpTextStyle]="'headline'"
                            [inline]="true"
                            [style.height]="'auto'"
                            [style.width]="'unset'"
                            [style.color]="
                                ((shiftKeyActive$ | async) === true ? 'system-white' : 'primary') | zwpColorTheme
                            "
                            [style.backgroundColor]="
                                ((shiftKeyActive$ | async) === true ? 'primary' : 'system-fill') | zwpColorTheme
                            "
                            zwpCorners="5"
                            zwpPadding="5"
                            >arrow_upward</mat-icon
                        >
                        <mat-icon
                            fxFlex="noshrink"
                            [zwpTextStyle]="'headline'"
                            [inline]="true"
                            [style.height]="'auto'"
                            [style.width]="'unset'"
                            [style.color]="
                                ((ctrlKeyActive$ | async) === true ? 'system-white' : 'primary') | zwpColorTheme
                            "
                            [style.backgroundColor]="
                                ((ctrlKeyActive$ | async) === true ? 'primary' : 'system-fill') | zwpColorTheme
                            "
                            zwpCorners="5"
                            zwpPadding="5"
                            >keyboard_control_key</mat-icon
                        >
                        <mat-icon
                            fxFlex="noshrink"
                            [zwpTextStyle]="'headline'"
                            [inline]="true"
                            [style.height]="'auto'"
                            [style.width]="'unset'"
                            [style.color]="
                                ((altKeyActive$ | async) === true ? 'system-white' : 'primary') | zwpColorTheme
                            "
                            [style.backgroundColor]="
                                ((altKeyActive$ | async) === true ? 'primary' : 'system-fill') | zwpColorTheme
                            "
                            zwpCorners="5"
                            zwpPadding="5"
                            >keyboard_option_key</mat-icon
                        >
                        <mat-icon
                            fxFlex="noshrink"
                            [zwpTextStyle]="'headline'"
                            [inline]="true"
                            [style.height]="'auto'"
                            [style.width]="'unset'"
                            [style.color]="
                                ((metaKeyActive$ | async) === true ? 'system-white' : 'primary') | zwpColorTheme
                            "
                            [style.backgroundColor]="
                                ((metaKeyActive$ | async) === true ? 'primary' : 'system-fill') | zwpColorTheme
                            "
                            zwpCorners="5"
                            zwpPadding="5"
                            >keyboard_command_key</mat-icon
                        >
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class KeyboardPageComponent {
    private keyboardFacade = inject(ZWPKeyboardFacade)

    keyCodeIsActive$ = this.keyboardFacade.keyCodeIsActive$
    altKeyActive$ = this.keyboardFacade.altKeyActive$
    ctrlKeyActive$ = this.keyboardFacade.ctrlKeyActive$
    metaKeyActive$ = this.keyboardFacade.metaKeyActive$
    shiftKeyActive$ = this.keyboardFacade.shiftKeyActive$

    numberRowKeys: KeyboardKey[] = [
        { keyCode: ONE, label: '1' },
        { keyCode: TWO, label: '2' },
        { keyCode: THREE, label: '3' },
        { keyCode: FOUR, label: '4' },
        { keyCode: FIVE, label: '5' },
        { keyCode: SIX, label: '6' },
        { keyCode: SEVEN, label: '7' },
        { keyCode: EIGHT, label: '8' },
        { keyCode: NINE, label: '9' },
        { keyCode: ZERO, label: '0' },
        { keyCode: FF_MINUS, label: '-' },
        { keyCode: FF_EQUALS, label: '=' }
    ]

    topRowKeys: KeyboardKey[] = [
        { keyCode: Q, label: 'Q' },
        { keyCode: W, label: 'W' },
        { keyCode: E, label: 'E' },
        { keyCode: R, label: 'R' },
        { keyCode: T, label: 'T' },
        { keyCode: Y, label: 'Y' },
        { keyCode: U, label: 'U' },
        { keyCode: I, label: 'I' },
        { keyCode: O, label: 'O' },
        { keyCode: P, label: 'P' },
        { keyCode: OPEN_SQUARE_BRACKET, label: '[' },
        { keyCode: CLOSE_SQUARE_BRACKET, label: ']' }
    ]

    middleRowKeys: KeyboardKey[] = [
        { keyCode: A, label: 'A' },
        { keyCode: S, label: 'S' },
        { keyCode: D, label: 'D' },
        { keyCode: F, label: 'F' },
        { keyCode: G, label: 'G' },
        { keyCode: H, label: 'H' },
        { keyCode: J, label: 'J' },
        { keyCode: K, label: 'K' },
        { keyCode: L, label: 'L' },
        { keyCode: SEMICOLON, label: ';' },
        { keyCode: SINGLE_QUOTE, label: `'` },
        { keyCode: BACKSLASH, label: `\\` }
    ]

    bottomRowKeys: KeyboardKey[] = [
        { keyCode: TILDE, label: '~' },
        { keyCode: Z, label: 'Z' },
        { keyCode: X, label: 'X' },
        { keyCode: C, label: 'C' },
        { keyCode: V, label: 'V' },
        { keyCode: B, label: 'B' },
        { keyCode: N, label: 'N' },
        { keyCode: M, label: 'M' },
        { keyCode: COMMA, label: ',' },
        { keyCode: PERIOD, label: '.' },
        { keyCode: SLASH, label: '/' }
    ]
}
