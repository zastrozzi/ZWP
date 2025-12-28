import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ZWPWindowComponent } from '@zwp/platform.layout'
import { State } from '../../+state'
import { Subscription, map, take, tap } from 'rxjs'

@ZWPWindowComponent('CreateBrandWindowComponent')
@Component({
    selector: 'urnet-mnet-create-brand-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
            <div fxLayout="row" fxLayoutGap="20px" fxFlexFill zwpPadding="20">
                <form 
                    fxLayout="column" fxLayoutAlign="start stretch" fxLayoutGap="10px" fxFlex="grow"
                    [formGroup]="createBrandForm"
                >
                    <div fxLayout="column" fxLayoutGap="5px" zwpCorners="4" zwpBackgroundColor="tertiary-system-fill" zwpPadding="10 15 10 15">
                        <span [zwpTextStyle]="'caption1'">Merchant</span>
                        <span [zwpTextStyle]="'body1'" [zwpColor]="(selectedMerchant$ | async)?.id === null ? 'destructive' : 'label'">{{(selectedMerchant$ | async)?.merchantName ?? 'Select Merchant to continue'}}</span>
                    </div>
                    <mat-form-field 
                        appearance="outline"
                        class="noHintFormField flexFormField noOutlineFormField" 
                        zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                    >
                        <input matInput formControlName="brandName" placeholder="Brand Name" cdkFocusInitial />
                    </mat-form-field>
                </form>
            </div>
            <ng-template #windowFooter>
                <zwp-md-button 
                    [label]="'Save New Brand'" [icon]="'pages'"
                    [disabled]="(remoteStateBusy$ | async) || createBrandForm.invalid"
                    (btnClick)="saveBrand()"
                ></zwp-md-button>
            </ng-template>
        </zwp-window>
    `
})
export class CreateBrandWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    private brandFacade = inject(State.Facades.BrandFacade)
    private merchantFacade = inject(State.Facades.MerchantFacade)
    private readonly subscriptions = new Subscription()

    remoteState$ = this.brandFacade.brandRemoteState$
    remoteStateBusy$ = this.remoteState$.pipe(map(remoteState => remoteState.busy))
    remoteStateError$ = this.remoteState$.pipe(map(remoteState => remoteState.error))

    selectedMerchant$ = this.merchantFacade.selectedMerchant$

    createBrandForm = new FormGroup({
        merchantId: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
        brandName: new FormControl<string>('', [Validators.required, Validators.minLength(1)])
    })

    saveBrand() {
        if (this.createBrandForm.valid) {
            this.brandFacade.createBrand(this.createBrandForm.value.merchantId ?? '',{ 
                brandName: this.createBrandForm.value.brandName ?? ''
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
            if (busy) { this.createBrandForm.disable() }
            else { this.createBrandForm.enable() }
        })
        const selectedMerchantSub = this.selectedMerchant$.subscribe(merchant => {
            this.createBrandForm.patchValue({ merchantId: merchant?.id ?? '' })
        })
        this.subscriptions.add(busySub)
        this.subscriptions.add(selectedMerchantSub)
    }

    ngOnDestroy() {
        // console.log('CreateBrandWindowComponent destroyed')
        this.subscriptions.unsubscribe()
    }
}