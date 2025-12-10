export const subgroupEnduserSubscriptionRoutesForSubgroup = (path: string) => {
    const segment = 'subgroup-enduser-subscriptions'
    return {
        listSubgroupEnduserSubscriptions: () => `${path}/${segment}`
    }
}

export const subgroupEnduserSubscriptionRoutesForEnduser = (path: string) => {
    const segment = 'subgroup-enduser-subscriptions'
    return {
        listSubgroupEnduserSubscriptions: () => `${path}/${segment}`
    }
}

export const subgroupEnduserSubscriptionRoutes = (path: string) => {
    const segment = 'subgroup-enduser-subscriptions'
    return {
        listSubgroupEnduserSubscriptions: () => `${path}/${segment}`,
        getSubgroupEnduserSubscription: (id: string) => `${path}/${segment}/${id}`,
        updateSubgroupEnduserSubscription: (id: string) => `${path}/${segment}/${id}`,
        deleteSubgroupEnduserSubscription: (id: string) => `${path}/${segment}/${id}`
    }
}