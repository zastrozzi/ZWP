import { createFeatureSelector, createSelector } from '@ngrx/store'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { RewardsNetworkTillo } from '@zwp/rewards-network.tillo'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { MerchantSelectors } from './merchant.selectors'
import { BrandSelectors } from './brand.selectors'
import { Model } from '../../model'

const selectBrandTilloBrandState = createFeatureSelector<Reducers.BrandTilloBrandFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
        Identifiers.BRAND_TILLO_BRAND_STATE_FEATURE_KEY
    )
)

const selectBrandTilloBrandFilters = createSelector(selectBrandTilloBrandState, (state) => state.filters)
const selectBrandTilloBrandRemotePagination = createSelector(
    selectBrandTilloBrandState,
    (state) => state.brandTilloBrandsRemotePagination
)
const selectBrandTilloBrandRemoteState = createSelector(selectBrandTilloBrandState, selectRemoteState)
const selectSelectedBrandTilloBrandId = createSelector(selectBrandTilloBrandState, (state) => state.selectedBrandTilloBrandId)
const brandTilloBrandEntitySelectors = Reducers.brandTilloBrandEntityAdapter.getSelectors()
const selectBrandTilloBrandEntityState = createSelector(selectBrandTilloBrandState, (state) => state.brandTilloBrands)
const selectBrandTilloBrandIds = createSelector(selectBrandTilloBrandEntityState, brandTilloBrandEntitySelectors.selectIds)
const selectBrandTilloBrandEntities = createSelector(selectBrandTilloBrandEntityState, brandTilloBrandEntitySelectors.selectEntities)
const selectAllBrandTilloBrands = createSelector(selectBrandTilloBrandEntityState, brandTilloBrandEntitySelectors.selectAll)
const selectBrandTilloBrandTotal = createSelector(selectBrandTilloBrandEntityState, brandTilloBrandEntitySelectors.selectTotal)
const selectBrandTilloBrandById = (id: string) => createSelector(selectBrandTilloBrandEntities, (entities) => entities[id])

