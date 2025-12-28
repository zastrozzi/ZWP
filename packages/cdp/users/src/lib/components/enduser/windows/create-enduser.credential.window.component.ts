import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ZWPWindowComponent } from '@zwp/platform.layout'
import { EnduserCredentialFacade, EnduserFacade } from '../../../+state/facades'
import { Subscription, map, take, tap } from 'rxjs'
import { Model } from '../../../model'

@ZWPWindowComponent('CreateEnduserCredentialWindowComponent')
@Component({
    selector: 'cdp-users-create-enduser-credential-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
        
                <div fxLayout="row" fxLayoutGap="20px" fxFlexFill
                    zwpPadding="20"
                >
            <form 
                fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="10px" fxFlex="grow"
                [formGroup]="createEnduserCredentialForm"
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
                    [disabled]="createEnduserCredentialForm.invalid"
                    (btnClick)="saveEnduserCredential()"
                ></zwp-md-button>
            </form>
        </div>
        </zwp-window>
    `
})
export class CreateEnduserCredentialWindowComponent extends BaseWindowComponent implements OnDestroy {
    private enduserCredentialFacade = inject(EnduserCredentialFacade)
    private readonly subscriptions = new Subscription()

    // remoteState$ = this.enduserCredentialFacade.adremoteStat
    // remoteStateBusy$ = this.remoteState$.pipe(map(remoteState => remoteState.busy))
    // remoteStateError$ = this.remoteState$.pipe(map(remoteState => remoteState.error))

    createEnduserCredentialForm = new FormGroup({
        password: new FormControl<string>('', [Validators.required]),
    })

    saveEnduserCredential() {
        const enduserId = 'FIX_ME' // (this.windowEntity?.data as {enduserId: string}).enduserId
        if (this.createEnduserCredentialForm.valid) {
            const password = this.createEnduserCredentialForm.get('password')?.value ?? ''
            this.enduserCredentialFacade.createEnduserCredential(enduserId, { password: password, credentialType: Model.CredentialType.emailPassword })
            this.__close()
        }
    }

    __close() {
        this.subscriptions.unsubscribe()
        this.remove()
    }

    // ngOnInit() {
        // const busySub = this.remoteStateBusy$.subscribe(busy => {
        //     if (busy) { this.createEnduserForm.disable() }
        //     else { this.createEnduserForm.enable() }
        // })
    //     // this.subscriptions.add(busySub)
    //     // console.log('CreateEnduserCredentialWindowComponent initialized')
    // }

    ngOnDestroy() {
        // console.log('CreateEnduserCredentialWindowComponent destroyed')
        this.subscriptions.unsubscribe()
    }
}