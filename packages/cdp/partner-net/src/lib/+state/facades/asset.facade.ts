import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams } from '@zwp/platform.common'
import { AssetLocalActions, AssetRemoteActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'PartnerNetAssetFacade', options: { skipMethodDebugger: true } })
export class PartnerNetAssetFacade {
    private store = inject(Store)

    assetFilters$ = this.store.pipe(select(Selectors.AssetSelectors.selectAssetFilters))
    assetRemotePagination$ = this.store.pipe(select(Selectors.AssetSelectors.selectAssetRemotePagination))
    assetRemoteState$ = this.store.pipe(select(Selectors.AssetSelectors.selectAssetRemoteState))

    assets$ = this.store.pipe(select(Selectors.AssetSelectors.selectAllAssets))
    paginatedFilteredAssets$ = this.store.pipe(select(Selectors.AssetSelectors.selectPaginatedFilteredAssets))
    assetsForSelectedPartner$ = this.store.pipe(
        select(Selectors.PartnerAssetAssignmentSelectors.selectAssetsForSelectedPartner)
    )
    assetsForSelectedSubgroup$ = this.store.pipe(
        select(Selectors.SubgroupAssetAssignmentSelectors.selectAssetsForSelectedSubgroup)
    )
    selectedAsset$ = this.store.pipe(select(Selectors.AssetSelectors.selectedAsset))
    selectedAssetId$ = this.store.pipe(select(Selectors.AssetSelectors.selectSelectedAssetId))

    assetById$ = (id: string) => this.store.pipe(select(Selectors.AssetSelectors.selectAssetById(id)))
    assetsForPartner$ = (partnerId: string) =>
        this.store.pipe(select(Selectors.PartnerAssetAssignmentSelectors.selectAssetsForPartner(partnerId)))
    assetsForSubgroup$ = (subgroupId: string) =>
        this.store.pipe(select(Selectors.SubgroupAssetAssignmentSelectors.selectAssetsForSubgroup(subgroupId)))

    createAsset(request: Model.CreateAssetRequest) {
        return this.store.dispatch(AssetRemoteActions.create.request({ request }))
    }

    getAsset(assetId: string) {
        return this.store.dispatch(AssetRemoteActions.get.request({ assetId }))
    }

    listAssets(
        parentId: Nullable<string> = null,
        parentType: 'partner' | 'subgroup' | 'none' = 'none',
        pagination: Nullable<Partial<PaginatedQueryParams<Model.AssetResponse>>> = null
    ) {
        return this.store.dispatch(AssetRemoteActions.list.request({ parentId, parentType, pagination }))
    }

    updateAsset(assetId: string, update: Model.UpdateAssetRequest) {
        return this.store.dispatch(AssetRemoteActions.update.request({ assetId, update }))
    }

    deleteAsset(assetId: string, force: boolean = false) {
        return this.store.dispatch(AssetRemoteActions.delete.request({ assetId, force }))
    }

    selectAsset(assetId: string) {
        return this.store.dispatch(AssetLocalActions.selectAsset({ assetId }))
    }

    deselectAsset() {
        return this.store.dispatch(AssetLocalActions.deselectAsset())
    }

    updateAssetFilters(filters: Partial<Model.AssetFilters>, triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(AssetLocalActions.updateAssetFilters({ filters, triggerRemoteFetch }))
    }

    resetAssetFilters(triggerRemoteFetch: boolean = true) {
        return this.store.dispatch(AssetLocalActions.resetAssetFilters({ triggerRemoteFetch }))
    }

    resetPagination() {
        return this.store.dispatch(AssetLocalActions.resetPagination())
    }
}
