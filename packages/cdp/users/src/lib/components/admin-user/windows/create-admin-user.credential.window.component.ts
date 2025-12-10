import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ZWPWindowComponent, WINDOW_COMPONENT_DATA } from '@zwp/platform.layout'
import { AdminUserCredentialFacade, AdminUserFacade } from '../../../+state/facades'
import { Subscription, map, take, tap } from 'rxjs'
import { Model } from '../../../model'
import { isNull, Nullable } from '@zwp/platform.common'

@ZWPWindowComponent('CreateAdminUserCredentialWindowComponent')
@Component({
    selector: 'cdp-users-create-admin-user-credential-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
        
                <div fxLayout="row" fxLayoutGap="20px" fxFlexFill
                    zwpPadding="20"
                >
            <form 
                fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="10px" fxFlex="grow"
                [formGroup]="createAdminUserCredentialForm"
            >
                <mat-form-field 
                    appearance="outline"
                    class="noHintFormField flexFormField noOutlineFormField" 
                    zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                >
                    <input type="password" matInput formControlName="password" placeholder="Password" />
                </mat-form-field>
                <div fxFlex="grow"></div>
                <zwp-md-button 
                    fxFlexAlign="end"
                    [label]="'Save New Credential'" [icon]="'person_add'"
                    [disabled]="createAdminUserCredentialForm.invalid"
                    (btnClick)="saveAdminUserCredential()"
                ></zwp-md-button>
            </form>
        </div>
        </zwp-window>
    `
})
export class CreateAdminUserCredentialWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    private windowData = inject(WINDOW_COMPONENT_DATA) as { adminUserId: Nullable<string> }
    private adminUserCredentialFacade = inject(AdminUserCredentialFacade)
    private readonly subscriptions = new Subscription()

    remoteStateBusy$ = this.adminUserCredentialFacade.adminUserCredentialRemoteStateBusy$
    // remoteStateBusy$ = this.remoteState$.pipe(map(remoteState => remoteState.busy))
    // remoteStateError$ = this.remoteState$.pipe(map(remoteState => remoteState.error))

    createAdminUserCredentialForm = new FormGroup({
        password: new FormControl<string>('', [Validators.required]),
    })

    saveAdminUserCredential() {
        const adminUserId = this.adminUserId
        if (this.createAdminUserCredentialForm.valid, !isNull(adminUserId)) {
            const password = this.createAdminUserCredentialForm.get('password')?.value ?? ''
            this.adminUserCredentialFacade.createAdminUserCredential(adminUserId, { password: password, credentialType: Model.CredentialType.emailPassword })
            this.__close()
        }
    }

    __close() {
        this.subscriptions.unsubscribe()
        this.remove()
    }

    get adminUserId() { return this.windowData.adminUserId ?? null }

    ngOnInit() {
        const busySub = this.remoteStateBusy$.subscribe(busy => {
            if (busy) { this.createAdminUserCredentialForm.disable() }
            else { this.createAdminUserCredentialForm.enable() }
        })
        this.subscriptions.add(busySub)
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }
}