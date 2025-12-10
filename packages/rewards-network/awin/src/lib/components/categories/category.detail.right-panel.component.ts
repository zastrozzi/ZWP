import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { ZWPRightPanelComponent, RIGHT_PANEL_COMPONENT_DATA } from '@zwp/platform.layout'
import { Model } from '../../model'
import { State } from '../../+state'
import { v4 } from 'uuid'
import { distinct, map, Observable, of, tap } from 'rxjs'
import { isUndefined } from '@zwp/platform.common'

@ZWPRightPanelComponent('CategoryDetailRightPanelComponent')
@Component({
    selector: 'urnet-mnet-category-detail-right-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlexFill fxLayoutGap="5px" zwpPadding="5 0">
            <ng-container *ngIf="category$ | async as category">
            <div fxLayout="column" zwpPadding="0 5" fxLayoutGap="5px" fxLayoutAlign="start stretch">
                <zwp-labelled-property [label]="'Name'" [property]="category.name" />
                <zwp-labelled-property [label]="'Created At'" [property]="category.dbCreatedAt | date: 'yyyy/MM/dd HH:mm:ss'" />
                <zwp-labelled-property [label]="'Updated At'" [property]="category.dbUpdatedAt | date: 'yyyy/MM/dd HH:mm:ss'" />
                <zwp-labelled-property [label]="'Status'" [property]="category.status | zwpTransformEnum: statusEnumSignature" />
                <zwp-labelled-property [label]="'Display Image URL'" [property]="category.displayImageUrl" layout="column"/>
                <!-- <zwp-labelled-property [label]="'Link'" [property]="storageObject.selfLink ?? ''" /> -->
                <!-- <zwp-labelled-property [label]="'Google ID'" [property]="storageObject.googleId ?? ''" /> -->
                <div fxFlexAlign="stretch" fxFlexOffset="10px" [style.position]="'relative'">
                    <img zwpCorners="5" [ngSrc]="category.displayImageUrl ?? ''" fill [style.height]="'auto'" [style.position]="'relative'" priority>
                </div>
                
            </div>
            </ng-container>
            
            <zwp-divider></zwp-divider>
            
        </div>
    `
})
export class CategoryDetailRightPanelComponent implements OnInit {
    componentData = inject(RIGHT_PANEL_COMPONENT_DATA) as { categoryId: string }
    private categoryFacade = inject(State.Facades.AWinCategoryFacade)
    statusEnumSignature = Model.categoryStatusLabelPipeSignature
    
    category$: Observable<Model.CategoryResponse | undefined> = of(undefined)

    ngOnInit() {
        this.category$ = this.categoryFacade
            .categoryById$(this.componentData.categoryId)
            .pipe(
                tap(category => {
                    if (isUndefined(category)) {
                        this.categoryFacade.getCategory(this.componentData.categoryId)
                    }
                })
            )
    }
}