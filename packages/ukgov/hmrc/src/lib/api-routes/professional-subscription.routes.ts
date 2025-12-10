const professionalBodyRoutes = (path: string) => {
    const segment = 'professional-bodies'
    return {
        createProfessionalBody: () => `${path}/${segment}`,
        getProfessionalBody: (professionalBodyId: string) => `${path}/${segment}/${professionalBodyId}`,
        listProfessionalBodies: () => `${path}/${segment}`,
        updateProfessionalBody: (professionalBodyId: string) => `${path}/${segment}/${professionalBodyId}`,
        deleteProfessionalBody: (professionalBodyId: string) => `${path}/${segment}/${professionalBodyId}`
    }
}

const professionalBodyRoutesForEnduser = (path: string) => {
    return {
        createProfessionalBody: professionalBodyRoutes(path).createProfessionalBody,
        listProfessionalBodies: professionalBodyRoutes(path).listProfessionalBodies
    }
}

const subscriptionRoutes = (path: string) => {
    const segment = 'subscriptions'
    return {
        getProfessionalSubscription: (professionalSubscriptionId: string) => `${path}/${segment}/${professionalSubscriptionId}`,
        listProfessionalSubscriptions: () => `${path}/${segment}`,
        updateProfessionalSubscription: (professionalSubscriptionId: string) => `${path}/${segment}/${professionalSubscriptionId}`,
        deleteProfessionalSubscription: (professionalSubscriptionId: string) => `${path}/${segment}/${professionalSubscriptionId}`
    }
}

const subscriptionRoutesForEnduser = (path: string) => {
    const segment = 'subscriptions'
    return {
        createProfessionalSubscription: () => `${path}/${segment}`,
        listProfessionalSubscriptions: subscriptionRoutes(path).listProfessionalSubscriptions
    }
}

export const professionalSubscriptionRoutes = (path: string) => {
    return {
        professionalBodyRoutes: professionalBodyRoutes(path),
        subscriptionRoutes: subscriptionRoutes(path),
        professionalBodyRoutesForEnduser: professionalBodyRoutesForEnduser(path),
        subscriptionRoutesForEnduser: subscriptionRoutesForEnduser(path)
    }
}