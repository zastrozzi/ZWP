import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ZWPWindowComponent, WINDOW_COMPONENT_DATA } from '@zwp/platform.layout'
import { CDPUsers } from '@zwp/cdp.users'
import { State } from '../../+state'
import { Observable, Subscription, map, mergeMap, of, startWith } from 'rxjs'
import { BarcodeType, barcodeTypeLabelPipeSignature, InputColor, isNull, Nullable } from '@zwp/platform.common'
import { Model } from '../../model'

@ZWPWindowComponent('CreateLoyaltyCardWindowComponent')
@Component({
    selector: 'urnet-mnet-create-loyalty-card-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
            <div fxLayout="row" fxLayoutGap="20px" fxFlex="grow" zwpPadding="20">
                <form
                    fxLayout="column"
                    fxLayoutAlign="center stretch"
                    fxLayoutGap="10px"
                    fxFlex="grow"
                    [formGroup]="createLoyaltyCardForm"
                >
                    <div fxLayout="row" fxLayoutGap="10px" fxFlex="grow">
                        <div fxLayout="column" fxFlex="50" fxLayoutGap="10px" fxLayoutAlign="start stretch">
                            <div
                                *ngIf="enduser$ | async as enduser"
                                fxLayout="row"
                                fxLayoutAlign="start center"
                                fxLayoutGap="10px"
                                zwpCorners="4"
                                zwpBackgroundColor="tertiary-system-fill"
                                zwpPadding="10"
                            >
                                <span [zwpTextStyle]="'body1'" zwpColor="label">Enduser:</span>
                                <span [zwpTextStyle]="'body1'" zwpColor="primary">{{ enduser.firstName }} {{ enduser.lastName }}</span>
                            </div>
                            <mat-form-field
                                appearance="outline"
                                class="noHintFormField flexFormField noOutlineFormField"
                                zwpCorners="4"
                                zwpBackgroundColor="tertiary-system-fill"
                            >
                                <input
                                    matInput
                                    formControlName="cardScheme"
                                    placeholder="Card Scheme"
                                    [matAutocomplete]="auto"
                                />
                            </mat-form-field>
                            <mat-autocomplete #auto="matAutocomplete" hideSingleSelectionIndicator [displayWith]="schemeDisplayFn" class="zwp-window-overlay-zindex-10">
                                <mat-option *ngFor="let cardScheme of filteredLoyaltyCardSchemes$ | async" [value]="cardScheme">
                                    {{ cardScheme.displayName }}
                                </mat-option>
                            </mat-autocomplete>
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
                                <input matInput formControlName="barcodeData" placeholder="Barcode Data" />
                            </mat-form-field>
                            <mat-form-field
                                appearance="outline"
                                class="noHintFormField flexFormField noOutlineFormField"
                                zwpCorners="4"
                                zwpBackgroundColor="tertiary-system-fill"
                            >
                                <input matInput formControlName="cardNumber" placeholder="Card Number" />
                            </mat-form-field>
                            <mat-form-field
                                appearance="outline"
                                class="noHintFormField flexFormField noOutlineFormField"
                                zwpCorners="4"
                                zwpBackgroundColor="tertiary-system-fill"
                            >
                                <input matInput formControlName="cardPin" placeholder="Card PIN" />
                            </mat-form-field>
                        </div>
                    </div>
                    <div fxFlex="grow"></div>
                    <zwp-md-button
                        fxFlexAlign="end"
                        [label]="'Save New Loyalty Card'"
                        [icon]="'save'"
                        [disabled]="(remoteStateBusy$ | async) || createLoyaltyCardForm.invalid"
                        (btnClick)="saveLoyaltyCard()"
                    ></zwp-md-button>
                    
                </form>
            </div>
        </zwp-window>
    `,
})
export class CreateLoyaltyCardWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    private windowData = inject(WINDOW_COMPONENT_DATA) as {
        enduserId: string
    }

    private loyaltyCardFacade = inject(State.Facades.LoyaltyCardFacade)
    private loyaltyCardSchemeFacade = inject(State.Facades.LoyaltyCardSchemeFacade)
    private enduserFacade = inject(CDPUsers.State.EnduserFacade)
    private readonly subscriptions = new Subscription()

    remoteState$ = this.loyaltyCardFacade.loyaltyCardRemoteState$
    remoteStateBusy$ = this.remoteState$.pipe(map((remoteState) => remoteState.busy))
    remoteStateError$ = this.remoteState$.pipe(map((remoteState) => remoteState.error))

    enduser$ = this.enduserFacade.enduserById$(this.windowData.enduserId)
    loyaltyCardSchemes$ = this.loyaltyCardSchemeFacade.loyaltyCardSchemes$
    filteredLoyaltyCardSchemes$: Observable<Model.LoyaltyCardSchemeResponse[]> | undefined = of([])

    barcodeTypeEnumSignature = barcodeTypeLabelPipeSignature

    

    createLoyaltyCardForm = new FormGroup({
        displayName: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
        barcodeData: new FormControl<string | null>(null),
        cardNumber: new FormControl<string | null>(null),
        cardPin: new FormControl<string | null>(null),
        cardScheme: new FormControl<Model.LoyaltyCardSchemeResponse | null>(null, [Validators.required])
    })

    saveLoyaltyCard() {
        if (this.createLoyaltyCardForm.valid, !isNull(this.enduserId)) {
            this.loyaltyCardFacade.createLoyaltyCard(this.enduserId, {
                displayName: this.createLoyaltyCardForm.value.displayName ?? '',
                barcodeData: this.createLoyaltyCardForm.value.barcodeData ?? undefined,
                cardNumber: this.createLoyaltyCardForm.value.cardNumber ?? undefined,
                cardPin: this.createLoyaltyCardForm.value.cardPin ?? undefined,
                cardSchemeId: this.createLoyaltyCardForm.value.cardScheme?.id ?? '',
            })
            this.__close()
        }
    }

    __close() {
        this.subscriptions.unsubscribe()
        this.remove()
    }

    get enduserId() {
        return this.windowData.enduserId ?? null
    }

    schemeDisplayFn(scheme: Model.LoyaltyCardSchemeResponse): string {
        return scheme && scheme.displayName ? scheme.displayName : ''
    }

    ngOnInit() {
        this.loyaltyCardSchemeFacade.listLoyaltyCardSchemes(null, null, null)
        const busySub = this.remoteStateBusy$.subscribe((busy) => {
            if (busy) {
                this.createLoyaltyCardForm.disable()
            } else {
                this.createLoyaltyCardForm.enable()
            }
        })
        this.subscriptions.add(busySub)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.filteredLoyaltyCardSchemes$ = this.createLoyaltyCardForm.get('cardScheme')?.valueChanges.pipe(
            startWith(''),
            mergeMap(value => {
                const filterValue = typeof value === 'string' ? value.toLowerCase() : ''
                return this.loyaltyCardSchemes$.pipe(
                    map(schemes => schemes.filter(scheme => scheme.displayName.toLowerCase().includes(filterValue)))
                )
            })
        )
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }


}
