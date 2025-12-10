const webhookEndpointRoutes = (path: string) => {
    const segment = 'webhook-endpoints'
    return {
        listWebhookEndpoints: () => `${path}/${segment}`,
        getWebhookEndpoint: (id: string) => `${path}/${segment}/${id}`,
        deleteWebhookEndpoint: (id: string) => `${path}/${segment}/${id}`,
        createWebhookEndpoint: () => `${path}/${segment}`,
        updateWebhookEndpoint: (id: string) => `${path}/${segment}/${id}`,
        refreshWebhookEndpoints: () => `${path}/${segment}/refresh`
    }
}

export const eventRoutes = (path: string) => {
    const segment = 'events'
    return {
        webhookEndpointRoutes: () => webhookEndpointRoutes(`${path}/${segment}`)
    }
}