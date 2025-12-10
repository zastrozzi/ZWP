import { partnerEnduserSubscriptionRoutesForEnduser } from './partner-enduser-subscription.routes'
import { partnerRoutesForEnduser } from './partner.routes'
import { subgroupEnduserSubscriptionRoutesForEnduser } from './subgroup-enduser-subscription.routes'
import { subgroupRoutesForEnduser } from './subgroup.routes'

export const enduserRoutesForPartner = (path: string) => {
    const segment = 'endusers'
    return {
        listEndusers: () => `${path}/${segment}`,
        addEnduser: (id: string) => `${path}/${segment}/${id}/add`,
        removeEnduser: (id: string) => `${path}/${segment}/${id}/remove`
    }
}

export const enduserRoutesForSubgroup = (path: string) => {
    const segment = 'endusers'
    return {
        listEndusers: () => `${path}/${segment}`,
        addEnduser: (id: string) => `${path}/${segment}/${id}/add`,
        removeEnduser: (id: string) => `${path}/${segment}/${id}/remove`
    }
}

export const enduserRoutes = (path: string) => {
    const segment = 'endusers'
    return {
        partnerEnduserSubscriptionRoutesForEnduser: (id: string) =>
            partnerEnduserSubscriptionRoutesForEnduser(`${path}/${segment}/${id}`),
        subgroupEnduserSubscriptionRoutesForEnduser: (id: string) =>
            subgroupEnduserSubscriptionRoutesForEnduser(`${path}/${segment}/${id}`),
        partnerRoutesForEnduser: (id: string) => partnerRoutesForEnduser(`${path}/${segment}/${id}`),
        subgroupRoutesForEnduser: (id: string) => subgroupRoutesForEnduser(`${path}/${segment}/${id}`)
    }
}