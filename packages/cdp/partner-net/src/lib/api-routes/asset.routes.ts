import { partnerAssetAssignmentRoutesForAsset } from './partner-asset-assignment.routes'
import { subgroupRoutesForAsset } from './subgroup.routes'
import { subgroupAssetAssignmentRoutesForAsset } from './subgroup-asset-assignment.routes'
import { partnerRoutesForAsset } from './partner.routes'

export const assetRoutesForPartner = (path: string) => {
    const segment = 'assets'
    return {
        listAssets: () => `${path}/${segment}`,
        addAsset: (id: string) => `${path}/${segment}/${id}/add`,
        removeAsset: (id: string) => `${path}/${segment}/${id}/remove`,
    }
}

export const assetRoutesForSubgroup = (path: string) => {
    const segment = 'assets'
    return {
        listAssets: () => `${path}/${segment}`,
        addAsset: (id: string) => `${path}/${segment}/${id}/add`,
        removeAsset: (id: string) => `${path}/${segment}/${id}/remove`,
    }
}

export const assetRoutes = (path: string) => {
    const segment = 'assets'
    return {
        createAsset: () => `${path}/${segment}`,
        listAssets: () => `${path}/${segment}`,
        getAsset: (id: string) => `${path}/${segment}/${id}`,
        updateAsset: (id: string) => `${path}/${segment}/${id}`,
        deleteAsset: (id: string) => `${path}/${segment}/${id}`,
        partnerAssetAssignmentRoutesForAsset: (id: string) =>
            partnerAssetAssignmentRoutesForAsset(`${path}/${segment}/${id}`),
        subgroupAssetAssignmentRoutesForAsset: (id: string) =>
            subgroupAssetAssignmentRoutesForAsset(`${path}/${segment}/${id}`),
        subgroupRoutesForAsset: (id: string) => subgroupRoutesForAsset(`${path}/${segment}/${id}`),
        partnerRoutesForAsset: (id: string) => partnerRoutesForAsset(`${path}/${segment}/${id}`),
        //   addAssetToPartner: (assetId: string, partnerId: string) => `${assets}/${assetId}/add/partner/${partnerId}`,
        //   removeAssetFromPartner: (assetId: string, partnerId: string) => `${assets}/${assetId}/remove/partner/${partnerId}`,
        //   addAssetToSubgroup: (assetId: string, subgroupId: string) => `${assets}/${assetId}/add/subgroup/${subgroupId}`,
        //   removeAssetFromSubgroup: (assetId: string, subgroupId: string) => `${assets}/${assetId}/remove/subgroup/${subgroupId}`
    }
}
