import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ZWPWindowComponent } from '@zwp/platform.layout'
import { State } from '../../+state'
import { BehaviorSubject, Subscription, combineLatestWith, map, take, tap } from 'rxjs'
import { Model } from '../../model'
import { ZWPISO3166Alpha2, ZWPISO3166Alpha2Label, TransformEnumPipeSignature } from '@zwp/platform.common'

@ZWPWindowComponent('CreateLocationWindowComponent')
@Component({
    selector: 'urnet-mnet-create-location-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
            <div fxLayout="row" fxLayoutGap="20px" fxFlex="grow" zwpPadding="20">
                <form 
                    fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="10px" fxFlex="grow"
                    [formGroup]="createLocationForm"
                >
                    <span [zwpTextStyle]="'caption2'">Relationships</span>
                    <div *ngIf="(parent | async) === 'none'" fxLayout="column" fxLayoutGap="5px" zwpCorners="4" zwpBackgroundColor="tertiary-system-fill" zwpPadding="10 15 10 15">
                        <span [zwpTextStyle]="'caption1'">Merchant or Brand</span>
                        <span [zwpTextStyle]="'body1'" [zwpColor]="'destructive'">Select Merchant or Brand to continue</span>
                    </div>
                    <div *ngIf="(parent | async) === 'merchant'" fxLayout="column" fxLayoutGap="5px" zwpCorners="4" zwpBackgroundColor="tertiary-system-fill" zwpPadding="10 15 10 15">
                        <span [zwpTextStyle]="'caption1'">Merchant</span>
                        <span [zwpTextStyle]="'body1'" [zwpColor]="(selectedMerchant$ | async)?.id === null ? 'destructive' : 'label'">{{(selectedMerchant$ | async)?.merchantName ?? 'Select Merchant to continue'}}</span>
                    </div>
                    <div *ngIf="(parent | async) === 'brand'" fxLayout="column" fxLayoutGap="5px" zwpCorners="4" zwpBackgroundColor="tertiary-system-fill" zwpPadding="10 15 10 15">
                        <span [zwpTextStyle]="'caption1'">Brand</span>
                        <span [zwpTextStyle]="'body1'" [zwpColor]="(selectedBrand$ | async)?.id === null ? 'destructive' : 'label'">{{(selectedBrand$ | async)?.brandName ?? 'Select Brand to continue'}}</span>
                    </div>
                    <zwp-divider></zwp-divider>
                    <span [zwpTextStyle]="'caption2'">Address</span>
                    <mat-form-field 
                        appearance="outline"
                        class="noHintFormField flexFormField noOutlineFormField" 
                        zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                    >
                        <input matInput formControlName="name" placeholder="Location Name" cdkFocusInitial />
                    </mat-form-field>
                    <mat-form-field 
                        appearance="outline"
                        class="noHintFormField flexFormField noOutlineFormField" 
                        zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                    >
                        <input matInput formControlName="addressRefinement" placeholder="Refinement" />
                    </mat-form-field>
                    <div fxLayout="row" fxLayoutGap="10px">
                        <mat-form-field 
                            fxFlex="30"
                            appearance="outline"
                            class="noHintFormField flexFormField noOutlineFormField" 
                            zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                        >
                            <input matInput formControlName="addressNumber" placeholder="Number" />
                        </mat-form-field>
                        <mat-form-field
                            fxFlex="grow" 
                            appearance="outline"
                            class="noHintFormField flexFormField noOutlineFormField" 
                            zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                        >
                            <input matInput formControlName="addressStreet" placeholder="Street" />
                        </mat-form-field>
                    </div>
                    <div fxLayout="row" fxLayoutGap="10px">
                        <mat-form-field 
                            fxFlex="grow"
                            appearance="outline"
                            class="noHintFormField flexFormField noOutlineFormField" 
                            zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                        >
                            <input matInput formControlName="addressCity" placeholder="City" />
                        </mat-form-field>
                        <mat-form-field 
                            fxFlex="grow"
                            appearance="outline"
                            class="noHintFormField flexFormField noOutlineFormField" 
                            zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                        >
                            <input matInput formControlName="addressRegion" placeholder="Region" />
                        </mat-form-field>
                    </div>
                    <mat-form-field 
                        appearance="outline"
                        class="noHintFormField flexFormField noOutlineFormField" 
                        zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                    >
                        <input matInput formControlName="addressPostalCode" placeholder="Postal Code" />
                    </mat-form-field>
                    <zwp-transform-enum-dropdown-input 
                        [enumInput]="createLocationForm.controls.country" 
                        [transformSignature]="countryEnumSignature" 
                        placeholder="Country"
                    ></zwp-transform-enum-dropdown-input>
                    <zwp-divider></zwp-divider>
                    <span [zwpTextStyle]="'caption2'">Coordinates</span>
                    <div fxLayout="row" fxLayoutGap="10px" fxLayoutAlign="center stretch">
                        <mat-form-field 
                            fxFlex="grow"
                            appearance="outline"
                            class="noHintFormField flexFormField noOutlineFormField" 
                            zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                        >
                            <input matInput formControlName="lat" placeholder="Latitude" />
                        </mat-form-field>
                        <mat-form-field 
                            fxFlex="grow"
                            appearance="outline"
                            class="noHintFormField flexFormField noOutlineFormField" 
                            zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                        >
                            <input matInput formControlName="lon" placeholder="Longitude" />
                        </mat-form-field>
                    </div>
                    <div fxFlex="grow"></div>
                    <zwp-md-button 
                        fxFlexAlign="end"
                        [label]="'Save New Location'" [icon]="'add_location'"
                        [disabled]="(remoteStateBusy$ | async) || createLocationForm.invalid"
                        (btnClick)="saveLocation()"
                    ></zwp-md-button>
                </form>
            </div>
        </zwp-window>
    `
})
export class CreateLocationWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    private locationFacade = inject(State.Facades.LocationFacade)
    private merchantFacade = inject(State.Facades.MerchantFacade)
    private brandFacade = inject(State.Facades.BrandFacade)

    private readonly subscriptions = new Subscription()

    remoteState$ = this.locationFacade.locationRemoteState$
    remoteStateBusy$ = this.remoteState$.pipe(map(remoteState => remoteState.busy))
    remoteStateError$ = this.remoteState$.pipe(map(remoteState => remoteState.error))

    selectedMerchant$ = this.merchantFacade.selectedMerchant$
    selectedBrand$ = this.brandFacade.selectedBrand$
    parent: BehaviorSubject<'merchant' | 'brand' | 'none'> = new BehaviorSubject<'merchant' | 'brand' | 'none'>('none')

    countryEnumSignature: TransformEnumPipeSignature = { input: ZWPISO3166Alpha2, output: ZWPISO3166Alpha2Label }

    createLocationForm = new FormGroup({
        parent: new FormControl<'merchant' | 'brand' | 'none'>('none'),
        parentId: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
        name: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
        lat: new FormControl<string>('', [Validators.pattern(/^-?\d*(\.\d+)?$/)]),
        lon: new FormControl<string>('', [Validators.pattern(/^-?\d*(\.\d+)?$/)]),
        addressRefinement: new FormControl<string>(''),
        addressNumber: new FormControl<string>(''),
        addressStreet: new FormControl<string>(''),
        addressCity: new FormControl<string>(''),
        addressRegion: new FormControl<string>(''),
        addressPostalCode: new FormControl<string>(''),
        country: new FormControl<ZWPISO3166Alpha2 | null>(null)
    })

    saveLocation() {
        if (this.createLocationForm.valid) {
            const locationDto: Model.CreateLocationRequest = {
                name: this.createLocationForm.value.name ?? undefined,
                lat: parseFloat(this.createLocationForm.value.lat ?? '') ?? undefined,
                lon: parseFloat(this.createLocationForm.value.lon ?? '') ?? undefined,
                addressRefinement: this.createLocationForm.value.addressRefinement ?? undefined,
                addressNumber: this.createLocationForm.value.addressNumber ?? undefined,
                addressStreet: this.createLocationForm.value.addressStreet ?? undefined,
                addressCity: this.createLocationForm.value.addressCity ?? undefined,
                addressRegion: this.createLocationForm.value.addressRegion ?? undefined,
                addressPostalCode: this.createLocationForm.value.addressPostalCode ?? undefined,
                country: this.createLocationForm.value.country ?? undefined
            }
            const parentId = this.createLocationForm.value.parentId ?? ''
            switch (this.createLocationForm.value.parent) {
                case 'merchant':
                    this.locationFacade.createLocation(null, parentId, locationDto)
                    break
                case 'brand':
                    this.locationFacade.createLocation(parentId, null, locationDto)
                    break
                case 'none': return
            }
            this.__close()
        }
    }

    __close() {
        this.subscriptions.unsubscribe()
        this.remove()
    }

    ngOnInit() {
        const busySub = this.remoteStateBusy$.subscribe(busy => {
            if (busy) { this.createLocationForm.disable() }
            else { this.createLocationForm.enable() }
        })
        const selectedParentSub = this.selectedMerchant$.pipe(
            combineLatestWith(this.selectedBrand$),
        ).subscribe(([merchant, brand]) => {
            if (brand) {
                this.parent.next('brand')
                this.createLocationForm.patchValue({ parent: 'brand', parentId: brand.id })
            } else if (merchant) {
                this.parent.next('merchant')
                this.createLocationForm.patchValue({ parent: 'merchant', parentId: merchant.id })
            } else {
                this.parent.next('none')
                this.createLocationForm.patchValue({ parent: 'none', parentId: '' })
            }
        })
        this.subscriptions.add(busySub)
        this.subscriptions.add(selectedParentSub)
    }

    ngOnDestroy() {
        console.log('CreateLocationWindowComponent destroyed')
        this.subscriptions.unsubscribe()
    }
}