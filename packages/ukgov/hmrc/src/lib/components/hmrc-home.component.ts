import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'ukgov-hmrc-home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxLayoutAlign="center center" fxFlexFill>
            <span [zwpTextStyle]="'headline'">HMRC</span>
        </div>
    `
})
export class HMRCHomeComponent {
    constructor() {
        //
    }
}