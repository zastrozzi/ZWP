import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Identifiers } from '../identifiers'
import { Reducers } from '../reducers'
import { createNamespacedFeatureKey, selectFilteredElements, selectPaginatedElements, selectRemoteState } from '@zwp/platform.common'
import { MerchantSelectors } from './merchant.selectors'
import { BrandSelectors } from './brand.selectors'
import { Model } from '../../model'
import { LoyaltyCardSchemeSelectors } from './loyalty-card-scheme.selectors'

const selectLoyaltyCardSchemeBrandState = createFeatureSelector<Reducers.LoyaltyCardSchemeBrandFeatureState>(
    createNamespacedFeatureKey(
        Identifiers.REWARDS_NETWORK_MERCHANT_NET_ACTION_IDENTIFIER,
        Identifiers.LOYALTY_CARD_SCHEME_BRAND_STATE_FEATURE_KEY
    )
)
const selectLoyaltyCardSchemeBrandFilters = createSelector(selectLoyaltyCardSchemeBrandState, (state) => state.filters)
const selectLoyaltyCardSchemeBrandRemotePagination = createSelector(selectLoyaltyCardSchemeBrandState, (state) => state.loyaltyCardSchemeBrandsRemotePagination)
const selectLoyaltyCardSchemeBrandRemoteState = createSelector(selectLoyaltyCardSchemeBrandState, selectRemoteState)

const selectSelectedLoyaltyCardSchemeBrandId = createSelector(selectLoyaltyCardSchemeBrandState, (state) => state.selectedLoyaltyCardSchemeBrandId)

const loyaltyCardSchemeBrandEntitySelectors = Reducers.loyaltyCardSchemeBrandEntityAdapter.getSelectors()
const selectLoyaltyCardSchemeBrandEntityState = createSelector(selectLoyaltyCardSchemeBrandState, (state) => state.loyaltyCardSchemeBrands)
const selectLoyaltyCardSchemeBrandIds = createSelector(selectLoyaltyCardSchemeBrandEntityState, loyaltyCardSchemeBrandEntitySelectors.selectIds)
const selectLoyaltyCardSchemeBrandEntities = createSelector(selectLoyaltyCardSchemeBrandEntityState, loyaltyCardSchemeBrandEntitySelectors.selectEntities)
const selectAllLoyaltyCardSchemeBrands = createSelector(selectLoyaltyCardSchemeBrandEntityState, loyaltyCardSchemeBrandEntitySelectors.selectAll)
const selectLoyaltyCardSchemeBrandTotal = createSelector(selectLoyaltyCardSchemeBrandEntityState, loyaltyCardSchemeBrandEntitySelectors.selectTotal)
const selectLoyaltyCardSchemeBrandById = (id: string) => createSelector(selectLoyaltyCardSchemeBrandEntities, (entities) => entities[id])

const selectedLoyaltyCardSchemeBrand = createSelector(
    selectLoyaltyCardSchemeBrandEntities,
    selectSelectedLoyaltyCardSchemeBrandId,
    (entities, selectedId) => entities[selectedId ?? '']
)

const selectLoyaltyCardSchemeBrandsForSelectedBrand = createSelector(
    BrandSelectors.selectSelectedBrandId,
    selectAllLoyaltyCardSchemeBrands,
    (brandId, loyaltyCardSchemeBrands) => loyaltyCardSchemeBrands.filter(loyaltyCardSchemeBrand => loyaltyCardSchemeBrand.brandId === brandId)
)

const selectLoyaltyCardSchemeBrandsForSelectedCardScheme = createSelector(
    LoyaltyCardSchemeSelectors.selectSelectedLoyaltyCardSchemeId,
    selectAllLoyaltyCardSchemeBrands,
    (cardSchemeId, loyaltyCardSchemeBrands) => loyaltyCardSchemeBrands.filter(loyaltyCardSchemeBrand => loyaltyCardSchemeBrand.cardSchemeId === cardSchemeId)
)

const selectLoyaltyCardSchemeBrandsForBrand = (brandId: string) => createSelector(
    selectAllLoyaltyCardSchemeBrands,
    (loyaltyCardSchemeBrands) => loyaltyCardSchemeBrands.filter(loyaltyCardSchemeBrand => loyaltyCardSchemeBrand.brandId === brandId)
)

