import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { ZWPRightPanelComponent, RIGHT_PANEL_COMPONENT_DATA } from '@zwp/platform.layout'
import { Model } from '../../model'
import { State } from '../../+state'
import { v4 } from 'uuid'
import { distinct, map, Observable, of, tap } from 'rxjs'
import { BarcodeType, InputColor, isUndefined } from '@zwp/platform.common'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@ZWPRightPanelComponent('LoyaltyCardDetailRightPanelComponent')
@Component({
    selector: 'urnet-mnet-loyalty-card-detail-right-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlexFill fxLayoutGap="5px" zwpPadding="5 0">
            <ng-container *ngIf="loyaltyCard$ | async as loyaltyCard">
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
                                [property]="loyaltyCard.displayName"
                            />
                    <zwp-labelled-property
                        [label]="'Created At'"
                        [property]="loyaltyCard.dbCreatedAt | date : 'yyyy/MM/dd HH:mm:ss'"
                    />
                    <zwp-labelled-property
                        [label]="'Updated At'"
                        [property]="loyaltyCard.dbUpdatedAt | date : 'yyyy/MM/dd HH:mm:ss'"
                    />
                    <!-- <zwp-labelled-property
                        [label]="'Status'"
                        [property]="loyaltyCardScheme.status | zwpTransformEnum : statusEnumSignature"
                    />
                    <zwp-labelled-property
                        [label]="'Logo URL'"
                        [property]="loyaltyCardScheme.logoUrl ?? ''"
                        layout="column"
                    /> -->
                    <!-- <zwp-labelled-property [label]="'Link'" [property]="loyaltyCardScheme.selfLink ?? ''" /> -->
                    <!-- <zwp-labelled-property [label]="'Google ID'" [property]="loyaltyCardScheme.googleId ?? ''" /> -->
                    <!-- <div fxFlexAlign="stretch" fxFlexOffset="10px" [style.position]="'relative'">
                        <img
                            zwpCorners="5"
                            [ngSrc]="loyaltyCardScheme.logoUrl ?? ''"
                            fill
                            [style.height]="'auto'"
                            [style.position]="'relative'"
                            priority
                        />
                    </div> -->
                </div>
            </ng-container>

            <zwp-divider></zwp-divider>
        </div>
    `,
})
export class LoyaltyCardDetailRightPanelComponent implements OnInit {
    componentData = inject(RIGHT_PANEL_COMPONENT_DATA) as { loyaltyCardId: string }
    private loyaltyCardFacade = inject(State.Facades.LoyaltyCardFacade)
    private loyaltyCardSchemeFacade = inject(State.Facades.LoyaltyCardSchemeFacade)

    loyaltyCard$: Observable<Model.LoyaltyCardResponse | undefined> = of(undefined)
    statusEnumSignature = Model.loyaltyCardSchemeStatusLabelPipeSignature

    requestedIds: Set<string> = new Set()

    editLoyaltyCardForm = new FormGroup({
        displayName: new FormControl<string | null>(null, [Validators.required, Validators.minLength(1)])
    })

    ngOnInit() {
        this.loyaltyCard$ = this.loyaltyCardFacade
            .loyaltyCardById$(this.componentData.loyaltyCardId)
            .pipe(
                tap((loyaltyCard) => {
                    if (isUndefined(loyaltyCard) && !this.requestedIds.has(this.componentData.loyaltyCardId)) {
                        this.requestedIds.add(this.componentData.loyaltyCardId)
                        this.loyaltyCardFacade.getLoyaltyCard(this.componentData.loyaltyCardId)
                    }
                })
            )
    }

    getControl(field: string) {
        return this.editLoyaltyCardForm.get(field) as FormControl
    }

    updateField(field: string) {
        const control = this.editLoyaltyCardForm.get(field)
        
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
