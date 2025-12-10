import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ZWPWindowComponent, WINDOW_COMPONENT_DATA } from '@zwp/platform.layout'
import { AdminUserEmailFacade, AdminUserFacade } from '../../../+state/facades'
import { Subscription, map, take, tap } from 'rxjs'
import { isNull, Nullable } from '@zwp/platform.common'

@ZWPWindowComponent('CreateAdminUserEmailWindowComponent')
@Component({
    selector: 'cdp-users-create-admin-user-email-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
        
                <div fxLayout="row" fxLayoutGap="20px" fxFlexFill
                    zwpPadding="20"
                >
            <form 
                fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="10px" fxFlex="grow"
                [formGroup]="createAdminUserEmailForm"
            >
                <mat-form-field 
                    appearance="outline"
                    class="noHintFormField flexFormField noOutlineFormField" 
                    zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                >
                    <input type="email" matInput formControlName="emailAddressValue" placeholder="Email Address" />
                </mat-form-field>
                <div fxFlex="grow"></div>
                <zwp-md-button 
                    fxFlexAlign="end"
                    [label]="'Save New Email Address'" [icon]="'person_add'"
                    [disabled]="createAdminUserEmailForm.invalid"
                    (btnClick)="saveAdminUserEmail()"
                ></zwp-md-button>
            </form>
        </div>
        </zwp-window>
    `
})
export class CreateAdminUserEmailWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    private windowData = inject(WINDOW_COMPONENT_DATA) as { adminUserId: Nullable<string> }
    private adminUserEmailFacade = inject(AdminUserEmailFacade)
    private readonly subscriptions = new Subscription()

    remoteStateBusy$ = this.adminUserEmailFacade.adminUserEmailRemoteStateBusy$
    // remoteStateBusy$ = this.remoteState$.pipe(map(remoteState => remoteState.busy))
    // remoteStateError$ = this.remoteState$.pipe(map(remoteState => remoteState.error))

    createAdminUserEmailForm = new FormGroup({
        emailAddressValue: new FormControl<string>('', [Validators.required, Validators.email]),
    })

    saveAdminUserEmail() {
        const adminUserId = this.adminUserId
        if (this.createAdminUserEmailForm.valid, !isNull(adminUserId)) {
            const emailAddressValue = this.createAdminUserEmailForm.get('emailAddressValue')?.value ?? ''
            this.adminUserEmailFacade.createAdminUserEmail(adminUserId, { emailAddressValue, isVerified: true })
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
            if (busy) { this.createAdminUserEmailForm.disable() }
            else { this.createAdminUserEmailForm.enable() }
        })
        this.subscriptions.add(busySub)
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }
}