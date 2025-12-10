import { EnvironmentProviders } from '@angular/core'
import { provideEffects } from '@ngrx/effects'
import { PartnerNetAssetEffects } from './asset.effects'
import { PartnerNetLocationEffects } from './location.effects'
import { PartnerNetPartnerAssetAssignmentEffects } from './partner-asset-assignment.effects'
import { PartnerNetPartnerEnduserSubscriptionEffects } from './partner-enduser-subscription.effects'
import { PartnerNetPartnerTypeAssignmentEffects } from './partner-type-assignment.effects'
import { PartnerNetPartnerTypeEffects } from './partner-type.effects'
import { PartnerNetPartnerEffects } from './partner.effects'
import { PartnerNetSubgroupAssetAssignmentEffects } from './subgroup-asset-assignment.effects'
import { PartnerNetSubgroupEnduserSubscriptionEffects } from './subgroup-enduser-subscription.effects'
import { PartnerNetSubgroupEffects } from './subgroup.effects'

export const environmentProviders: EnvironmentProviders[] = [
    provideEffects(
        PartnerNetAssetEffects,
        PartnerNetLocationEffects,
        PartnerNetPartnerAssetAssignmentEffects,
        PartnerNetPartnerEnduserSubscriptionEffects,
        PartnerNetPartnerTypeAssignmentEffects,
        PartnerNetPartnerTypeEffects,
        PartnerNetPartnerEffects,
        PartnerNetSubgroupAssetAssignmentEffects,
        PartnerNetSubgroupEnduserSubscriptionEffects,
        PartnerNetSubgroupEffects
    )
]