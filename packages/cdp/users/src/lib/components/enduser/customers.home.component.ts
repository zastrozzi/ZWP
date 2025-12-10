import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'cdp-users-customers-home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxLayoutAlign="center center" fxFlexFill>
            <span [zwpTextStyle]="'title3'" [zwpColor]="'primary'"></span>
        </div>
    `
})
export class CustomersHomeComponent {
    constructor() {
        //
    }
}