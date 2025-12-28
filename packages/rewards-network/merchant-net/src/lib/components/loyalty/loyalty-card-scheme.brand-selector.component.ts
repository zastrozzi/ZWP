import { Component, ChangeDetectionStrategy, OnInit, inject, OnDestroy, Input } from '@angular/core'

import { ActivatedRoute } from '@angular/router'
import { State } from '../../+state'
import { Model } from '../../model'
import { ZWPPopupLayoutFacade } from '@zwp/platform.layout'
import { tap } from 'rxjs'
import { isUndefined, ZWPRouterFacade } from '@zwp/platform.common'

@Component({
    selector: 'urnet-mnet-loyalty-card-scheme-brand-selector',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxLayoutGap="5px" zwpBackgroundColor="system-background">
            <ng-container *ngIf="merchantById$(merchantId) | async as merchant">
                <ng-container *ngIf="loyaltyCardSchemeById$(loyaltyCardSchemeId) | async as loyaltyCardScheme">
                    <ng-container *ngIf="brandsByMerchantId$(merchant.id) | async as brands">
                        <ng-container
                            *ngIf="
                                loyaltyCardSchemeBrandsByCardSchemeId$(loyaltyCardSchemeId)
                                    | async as loyaltyCardSchemeBrands
                            "
                        >
                            <div fxLayout="row" fxLayoutAlign="space-between center" fxLayoutGap="8px">
                                <span zwpTextStyle="body1" zwpColor="label" fxFlexOffset="5px">Merchant</span>
                                <zwp-md-button
                                    [label]="merchant.merchantName"
                                    icon="storefront"
                                    [iconTextStyle]="'button3'"
                                    [textStyle]="'button3'"
                                    postfixIcon="chevron_right"
                                    [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                                    [labelColor]="'primary' | zwpColorTheme"
                                    (btnClick)="onMerchantClicked()"
                                ></zwp-md-button>
                            </div>
                            <zwp-divider></zwp-divider>
                            <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                                <span zwpTextStyle="body1" zwpColor="label" fxFlexOffset="5px" fxFlex="grow">Brands</span>
                                <zwp-md-button
                                    [label]="'Add All'"
                                    icon="check_box"
                                    [iconTextStyle]="'button3'"
                                    [textStyle]="'button3'"
                                    [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                                    [labelColor]="'primary' | zwpColorTheme"
                                    (btnClick)="onSelectAllBrands()"
                                    [disabled]="true"
                                ></zwp-md-button>
                                <zwp-md-button
                                    [label]="'Remove All'"
                                    icon="check_box_outline_blank"
                                    [iconTextStyle]="'button3'"
                                    [textStyle]="'button3'"
                                    [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                                    [labelColor]="'primary' | zwpColorTheme"
                                    (btnClick)="onDeselectAllBrands()"
                                    [disabled]="true"
                                ></zwp-md-button>
                            </div>
                            <zwp-divider></zwp-divider>
                            <div fxLayout="column" fxLayoutAlign="start stretch" fxLayoutGap="5px">
                                <div *ngFor="let brand of brands" fxLayout="row" fxLayoutAlign="space-between center" fxLayoutGap="8px">
                                    <zwp-md-button
                                        [label]="brand.brandName"
                                        icon="pages"
                                        [iconTextStyle]="'button3'"
                                        [textStyle]="'button3'"
                                        [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                                        [labelColor]="'primary' | zwpColorTheme"
                                        (btnClick)="onBrandClicked(brand.id)"
                                        [disabled]="!loyaltyCardSchemeHasBrand(brand.id, loyaltyCardSchemeBrands)"
                                    ></zwp-md-button>
                                    <zwp-md-button
                                        *ngIf="!loyaltyCardSchemeHasBrand(brand.id, loyaltyCardSchemeBrands)"
                                        [label]="'Add Brand'"
                                        postfixIcon="add_circle"
                                        [iconTextStyle]="'button3'"
                                        [textStyle]="'button3'"
                                        [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                                        [labelColor]="'system-green' | zwpColorTheme"
                                        (btnClick)="onAddBrandToLoyaltyCardScheme(brand.id)"
                                    ></zwp-md-button>
                                    <zwp-md-button
                                        *ngIf="loyaltyCardSchemeHasBrand(brand.id, loyaltyCardSchemeBrands)"
                                        [label]="'Remove Brand'"
                                        icon="remove_circle"
                                        [iconTextStyle]="'button3'"
                                        [textStyle]="'button3'"
                                        [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                                        [labelColor]="'system-red' | zwpColorTheme"
                                        (btnClick)="onRemoveBrandFromLoyaltyCardScheme(brand, loyaltyCardScheme)"
                                    ></zwp-md-button>
                                    
                                </div>
                                
                            </div>
                        </ng-container>
                    </ng-container>
                </ng-container>
            </ng-container>
        </div>
    `,
})
export class LoyaltyCardSchemeBrandSelectorComponent implements OnInit, OnDestroy {
    private loyaltyCardSchemeFacade = inject(State.Facades.LoyaltyCardSchemeFacade)
    private loyaltyCardSchemeBrandFacade = inject(State.Facades.LoyaltyCardSchemeBrandFacade)
    private merchantFacade = inject(State.Facades.MerchantFacade)
    private brandFacade = inject(State.Facades.BrandFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)

    @Input() merchantId!: string
    @Input() loyaltyCardSchemeId!: string

    requestedMerchantIds: Set<string> = new Set()
    requestedLoyaltyCardSchemeIds: Set<string> = new Set()
    requestedBrandIds: Set<string> = new Set()

    merchantById$ = (id: string) =>
        this.merchantFacade.merchantById$(id).pipe(
            tap((merchant) => {
                if (isUndefined(merchant) && !this.requestedMerchantIds.has(id)) {
                    this.requestedMerchantIds.add(id)
                    this.merchantFacade.getMerchant(id)
                }
            })
        )

    loyaltyCardSchemeById$ = (id: string) =>
        this.loyaltyCardSchemeFacade.loyaltyCardSchemeById$(id).pipe(
            tap((loyaltyCardScheme) => {
                if (isUndefined(loyaltyCardScheme) && !this.requestedLoyaltyCardSchemeIds.has(id)) {
                    this.requestedLoyaltyCardSchemeIds.add(id)
                    this.loyaltyCardSchemeFacade.getLoyaltyCardScheme(id)
                }
            })
        )

    brandsByMerchantId$ = (merchantId: string) =>
        this.brandFacade.brandsForMerchant$(merchantId).pipe(
            tap((brands) => {
                if (!this.requestedMerchantIds.has(merchantId)) {
                    this.requestedMerchantIds.add(merchantId)
                    this.brandFacade.listBrands(merchantId)
                }
            })
        )

    loyaltyCardSchemeBrandsByCardSchemeId$ = (cardSchemeId: string) =>
        this.loyaltyCardSchemeBrandFacade.loyaltyCardSchemeBrandsForCardScheme$(cardSchemeId).pipe(
            tap((brands) => {
                if (brands.length === 0 && !this.requestedLoyaltyCardSchemeIds.has(cardSchemeId)) {
                    this.requestedLoyaltyCardSchemeIds.add(cardSchemeId)
                    this.loyaltyCardSchemeBrandFacade.listLoyaltyCardSchemeBrands(cardSchemeId)
                }
            })
        )

    ngOnInit() {
        
        this.brandFacade.listBrands(this.merchantId)
        this.loyaltyCardSchemeBrandFacade.listLoyaltyCardSchemeBrands(this.loyaltyCardSchemeId)
    }

    ngOnDestroy() {
        this.requestedMerchantIds.clear()
        this.requestedLoyaltyCardSchemeIds.clear()
        this.requestedBrandIds.clear()
    }

    onMerchantClicked() {
        this.routerFacade.navigate([`/merchant-net/merchants/${this.merchantId}`])
    }

    onBrandClicked(brandId: string) {
        this.routerFacade.navigate([`/merchant-net/brands/${brandId}`])
    }

    onSelectAllBrands() {
        // console.log('Select All Brands clicked')
    }

    onDeselectAllBrands() {
        // console.log('Deselect All Brands clicked')
    }

    onAddBrandToLoyaltyCardScheme(brandId: string) {
        this.loyaltyCardSchemeBrandFacade.addBrandToLoyaltyCardScheme(this.loyaltyCardSchemeId, brandId)
    }

    onRemoveBrandFromLoyaltyCardScheme(brand: Model.BrandResponse, loyaltyCardScheme: Model.LoyaltyCardSchemeResponse) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Remove Brand from Loyalty Card Scheme',
                message: `Are you sure you want to remove the brand ${brand.brandName} from the loyalty card scheme ${loyaltyCardScheme.displayName}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Remove'
            },
            () => { this.loyaltyCardSchemeBrandFacade.removeBrandFromLoyaltyCardScheme(loyaltyCardScheme.id, brand.id, true) }
        )
    }

    loyaltyCardSchemeHasBrand(brandId: string, loyaltyCardSchemeBrands: Model.LoyaltyCardSchemeBrandResponse[]): boolean {
        return loyaltyCardSchemeBrands.some((loyaltyCardSchemeBrand) => loyaltyCardSchemeBrand.brandId === brandId)
    }
}
