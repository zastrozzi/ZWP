import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Model } from '../../../model'

@Component({
    selector: 'kdq-qs-column-props',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            fxLayout="column"
            fxLayoutAlign="center stretch"
            fxLayoutGap="5px"
            zwpPadding="5px"
            zwpCorners="5"
            zwpBackgroundColor="tertiary-system-fill"
            
        >
            <div
                fxLayout="row"
                fxLayoutAlign="space-between baseline"
                zwpPadding="8px 10px"
                zwpBackgroundColor="system-background"
                zwpCorners= "5 5 5 5"
            >
                <span [zwpTextStyle]="'body1'" zwpColor="label">{{columnProperties.columnIdentifiers.field}}</span>
                <span
                    [zwpTextStyle]="'body1'"
                    [style.color]="'primary' | zwpColorTheme"
                    >{{
                        columnProperties.dataType === customDataType
                            ? columnProperties.customDataType
                            : (columnProperties.dataType | zwpTransformEnum: dataTypeLabelTransform)
                    }}</span
                >
            </div>
            <!-- <zwp-divider/> -->
            <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="3px">
                <zwp-attribute-property *ngIf="columnProperties.isNullable" 
                    [attribute]="'Optional'" [labelColor]="'system-white'" [backgroundColor]="'system-gray3'"
                />
                <zwp-attribute-property *ngIf="!columnProperties.isNullable" 
                    [attribute]="'Required'" [labelColor]="'system-white'" [backgroundColor]="'system-gray'"
                />
                <zwp-attribute-property *ngIf="columnProperties.isPrimaryKey" 
                    [attribute]="'Primary Key'" [labelColor]="'system-white'" [backgroundColor]="'primary'"
                />
                <zwp-attribute-property *ngIf="columnProperties.isForeignKey" 
                    [attribute]="'Foreign Key'" [labelColor]="'system-white'" [backgroundColor]="'secondary'"
                />
                <zwp-attribute-property *ngIf="columnProperties.isUnique" 
                    [attribute]="'Unique'" [labelColor]="'system-white'" [backgroundColor]="'secondary'"
                />
                
            </div>
        </div>
    `,
})
export class QueryableSchemaColumnPropertiesComponent {
    @Input() columnProperties!: Model.QueryableSchemaColumnResponse
    customDataType = Model.ColumnDataType.custom

    dataTypeLabelTransform = Model.columnDataTypeLabelPipeSignature
}