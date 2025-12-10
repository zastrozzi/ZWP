import { assetRoutesForPartner } from './asset.routes'
import { enduserRoutesForPartner } from './enduser.routes'
import { locationRoutesForPartner } from './location.routes'
import { partnerAssetAssignmentRoutesForPartner } from './partner-asset-assignment.routes'
import { partnerEnduserSubscriptionRoutesForPartner } from './partner-enduser-subscription.routes'
import { subgroupRoutesForPartner } from './subgroup.routes'
import { partnerTypeAssignmentRoutesForPartner } from './partner-type-assignment.routes'
import { partnerTypeRoutesForPartner } from './partner-type.routes'

export const partnerRoutesForPartnerType = (path: string) => {
    const segment = 'partners'
    return {
        listPartners: () => `${path}/${segment}`,
        addPartner: (id: string) => `${path}/${segment}/${id}/add`,
        removePartner: (id: string) => `${path}/${segment}/${id}/remove`,
    }
}

export const partnerRoutesForAsset = (path: string) => {
    const segment = 'partners'
    return {
        listPartners: () => `${path}/${segment}`
    }
}

export const partnerRoutesForEnduser = (path: string) => {
    const segment = 'partners'
    return {
        listPartners: () => `${path}/${segment}`
    }
}

export const partnerRoutes = (path: string) => {
    const segment = 'partners'
    return {
        createPartner: () => `${path}/${segment}`,
        listPartners: () => `${path}/${segment}`,
        getPartner: (id: string) => `${path}/${segment}/${id}`,
        updatePartner: (id: string) => `${path}/${segment}/${id}`,
        deletePartner: (id: string) => `${path}/${segment}/${id}`,
        assetRoutesForPartner: (id: string) => assetRoutesForPartner(`${path}/${segment}/${id}`),
        enduserRoutesForPartner: (id: string) => enduserRoutesForPartner(`${path}/${segment}/${id}`),
        locationRoutesForPartner: (id: string) => locationRoutesForPartner(`${path}/${segment}/${id}`),
        partnerAssetAssignmentRoutesForPartner: (id: string) =>
            partnerAssetAssignmentRoutesForPartner(`${path}/${segment}/${id}`),
        partnerEnduserSubscriptionRoutesForPartner: (id: string) =>
            partnerEnduserSubscriptionRoutesForPartner(`${path}/${segment}/${id}`),
        partnerTypeRoutesForPartner: (id: string) => partnerTypeRoutesForPartner(`${path}/${segment}/${id}`),
        partnerTypeAssignmentRoutesForPartner: (id: string) =>
            partnerTypeAssignmentRoutesForPartner(`${path}/${segment}/${id}`),
        subgroupRoutesForPartner: (id: string) => subgroupRoutesForPartner(`${path}/${segment}/${id}`),
    }
}