const selectLoyaltyCardSchemeBrandsForCardScheme = (cardSchemeId: string) => createSelector(
    selectAllLoyaltyCardSchemeBrands,
    (loyaltyCardSchemeBrands) => loyaltyCardSchemeBrands.filter(loyaltyCardSchemeBrand => loyaltyCardSchemeBrand.cardSchemeId === cardSchemeId)
)

const selectFilteredLoyaltyCardSchemeBrands = createSelector(
    selectAllLoyaltyCardSchemeBrands,
    selectLoyaltyCardSchemeBrandFilters,
    (loyaltyCardSchemeBrands, filters) => selectFilteredElements(loyaltyCardSchemeBrands, filters, Model.Filters.loyaltyCardSchemeBrandFilterEntityMap)
)

const selectPaginatedLoyaltyCardSchemeBrands = createSelector(
    selectAllLoyaltyCardSchemeBrands,
    selectLoyaltyCardSchemeBrandRemotePagination,
    (loyaltyCardSchemeBrands, pagination) => selectPaginatedElements(loyaltyCardSchemeBrands, pagination)
)

const selectPaginatedFilteredLoyaltyCardSchemeBrands = createSelector(
    selectFilteredLoyaltyCardSchemeBrands,
    selectLoyaltyCardSchemeBrandRemotePagination,
    (loyaltyCardSchemeBrands, pagination) => selectPaginatedElements(loyaltyCardSchemeBrands, pagination)
)

const selectFilteredLoyaltyCardSchemeBrandsForSelectedBrand = createSelector(
    selectLoyaltyCardSchemeBrandsForSelectedBrand,
    selectLoyaltyCardSchemeBrandFilters,
    (loyaltyCardSchemeBrands, filters) => selectFilteredElements(loyaltyCardSchemeBrands, filters, Model.Filters.loyaltyCardSchemeBrandFilterEntityMap)
)

const selectPaginatedFilteredLoyaltyCardSchemeBrandsForSelectedBrand = createSelector(
    selectFilteredLoyaltyCardSchemeBrandsForSelectedBrand,
    selectLoyaltyCardSchemeBrandRemotePagination,
    (loyaltyCardSchemeBrands, pagination) => selectPaginatedElements(loyaltyCardSchemeBrands, pagination)
)

const selectFilteredLoyaltyCardSchemeBrandsForSelectedCardScheme = createSelector(
    selectLoyaltyCardSchemeBrandsForSelectedCardScheme,
    selectLoyaltyCardSchemeBrandFilters,
    (loyaltyCardSchemeBrands, filters) => selectFilteredElements(loyaltyCardSchemeBrands, filters, Model.Filters.loyaltyCardSchemeBrandFilterEntityMap)
)

const selectPaginatedFilteredLoyaltyCardSchemeBrandsForSelectedCardScheme = createSelector(
    selectFilteredLoyaltyCardSchemeBrandsForSelectedCardScheme,
    selectLoyaltyCardSchemeBrandRemotePagination,
    (loyaltyCardSchemeBrands, pagination) => selectPaginatedElements(loyaltyCardSchemeBrands, pagination)
)

const selectFilteredLoyaltyCardSchemeBrandsForBrand = (brandId: string) => createSelector(
    selectLoyaltyCardSchemeBrandsForBrand(brandId),
    selectLoyaltyCardSchemeBrandFilters,
    (loyaltyCardSchemeBrands, filters) => selectFilteredElements(loyaltyCardSchemeBrands, filters, Model.Filters.loyaltyCardSchemeBrandFilterEntityMap)
)

const selectPaginatedFilteredLoyaltyCardSchemeBrandsForBrand = (brandId: string) => createSelector(
    selectFilteredLoyaltyCardSchemeBrandsForBrand(brandId),
    selectLoyaltyCardSchemeBrandRemotePagination,
    (loyaltyCardSchemeBrands, pagination) => selectPaginatedElements(loyaltyCardSchemeBrands, pagination)
)

