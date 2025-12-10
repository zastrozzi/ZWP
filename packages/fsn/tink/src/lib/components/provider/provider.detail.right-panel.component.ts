import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { ZWPRightPanelComponent, RIGHT_PANEL_COMPONENT_DATA } from '@zwp/platform.layout'
import { Model } from '../../model'
import { State } from '../../+state'
import { v4 } from 'uuid'
import { distinct, map, Observable, of, tap } from 'rxjs'
import { iso4217CurrencyNameEnumPipe, isUndefined, zwpISO3166Alpha2LabelEnumPipe, Undefinable } from '@zwp/platform.common'

@ZWPRightPanelComponent('TinkProviderDetailRightPanelComponent')
@Component({
    selector: 'fsn-tink-provider-detail-right-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxFlexFill fxLayoutGap="5px" zwpPadding="5 0">
            <ng-container *ngIf="provider$ | async as provider">
                <div fxLayout="column" zwpPadding="0 5" fxLayoutGap="5px" fxLayoutAlign="start stretch">
                    
                    <zwp-labelled-property [label]="'Display Name'" [property]="provider.displayName"/>
                    <zwp-labelled-property [label]="'Display Description'" [property]="provider.displayDescription"/>
                    <zwp-labelled-property [label]="'Financial Institution'" [property]="provider.financialInstitutionName"/>
                    <zwp-labelled-property [label]="'Group Display Name'" [property]="provider.groupDisplayName"/>
                    <zwp-labelled-property [label]="'Financial Institution ID'" [property]="provider.financialInstitutionId"/>
                    <zwp-labelled-property [label]="'Internal Name'" [property]="provider.name"/>

                    <zwp-property-group [label]="'Timestamps'" [backgroundColor]="'primary'" labelColor="system-white" fxFlexOffset="10px">
                        <zwp-labelled-property [label]="'Created At'" [property]="provider.dbCreatedAt | date : 'yyyy/MM/dd HH:mm:ss'"/>
                        <zwp-labelled-property [label]="'Updated At'" [property]="provider.dbUpdatedAt | date : 'yyyy/MM/dd HH:mm:ss'"/>
                    </zwp-property-group>

                    <zwp-property-group [label]="'Properties'" [backgroundColor]="'primary'" labelColor="system-white" fxFlexOffset="10px">
                        <zwp-labelled-property [label]="'Access Type'" [property]="provider.accessType | zwpTransformEnum: accessTypeLabelEnumPipe"/>
                        <zwp-labelled-property [label]="'Authentication Flow'" [property]="provider.authenticationFlow | zwpTransformEnum: authenticationFlowLabelEnumPipe"/>
                        <zwp-labelled-property [label]="'Authentication User Type'" [property]="provider.authenticationUserType | zwpTransformEnum: authenticationUserTypeLabelEnumPipe"/>
                        <zwp-labelled-property [label]="'Capabilities'" [layout]="'column'" [property]="provider.capabilities | zwpTransformEnumArray:capabilityLabelEnumPipe:'array'"/>
                        <zwp-labelled-property [label]="'Credentials Type'" [property]="provider.credentialsType | zwpTransformEnum: credentialsTypeLabelEnumPipe"/>
                        <zwp-labelled-property [label]="'Currency'" [property]="provider.currency | zwpTransformEnum: currencyLabelEnumPipe"/>
                        <zwp-labelled-property [label]="'Keywords'" [layout]="'column'" [property]="provider.keywords"/>
                        <zwp-labelled-property [label]="'Market'" [property]="provider.market | zwpTransformEnum: marketLabelEnumPipe"/>
                        <zwp-labelled-property [label]="'PIS Capabilities'" [layout]="'column'" [property]="provider.pisCapabilities | zwpTransformEnumArray:pisCapabilityLabelEnumPipe:'array'"/>
                        <zwp-labelled-property [label]="'Status'" [property]="provider.status | zwpTransformEnum: providerStatusLabelEnumPipe"/>
                        <zwp-labelled-property [label]="'Type'" [property]="provider.type | zwpTransformEnum: providerTypeLabelEnumPipe"/>
                    </zwp-property-group>
                    <zwp-property-group [label]="'Images'" [backgroundColor]="'primary'" labelColor="system-white" fxFlexOffset="10px">
                        <div fxFlexAlign="start" [style.position]="'relative'" *ngIf="provider.images?.icon as icon">
                            <img
                                zwpCorners="5"
                                [ngSrc]="icon"
                                width="60" height="60"
                                priority
                            />
                        </div>
                        <div fxFlexAlign="stretch" fxFlexOffset="10px" [style.position]="'relative'" *ngIf="provider.images?.banner as banner">
                            <img
                                zwpCorners="5"
                                [ngSrc]="banner"
                                fill
                                [style.height]="'auto'"
                                [style.position]="'relative'"
                                priority
                            />
                        </div>
                    </zwp-property-group>
                </div>
            </ng-container>
            
            <zwp-divider></zwp-divider>
            
        </div>
    `
})
export class TinkProviderDetailRightPanelComponent implements OnInit {
    componentData = inject(RIGHT_PANEL_COMPONENT_DATA) as { providerId: string }
    private providerFacade = inject(State.Facades.TinkProviderFacade)

    accessTypeLabelEnumPipe = Model.ClientAPIModel.ConnectivityV1.Provider.accessTypeLabelEnumPipe
    authenticationFlowLabelEnumPipe = Model.ClientAPIModel.ConnectivityV1.Provider.authenticationFlowLabelEnumPipe
    authenticationUserTypeLabelEnumPipe = Model.ClientAPIModel.ConnectivityV1.Provider.authenticationUserTypeLabelEnumPipe
    capabilityLabelEnumPipe = Model.ClientAPIModel.ConnectivityV1.Provider.capabilityLabelEnumPipe
    credentialsTypeLabelEnumPipe = Model.ClientAPIModel.ConnectivityV1.Credentials.credentialsTypeLabelEnumPipe
    currencyLabelEnumPipe = iso4217CurrencyNameEnumPipe
    marketLabelEnumPipe = zwpISO3166Alpha2LabelEnumPipe
    pisCapabilityLabelEnumPipe = Model.ClientAPIModel.ConnectivityV1.Provider.pisCapabilityLabelEnumPipe
    providerStatusLabelEnumPipe = Model.ClientAPIModel.ConnectivityV1.Provider.providerStatusLabelEnumPipe
    providerTypeLabelEnumPipe = Model.ClientAPIModel.ConnectivityV1.Provider.providerTypeLabelEnumPipe
    
    provider$: Observable<Undefinable<Model.ServerAPIModel.Provider.TinkV1ProviderResponse>> = of(undefined)

    ngOnInit() {
        this.provider$ = this.providerFacade
            .providerById$(this.componentData.providerId)
            .pipe(
                tap(provider => {
                    if (isUndefined(provider)) {
                        this.providerFacade.getProvider(this.componentData.providerId)
                    }
                })
            )
    }
}