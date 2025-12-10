import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ZWPWindowComponent } from '@zwp/platform.layout'
import { AdminUserFacade } from '../../../+state/facades'
import { Subscription, map, take, tap } from 'rxjs'

@ZWPWindowComponent('CreateAdminUserWindowComponent')
@Component({
    selector: 'cdp-users-create-admin-user-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
        
                <div fxLayout="row" fxLayoutGap="20px" fxFlexFill
                    zwpPadding="20"
                >
            <form 
                fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="10px" fxFlex="grow"
                [formGroup]="createAdminUserForm"
            >
                <mat-form-field 
                    appearance="outline"
                    class="noHintFormField flexFormField noOutlineFormField" 
                    zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                >
                    <input matInput formControlName="firstName" placeholder="First Name" cdkFocusInitial />
                </mat-form-field>

                <mat-form-field 
                    appearance="outline"
                    class="noHintFormField flexFormField noOutlineFormField" 
                    zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                >
                    <input matInput formControlName="lastName" placeholder="Last Name" />
                </mat-form-field>
                <div fxFlex="grow"></div>
                <zwp-md-button 
                    fxFlexAlign="end"
                    [label]="'Save New User'" [icon]="'person_add'"
                    [disabled]="(remoteStateBusy$ | async) || createAdminUserForm.invalid"
                    (btnClick)="saveAdminUser()"
                ></zwp-md-button>
            </form>
        </div>
        </zwp-window>
    `
})
export class CreateAdminUserWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    private adminUserFacade = inject(AdminUserFacade)
    private readonly subscriptions = new Subscription()

    remoteState$ = this.adminUserFacade.adminUserRemoteState$
    remoteStateBusy$ = this.remoteState$.pipe(map(remoteState => remoteState.busy))
    remoteStateError$ = this.remoteState$.pipe(map(remoteState => remoteState.error))

    createAdminUserForm = new FormGroup({
        firstName: new FormControl<string>('', [Validators.required]),
        lastName: new FormControl<string>('', [Validators.required])
    })

    saveAdminUser() {
        if (this.createAdminUserForm.valid) {
            const firstName = this.createAdminUserForm.value.firstName ?? ''
            const lastName = this.createAdminUserForm.value.lastName ?? ''
            const role = 'admin'
            this.adminUserFacade.createAdminUser({ firstName, lastName, role })
            this.__close()
        }
    }

    __close() {
        this.subscriptions.unsubscribe()
        this.remove()
    }

    ngOnInit() {
        const busySub = this.remoteStateBusy$.subscribe(busy => {
            if (busy) { this.createAdminUserForm.disable() }
            else { this.createAdminUserForm.enable() }
        })
        this.subscriptions.add(busySub)
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }
}