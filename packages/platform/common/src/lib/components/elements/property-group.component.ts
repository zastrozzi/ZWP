import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Nilable, Nullable } from '../../model'

@Component({
    selector: 'zwp-property-group',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            [fxLayout]="layout"
            fxLayoutAlign="start stretch"
            fxLayoutGap="5px"
        >
            <span 
                [zwpTextStyle]="textStyle" 
                [zwpColor]="labelColor" 
                [zwpBackgroundColor]="backgroundColor"
                zwpPadding="8px"
                fxFlexAlign="start"
                zwpCorners="5"
            >{{ label }}</span>
            <ng-content></ng-content>
        </div>
    `,
})
export class PropertyGroupComponent {
    @Input() label = 'Label'
    @Input() backgroundColor = 'quaternary-system-fill'
    @Input() labelColor = 'label'
    @Input() textStyle = 'body1'
    @Input() layout: 'row' | 'column' = 'column'
}
