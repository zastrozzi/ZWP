import { inject, Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from "@zwp/platform.common";
import { AssetLocalActions, AssetRemoteActions } from '../actions';
import { Selectors } from '../selectors'
import { Model } from "../../model";

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'AssetFacade', options: { skipMethodDebugger: true } })
export class AssetFacade {
    private store = inject(Store)
    
    assetFilters$ = this.store.pipe(select(Selectors.AssetSelectors.selectAssetFilters))
    assetRemotePagination$ = this.store.pipe(select(Selectors.AssetSelectors.selectAssetRemotePagination))
    assetRemoteState$ = this.store.pipe(select(Selectors.AssetSelectors.selectAssetRemoteState))

    assets$ = this.store.pipe(select(Selectors.AssetSelectors.selectAllAssets))
    selectedAsset$ = this.store.pipe(select(Selectors.AssetSelectors.selectedAsset))
    selectedAssetId$ = this.store.pipe(select(Selectors.AssetSelectors.selectSelectedAssetId))
    assetsForSelectedMerchant$ = this.store.pipe(select(Selectors.AssetSelectors.selectAssetsForSelectedMerchant))

    assetById$ = (id: string) => this.store.pipe(select(Selectors.AssetSelectors.selectAssetById(id)))
    
    createAsset(merchantId: string, request: Model.CreateAssetRequest) {
        return this.store.dispatch(AssetRemoteActions.create.request({merchantId, request}))
    }

    getAsset(assetId: string) {
        return this.store.dispatch(AssetRemoteActions.get.request({ assetId }))
    }

    listAssets(merchantId: Nullable<string> | 'auto' = null, pagination: Nullable<Partial<PaginatedQueryParams<Model.AssetResponse>>> = null) {
        return this.store.dispatch(AssetRemoteActions.list.request({ merchantId, pagination }))
    }

    selectAsset(assetId: string) {
        return this.store.dispatch(AssetLocalActions.selectAsset({ assetId }))
    }

    deselectAsset() {
        return this.store.dispatch(AssetLocalActions.deselectAsset())
    }

    updateAsset(assetId: string, update: Model.UpdateAssetRequest) {
        return this.store.dispatch(AssetRemoteActions.update.request({ assetId, update }))
    }

    deleteAsset(assetId: string) {
        return this.store.dispatch(AssetRemoteActions.delete.request({ assetId }))
    }

    updateAssetFilters(filters: Partial<Model.Filters.AssetFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(AssetLocalActions.updateAssetFilters({ filters, triggerRemoteFetch }))
    }

    resetAssetFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(AssetLocalActions.resetAssetFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(AssetLocalActions.resetPagination())
    }
}