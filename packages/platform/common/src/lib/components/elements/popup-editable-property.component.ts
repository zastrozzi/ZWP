import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Nilable, Nullable } from '../../model'
import { isNil } from '../../utils'

@Component({
    selector: 'zwp-popup-editable-property',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="5px">
            <div
                [fxLayout]="layout"
                fxLayoutAlign="space-between stretch"
                fxLayoutGap="5px"
                zwpPadding="8px"
                zwpCorners="5"
                fxFlex="grow"
                [zwpBackgroundColor]="backgroundColor"
            >
                <span [zwpTextStyle]="textStyle" [zwpColor]="labelColor">{{ label }}</span>
                <ng-container [ngSwitch]="propertyIsNil">
                    <span
                        *ngSwitchCase="true"
                        [zwpTextStyle]="textStyle"
                        [zwpColor]="propertyColor"
                        [style.overflowWrap]="'break-word'"
                        [style.opacity]="0.5"
                        >Empty</span
                    >
                    <ng-container *ngSwitchCase="false" [ngSwitch]="isArray">
                        <span
                            *ngSwitchCase="false"
                            [zwpTextStyle]="textStyle"
                            [zwpColor]="propertyColor"
                            [style.overflowWrap]="'break-word'"
                            >{{ property }}</span
                        >
                        <div *ngSwitchCase="true" [fxLayout]="layoutOpposite" fxLayoutGap="10px">
                            <span
                                *ngFor="let item of property"
                                [zwpTextStyle]="textStyle"
                                [zwpColor]="propertyColor"
                                [style.overflowWrap]="'break-word'"
                                >{{ item }}</span
                            >
                        </div>
                    </ng-container>
                </ng-container>
            </div>
            <zwp-md-icon-button
                (btnClick)="presentEditPopup()"
                textStyle="button1"
                icon="edit"
                [iconRotation]="0"
                backgroundColor="#00000000"
                [iconPadding]="5"
                [iconColor]="'system-gray3' | zwpColorTheme"
            ></zwp-md-icon-button>
        </div>
    `,
})
export class PopupEditablePropertyComponent {
    @Input() label = 'Label'
    @Input() property: Nilable<string | string[]> = 'Property'
    @Input() backgroundColor = 'quaternary-system-fill'
    @Input() labelColor = 'label'
    @Input() propertyColor = 'primary'
    @Input() textStyle = 'body1'
    @Input() layout: 'row wrap' | 'column' = 'row wrap'

    get isArray(): boolean {
        return Array.isArray(this.property)
    }

    get layoutOpposite(): 'row wrap' | 'column' {
        return this.layout === 'row wrap' ? 'column' : 'row wrap'
    }

    get propertyIsNil(): boolean {
        return isNil(this.property)
    }

    presentEditPopup() {
        console.log('edit!')
    }
}
