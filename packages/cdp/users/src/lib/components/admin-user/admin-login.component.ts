import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { AdminUserFacade } from '../../+state/facades'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { Subscription, map } from 'rxjs'
import {
    BarcodeType,
    BarcodeTypeLabel,
    InputColor,
    ZWPISO3166Alpha2,
    ZWPISO3166Alpha2Label,
    TransformEnumPipeSignature,
} from '@zwp/platform.common'
import { ThemePalette } from '@angular/material/core'

@Component({
    selector: 'cdp-users-admin-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            fxLayout="column"
            fxLayoutAlign="center center"
            fxFlexFill
            zwpBackgroundColor="primary"
            [style.overflow]="'hidden'"
            [style.height]="'100dvh'"
            [style.width]="'100dvw'"
        >
            <div fxLayout="column">
                <span zwpTextStyle="title3" zwpColor="system-white" zwpFontWeight="300"
                    >Admin Platform</span
                >
                <span zwpTextStyle="body1" zwpColor="system-white" [zwpColorOptions]="{ opacity: 0.7 }"
                    >Sign in to your account</span
                >
                <div
                    fxLayout="row"
                    fxLayoutGap="20px"
                    fxFlexOffset="20px"
                    zwpBackgroundColor="system-white"
                    zwpCorners="10"
                    class="mat-elevation-z4"
                    zwpPadding="20"
                >
                    <div fxLayout="column" fxFlex="300px" fxLayoutGap="10px">
                        <zwp-md-button
                            [label]="'Sign in with Google'"
                            [icon]="'lock'"
                            [disabled]="(remoteStateBusy$ | async) || false"
                        ></zwp-md-button>
                        <zwp-md-button
                            [label]="'Sign in with Microsoft'"
                            [icon]="'lock'"
                            [disabled]="(remoteStateBusy$ | async) || false"
                        ></zwp-md-button>
                        
                    </div>
                    <form
                        fxLayout="column"
                        fxLayoutAlign="center stretch"
                        fxLayoutGap="10px"
                        fxFlex="300px"
                        [formGroup]="loginEmailPasswordForm"
                    >
                        <span zwpTextStyle="body1">Or Sign in with Email & Password</span>
                        <mat-form-field
                            appearance="outline"
                            fxFlex="grow"
                            class="noHintFormField flexFormField noOutlineFormField"
                            zwpCorners="4"
                            zwpBackgroundColor="tertiary-system-fill"
                        >
                            <input
                                type="email"
                                matInput
                                formControlName="email"
                                placeholder="Email Address"
                                cdkFocusInitial
                                autocomplete="email"
                            />
                        </mat-form-field>

                        <mat-form-field
                            appearance="outline"
                            fxFlex="grow"
                            class="noHintFormField flexFormField noOutlineFormField"
                            zwpCorners="4"
                            zwpBackgroundColor="tertiary-system-fill"
                        >
                            <input
                                type="password"
                                matInput
                                formControlName="password"
                                placeholder="Password"
                                autocomplete="current-password"
                            />
                        </mat-form-field>
                        <zwp-md-button
                            fxFlexAlign="start"
                            [label]="'Sign in with Email & Password'"
                            [icon]="'lock'"
                            [disabled]="(remoteStateBusy$ | async) || loginEmailPasswordForm.invalid"
                            (btnClick)="loginEmailPassword()"
                        ></zwp-md-button>
                    </form>
                </div>
                <mat-progress-bar
                    fxFlexOffset="5px"
                    fxFlexAlign="center"
                    [style.width]="'300px'"
                    [style.opacity]="(remoteStateBusy$ | async) ? '1' : '0'"
                    [mode]="(remoteStateBusy$ | async) ? 'indeterminate' : 'determinate'"
                    [value]="0"
                ></mat-progress-bar>
            </div>
        </div>
    `,
})
export class AdminLoginComponent implements OnInit, OnDestroy {
    private adminUserFacade = inject(AdminUserFacade)
    private readonly subscriptions = new Subscription()

    remoteState$ = this.adminUserFacade.adminUserRemoteState$
    remoteStateBusy$ = this.remoteState$.pipe(map((remoteState) => remoteState.busy))
    
    loginEmailPasswordForm = new FormGroup({
        email: new FormControl<string>('', [Validators.required, Validators.email]),
        password: new FormControl<string>('', [Validators.required])
    })

    loginEmailPassword() {
        if (this.loginEmailPasswordForm.valid) {
            const email = this.loginEmailPasswordForm.value.email ?? ''
            const password = this.loginEmailPasswordForm.value.password ?? ''
            this.adminUserFacade.loginAdminUserEmailPassword({ email, password })
        }
    }

    ngOnInit() {
        const busySub = this.remoteStateBusy$.subscribe((busy) => {
            if (busy) {
                this.loginEmailPasswordForm.disable()
            } else {
                this.loginEmailPasswordForm.enable()
            }
        })
        this.subscriptions.add(busySub)
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }
}
