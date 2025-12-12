import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core'
import { UKMacKeyboardLayout, ZWPKeyboardFacade } from '@zwp/platform.common'

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
            <div fxLayout="row" *ngIf="{ trackingActive: trackingActive$ | async } as trackingSettings" zwpPadding="10">
                <zwp-md-button
                    (btnClick)="toggleTrackingActive()"
                    [label]="trackingSettings.trackingActive ? 'Keyboard Tracking On' : 'Keyboard Tracking Off'"
                    [icon]="trackingSettings.trackingActive ? 'check_box' : 'check_box_outline_blank'"
                    [iconTextStyle]="'subheadline'"
                    [textStyle]="'button1'"
                    [textStyle]="'button1'"
                    [backgroundColor]="
                        trackingSettings.trackingActive
                            ? ('primary' | zwpColorTheme)
                            : ('quaternary-system-fill' | zwpColorTheme)
                    "
                    [labelColor]="
                        trackingSettings.trackingActive ? ('system-white' | zwpColorTheme) : ('primary-label' | zwpColorTheme)
                    "
                    [padding]="'10 15 10 15'"
                    [layoutGap]="'10px'"
                ></zwp-md-button>
            </div>
            <div fxLayout="row" fxFlex="grow">
                <div fxLayout="column" fxFlex="grow" fxLayoutAlign="center center" fxLayoutGap="5px">
                    <div fxLayout="row" fxLayoutGap="5px">
                        <zwp-keyboard-key
                            *ngFor="let keyboardKey of keyboardLayout.functionRowKeys"
                            [keyboardKey]="keyboardKey"
                        ></zwp-keyboard-key>
                    </div>
                    <div fxLayout="row" fxLayoutGap="5px">
                        <zwp-keyboard-key
                            *ngFor="let keyboardKey of keyboardLayout.numberRowKeys"
                            [keyboardKey]="keyboardKey"
                        ></zwp-keyboard-key>
                    </div>
                    <div fxLayout="row" fxLayoutGap="5px">
                        <zwp-keyboard-key
                            *ngFor="let keyboardKey of keyboardLayout.topLetterRowKeys"
                            [keyboardKey]="keyboardKey"
                        ></zwp-keyboard-key>
                    </div>
                    <div fxLayout="row" fxLayoutGap="5px">
                        <zwp-keyboard-key
                            *ngFor="let keyboardKey of keyboardLayout.middleLetterRowKeys"
                            [keyboardKey]="keyboardKey"
                        ></zwp-keyboard-key>
                    </div>
                    <div fxLayout="row" fxLayoutGap="5px">
                        <zwp-keyboard-key
                            *ngFor="let keyboardKey of keyboardLayout.bottomLetterRowKeys"
                            [keyboardKey]="keyboardKey"
                        ></zwp-keyboard-key>
                    </div>
                    <div fxLayout="row" fxLayoutGap="5px">
                        <zwp-keyboard-key
                            *ngFor="let keyboardKey of keyboardLayout.bottomRowKeys"
                            [keyboardKey]="keyboardKey"
                        ></zwp-keyboard-key>
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class KeyboardPageComponent {
    private keyboardFacade = inject(ZWPKeyboardFacade)

    trackingActive$ = this.keyboardFacade.trackingActive$

    keyboardLayout = UKMacKeyboardLayout

    toggleTrackingActive() {
        this.keyboardFacade.toggleTrackingActive()
    }
}
