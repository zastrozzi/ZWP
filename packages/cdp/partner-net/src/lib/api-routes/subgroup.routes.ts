import { assetRoutesForSubgroup } from './asset.routes'
import { enduserRoutesForSubgroup } from './enduser.routes'
import { locationRoutesForSubgroup } from './location.routes'
import { subgroupAssetAssignmentRoutesForSubgroup } from './subgroup-asset-assignment.routes'
import { subgroupEnduserSubscriptionRoutesForSubgroup } from './subgroup-enduser-subscription.routes'

export const subgroupRoutesForPartner = (path: string) => {
    const segment = 'subgroups'
    return {
        createSubgroup: () => `${path}/${segment}`,
        listSubgroups: () => `${path}/${segment}`
    }
}

export const subgroupRoutesForAsset = (path: string) => {
    const segment = 'subgroups'
    return {
        listSubgroups: () => `${path}/${segment}`
    }
}

export const subgroupRoutesForEnduser = (path: string) => {
    const segment = 'subgroups'
    return {
        listSubgroups: () => `${path}/${segment}`
    }
}

export const subgroupRoutes = (path: string) => {
    const segment = 'subgroups'
    return {
        listSubgroups: () => `${path}/${segment}`,
        getSubgroup: (id: string) => `${path}/${segment}/${id}`,
        updateSubgroup: (id: string) => `${path}/${segment}/${id}`,
        deleteSubgroup: (id: string) => `${path}/${segment}/${id}`,
        assetRoutesForSubgroup: (id: string) => assetRoutesForSubgroup(`${path}/${segment}/${id}`),
        enduserRoutesForSubgroup: (id: string) => enduserRoutesForSubgroup(`${path}/${segment}/${id}`),
        locationRoutesForSubgroup: (id: string) => locationRoutesForSubgroup(`${path}/${segment}/${id}`),
        subgroupAssetAssignmentRoutesForSubgroup: (id: string) =>
            subgroupAssetAssignmentRoutesForSubgroup(`${path}/${segment}/${id}`),
        subgroupEnduserSubscriptionRoutesForSubgroup: (id: string) =>
            subgroupEnduserSubscriptionRoutesForSubgroup(`${path}/${segment}/${id}`)
    }
}