const selectFilteredLoyaltyCardSchemeBrandsForCardScheme = (cardSchemeId: string) => createSelector(
    selectLoyaltyCardSchemeBrandsForCardScheme(cardSchemeId),
    selectLoyaltyCardSchemeBrandFilters,
    (loyaltyCardSchemeBrands, filters) => selectFilteredElements(loyaltyCardSchemeBrands, filters, Model.Filters.loyaltyCardSchemeBrandFilterEntityMap)
)

const selectPaginatedFilteredLoyaltyCardSchemeBrandsForCardScheme = (cardSchemeId: string) => createSelector(
    selectFilteredLoyaltyCardSchemeBrandsForCardScheme(cardSchemeId),
    selectLoyaltyCardSchemeBrandRemotePagination,
    (loyaltyCardSchemeBrands, pagination) => selectPaginatedElements(loyaltyCardSchemeBrands, pagination)
)

const selectLoyaltyCardSchemesForSelectedBrand = createSelector(
    selectLoyaltyCardSchemeBrandsForSelectedBrand,
    LoyaltyCardSchemeSelectors.selectAllLoyaltyCardSchemes,
    (cardSchemeBrands, loyaltyCardSchemes) => loyaltyCardSchemes.filter(loyaltyCardScheme => cardSchemeBrands.some(cardSchemeBrand => cardSchemeBrand.cardSchemeId === loyaltyCardScheme.id))
)

const selectLoyaltyCardSchemesForBrand = (brandId: string) => createSelector(
    selectLoyaltyCardSchemeBrandsForBrand(brandId),
    LoyaltyCardSchemeSelectors.selectAllLoyaltyCardSchemes,
    (cardSchemeBrands, loyaltyCardSchemes) => loyaltyCardSchemes.filter(loyaltyCardScheme => cardSchemeBrands.some(cardSchemeBrand => cardSchemeBrand.cardSchemeId === loyaltyCardScheme.id))
)

const selectFilteredLoyaltyCardSchemesForSelectedBrand = createSelector(
    selectLoyaltyCardSchemesForSelectedBrand,
    LoyaltyCardSchemeSelectors.selectLoyaltyCardSchemeFilters,
    (loyaltyCardSchemes, filters) => selectFilteredElements(loyaltyCardSchemes, filters, Model.Filters.loyaltyCardSchemeFilterEntityMap)
)

const selectPaginatedFilteredLoyaltyCardSchemesForSelectedBrand = createSelector(
    selectFilteredLoyaltyCardSchemesForSelectedBrand,
    LoyaltyCardSchemeSelectors.selectLoyaltyCardSchemeRemotePagination,
    (loyaltyCardSchemes, pagination) => selectPaginatedElements(loyaltyCardSchemes, pagination)
)


const selectFilteredLoyaltyCardSchemesForBrand = (brandId: string) => createSelector(
    selectLoyaltyCardSchemesForBrand(brandId),
    LoyaltyCardSchemeSelectors.selectLoyaltyCardSchemeFilters,
    (loyaltyCardSchemes, filters) => selectFilteredElements(loyaltyCardSchemes, filters, Model.Filters.loyaltyCardSchemeFilterEntityMap)
)

const selectPaginatedFilteredLoyaltyCardSchemesForBrand = (brandId: string) => createSelector(
    selectFilteredLoyaltyCardSchemesForBrand(brandId),
    LoyaltyCardSchemeSelectors.selectLoyaltyCardSchemeRemotePagination,
    (loyaltyCardSchemes, pagination) => selectPaginatedElements(loyaltyCardSchemes, pagination)
)

const selectBrandsForSelectedLoyaltyCardScheme = createSelector(
    selectLoyaltyCardSchemeBrandsForSelectedCardScheme,
    BrandSelectors.selectAllBrands,
    (loyaltyCardSchemeBrands, brands) => brands.filter(brand => loyaltyCardSchemeBrands.some(loyaltyCardSchemeBrand => loyaltyCardSchemeBrand.brandId === brand.id))
)
const selectBrandsForLoyaltyCardScheme = (cardSchemeId: string) => createSelector(
    selectLoyaltyCardSchemeBrandsForCardScheme(cardSchemeId),
    BrandSelectors.selectAllBrands,
    (loyaltyCardSchemeBrands, brands) => brands.filter(brand => loyaltyCardSchemeBrands.some(loyaltyCardSchemeBrand => loyaltyCardSchemeBrand.brandId === brand.id))
)
const selectFilteredBrandsForSelectedLoyaltyCardScheme = createSelector(
    selectBrandsForSelectedLoyaltyCardScheme,
    BrandSelectors.selectBrandFilters,
    (brands, filters) => selectFilteredElements(brands, filters, Model.Filters.brandFilterEntityMap)
)

