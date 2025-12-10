import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { ZWPRightPanelComponent, RIGHT_PANEL_COMPONENT_DATA } from '@zwp/platform.layout'
import { Model } from '../../model'
import { State } from '../../+state'
import { v4 } from 'uuid'
import { distinct, map, Observable, of, tap } from 'rxjs'
import { BarcodeType, InputColor, isUndefined } from '@zwp/platform.common'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@ZWPRightPanelComponent('LoyaltyCardSchemeDetailRightPanelComponent')
@Component({
    selector: 'urnet-mnet-loyalty-card-scheme-detail-right-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlexFill fxLayoutGap="5px" zwpPadding="5 0">
            <ng-container *ngIf="loyaltyCardScheme$ | async as loyaltyCardScheme">
                <div fxLayout="column" zwpPadding="0 5" fxLayoutGap="5px" fxLayoutAlign="start stretch">
                    <!-- <zwp-editable-property (update)="updateField('displayName')">
                        <ng-template zwpViewMode>
                            <zwp-labelled-property
                                [label]="'Display Name'"
                                [property]="loyaltyCardScheme.displayName"
                            />
                        </ng-template>
                        <ng-template zwpEditMode>
                            <input [formControl]="getControl('displayName')" focusable>
                        </ng-template>
                    </zwp-editable-property> -->
                    <zwp-labelled-property
                                [label]="'Display Name'"
                                [property]="loyaltyCardScheme.displayName"
                            />
                    <zwp-labelled-property
                        [label]="'Created At'"
                        [property]="loyaltyCardScheme.dbCreatedAt | date : 'yyyy/MM/dd HH:mm:ss'"
                    />
                    <zwp-labelled-property
                        [label]="'Updated At'"
                        [property]="loyaltyCardScheme.dbUpdatedAt | date : 'yyyy/MM/dd HH:mm:ss'"
                    />
                    <zwp-labelled-property
                        [label]="'Status'"
                        [property]="loyaltyCardScheme.status | zwpTransformEnum : statusEnumSignature"
                    />
                    <zwp-labelled-property
                        [label]="'Logo URL'"
                        [property]="loyaltyCardScheme.logoUrl ?? ''"
                        layout="column"
                    />
                    <!-- <zwp-labelled-property [label]="'Link'" [property]="loyaltyCardScheme.selfLink ?? ''" /> -->
                    <!-- <zwp-labelled-property [label]="'Google ID'" [property]="loyaltyCardScheme.googleId ?? ''" /> -->
                    <div fxFlexAlign="stretch" fxFlexOffset="10px" [style.position]="'relative'">
                        <img
                            zwpCorners="5"
                            [ngSrc]="loyaltyCardScheme.logoUrl ?? ''"
                            fill
                            [style.height]="'auto'"
                            [style.position]="'relative'"
                            priority
                        />
                    </div>
                    <urnet-mnet-loyalty-card-scheme-brand-selector [merchantId]="loyaltyCardScheme.merchantId" [loyaltyCardSchemeId]="loyaltyCardScheme.id"/>
                </div>
            </ng-container>

            <zwp-divider></zwp-divider>
        </div>
    `,
})
export class LoyaltyCardSchemeDetailRightPanelComponent implements OnInit {
    componentData = inject(RIGHT_PANEL_COMPONENT_DATA) as { loyaltyCardSchemeId: string }
    private loyaltyCardSchemeFacade = inject(State.Facades.LoyaltyCardSchemeFacade)

    loyaltyCardScheme$: Observable<Model.LoyaltyCardSchemeResponse | undefined> = of(undefined)
    statusEnumSignature = Model.loyaltyCardSchemeStatusLabelPipeSignature

    editLoyaltyCardSchemeForm = new FormGroup({
        displayName: new FormControl<string | null>(null, [Validators.required, Validators.minLength(1)]),
        hasBarcode: new FormControl<boolean | null>(null, [Validators.required]),
        barcodeType: new FormControl<BarcodeType | null>(null),
        logoUrl: new FormControl<string | null>(null),
        primaryColorHexString: new FormControl<InputColor | null>(null),
        secondaryColorHexString: new FormControl<InputColor | null>(null),
        backgroundColorHexString: new FormControl<InputColor | null>(null),
    })

    ngOnInit() {
        this.loyaltyCardScheme$ = this.loyaltyCardSchemeFacade
            .loyaltyCardSchemeById$(this.componentData.loyaltyCardSchemeId)
            .pipe(
                tap((loyaltyCardScheme) => {
                    if (isUndefined(loyaltyCardScheme)) {
                        this.loyaltyCardSchemeFacade.getLoyaltyCardScheme(this.componentData.loyaltyCardSchemeId)
                    }
                })
            )
    }

    getControl(field: string) {
        return this.editLoyaltyCardSchemeForm.get(field) as FormControl
    }

    updateField(field: string) {
        const control = this.editLoyaltyCardSchemeForm.get(field)
        
        // const control = this.getControl(field)
        // if (control.valid) {
        //     this.entities = this.entities.map((e, i) => {
        //         if (index === i) {
        //             return {
        //                 ...e,
        //                 [field]: control.value,
        //             }
        //         }
        //         return e
        //     })
        // }
    }
}
