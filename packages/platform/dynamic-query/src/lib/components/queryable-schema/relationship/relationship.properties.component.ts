import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core'
import { Model } from '../../../model'
import { State } from '../../../+state'
import { Observable, of, tap } from 'rxjs'
import { isUndefined } from '@zwp/platform.common'
import { ZWPPanelLayoutFacade } from '@zwp/platform.layout'

@Component({
    selector: 'kdq-qs-relationship-props',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container *ngIf="table$ | async as table">
            
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
                    fxLayoutAlign="start center"
                    zwpPadding="0px 0px 0px 10px"
                    zwpBackgroundColor="system-background"
                    zwpCorners= "5 5 5 5"
                    fxLayoutGap="15px"
                >
                    <span [zwpTextStyle]="'body1'" zwpColor="label">{{table.displayName}}</span>  
                    <div fxFlex="auto"></div>  
                    <zwp-md-button
                        (btnClick)="onTableClicked(table)"
                        [icon]="'chevron_right'" [label]="''" [layoutGap]="'0px'"
                        [iconColor]="'primary' | zwpColorTheme"
                        [backgroundColor]="'clear' | zwpColorTheme"
                        [textStyle]="'headline'"
                        [isCollapsed]="true"
                        [padding]="'5 10 5 10'"
                    ></zwp-md-button>
                </div>
            <!-- <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="3px">
                <zwp-attribute-property 
                    [attribute]="
                        relationshipProperties.fromColumn.schema + '.' 
                        + relationshipProperties.fromColumn.table + '.' 
                        + relationshipProperties.fromColumn.field
                    " [labelColor]="'system-white'" [backgroundColor]="'system-gray3'"
                />
                <zwp-attribute-property 
                    [attribute]="
                        relationshipProperties.toColumn.schema + '.' 
                        + relationshipProperties.toColumn.table + '.' 
                        + relationshipProperties.toColumn.field
                    " [labelColor]="'system-white'" [backgroundColor]="'system-gray3'"
                />
            </div> -->
            <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="3px">
                
                <zwp-attribute-property 
                    [attribute]="relationshipProperties.relationshipType | zwpTransformEnum: relationshipLabelTransform" 
                    [labelColor]="'system-white'" [backgroundColor]="'secondary'"
                />
                <ng-container *ngIf="throughTable$ | async as throughTable">
                    <zwp-attribute-property 
                        [attribute]="'via ' + throughTable.displayName" 
                        [labelColor]="'system-white'" [backgroundColor]="'secondary'"
                        (click)="onTableClicked(throughTable)"
                    />
                </ng-container>
                <zwp-attribute-property *ngIf="relationshipProperties.isOptional" 
                    [attribute]="'Optional'" [labelColor]="'system-white'" [backgroundColor]="'system-gray3'"
                />
                <zwp-attribute-property *ngIf="!relationshipProperties.isOptional" 
                    [attribute]="'Required'" [labelColor]="'system-white'" [backgroundColor]="'system-gray'"
                />
                <!-- <zwp-attribute-property *ngIf="!columnProperties.isNullable" 
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
                /> -->
                
            </div>
        </div>
        </ng-container>
        
    `,
})
export class QueryableSchemaRelationshipPropertiesComponent implements OnInit {
    @Input() relationshipProperties!: Model.QueryableSchemaRelationshipResponse
    private tableFacade = inject(State.Facades.QueryableSchemaTableFacade)
    private panelLayoutFacade = inject(ZWPPanelLayoutFacade)

    relationshipLabelTransform = Model.relationshipLabelPipeSignature

    table$: Observable<Model.QueryableSchemaTableResponse | undefined> = of(undefined)
    throughTable$: Observable<Model.QueryableSchemaTableResponse | undefined> = of(undefined)

    ngOnInit() {
        this.table$ = this.tableFacade.tableById$(this.relationshipProperties.toTableId)
            .pipe(
                tap(table => {
                    if (isUndefined(table)) {
                        this.tableFacade.getTable(this.relationshipProperties.toTableId)
                    }
                })
            )
        const joinTableId = this.relationshipProperties.joinTableId
        if (!isUndefined(joinTableId)) {
            this.throughTable$ = this.tableFacade.tableById$(joinTableId)
                .pipe(
                    tap(table => {
                        if (isUndefined(table)) {
                            this.tableFacade.getTable(joinTableId)
                        }
                    })
                )
        }
    }

    onTableClicked(table: Model.QueryableSchemaTableResponse) {
        this.panelLayoutFacade.addRightPanel({
            id: `${table.id}-table-details`,
            label: `Table Details - ${table.displayName}`,
            icon: 'table_rows',
            componentName: 'QueryableSchemaTableDetailsRightPanelComponent',
            data: {
                table
            }
        })
    }

}