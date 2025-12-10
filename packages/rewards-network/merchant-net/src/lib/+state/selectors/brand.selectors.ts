import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { MerchantSelectors } from './merchant.selectors'
import { Model } from '../../model'

const selectBrandState = createFeatureSelector<Reducers.BrandFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
        Identifiers.BRAND_STATE_FEATURE_KEY
    )
)
const selectBrandFilters = createSelector(selectBrandState, (state) => state.filters)
const selectBrandRemotePagination = createSelector(selectBrandState, (state) => state.brandsRemotePagination)
const selectBrandRemoteState = createSelector(selectBrandState, selectRemoteState)

const selectSelectedBrandId = createSelector(selectBrandState, (state) => state.selectedBrandId)

const brandEntitySelectors = Reducers.brandEntityAdapter.getSelectors()
const selectBrandEntityState = createSelector(selectBrandState, (state) => state.brands)
const selectBrandIds = createSelector(selectBrandEntityState, brandEntitySelectors.selectIds)
const selectBrandEntities = createSelector(selectBrandEntityState, brandEntitySelectors.selectEntities)
const selectAllBrands = createSelector(selectBrandEntityState, brandEntitySelectors.selectAll)
const selectBrandTotal = createSelector(selectBrandEntityState, brandEntitySelectors.selectTotal)
const selectBrandById = (id: string) => createSelector(selectBrandEntities, (entities) => entities[id])

const selectedBrand = createSelector(
    selectBrandEntities,
    selectSelectedBrandId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectBrandsForSelectedMerchant = createSelector(
    MerchantSelectors.selectSelectedMerchantId,
    selectAllBrands,
    (merchantId, brands) => brands.filter(brand => brand.merchantId === merchantId)
)

const selectBrandIdsForSelectedMerchant = createSelector(
    selectBrandsForSelectedMerchant,
    (brands) => brands.map(brand => brand.id)
)

const selectBrandsForMerchant = (merchantId: string) => createSelector(
    selectAllBrands,
    (brands) => brands.filter(brand => brand.merchantId === merchantId)
)

const selectBrandIdsForMerchant = (merchantId: string) => createSelector(
    selectBrandsForMerchant(merchantId),
    (brands) => brands.map(brand => brand.id)
)

const selectFilteredBrands = createSelector(
    selectAllBrands,
    selectBrandFilters,
    (brands, filters) => selectFilteredElements(brands, filters, Model.Filters.brandFilterEntityMap)
)

const selectPaginatedBrands = createSelector(
    selectAllBrands,
    selectBrandRemotePagination,
    (brands, pagination) => selectPaginatedElements(brands, pagination)
)

const selectPaginatedFilteredBrands = createSelector(
    selectFilteredBrands,
    selectBrandRemotePagination,
    (brands, pagination) => selectPaginatedElements(brands, pagination)
)

const selectFilteredBrandsForSelectedMerchant = createSelector(
    selectBrandsForSelectedMerchant,
    selectBrandFilters,
    (brands, filters) => selectFilteredElements(brands, filters, Model.Filters.brandFilterEntityMap)
)

const selectPaginatedBrandsForSelectedMerchant = createSelector(
    selectBrandsForSelectedMerchant,
    selectBrandRemotePagination,
    (brands, pagination) => selectPaginatedElements(brands, pagination)
)

const selectPaginatedFilteredBrandsForSelectedMerchant = createSelector(
    selectFilteredBrandsForSelectedMerchant,
    selectBrandRemotePagination,
    (brands, pagination) => selectPaginatedElements(brands, pagination)
)

const selectFilteredBrandsForMerchant = (merchantId: string) => createSelector(
    selectBrandsForMerchant(merchantId),
    selectBrandFilters,
    (brands, filters) => selectFilteredElements(brands, filters, Model.Filters.brandFilterEntityMap)
)

const selectPaginatedBrandsForMerchant = (merchantId: string) => createSelector(
    selectBrandsForMerchant(merchantId),
    selectBrandRemotePagination,
    (brands, pagination) => selectPaginatedElements(brands, pagination)
)

const selectPaginatedFilteredBrandsForMerchant = (merchantId: string) => createSelector(
    selectFilteredBrandsForMerchant(merchantId),
    selectBrandRemotePagination,
    (brands, pagination) => selectPaginatedElements(brands, pagination)
)

export const BrandSelectors = {
    selectBrandState,
    selectBrandFilters,
    selectBrandRemotePagination,
    selectBrandRemoteState,

    selectSelectedBrandId,
    
    brandEntitySelectors,
    selectBrandEntityState,
    selectBrandIds,
    selectBrandEntities,
    selectAllBrands,
    selectBrandTotal,
    selectBrandById,
    selectedBrand,

    selectBrandsForSelectedMerchant,
    selectBrandIdsForSelectedMerchant,
    selectBrandsForMerchant,
    selectBrandIdsForMerchant,
    selectFilteredBrands,
    selectPaginatedBrands,
    selectPaginatedFilteredBrands,
    selectFilteredBrandsForSelectedMerchant,
    selectPaginatedBrandsForSelectedMerchant,
    selectPaginatedFilteredBrandsForSelectedMerchant,
    selectFilteredBrandsForMerchant,
    selectPaginatedBrandsForMerchant,
    selectPaginatedFilteredBrandsForMerchant
}
