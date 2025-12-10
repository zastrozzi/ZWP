import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ZWPWindowComponent, WINDOW_COMPONENT_DATA } from '@zwp/platform.layout'
import { State } from '../../+state'
import { Subscription, map } from 'rxjs'
import { BarcodeType, barcodeTypeLabelPipeSignature, InputColor, isNull, Nullable } from '@zwp/platform.common'

@ZWPWindowComponent('CreateLoyaltyCardSchemeWindowComponent')
@Component({
    selector: 'urnet-mnet-create-loyalty-card-scheme-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
            <div fxLayout="row" fxLayoutGap="20px" fxFlex="grow" zwpPadding="20">
                <form
                    fxLayout="column"
                    fxLayoutAlign="center stretch"
                    fxLayoutGap="10px"
                    fxFlex="grow"
                    [formGroup]="createLoyaltyCardSchemeForm"
                >
                    <div
                        *ngIf="merchant$ | async as merchant"
                        fxLayout="row"
                        fxLayoutAlign="start center"
                        fxLayoutGap="10px"
                        zwpCorners="4"
                        zwpBackgroundColor="tertiary-system-fill"
                        zwpPadding="10"
                    >
                        <span [zwpTextStyle]="'body1'" zwpColor="label">Merchant:</span>
                        <span [zwpTextStyle]="'body1'" zwpColor="primary">{{ merchant.merchantName }}</span>
                    </div>

                    <div
                        *ngIf="brand$ | async as brand"
                        fxLayout="row"
                        fxLayoutAlign="start center"
                        fxLayoutGap="10px"
                        zwpCorners="4"
                        zwpBackgroundColor="tertiary-system-fill"
                        zwpPadding="10"
                    >
                        <span [zwpTextStyle]="'body1'" zwpColor="label">Brand:</span>
                        <span [zwpTextStyle]="'body1'" zwpColor="primary">{{ brand.brandName }}</span>
                    </div>
                    <div fxLayout="row" fxLayoutGap="10px" fxFlex="grow">
                        <div fxLayout="column" fxFlex="50" fxLayoutGap="10px" fxLayoutAlign="start stretch">
                            <mat-form-field
                                appearance="outline"
                                class="noHintFormField flexFormField noOutlineFormField"
                                zwpCorners="4"
                                zwpBackgroundColor="tertiary-system-fill"
                            >
                                <input
                                    matInput
                                    formControlName="displayName"
                                    placeholder="Display Name"
                                    cdkFocusInitial
                                />
                            </mat-form-field>
                            <mat-form-field
                                appearance="outline"
                                class="noHintFormField flexFormField noOutlineFormField"
                                zwpCorners="4"
                                zwpBackgroundColor="tertiary-system-fill"
                            >
                                <input matInput formControlName="logoUrl" placeholder="Logo URL" />
                            </mat-form-field>
                            
                            <zwp-transform-enum-dropdown-input
                                [enumInput]="createLoyaltyCardSchemeForm.controls.barcodeType"
                                [transformSignature]="barcodeTypeEnumSignature"
                                placeholder="Barcode Type"
                            ></zwp-transform-enum-dropdown-input>
                            <mat-checkbox formControlName="hasBarcode">Has Barcode</mat-checkbox>
                        </div>
                        <div fxLayout="column" fxFlex="50" fxLayoutGap="10px" fxLayoutAlign="start stretch">
                            <mat-form-field
                                appearance="outline"
                                class="noHintFormField flexFormField noOutlineFormField"
                                zwpCorners="4"
                                zwpBackgroundColor="tertiary-system-fill"
                            >
                                <input
                                    matInput
                                    [zwpColorPicker]="primaryColorPicker"
                                    formControlName="primaryColorHexString"
                                    placeholder="Primary Colour"
                                />
                                <zwp-color-toggle matSuffix [picker]="primaryColorPicker"></zwp-color-toggle>
                                <zwp-color-picker #primaryColorPicker></zwp-color-picker>
                            </mat-form-field>
                            <mat-form-field
                                appearance="outline"
                                class="noHintFormField flexFormField noOutlineFormField"
                                zwpCorners="4"
                                zwpBackgroundColor="tertiary-system-fill"
                            >
                                <input
                                    matInput
                                    [zwpColorPicker]="secondaryColorPicker"
                                    formControlName="secondaryColorHexString"
                                    placeholder="Secondary Colour"
                                />
                                <zwp-color-toggle matSuffix [picker]="secondaryColorPicker"></zwp-color-toggle>
                                <zwp-color-picker #secondaryColorPicker></zwp-color-picker>
                            </mat-form-field>
                            <mat-form-field
                                appearance="outline"
                                class="noHintFormField flexFormField noOutlineFormField"
                                zwpCorners="4"
                                zwpBackgroundColor="tertiary-system-fill"
                            >
                                <input
                                    matInput
                                    [zwpColorPicker]="backgroundColorPicker"
                                    formControlName="backgroundColorHexString"
                                    placeholder="Background Colour"
                                />
                                <zwp-color-toggle matSuffix [picker]="backgroundColorPicker"></zwp-color-toggle>
                                <zwp-color-picker #backgroundColorPicker></zwp-color-picker>
                            </mat-form-field>
                        </div>
                    </div>

                    <div fxFlex="grow"></div>
                    <zwp-md-button
                        fxFlexAlign="end"
                        [label]="'Save New Loyalty Card Scheme'"
                        [icon]="'save'"
                        [disabled]="(remoteStateBusy$ | async) || createLoyaltyCardSchemeForm.invalid"
                        (btnClick)="saveLoyaltyCardScheme()"
                    ></zwp-md-button>
                </form>
            </div>
        </zwp-window>
    `,
})
export class CreateLoyaltyCardSchemeWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    private windowData = inject(WINDOW_COMPONENT_DATA) as {
        brandId: Nullable<string>
        merchantId: Nullable<string>
    }
    private loyaltyCardSchemeFacade = inject(State.Facades.LoyaltyCardSchemeFacade)
    private merchantFacade = inject(State.Facades.MerchantFacade)
    private brandFacade = inject(State.Facades.BrandFacade)
    private readonly subscriptions = new Subscription()

    remoteState$ = this.loyaltyCardSchemeFacade.loyaltyCardSchemeRemoteState$
    remoteStateBusy$ = this.remoteState$.pipe(map((remoteState) => remoteState.busy))
    remoteStateError$ = this.remoteState$.pipe(map((remoteState) => remoteState.error))

    merchant$ = this.merchantFacade.merchantById$(this.merchantId ?? '')
    brand$ = this.brandFacade.brandById$(this.brandId ?? '')

    barcodeTypeEnumSignature = barcodeTypeLabelPipeSignature

    createLoyaltyCardSchemeForm = new FormGroup({
        displayName: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
        hasBarcode: new FormControl<boolean>(true, [Validators.required]),
        barcodeType: new FormControl<BarcodeType | null>(null),
        logoUrl: new FormControl<string | null>(null),
        primaryColorHexString: new FormControl<InputColor | null>(null),
        secondaryColorHexString: new FormControl<InputColor | null>(null),
        backgroundColorHexString: new FormControl<InputColor | null>(null),
    })

    saveLoyaltyCardScheme() {
        if (this.createLoyaltyCardSchemeForm.valid, !isNull(this.merchantId)) {
            this.loyaltyCardSchemeFacade.createLoyaltyCardScheme(this.merchantId, {
                displayName: this.createLoyaltyCardSchemeForm.value.displayName ?? '',
                hasBarcode: this.createLoyaltyCardSchemeForm.value.hasBarcode ?? true,
                barcodeType: this.createLoyaltyCardSchemeForm.value.barcodeType ?? undefined,
                logoUrl: this.createLoyaltyCardSchemeForm.value.logoUrl ?? undefined,
                primaryColorHexString: this.createLoyaltyCardSchemeForm.value.primaryColorHexString?.toHexString() ?? undefined,
                secondaryColorHexString: this.createLoyaltyCardSchemeForm.value.secondaryColorHexString?.toHexString() ?? undefined,
                backgroundColorHexString: this.createLoyaltyCardSchemeForm.value.backgroundColorHexString?.toHexString() ?? undefined,
            })
            this.__close()
        }
    }

    __close() {
        this.subscriptions.unsubscribe()
        this.remove()
    }

    get merchantId() {
        return this.windowData.merchantId ?? null
    }
    get brandId() {
        return this.windowData.brandId ?? null
    }

    ngOnInit() {
        const busySub = this.remoteStateBusy$.subscribe((busy) => {
            if (busy) {
                this.createLoyaltyCardSchemeForm.disable()
            } else {
                this.createLoyaltyCardSchemeForm.enable()
            }
        })
        this.subscriptions.add(busySub)
    }

    ngOnDestroy() {
        console.log('CreateLoyaltyCardSchemeWindowComponent destroyed')
        this.subscriptions.unsubscribe()
    }
}
