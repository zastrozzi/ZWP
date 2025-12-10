export const partnerEnduserSubscriptionRoutesForPartner = (path: string) => {
    const segment = 'partner-enduser-subscriptions'
    return {
        listPartnerEnduserSubscriptions: () => `${path}/${segment}`
    }
}

export const partnerEnduserSubscriptionRoutesForEnduser = (path: string) => {
    const segment = 'partner-enduser-subscriptions'
    return {
        listPartnerEnduserSubscriptions: () => `${path}/${segment}`
    }
}

export const partnerEnduserSubscriptionRoutes = (path: string) => {
    const segment = 'partner-enduser-subscriptions'
    return {
        listPartnerEnduserSubscriptions: () => `${path}/${segment}`,
        getPartnerEnduserSubscription: (id: string) => `${path}/${segment}/${id}`,
        updatePartnerEnduserSubscription: (id: string) => `${path}/${segment}/${id}`,
        deletePartnerEnduserSubscription: (id: string) => `${path}/${segment}/${id}`
    }
}