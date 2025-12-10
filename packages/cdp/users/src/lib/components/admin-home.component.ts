import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
    selector: 'cdp-users-admin-home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxLayoutAlign="center center" fxFlexFill>
            
        </div>
    `
})
export class AdminHomeComponent {
    constructor() {
        //
    }
}