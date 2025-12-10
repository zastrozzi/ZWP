import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { ZWPRightPanelComponent, RIGHT_PANEL_COMPONENT_DATA } from '@zwp/platform.layout'
import { QueryableSchemaTableResponse } from '../../../model/responses'
import { State } from '../../../+state'
import { v4 } from 'uuid'
import { distinct, map } from 'rxjs'
import { Model } from '../../../model'

@ZWPRightPanelComponent('QueryableSchemaTableDetailsRightPanelComponent')
@Component({
    selector: 'kdq-queryable-schema-table-details-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlexFill fxLayoutGap="5px" zwpPadding="5 0">
            <div fxLayout="column"zwpPadding="0 5" fxLayoutGap="5px">
            <zwp-labelled-property [label]="'Model Name'" [property]="componentData.table.displayName" />
            <zwp-labelled-property [label]="'Database Schema'" [property]="componentData.table.tableIdentifiers.schema"/>
            <zwp-labelled-property [label]="'Database Table'" [property]="componentData.table.tableIdentifiers.table"/>
            </div>
            
            <zwp-divider></zwp-divider>
            <!-- <span [zwpTextStyle]="'subheadline'" [style.color]="'label' | zwpColorTheme" zwpPadding="5 10">Columns</span> -->
            <div fxLayout="row" fxLayoutAlign="start center" zwpPadding="0 5" fxLayoutGap="5px">
            <zwp-md-button
                [textStyle]="'button1'"
                label="Columns" materialType="flat" icon="list_alt"
                [backgroundColor]="viewMode === 'columns' ? ('primary' | zwpColorTheme) : ('quaternary-system-fill' | zwpColorTheme)"
                [labelColor]="viewMode === 'columns' ? ('system-white' | zwpColorTheme) : ('primary' | zwpColorTheme)"
                
                (btnClick)="onColumnsModeClicked()"
            ></zwp-md-button>
            <zwp-md-button
                [textStyle]="'button1'"
                label="Relationships" materialType="flat" icon="join_left"
                [backgroundColor]="viewMode === 'relationships' ? ('primary' | zwpColorTheme) : ('quaternary-system-fill' | zwpColorTheme)"
                [labelColor]="viewMode === 'relationships' ? ('system-white' | zwpColorTheme) : ('primary' | zwpColorTheme)"

                (btnClick)="onRelationshipsModeClicked()"
            ></zwp-md-button>
            </div>
            <zwp-divider></zwp-divider>
            <div fxLayout="column" zwpPadding="0 5" fxLayoutGap="5px" *ngIf="viewMode === 'columns'">
                <ng-container *ngFor="let column of columns$ | async">
                    <kdq-qs-column-props [columnProperties]="column"></kdq-qs-column-props>
                </ng-container>
            </div>
            <div fxLayout="column" zwpPadding="0 5"  fxLayoutGap="5px" *ngIf="viewMode === 'relationships'">
                <ng-container *ngFor="let relationship of relationships$ | async">
                    <!-- <span [zwpTextStyle]="'body1'" zwpColor="label">{{relationship | json}}</span> -->
                    <kdq-qs-relationship-props [relationshipProperties]="relationship"></kdq-qs-relationship-props>
                </ng-container>
            </div>
        </div>
    `
})
export class QueryableSchemaTableDetailsRightPanelComponent implements OnInit {
    componentData = inject(RIGHT_PANEL_COMPONENT_DATA) as { table: QueryableSchemaTableResponse }
    private tableFacade = inject(State.Facades.QueryableSchemaTableFacade)
    private columnFacade = inject(State.Facades.QueryableSchemaColumnFacade)
    private relationshipFacade = inject(State.Facades.QueryableSchemaRelationshipFacade)
    viewMode: 'columns' | 'relationships' = 'columns'

    columns$ = this.columnFacade.columnsForTable$(this.componentData.table.id)
    relationships$ = this.relationshipFacade.uniqueRelationshipsForTable$(this.componentData.table.id)

    ngOnInit() {
        this.onColumnsModeClicked()
    }

    onColumnsModeClicked() {
        this.viewMode = 'columns'
        this.columnFacade.listColumns(this.componentData.table.id)
    }

    onRelationshipsModeClicked() {
        this.viewMode = 'relationships'
        // this.relationshipFacade.listRelationships(this.componentData.table.id, Model.RelationshipType.oneToMany)
        this.relationshipFacade.listRelationships(this.componentData.table.id)
        // this.relationshipFacade.listRelationships(this.componentData.table.id, Model.RelationshipType.manyToOne)
    }

    // static override initialPosition: WindowPosition = {
    //     height: '500px', width: '60vw', left: 'calc(20vw + 0px)', top: 'calc(50vh - 250px)'
    // }

    

    // override ngOnChanges(changes: SimpleChanges): void {
    //     console.log(changes, 'got changes')
    //     this.windowEntity = changes['windowEntity'].currentValue
    // }
}