export const digitalCodeRoutes = (path: string) => {
    const segment = 'digital/codes'
    return {
        getDigitalCodes: (digitalCodeId: string) => `${path}/${segment}/${digitalCodeId}`,
        listDigitalCodes: () => `${path}/${segment}`,
        deleteDigitalCode: (digitalCodeId: string) => `${path}/${segment}/${digitalCodeId}` ,

        checkDigitalCodeStatus: (digitalCodeId: string) => `${path}/${segment}/${digitalCodeId}/status`,
        checkDigitalCodeBalance: (digitalCodeId: string) => `${path}/${segment}/${digitalCodeId}/balance` ,

        cancelDigitalCode: (digitalCodeId: string) => `${path}/${segment}/${digitalCodeId}/cancel-code`,
        cancelDigitalCodeUrl: (digitalCodeId: string) => `${path}/${segment}/${digitalCodeId}/cancel-url`,

        topupDigitalCode: (digitalCodeId: string) => `${path}/${segment}/${digitalCodeId}/topup`,

        digitalCodeRoutesForReference: () => digitalCodeRoutesForReference(`${path}/${segment}`)
    }
}

export const digitalCodeRoutesForReference = (path: string) => {
    const segment = 'reference'
    return {
        checkStatusFromReference: (referenceId: string) => `${path}/${segment}/${referenceId}/status`
    }
}

export const digitalCodeRoutesForStoreCard = (path: string) => {
    const segment = 'digital/codes'
    return {
        listDigitalCodesForStoreCard: () => `${path}/${segment}`
    }
}

export const digitalCodeRoutesforBrand = (path: string) => {
    const segment = 'digital/codes'
    return {
        orderDigitalCode: () => `${path}/${segment}/order`,
        issueDigitalCode: () => `${path}/${segment}/issue`,
        issueDigitalCodeWithPersonlisation: () => `${path}/${segment}/issue-personalised`,
        issueDigitalCodeTilloFulfilment: () => `${path}/${segment}/issue-tillo-fulfilment`
    }
}