const selectPaginatedFilteredBrandsForSelectedLoyaltyCardScheme = createSelector(
    selectFilteredBrandsForSelectedLoyaltyCardScheme,
    BrandSelectors.selectBrandRemotePagination,
    (brands, pagination) => selectPaginatedElements(brands, pagination)
)

const selectFilteredBrandsForLoyaltyCardScheme = (cardSchemeId: string) => createSelector(
    selectBrandsForLoyaltyCardScheme(cardSchemeId),
    BrandSelectors.selectBrandFilters,
    (brands, filters) => selectFilteredElements(brands, filters, Model.Filters.brandFilterEntityMap)
)

const selectPaginatedFilteredBrandsForLoyaltyCardScheme = (cardSchemeId: string) => createSelector(
    selectFilteredBrandsForLoyaltyCardScheme(cardSchemeId),
    BrandSelectors.selectBrandRemotePagination,
    (brands, pagination) => selectPaginatedElements(brands, pagination)
)

export const LoyaltyCardSchemeBrandSelectors = {
    selectLoyaltyCardSchemeBrandState,
    selectLoyaltyCardSchemeBrandFilters,
    selectLoyaltyCardSchemeBrandRemotePagination,
    selectLoyaltyCardSchemeBrandRemoteState,

    selectSelectedLoyaltyCardSchemeBrandId,
    
    loyaltyCardSchemeBrandEntitySelectors,
    selectLoyaltyCardSchemeBrandEntityState,
    selectLoyaltyCardSchemeBrandIds,
    selectLoyaltyCardSchemeBrandEntities,
    selectAllLoyaltyCardSchemeBrands,
    selectLoyaltyCardSchemeBrandTotal,
    selectLoyaltyCardSchemeBrandById,
    selectedLoyaltyCardSchemeBrand,
    selectLoyaltyCardSchemeBrandsForSelectedBrand,
    selectLoyaltyCardSchemeBrandsForSelectedCardScheme,
    selectLoyaltyCardSchemeBrandsForBrand,
    selectLoyaltyCardSchemeBrandsForCardScheme,
    selectFilteredLoyaltyCardSchemeBrands,
    selectPaginatedLoyaltyCardSchemeBrands,
    selectPaginatedFilteredLoyaltyCardSchemeBrands,
    selectFilteredLoyaltyCardSchemeBrandsForSelectedBrand,
    selectPaginatedFilteredLoyaltyCardSchemeBrandsForSelectedBrand,
    selectFilteredLoyaltyCardSchemeBrandsForSelectedCardScheme,
    selectPaginatedFilteredLoyaltyCardSchemeBrandsForSelectedCardScheme,
    selectFilteredLoyaltyCardSchemeBrandsForBrand,
    selectPaginatedFilteredLoyaltyCardSchemeBrandsForBrand,
    selectFilteredLoyaltyCardSchemeBrandsForCardScheme,
    selectPaginatedFilteredLoyaltyCardSchemeBrandsForCardScheme,
    selectLoyaltyCardSchemesForSelectedBrand,
    selectLoyaltyCardSchemesForBrand,
    selectFilteredLoyaltyCardSchemesForSelectedBrand,
    selectPaginatedFilteredLoyaltyCardSchemesForSelectedBrand,
    selectFilteredLoyaltyCardSchemesForBrand,
    selectPaginatedFilteredLoyaltyCardSchemesForBrand,
    selectBrandsForSelectedLoyaltyCardScheme,
    selectBrandsForLoyaltyCardScheme,
    selectFilteredBrandsForSelectedLoyaltyCardScheme,
    selectPaginatedFilteredBrandsForSelectedLoyaltyCardScheme,
    selectFilteredBrandsForLoyaltyCardScheme,
    selectPaginatedFilteredBrandsForLoyaltyCardScheme
}
