import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Model } from '../../model'

@Component({
    selector: 'fsn-tink-currency-denominated-amount-label',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <span
            *ngIf="amount"
            zwpCorners="5"
            zwpPadding="5 10"
            zwpTextStyle="body1"
            zwpColor="label"
            zwpBackgroundColor="secondary-system-fill"
        >{{ scaledAmount(amount.value) | currency:amount.currencyCode }}</span>
    `
})
export class CurrencyDenominatedAmountLabelComponent {
    @Input() amount?: Model.ClientAPIModel.Common.CurrencyDenominatedAmount

    scaledAmount(exactNumber: Model.ClientAPIModel.Common.ExactNumber): number {
        return exactNumber.unscaledValue / Math.pow(10, exactNumber.scale)
    }
}