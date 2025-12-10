import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Model } from '../model'
import { FormControl } from '@angular/forms'

@Component({
    selector: 'urnet-mnet-home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxLayoutAlign="center center" fxFlexFill>
            <span [zwpTextStyle]="'headline'"></span>
            
        </div>
    `
})
export class AffiliateWindowHomeComponent {
    
}