import { ChangeDetectionStrategy, Component, Input } from "@angular/core"

@Component({
    selector: 'zwp-attribute-property',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            fxLayout="row"
            fxLayoutAlign="center center"
            zwpPadding="5px"
            zwpCorners="5"
            [zwpBackgroundColor]="backgroundColor"
        >
            <span [zwpTextStyle]="textStyle" [zwpColor]="labelColor">{{attribute}}</span>
        </div>
    `,
})
export class AttributePropertyComponent {
    @Input() attribute = 'Attribute'
    @Input() backgroundColor = 'quaternary-system-fill'
    @Input() labelColor = 'label'
    @Input() textStyle = 'body2'
    @Input() textAlign: 'left' | 'center' = 'center'
    @Input() overflowWrap: 'break-word' | 'anywhere' = 'break-word'
}