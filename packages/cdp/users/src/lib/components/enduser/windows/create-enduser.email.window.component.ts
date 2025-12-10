import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ZWPWindowComponent } from '@zwp/platform.layout'
import { EnduserEmailFacade, EnduserFacade } from '../../../+state/facades'
import { Subscription, map, take, tap } from 'rxjs'

@ZWPWindowComponent('CreateEnduserEmailWindowComponent')
@Component({
    selector: 'cdp-users-create-enduser-email-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
        
                <div fxLayout="row" fxLayoutGap="20px" fxFlexFill
                    zwpPadding="20"
                >
            <form 
                fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="10px" fxFlex="grow"
                [formGroup]="createEnduserEmailForm"
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
                    [disabled]="createEnduserEmailForm.invalid"
                    (btnClick)="saveEnduserEmail()"
                ></zwp-md-button>
            </form>
        </div>
        </zwp-window>
    `
})
export class CreateEnduserEmailWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    private enduserEmailFacade = inject(EnduserEmailFacade)
    private readonly subscriptions = new Subscription()

    // remoteState$ = this.enduserEmailFacade.adremoteStat
    // remoteStateBusy$ = this.remoteState$.pipe(map(remoteState => remoteState.busy))
    // remoteStateError$ = this.remoteState$.pipe(map(remoteState => remoteState.error))

    createEnduserEmailForm = new FormGroup({
        emailAddressValue: new FormControl<string>('', [Validators.required, Validators.email]),
    })

    saveEnduserEmail() {
        const enduserId = 'FIX_ME' // (this.windowEntity?.data as {enduserId: string}).enduserId
        if (this.createEnduserEmailForm.valid) {
            const emailAddressValue = this.createEnduserEmailForm.get('emailAddressValue')?.value ?? ''
            this.enduserEmailFacade.createEnduserEmail(enduserId, { emailAddressValue, isVerified: false })
            this.__close()
        }
    }

    __close() {
        this.subscriptions.unsubscribe()
        this.remove()
    }

    ngOnInit() {
        // const busySub = this.remoteStateBusy$.subscribe(busy => {
        //     if (busy) { this.createEnduserForm.disable() }
        //     else { this.createEnduserForm.enable() }
        // })
        // this.subscriptions.add(busySub)
        console.log('CreateEnduserEmailWindowComponent initialized')
    }

    ngOnDestroy() {
        console.log('CreateEnduserEmailWindowComponent destroyed')
        this.subscriptions.unsubscribe()
    }
}