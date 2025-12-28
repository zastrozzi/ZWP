import { Component, OnInit, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core'
import { EIM32712OccupationFacade } from '../../+state/facades'
import { ColumnInterface, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { Model } from '../../model'
import { ZWPRouterFacade, TransformEnumPipeSignature, allEnumCases } from '@zwp/platform.common'
import { map } from 'rxjs'
import { Sort, SortDirection } from '@angular/material/sort'
import { PageEvent } from '@angular/material/paginator'

@Component({
    selector: 'ukgov-hmrc-industry-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="row" fxLayoutAlign="start stretch" fxFlexFill>
            <ng-container *ngIf="(occupationIndustryFiltersInValue$ | async) ?? [] as filters">    
            <zwp-actioned-detail-panel panelWidth="400px">
                
                <ng-container detail>
                    
                    <zwp-md-button
                        *ngFor="let child of allIndustries"
                        [iconTextStyle]="'subheadline'"
                        [label]="child | zwpTransformEnum: industryLabelPipeSignature"
                        materialType="flat"
                        [icon]="child | zwpTransformEnum: industryIconPipeSignature"
                        [backgroundColor]="
                            filters.includes(child)
                                ? ('primary' | zwpColorTheme)
                                : ('secondary-system-background' | zwpColorTheme)
                        "
                        [labelColor]="
                            filters.includes(child)
                                ? ('system-white' | zwpColorTheme)
                                : ('primary' | zwpColorTheme)
                        "
                        (btnClick)="filters.includes(child) ? removeIndustryInValue(child) : addIndustryInValue(child)"
                    ></zwp-md-button>
                    
                </ng-container>
                <ng-container actions>
                    <zwp-md-button
                        label="All Industries" icon="construction" [iconTextStyle]="'subheadline'"
                        [backgroundColor]="
                            filters.length === 0 ? ('primary' | zwpColorTheme) : ('secondary-system-background' | zwpColorTheme)
                        " 
                        [labelColor]="
                            filters.length === 0 ? ('system-white' | zwpColorTheme) : ('primary' | zwpColorTheme)
                        "
                        (btnClick)="selectAllIndustries()"
                    ></zwp-md-button>
                </ng-container>
            </zwp-actioned-detail-panel>
            <zwp-divider [vertical]="true"></zwp-divider>
            <zwp-tabbed-nav-panel fxFlex="grow"></zwp-tabbed-nav-panel>
            </ng-container>
        </div>
    `
})
export class IndustryListComponent {
    private occupationFacade = inject(EIM32712OccupationFacade)
    occupationFilters$ = this.occupationFacade.occupationFilters$
    occupationIndustryFilters$ = this.occupationFacade.occupationFilters$
    occupationIndustryFiltersInValue$ = this.occupationFacade.occupationIndustryFiltersInValue$

    allIndustries = allEnumCases(Model.EIM32712Industry)
    industryRoutePipeSignature: TransformEnumPipeSignature = { input: Model.EIM32712Industry, output: Model.EIM32712IndustryRoute }
    industryLabelPipeSignature: TransformEnumPipeSignature = { input: Model.EIM32712Industry, output: Model.EIM32712IndustryLabel }
    industryIconPipeSignature: TransformEnumPipeSignature = { input: Model.EIM32712Industry, output: Model.EIM32712IndustryIcon }

    
    // ngOnInit() {
        // console.log('IndustryListComponent')
    // }

    selectAllIndustries() {
        this.occupationFacade.resetFilters()
    }

    addIndustryInValue(industry: Model.EIM32712Industry) {
        this.occupationFacade.addIndustryInValue(industry)
    }

    removeIndustryInValue(industry: Model.EIM32712Industry) {
        this.occupationFacade.removeIndustryInValue(industry)
    }
}