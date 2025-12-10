import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ZWPWindowComponent } from '@zwp/platform.layout'
import { State } from '../../+state'
import { Subscription, map, take, tap } from 'rxjs'

@ZWPWindowComponent('CreateMerchantWindowComponent')
@Component({
    selector: 'urnet-mnet-create-merchant-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
            <div fxLayout="row" fxLayoutGap="20px" fxFlex="grow" zwpPadding="20">
                <form 
                    fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="10px" fxFlex="grow"
                    [formGroup]="createMerchantForm"
                >
                    <mat-form-field 
                        appearance="outline"
                        class="noHintFormField flexFormField noOutlineFormField" 
                        zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                    >
                        <input matInput formControlName="merchantName" placeholder="Merchant Name" cdkFocusInitial />
                    </mat-form-field>
                    <mat-form-field 
                        appearance="outline"
                        class="noHintFormField flexFormField noOutlineFormField" 
                        zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                    >
                        <input matInput formControlName="logoUrl" placeholder="Logo URL" />
                    </mat-form-field>
                    <zwp-divider></zwp-divider>
                    <div fxLayout="row" fxLayoutGap="10px">
                        <mat-checkbox formControlName="isLive">Is Live</mat-checkbox>
                        <mat-checkbox formControlName="isConsented">Is Consented</mat-checkbox>
                    </div>
                    <div fxFlex="grow"></div>
                    <zwp-md-button 
                        fxFlexAlign="end"
                        [label]="'Save New Merchant'" [icon]="'add_business'"
                        [disabled]="(remoteStateBusy$ | async) || createMerchantForm.invalid"
                        (btnClick)="saveMerchant()"
                    ></zwp-md-button>
                </form>
            </div>
        </zwp-window>
    `
})
export class CreateMerchantWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    private merchantFacade = inject(State.Facades.MerchantFacade)
    private readonly subscriptions = new Subscription()

    remoteState$ = this.merchantFacade.merchantRemoteState$
    remoteStateBusy$ = this.remoteState$.pipe(map(remoteState => remoteState.busy))
    remoteStateError$ = this.remoteState$.pipe(map(remoteState => remoteState.error))

    createMerchantForm = new FormGroup({
        merchantName: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
        logoUrl: new FormControl<string>(''),
        isLive: new FormControl<boolean>(false),
        isConsented: new FormControl<boolean>(false)
    })

    saveMerchant() {
        if (this.createMerchantForm.valid) {
            this.merchantFacade.createMerchant({ 
                merchantName: this.createMerchantForm.value.merchantName ?? '',
                logoUrl: this.createMerchantForm.value.logoUrl ?? '',
                isLive: this.createMerchantForm.value.isLive ?? false,
                isConsented: this.createMerchantForm.value.isConsented ?? false
             })
            this.__close()
        }
    }

    __close() {
        this.subscriptions.unsubscribe()
        this.remove()
    }

    ngOnInit() {
        const busySub = this.remoteStateBusy$.subscribe(busy => {
            if (busy) { this.createMerchantForm.disable() }
            else { this.createMerchantForm.enable() }
        })
        this.subscriptions.add(busySub)
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }
}