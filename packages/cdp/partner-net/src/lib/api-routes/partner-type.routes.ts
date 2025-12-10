import { partnerTypeAssignmentRoutesForPartnerType } from './partner-type-assignment.routes'
import { partnerRoutesForPartnerType } from './partner.routes'

export const partnerTypeRoutesForPartner = (path: string) => {
    const segment = 'partner-types'
    return {
        listPartnerTypes: () => `${path}/${segment}`,
        addPartnerType: (id: string) => `${path}/${segment}/${id}/add`,
        removePartnerType: (id: string) => `${path}/${segment}/${id}/remove`
    }
}

export const partnerTypeRoutes = (path: string) => {
    const segment = 'partner-types'
    return {
        createPartnerType: () => `${path}/${segment}`,
        listPartnerTypes: () => `${path}/${segment}`,
        getPartnerType: (id: string) => `${path}/${segment}/${id}`,
        updatePartnerType: (id: string) => `${path}/${segment}/${id}`,
        deletePartnerType: (id: string) => `${path}/${segment}/${id}`,
        partnerRoutesForPartnerType: (id: string) => partnerRoutesForPartnerType(`${path}/${segment}/${id}`),
        partnerTypeAssignmentRoutesForPartnerType: (id: string) => partnerTypeAssignmentRoutesForPartnerType(`${path}/${segment}/${id}`)
    }
}