const selectedBrandTilloBrand = createSelector(
    selectBrandTilloBrandEntities,
    selectSelectedBrandTilloBrandId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectBrandTilloBrandsForSelectedBrand = createSelector(
    BrandSelectors.selectSelectedBrandId,
    selectAllBrandTilloBrands,
    (brandId, brandTilloBrands) => brandTilloBrands.filter(brandTilloBrand => brandTilloBrand.brandId === brandId)
)

const selectBrandTilloBrandsForSelectedMerchant = createSelector(
    BrandSelectors.selectBrandIdsForSelectedMerchant,
    selectAllBrandTilloBrands,
    (brandIdsForMerchant, brandTilloBrands) => brandTilloBrands.filter(brandTilloBrand => brandIdsForMerchant.includes(brandTilloBrand.brandId))
)

const selectBrandTilloBrandsForSelectedTilloBrand = createSelector(
    RewardsNetworkTillo.State.Selectors.BrandSelectors.selectSelectedBrandId,
    selectAllBrandTilloBrands,
    (tilloBrandId, brandTilloBrands) => brandTilloBrands.filter(brandTilloBrand => brandTilloBrand.tilloBrandId === tilloBrandId)
)

const selectBrandTilloBrandsForBrand = (brandId: string) => createSelector(
    selectAllBrandTilloBrands,
    (brandTilloBrands) => brandTilloBrands.filter(brandTilloBrand => brandTilloBrand.brandId === brandId)
)

const selectBrandTilloBrandsForMerchant = (merchantId: string) => createSelector(
    BrandSelectors.selectBrandIdsForMerchant(merchantId),
    selectAllBrandTilloBrands,
    (brandIdsForMerchant, brandTilloBrands) => brandTilloBrands.filter(brandTilloBrand => brandIdsForMerchant.includes(brandTilloBrand.brandId))
)

const selectBrandTilloBrandsForTilloBrand = (tilloBrandId: string) => createSelector(
    selectAllBrandTilloBrands,
    (brandTilloBrands) => brandTilloBrands.filter(brandTilloBrand => brandTilloBrand.tilloBrandId === tilloBrandId)
)

const selectFilteredBrandTilloBrands = createSelector(
    selectBrandTilloBrandsForSelectedBrand,
    selectBrandTilloBrandFilters,
    (brandTilloBrands, filters) => selectFilteredElements(brandTilloBrands, filters, Model.Filters.brandTilloBrandFilterEntityMap)
)

const selectFilteredBrandTilloBrandsForSelectedBrand = createSelector(
    selectBrandTilloBrandsForSelectedBrand,
    selectBrandTilloBrandFilters,
    (brandTilloBrands, filters) => selectFilteredElements(brandTilloBrands, filters, Model.Filters.brandTilloBrandFilterEntityMap)
)

const selectFilteredBrandTilloBrandsForSelectedMerchant = createSelector(
    selectBrandTilloBrandsForSelectedMerchant,
    selectBrandTilloBrandFilters,
    (brandTilloBrands, filters) => selectFilteredElements(brandTilloBrands, filters, Model.Filters.brandTilloBrandFilterEntityMap)
)

const selectFilteredBrandTilloBrandsForSelectedTilloBrand = createSelector(
    selectBrandTilloBrandsForSelectedTilloBrand,
    selectBrandTilloBrandFilters,
    (brandTilloBrands, filters) => selectFilteredElements(brandTilloBrands, filters, Model.Filters.brandTilloBrandFilterEntityMap)
)

const selectFilteredBrandTilloBrandsForBrand = (brandId: string) => createSelector(
    selectBrandTilloBrandsForBrand(brandId),
    selectBrandTilloBrandFilters,
    (brandTilloBrands, filters) => selectFilteredElements(brandTilloBrands, filters, Model.Filters.brandTilloBrandFilterEntityMap)
)

const selectFilteredBrandTilloBrandsForMerchant = (merchantId: string) => createSelector(
    selectBrandTilloBrandsForMerchant(merchantId),
    selectBrandTilloBrandFilters,
    (brandTilloBrands, filters) => selectFilteredElements(brandTilloBrands, filters, Model.Filters.brandTilloBrandFilterEntityMap)
)

const selectFilteredBrandTilloBrandsForTilloBrand = (tilloBrandId: string) => createSelector(
    selectBrandTilloBrandsForTilloBrand(tilloBrandId),
    selectBrandTilloBrandFilters,
    (brandTilloBrands, filters) => selectFilteredElements(brandTilloBrands, filters, Model.Filters.brandTilloBrandFilterEntityMap)
)

const selectPaginatedBrandTilloBrands = createSelector(
    selectFilteredBrandTilloBrands,
    selectBrandTilloBrandRemotePagination,
    (brandTilloBrands, pagination) => selectPaginatedElements(brandTilloBrands, pagination)
)

const selectPaginatedBrandTilloBrandsForSelectedMerchant = createSelector(
    selectBrandTilloBrandsForSelectedMerchant,
    selectBrandTilloBrandRemotePagination,
    (brandTilloBrands, pagination) => selectPaginatedElements(brandTilloBrands, pagination)
)

const selectPaginatedBrandTilloBrandsForSelectedBrand = createSelector(
    selectBrandTilloBrandsForSelectedBrand,
    selectBrandTilloBrandRemotePagination,
    (brandTilloBrands, pagination) => selectPaginatedElements(brandTilloBrands, pagination)
)

const selectPaginatedBrandTilloBrandsForSelectedTilloBrand = createSelector(
    selectBrandTilloBrandsForSelectedTilloBrand,
    selectBrandTilloBrandRemotePagination,
    (brandTilloBrands, pagination) => selectPaginatedElements(brandTilloBrands, pagination)
)

const selectPaginatedBrandTilloBrandsForBrand = (brandId: string) => createSelector(
    selectBrandTilloBrandsForBrand(brandId),
    selectBrandTilloBrandRemotePagination,
    (brandTilloBrands, pagination) => selectPaginatedElements(brandTilloBrands, pagination)
)

const selectPaginatedBrandTilloBrandsForMerchant = (merchantId: string) => createSelector(
    selectBrandTilloBrandsForMerchant(merchantId),
    selectBrandTilloBrandRemotePagination,
    (brandTilloBrands, pagination) => selectPaginatedElements(brandTilloBrands, pagination)
)

const selectPaginatedBrandTilloBrandsForTilloBrand = (tilloBrandId: string) => createSelector(
    selectBrandTilloBrandsForTilloBrand(tilloBrandId),
    selectBrandTilloBrandRemotePagination,
    (brandTilloBrands, pagination) => selectPaginatedElements(brandTilloBrands, pagination)
)

const selectPaginatedFilteredBrandTilloBrands = createSelector(
    selectFilteredBrandTilloBrands,
    selectBrandTilloBrandRemotePagination,
    (brandTilloBrands, pagination) => selectPaginatedElements(brandTilloBrands, pagination)
)

const selectPaginatedFilteredBrandTilloBrandsForSelectedMerchant = createSelector(
    selectFilteredBrandTilloBrandsForSelectedMerchant,
    selectBrandTilloBrandRemotePagination,
    (brandTilloBrands, pagination) => selectPaginatedElements(brandTilloBrands, pagination)
)

const selectPaginatedFilteredBrandTilloBrandsForSelectedBrand = createSelector(
    selectFilteredBrandTilloBrandsForSelectedBrand,
    selectBrandTilloBrandRemotePagination,
    (brandTilloBrands, pagination) => selectPaginatedElements(brandTilloBrands, pagination)
)

const selectPaginatedFilteredBrandTilloBrandsForSelectedTilloBrand = createSelector(
    selectFilteredBrandTilloBrandsForSelectedTilloBrand,
    selectBrandTilloBrandRemotePagination,
    (brandTilloBrands, pagination) => selectPaginatedElements(brandTilloBrands, pagination)
)

const selectPaginatedFilteredBrandTilloBrandsForBrand = (brandId: string) => createSelector(
    selectFilteredBrandTilloBrandsForBrand(brandId),
    selectBrandTilloBrandRemotePagination,
    (brandTilloBrands, pagination) => selectPaginatedElements(brandTilloBrands, pagination)
)

const selectPaginatedFilteredBrandTilloBrandsForMerchant = (merchantId: string) => createSelector(
    selectFilteredBrandTilloBrandsForMerchant(merchantId),
    selectBrandTilloBrandRemotePagination,
    (brandTilloBrands, pagination) => selectPaginatedElements(brandTilloBrands, pagination)
)

const selectPaginatedFilteredBrandTilloBrandsForTilloBrand = (tilloBrandId: string) => createSelector(
    selectFilteredBrandTilloBrandsForTilloBrand(tilloBrandId),
    selectBrandTilloBrandRemotePagination,
    (brandTilloBrands, pagination) => selectPaginatedElements(brandTilloBrands, pagination)
)

const selectTilloBrandsForSelectedBrand = createSelector(
    selectBrandTilloBrandsForSelectedBrand,
    RewardsNetworkTillo.State.Selectors.BrandSelectors.selectBrandEntities,
    (brandTilloBrands, brandEntities) => brandTilloBrands.compactMap(brandTilloBrand => brandEntities[brandTilloBrand.brandId])
)

const selectTilloBrandsForSelectedMerchant = createSelector(
    selectBrandTilloBrandsForSelectedMerchant,
    RewardsNetworkTillo.State.Selectors.BrandSelectors.selectBrandEntities,
    (brandTilloBrands, brandEntities) => brandTilloBrands.compactMap(brandTilloBrand => brandEntities[brandTilloBrand.brandId])
)

const selectTilloBrandsForBrand = (brandId: string) => createSelector(
    selectBrandTilloBrandsForBrand(brandId),
    RewardsNetworkTillo.State.Selectors.BrandSelectors.selectBrandEntities,
    (brandTilloBrands, brandEntities) => brandTilloBrands.compactMap(brandTilloBrand => brandEntities[brandTilloBrand.brandId])
)

const selectTilloBrandsForMerchant = (merchantId: string) => createSelector(
    selectBrandTilloBrandsForMerchant(merchantId),
    RewardsNetworkTillo.State.Selectors.BrandSelectors.selectBrandEntities,
    (brandTilloBrands, brandEntities) => brandTilloBrands.compactMap(brandTilloBrand => brandEntities[brandTilloBrand.brandId])
)

const selectFilteredTilloBrandsForSelectedBrand = createSelector(
    selectTilloBrandsForSelectedBrand,
    RewardsNetworkTillo.State.Selectors.BrandSelectors.selectBrandFilters,
    (tilloBrands, filters) => selectFilteredElements(tilloBrands, filters, RewardsNetworkTillo.Model.Filters.brandFilterEntityMap)
)

const selectFilteredTilloBrandsForSelectedMerchant = createSelector(
    selectTilloBrandsForSelectedMerchant,
    RewardsNetworkTillo.State.Selectors.BrandSelectors.selectBrandFilters,
    (tilloBrands, filters) => selectFilteredElements(tilloBrands, filters, RewardsNetworkTillo.Model.Filters.brandFilterEntityMap)
)

const selectFilteredTilloBrandsForBrand = (brandId: string) => createSelector(
    selectTilloBrandsForBrand(brandId),
    RewardsNetworkTillo.State.Selectors.BrandSelectors.selectBrandFilters,
    (tilloBrands, filters) => selectFilteredElements(tilloBrands, filters, RewardsNetworkTillo.Model.Filters.brandFilterEntityMap)
)

const selectFilteredTilloBrandsForMerchant = (merchantId: string) => createSelector(
    selectTilloBrandsForMerchant(merchantId),
    RewardsNetworkTillo.State.Selectors.BrandSelectors.selectBrandFilters,
    (tilloBrands, filters) => selectFilteredElements(tilloBrands, filters, RewardsNetworkTillo.Model.Filters.brandFilterEntityMap)
)

const selectPaginatedTilloBrandsForSelectedBrand = createSelector(
    selectTilloBrandsForSelectedBrand,
    RewardsNetworkTillo.State.Selectors.BrandSelectors.selectBrandRemotePagination,
    (tilloBrands, pagination) => selectPaginatedElements(tilloBrands, pagination)
)

const selectPaginatedTilloBrandsForSelectedMerchant = createSelector(
    selectTilloBrandsForSelectedMerchant,
    RewardsNetworkTillo.State.Selectors.BrandSelectors.selectBrandRemotePagination,
    (tilloBrands, pagination) => selectPaginatedElements(tilloBrands, pagination)
)

const selectPaginatedTilloBrandsForBrand = (brandId: string) => createSelector(
    selectTilloBrandsForBrand(brandId),
    RewardsNetworkTillo.State.Selectors.BrandSelectors.selectBrandRemotePagination,
    (tilloBrands, pagination) => selectPaginatedElements(tilloBrands, pagination)
)

const selectPaginatedTilloBrandsForMerchant = (merchantId: string) => createSelector(
    selectTilloBrandsForMerchant(merchantId),
    RewardsNetworkTillo.State.Selectors.BrandSelectors.selectBrandRemotePagination,
    (tilloBrands, pagination) => selectPaginatedElements(tilloBrands, pagination)
)

const selectPaginatedFilteredTilloBrandsForSelectedBrand = createSelector(
    selectFilteredTilloBrandsForSelectedBrand,
    RewardsNetworkTillo.State.Selectors.BrandSelectors.selectBrandRemotePagination,
    (tilloBrands, pagination) => selectPaginatedElements(tilloBrands, pagination)
)

const selectPaginatedFilteredTilloBrandsForSelectedMerchant = createSelector(
    selectFilteredTilloBrandsForSelectedMerchant,
    RewardsNetworkTillo.State.Selectors.BrandSelectors.selectBrandRemotePagination,
    (tilloBrands, pagination) => selectPaginatedElements(tilloBrands, pagination)
)

const selectPaginatedFilteredTilloBrandsForBrand = (brandId: string) => createSelector(
    selectFilteredTilloBrandsForBrand(brandId),
    RewardsNetworkTillo.State.Selectors.BrandSelectors.selectBrandRemotePagination,
    (tilloBrands, pagination) => selectPaginatedElements(tilloBrands, pagination)
)

const selectPaginatedFilteredTilloBrandsForMerchant = (merchantId: string) => createSelector(
    selectFilteredTilloBrandsForMerchant(merchantId),
    RewardsNetworkTillo.State.Selectors.BrandSelectors.selectBrandRemotePagination,
    (tilloBrands, pagination) => selectPaginatedElements(tilloBrands, pagination)
)

export const TilloBrandSelectors = {
    selectBrandTilloBrandState,
    selectBrandTilloBrandFilters,
    selectBrandTilloBrandRemotePagination,
    selectBrandTilloBrandRemoteState,
    selectSelectedBrandTilloBrandId,
    brandTilloBrandEntitySelectors,
    selectBrandTilloBrandEntityState,
    selectBrandTilloBrandIds,
    selectBrandTilloBrandEntities,
    selectAllBrandTilloBrands,
    selectBrandTilloBrandTotal,
    selectBrandTilloBrandById,
    selectedBrandTilloBrand,
    selectBrandTilloBrandsForSelectedBrand,
    selectBrandTilloBrandsForSelectedMerchant,
    selectBrandTilloBrandsForSelectedTilloBrand,
    selectBrandTilloBrandsForBrand,
    selectBrandTilloBrandsForMerchant,
    selectBrandTilloBrandsForTilloBrand,
    selectFilteredBrandTilloBrands,
    selectFilteredBrandTilloBrandsForSelectedBrand,
    selectFilteredBrandTilloBrandsForSelectedMerchant,
    selectFilteredBrandTilloBrandsForSelectedTilloBrand,
    selectFilteredBrandTilloBrandsForBrand,
    selectFilteredBrandTilloBrandsForMerchant,
    selectFilteredBrandTilloBrandsForTilloBrand,
    selectPaginatedBrandTilloBrands,
    selectPaginatedBrandTilloBrandsForSelectedMerchant,
    selectPaginatedBrandTilloBrandsForSelectedBrand,
    selectPaginatedBrandTilloBrandsForSelectedTilloBrand,
    selectPaginatedBrandTilloBrandsForBrand,
    selectPaginatedBrandTilloBrandsForMerchant,
    selectPaginatedBrandTilloBrandsForTilloBrand,
    selectPaginatedFilteredBrandTilloBrands,
    selectPaginatedFilteredBrandTilloBrandsForSelectedMerchant,
    selectPaginatedFilteredBrandTilloBrandsForSelectedBrand,
    selectPaginatedFilteredBrandTilloBrandsForSelectedTilloBrand,
    selectPaginatedFilteredBrandTilloBrandsForBrand,
    selectPaginatedFilteredBrandTilloBrandsForMerchant,
    selectPaginatedFilteredBrandTilloBrandsForTilloBrand,
    selectTilloBrandsForSelectedBrand,
    selectTilloBrandsForSelectedMerchant,
    selectTilloBrandsForBrand,
    selectTilloBrandsForMerchant,
    selectFilteredTilloBrandsForSelectedBrand,
    selectFilteredTilloBrandsForSelectedMerchant,
    selectFilteredTilloBrandsForBrand,
    selectFilteredTilloBrandsForMerchant,
    selectPaginatedTilloBrandsForSelectedBrand,
    selectPaginatedTilloBrandsForSelectedMerchant,
    selectPaginatedTilloBrandsForBrand,
    selectPaginatedTilloBrandsForMerchant,
    selectPaginatedFilteredTilloBrandsForSelectedBrand,
    selectPaginatedFilteredTilloBrandsForSelectedMerchant,
    selectPaginatedFilteredTilloBrandsForBrand,
    selectPaginatedFilteredTilloBrandsForMerchant
}