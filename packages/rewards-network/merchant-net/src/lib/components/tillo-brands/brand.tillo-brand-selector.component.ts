import { Component, ChangeDetectionStrategy, OnInit, inject, OnDestroy, Input } from '@angular/core'
import { RewardsNetworkTillo } from '@zwp/rewards-network.tillo'
import { State } from '../../+state'
import { Model } from '../../model'
import { ZWPPopupLayoutFacade, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { tap } from 'rxjs'
import { isUndefined, ZWPRouterFacade } from '@zwp/platform.common'

@Component({
    selector: 'urnet-mnet-brand-tillo-brand-selector',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxLayoutGap="5px" zwpBackgroundColor="system-background" zwpPadding="5 0 0 0">
            <ng-container *ngIf="brandById$(brandId) | async as brand">
                <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                    <span zwpTextStyle="body1" zwpColor="label" fxFlexOffset="5px" fxFlex="grow">Tillo Brands</span>
                    <zwp-md-button
                        [label]="'Add Tillo Brand'"
                        icon="add_circle"
                        [iconTextStyle]="'button3'"
                        [textStyle]="'button3'"
                        [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                        [labelColor]="'primary' | zwpColorTheme"
                        (btnClick)="onAddTilloBrandClicked(brand)"
                    ></zwp-md-button>
                </div>
                <zwp-divider></zwp-divider>
                <div fxLayout="column" fxLayoutAlign="start stretch" fxLayoutGap="5px">
                    <div fxLayout="row" fxLayoutAlign="space-between center" fxLayoutGap="8px" *ngFor="let brandTilloBrand of brandTilloBrandsByBrandId$(brandId) | async">
                        <ng-container *ngIf="tilloBrandById$(brandTilloBrand.tilloBrandId) | async as tilloBrand">
                            <zwp-md-button
                                [label]="tilloBrand.name"
                                icon="pages"
                                [iconTextStyle]="'button3'"
                                [textStyle]="'button3'"
                                [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                                [labelColor]="'primary' | zwpColorTheme"
                                (btnClick)="onTilloBrandClicked(tilloBrand.id)"
                            ></zwp-md-button>
                            <zwp-md-button
                                [label]="'Remove'"
                                icon="remove_circle"
                                [iconTextStyle]="'button3'"
                                [textStyle]="'button3'"
                                [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                                [labelColor]="'system-red' | zwpColorTheme"
                                (btnClick)="onRemoveTilloBrandFromBrand(brand, brandTilloBrand, tilloBrand)"
                            ></zwp-md-button>
                        </ng-container>
                    </div>
                </div>
            </ng-container>
        </div>
    `,
})
export class BrandTilloBrandSelectorComponent implements OnInit, OnDestroy {
    private brandFacade = inject(State.Facades.BrandFacade)
    private merchantNetTilloBrandFacade = inject(State.Facades.MerchantNetTilloBrandFacade)
    private tilloBrandFacade = inject(RewardsNetworkTillo.State.Facades.TilloBrandFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)

    @Input() brandId!: string
    requestedBrandIds: Set<string> = new Set()
    requestedBrandTilloBrandIds: Set<string> = new Set()
    requestedTilloBrandIds: Set<string> = new Set()

    brandById$ = (id: string) =>
        this.brandFacade.brandById$(id).pipe(
            tap((brand) => {
                if (isUndefined(brand) && !this.requestedBrandIds.has(id)) {
                    this.requestedBrandIds.add(id)
                    this.brandFacade.getBrand(id)
                }
            })
        )

    brandTilloBrandById$ = (id: string) =>
        this.merchantNetTilloBrandFacade.brandTilloBrandById$(id).pipe(
            tap((brandTilloBrand) => {
                if (isUndefined(brandTilloBrand) && !this.requestedBrandTilloBrandIds.has(id)) {
                    this.requestedBrandTilloBrandIds.add(id)
                    this.merchantNetTilloBrandFacade.getBrandTilloBrand(id)
                }
            }
        )
    )

    tilloBrandById$ = (id: string) =>
        this.tilloBrandFacade.brandById$(id).pipe(
            tap((tilloBrand) => {
                if (isUndefined(tilloBrand) && !this.requestedTilloBrandIds.has(id)) {
                    this.requestedTilloBrandIds.add(id)
                    this.tilloBrandFacade.getBrand(id)
                }
            })
        )

    brandTilloBrandsByBrandId$ = (brandId: string) =>
        this.merchantNetTilloBrandFacade.brandTilloBrandsForBrand$(brandId).pipe(
            tap((brandTilloBrands) => {
                if (brandTilloBrands.length === 0 && !this.requestedBrandTilloBrandIds.has(brandId)) {
                    this.requestedBrandTilloBrandIds.add(brandId)
                    this.merchantNetTilloBrandFacade.listBrandTilloBrands({ brandId, merchantId: null, tilloBrandId: null }, null)
                }
            })
        )

    tilloBrandsByBrandId$ = (brandId: string) =>
        this.merchantNetTilloBrandFacade.tilloBrandsForBrand$(brandId).pipe(
            tap((tilloBrands) => {
                if (tilloBrands.length === 0 && !this.requestedTilloBrandIds.has(brandId)) {
                    this.requestedTilloBrandIds.add(brandId)
                    this.merchantNetTilloBrandFacade.listTilloBrands({ brandId, brandTilloBrandId: null, merchantId: null }, null)
                }
            })
        )

    ngOnInit() {
        this.merchantNetTilloBrandFacade.listBrandTilloBrands({ brandId: this.brandId, merchantId: null, tilloBrandId: null }, null)
        // this.merchantNetTilloBrandFacade.listTilloBrands({ brandId: this.brandId, brandTilloBrandId: null, merchantId: null }, null)
    }

    ngOnDestroy() {
        this.requestedBrandIds.clear()
        this.requestedTilloBrandIds.clear()
        this.requestedBrandTilloBrandIds.clear()
    }

    onTilloBrandClicked(tilloBrandId: string) {
        this.routerFacade.navigate([`/merchant-net/tillo/brands/${tilloBrandId}`])
    }

    onRemoveTilloBrandFromBrand(brand: Model.BrandResponse, brandTilloBrand: Model.BrandTilloBrandResponse, tilloBrand: RewardsNetworkTillo.Model.BrandResponse) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Remove Tillo Brand from Brand',
                message: `Are you sure you want to remove the Tillo brand ${tilloBrand.name} from the brand ${brand.brandName}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Remove'
            },
            () => { this.merchantNetTilloBrandFacade.deleteBrandTilloBrand(brandTilloBrand.id) }
        )
    }

    onAddTilloBrandClicked(brand: Model.BrandResponse) {
        this.windowLayoutFacade.addWindow({
            label: `Add Tillo Brand to ${brand.brandName}`,
            icon: 'pages',
            componentName: 'BrandSelectTilloBrandWindowComponent',
            position: { top: 'calc(50vh - 300px)', left: 'calc(50vw - 450px)', width: '900px', height: '600px' },
            data: {
                brandId: this.brandId
            },
        })
    }
}
