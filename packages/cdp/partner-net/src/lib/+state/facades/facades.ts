import { PartnerNetAssetFacade } from './asset.facade'
import { PartnerNetPartnerAssetAssignmentFacade } from './partner-asset-assignment.facade'
import { PartnerNetLocationFacade } from './location.facade'
import { PartnerNetPartnerTypeFacade } from './partner-type.facade'
import { PartnerNetPartnerFacade } from './partner.facade'
import { PartnerNetSubgroupFacade } from './subgroup.facade'
import { PartnerNetPartnerEnduserSubscriptionFacade } from './partner-enduser-subscription.facade'
import { PartnerNetSubgroupAssetAssignmentFacade } from './subgroup-asset-assignment.facade'
import { PartnerNetSubgroupEnduserSubscriptionFacade } from './subgroup-enduser-subscription.facade'

export * from './asset.facade'
export * from './location.facade'
export * from './partner-asset-assignment.facade'
export * from './partner-enduser-subscription.facade'
export * from './partner-type.facade'
export * from './partner.facade'
export * from './subgroup.facade'
export * from './subgroup-asset-assignment.facade'
export * from './subgroup-enduser-subscription.facade'

export const ALL = [
    PartnerNetAssetFacade,
    PartnerNetPartnerAssetAssignmentFacade,
    PartnerNetPartnerEnduserSubscriptionFacade,
    PartnerNetLocationFacade,
    PartnerNetPartnerTypeFacade,
    PartnerNetPartnerFacade,
    PartnerNetSubgroupFacade,
    PartnerNetSubgroupAssetAssignmentFacade,
    PartnerNetSubgroupEnduserSubscriptionFacade
]