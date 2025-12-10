import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ZWPWindowComponent } from '@zwp/platform.layout'
import { State } from '../../+state'
import { BehaviorSubject, Subscription, combineLatestWith, debounceTime, map, startWith, take, tap } from 'rxjs'
import { Model } from '../../model'
import { allEnumCases, coerceNumber, ISO4217ActiveCurrencyCode, ISO4217ActiveCurrencyName, TransformEnumPipeSignature } from '@zwp/platform.common'

@ZWPWindowComponent('CreateOfferWindowComponent')
@Component({
    selector: 'urnet-mnet-create-offer-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
            <div fxLayout="row" fxLayoutGap="20px" fxFlex="grow" zwpPadding="15">
                <form 
                    fxLayout="column" fxLayoutAlign="start stretch" fxLayoutGap="10px" fxFlex="grow"
                    [formGroup]="createOfferForm"
                >
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
                    <mat-form-field 
                        appearance="outline"
                        class="noHintFormField flexFormField noOutlineFormField" 
                        zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                    >
                        <input matInput formControlName="title" placeholder="Offer Name" cdkFocusInitial />
                    </mat-form-field>
                    <mat-form-field 
                        appearance="outline"
                        class="noHintFormField flexFormField noOutlineFormField" 
                        zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                    >
                        <textarea matInput formControlName="description" placeholder="Description"></textarea>
                    </mat-form-field>
                    <span [zwpTextStyle]="'caption2'">Reward Type</span>
                    <zwp-chip-grid-input
                        [enumInput]="createOfferForm.controls.operation"
                        [transformSignature]="operationEnumSignature"
                        [textStyle]="'button1'"
                    ></zwp-chip-grid-input>
                    <zwp-divider></zwp-divider>
                    
                    <span [zwpTextStyle]="'caption2'">Weekly Schedule</span>
                    <zwp-chip-grid-input
                        [enumInput]="createOfferForm.controls.daysOfWeek"
                        [transformSignature]="weekdayEnumSignature"
                        [enumSort]="weekdayEnumSort"
                        [multi]="true"
                        [textStyle]="'button1'"
                    ></zwp-chip-grid-input>
                    <div fxLayout="row" fxLayoutGap="10px">
                        <mat-form-field 
                            fxFlex="grow"
                            appearance="outline"
                            class="noHintFormField flexFormField noOutlineFormField" 
                            zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                        >
                            <input matInput formControlName="startDate" placeholder="Start Date" [matDatepicker]="startDatePicker"/>
                            <mat-datepicker-toggle matIconSuffix [for]="startDatePicker"></mat-datepicker-toggle>
                            <mat-datepicker #startDatePicker panelClass="zwp-window-overlay-zindex-10"></mat-datepicker>
                        </mat-form-field>
                        <mat-form-field 
                            fxFlex="grow"
                            appearance="outline"
                            class="noHintFormField flexFormField noOutlineFormField" 
                            zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                        >
                            <input matInput formControlName="endDate" placeholder="End Date" [matDatepicker]="endDatePicker"/>
                            <mat-datepicker-toggle matIconSuffix [for]="endDatePicker"></mat-datepicker-toggle>
                            <mat-datepicker #endDatePicker panelClass="zwp-window-overlay-zindex-10"></mat-datepicker>
                        </mat-form-field>
                    </div>
                    <zwp-divider></zwp-divider>
                    <span [zwpTextStyle]="'caption2'">Transaction Values</span>
                    <div fxLayout="row" fxLayoutGap="10px" >
                        <mat-form-field 
                            *ngIf="this.showOperandFlat()"
                            fxFlex="grow"
                            appearance="outline"
                            class="noHintFormField flexFormField noOutlineFormField" 
                            zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                        >
                        <input matInput formControlName="operandFlatAmount" placeholder="Offer Value"/>
                        </mat-form-field>
                        <mat-form-field 
                            *ngIf="!this.showOperandFlat()"
                            fxFlex="grow"
                            appearance="outline"
                            class="noHintFormField flexFormField noOutlineFormField" 
                            zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                        >
                        <input matInput formControlName="operandPercent" placeholder="Offer Percentage" />
                    </mat-form-field>
                    <mat-form-field 
                            fxFlex="grow"
                            appearance="outline"
                            class="noHintFormField flexFormField noOutlineFormField" 
                            zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                        >
                        <input matInput formControlName="rewardMaxAmount" placeholder="Maximum Reward Value" />
                    </mat-form-field>
                    </div>
                    
                    <div fxLayout="row" fxLayoutGap="10px">
                    <mat-form-field 
                            fxFlex="grow"
                            appearance="outline"
                            class="noHintFormField flexFormField noOutlineFormField" 
                            zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                        >
                        <input matInput formControlName="purchaseMinAmount" placeholder="Minimum Purchase Amount"/>
                        </mat-form-field>
                        <mat-form-field 
                            fxFlex="grow"
                            appearance="outline"
                            class="noHintFormField flexFormField noOutlineFormField" 
                            zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                        >
                        <input matInput formControlName="purchaseMaxAmount" placeholder="Maximum Purchase Amount"/>
                        </mat-form-field>
                    </div>
                    
                </form>
            </div>
            <ng-template #windowFooter>
                <zwp-md-button 
                    fxFlexAlign="end"
                    [label]="'Save New Offer'" [icon]="'local_offer'"
                    [disabled]="(remoteStateBusy$ | async) || createOfferForm.invalid"
                    (btnClick)="saveOffer()"
                ></zwp-md-button>
            </ng-template>
        </zwp-window>
    `
})
export class CreateOfferWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    private offerFacade = inject(State.Facades.OfferFacade)
    private merchantFacade = inject(State.Facades.MerchantFacade)
    private brandFacade = inject(State.Facades.BrandFacade)
    private readonly subscriptions = new Subscription()
    // private changeDetector = inject(ChangeDetectorRef)

    operationEnumSignature: TransformEnumPipeSignature = { input: Model.OfferOperation, output: Model.OfferOperationLabel }
    weekdayEnumSignature: TransformEnumPipeSignature = { input: Model.OfferWeekday, output: Model.OfferWeekdayLabel }
    currencyEnumSignature: TransformEnumPipeSignature = { input: ISO4217ActiveCurrencyCode, output: ISO4217ActiveCurrencyName }

    weekdayEnumSort = Model.offerWeekdaySort

    remoteState$ = this.offerFacade.offerRemoteState$
    remoteStateBusy$ = this.remoteState$.pipe(map(remoteState => remoteState.busy))
    remoteStateError$ = this.remoteState$.pipe(map(remoteState => remoteState.error))

    selectedMerchant$ = this.merchantFacade.selectedMerchant$
    selectedBrand$ = this.brandFacade.selectedBrand$
    parent: BehaviorSubject<'merchant' | 'brand' | 'none'> = new BehaviorSubject<'merchant' | 'brand' | 'none'>('none')

    createOfferForm = new FormGroup({
        parent: new FormControl<'merchant' | 'brand' | 'none'>('none'),
        parentId: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
        title: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
        description: new FormControl<string>(''),
        operation: new FormControl<Model.OfferOperation>(Model.OfferOperation.cashbackFixed, [Validators.required]),
        operandFlatCurrency: new FormControl<ISO4217ActiveCurrencyCode | null>(null),
        operandFlatAmount: new FormControl<number | null>(null),
        operandPercent: new FormControl<number | null>(null),
        purchaseMaxCurrency: new FormControl<ISO4217ActiveCurrencyCode | null>(null),
        purchaseMaxAmount: new FormControl<number | null>(null),
        purchaseMinCurrency: new FormControl<ISO4217ActiveCurrencyCode | null>(null),
        purchaseMinAmount: new FormControl<number | null>(null),
        rewardMaxCurrency: new FormControl<ISO4217ActiveCurrencyCode | null>(null),
        rewardMaxAmount: new FormControl<number | null>(null),
        daysOfWeek: new FormControl<Model.OfferWeekday[]>(allEnumCases(Model.OfferWeekday), [Validators.required]),
        startDate: new FormControl<Date | null>(null, [Validators.required]),
        endDate: new FormControl<Date | null>(null)
    })

    saveOffer() {
        if (this.createOfferForm.valid) {
            const offerDto: Model.CreateOfferRequest = {
                title: this.createOfferForm.value.title ?? '',
                description: this.createOfferForm.value.description ?? undefined,
                category: '',
                operation: this.createOfferForm.value.operation as Model.OfferOperation,
                operandFlat: {
                    currency: this.createOfferForm.value.operandFlatCurrency ?? undefined,
                    amount: this.createOfferForm.value.operandFlatAmount ? coerceNumber(this.createOfferForm.value.operandFlatAmount) : undefined
                },
                operandPercent: this.createOfferForm.value.operandPercent ? coerceNumber(this.createOfferForm.value.operandPercent) : undefined,
                purchaseMax: {
                    currency: this.createOfferForm.value.purchaseMaxCurrency ?? undefined,
                    amount: this.createOfferForm.value.purchaseMaxAmount ? coerceNumber(this.createOfferForm.value.purchaseMaxAmount) : undefined
                },
                purchaseMin: {
                    currency: this.createOfferForm.value.purchaseMinCurrency ?? undefined,
                    amount: this.createOfferForm.value.purchaseMinAmount ? coerceNumber(this.createOfferForm.value.purchaseMinAmount) : undefined
                },
                rewardMax: {
                    currency: this.createOfferForm.value.rewardMaxCurrency ?? undefined,
                    amount: this.createOfferForm.value.rewardMaxAmount ? coerceNumber(this.createOfferForm.value.rewardMaxAmount) : undefined
                },
                daysOfWeek: this.createOfferForm.value.daysOfWeek ?? [],
                startDate: (this.createOfferForm.value.startDate ?? new Date()).toISOString() as unknown as Date,
                endDate: (this.createOfferForm.value.endDate ?? new Date()).toISOString() as unknown as Date
            }
            const parentId = this.createOfferForm.value.parentId ?? ''
            switch (this.createOfferForm.value.parent) {
                case 'merchant':
                    this.offerFacade.createOffer(null, parentId, offerDto)
                    break
                case 'brand':
                    this.offerFacade.createOffer(parentId, null, offerDto)
                    break
                case 'none': return
            }
            this.__close()
        }
    }

    showOperandFlat() {
        return this.createOfferForm.value.operation === Model.OfferOperation.cashbackFixed || this.createOfferForm.value.operation === Model.OfferOperation.discountFixed
    }

    __close() {
        this.subscriptions.unsubscribe()
        this.remove()
    }

    ngOnInit() {
        const busySub = this.remoteStateBusy$.subscribe(busy => {
            if (busy) { this.createOfferForm.disable() }
            else { this.createOfferForm.enable() }
        })
        const selectedParentSub = this.selectedMerchant$.pipe(
            combineLatestWith(this.selectedBrand$),
        ).subscribe(([merchant, brand]) => {
            if (brand) {
                this.parent.next('brand')
                this.createOfferForm.patchValue({ parent: 'brand', parentId: brand.id })
            } else if (merchant) {
                this.parent.next('merchant')
                this.createOfferForm.patchValue({ parent: 'merchant', parentId: merchant.id })
            } else {
                this.parent.next('none')
                this.createOfferForm.patchValue({ parent: 'none', parentId: '' })
            }
        })
        const windowLabelSub = this.createOfferForm.controls.title.valueChanges.pipe(
            startWith(''),
            debounceTime(100),
            map(title => (title && title.length > 0) ? `New Offer - ${title}` : 'New Offer')
        ).subscribe(label => { 
            // if (this.windowEntity) { 
                this._windowLayoutFacade.renameWindow(this.windowId, label) 
            // } 
        })
        this.subscriptions.add(busySub)
        this.subscriptions.add(selectedParentSub)
        this.subscriptions.add(windowLabelSub)
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }
}