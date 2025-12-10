import { Component, ChangeDetectionStrategy, OnInit, inject, OnDestroy } from '@angular/core'
import { RewardsNetworkTillo } from '@zwp/rewards-network.tillo'
import { State } from '../../+state'
import { Model } from '../../model'
import { ZWPPopupLayoutFacade, ZWPWindowLayoutFacade } from '@zwp/platform.layout'
import { Subject, tap } from 'rxjs'
import { isUndefined, ZWPRouterFacade, Nullable } from '@zwp/platform.common'

@Component({
    selector: 'urnet-mnet-tillo-brand-merchant-net-links',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="column" fxLayoutGap="5px" zwpBackgroundColor="system-background" zwpPadding="0 0 0 0">
            <ng-container *ngIf="(tilloBrandLoaded | async) === true">
                <ng-container *ngIf="tilloBrandById$(tilloBrandId) | async as tilloBrand">
                    <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px">
                        <span zwpTextStyle="body1" zwpColor="label" fxFlex="grow">Merchant Network Brands</span>
                        <zwp-md-button
                            [label]="'Add Brand'"
                            icon="add_circle"
                            [iconTextStyle]="'button3'"
                            [textStyle]="'button3'"
                            [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                            [labelColor]="'primary' | zwpColorTheme"
                            (btnClick)="onAddMerchantNetworkBrandClicked(tilloBrand)"
                        ></zwp-md-button>
                    </div>
                    <zwp-divider></zwp-divider>
                    <div fxLayout="column" fxLayoutAlign="start stretch" fxLayoutGap="5px">
                        <div fxLayout="row" fxLayoutAlign="space-between center" fxLayoutGap="8px" *ngFor="let brandTilloBrand of brandTilloBrandsByTilloBrandId$(tilloBrandId) | async">
                            <ng-container *ngIf="brandById$(brandTilloBrand.brandId) | async as brand">
                                <zwp-md-button
                                    [label]="brand.brandName"
                                    icon="pages"
                                    [iconTextStyle]="'button3'"
                                    [textStyle]="'button3'"
                                    [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                                    [labelColor]="'primary' | zwpColorTheme"
                                    (btnClick)="onBrandClicked(brand.id)"
                                ></zwp-md-button>
                                <zwp-md-button
                                    [label]="'Remove'"
                                    icon="remove_circle"
                                    [iconTextStyle]="'button3'"
                                    [textStyle]="'button3'"
                                    [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                                    [labelColor]="'system-red' | zwpColorTheme"
                                    (btnClick)="onRemoveBrandFromTilloBrand(brand, brandTilloBrand, tilloBrand)"
                                ></zwp-md-button>
                            </ng-container>
                        </div>
                    </div>
                </ng-container>
            </ng-container>
            
        </div>
    `,
})
export class TilloBrandMerchantNetLinksComponent implements OnInit, OnDestroy {
    private brandFacade = inject(State.Facades.BrandFacade)
    private merchantNetTilloBrandFacade = inject(State.Facades.MerchantNetTilloBrandFacade)
    private tilloBrandFacade = inject(RewardsNetworkTillo.State.Facades.TilloBrandFacade)
    private routerFacade = inject(ZWPRouterFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private popupLayoutFacade = inject(ZWPPopupLayoutFacade)

    requestedBrandIds: Set<string> = new Set()
    requestedBrandTilloBrandIds: Set<string> = new Set()
    requestedTilloBrandIds: Set<string> = new Set()

    tilloBrandId!: string
    tilloBrandLoaded: Subject<boolean> = new Subject<boolean>()

    brandById$ = (id: string) =>
        this.brandFacade.brandById$(id).pipe(
            tap((brand) => {
                if (isUndefined(brand) && !this.requestedBrandIds.has(id)) {
                    this.requestedBrandIds.add(id)
                    this.brandFacade.getBrand(id)
                }
            })
        )

    brandTilloBrandsByTilloBrandId$ = (tilloBrandId: string) => 
        this.merchantNetTilloBrandFacade.brandTilloBrandsForTilloBrand$(tilloBrandId).pipe(
            tap((brandTilloBrands) => {
                if (brandTilloBrands.length === 0 && !this.requestedBrandTilloBrandIds.has(tilloBrandId)) {
                    this.requestedBrandTilloBrandIds.add(tilloBrandId)
                    this.merchantNetTilloBrandFacade.listBrandTilloBrands({ brandId: null, merchantId: null, tilloBrandId: tilloBrandId }, null)
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

    tilloBrandsByBrandId$ = (brandId: string) =>
        this.merchantNetTilloBrandFacade.tilloBrandsForBrand$(brandId).pipe(
            tap((tilloBrands) => {
                if (tilloBrands.length === 0 && !this.requestedTilloBrandIds.has(brandId)) {
                    this.requestedTilloBrandIds.add(brandId)
                    this.merchantNetTilloBrandFacade.listTilloBrands({ brandId, brandTilloBrandId: null, merchantId: null }, null)
                }
            })
        )

    async ngOnInit() {
        const foundTilloBrandId = await this.getTilloBrandIdFromRoute()
        if (!foundTilloBrandId) {
            console.error('Tillo brand ID not found in route parameters.')
            return
        }
        this.tilloBrandId = foundTilloBrandId
        this.tilloBrandLoaded.next(true)
        // console.log('BrandTilloBrandSelectorComponent initialized with tilloBrandId:', this.tilloBrandId)
        this.merchantNetTilloBrandFacade.listBrandTilloBrands({ brandId: null, merchantId: null, tilloBrandId: this.tilloBrandId }, null)
        // this.merchantNetTilloBrandFacade.listTilloBrands({ brandId: this.brandId, brandTilloBrandId: null, merchantId: null }, null)
    }

    ngOnDestroy() {
        this.requestedBrandIds.clear()
        this.requestedTilloBrandIds.clear()
        this.requestedBrandTilloBrandIds.clear()
    }

    onBrandClicked(brandId: string) {
        // console.log('Brand clicked:', brandId)
        this.routerFacade.navigate([`/merchant-net/brands/${brandId}`])
    }

    onRemoveBrandFromTilloBrand(brand: Model.BrandResponse, brandTilloBrand: Model.BrandTilloBrandResponse, tilloBrand: RewardsNetworkTillo.Model.BrandResponse) {
        this.popupLayoutFacade.launchDeleteConfirmationDialog(
            {
                title: 'Remove Brand from Tillo Brand',
                message: `Are you sure you want to remove the brand ${brand.brandName} from the Tillo brand ${tilloBrand.name}?`,
                cancelButtonLabel: 'Cancel',
                confirmButtonLabel: 'Remove'
            },
            () => { this.merchantNetTilloBrandFacade.deleteBrandTilloBrand(brandTilloBrand.id) }
        )
    }

    onAddMerchantNetworkBrandClicked(tilloBrand: RewardsNetworkTillo.Model.BrandResponse) {
        // console.log('Add Merchant Network Brand clicked for Tillo brand:', tilloBrand)
        this.windowLayoutFacade.addWindow({
            label: `Add Brand to ${tilloBrand.name}`,
            icon: 'pages',
            componentName: 'TilloBrandSelectBrandWindowComponent',
            position: { top: 'calc(50vh - 300px)', left: 'calc(50vw - 450px)', width: '900px', height: '600px' },
            data: {
                tilloBrandId: this.tilloBrandId
            },
        })
    }

    async getTilloBrandIdFromRoute(): Promise<Nullable<string>> {
        return await this.routerFacade.getNestedRouteParam('brandId') ?? null
    }
}
