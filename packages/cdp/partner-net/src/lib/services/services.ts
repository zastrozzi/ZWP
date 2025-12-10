import { Provider } from '@angular/core'
import { CDPPartnerNetAPIConfig } from '../config'

import * as LiveServices from './live'
import * as MockServices from './mock'
import * as AbstractServices from './abstract'
import { ModuleAPIState } from '@zwp/platform.common'

export * from './abstract'
export * from './live'
export * from './mock'

export const environmentProviders = (
    apiConfig: CDPPartnerNetAPIConfig
): Provider[] => [
    {
        provide: AbstractServices.ASSET_API_SERVICE,
        useExisting:
            apiConfig.apiState === ModuleAPIState.LIVE
                ? LiveServices.AssetLiveAPIService
                : MockServices.AssetMockAPIService,
    },
    {
        provide: AbstractServices.ENDUSER_API_SERVICE,
        useExisting:
            apiConfig.apiState === ModuleAPIState.LIVE
                ? LiveServices.EnduserLiveAPIService
                : MockServices.EnduserMockAPIService,
    },
    {
        provide: AbstractServices.LOCATION_API_SERVICE,
        useExisting:
            apiConfig.apiState === ModuleAPIState.LIVE
                ? LiveServices.LocationLiveAPIService
                : MockServices.LocationMockAPIService,
    },
    {
        provide: AbstractServices.PARTNER_ASSET_ASSIGNMENT_API_SERVICE,
        useExisting:
            apiConfig.apiState === ModuleAPIState.LIVE
                ? LiveServices.PartnerAssetAssignmentLiveAPIService
                : MockServices.PartnerAssetAssignmentMockAPIService,
    },
    {
        provide: AbstractServices.PARTNER_ENDUSER_SUBSCRIPTION_API_SERVICE,
        useExisting:
            apiConfig.apiState === ModuleAPIState.LIVE
                ? LiveServices.PartnerEnduserSubscriptionLiveAPIService
                : MockServices.PartnerEnduserSubscriptionMockAPIService,
    },
    {
        provide: AbstractServices.PARTNER_TYPE_ASSIGNMENT_API_SERVICE,
        useExisting:
            apiConfig.apiState === ModuleAPIState.LIVE
                ? LiveServices.PartnerTypeAssignmentLiveAPIService
                : MockServices.PartnerTypeAssignmentMockAPIService,
    },
    {
        provide: AbstractServices.PARTNER_TYPE_API_SERVICE,
        useExisting:
            apiConfig.apiState === ModuleAPIState.LIVE
                ? LiveServices.PartnerTypeLiveAPIService
                : MockServices.PartnerTypeMockAPIService,
    },
    {
        provide: AbstractServices.PARTNER_API_SERVICE,
        useExisting:
            apiConfig.apiState === ModuleAPIState.LIVE
                ? LiveServices.PartnerLiveAPIService
                : MockServices.PartnerMockAPIService,
    },
    {
        provide: AbstractServices.SUBGROUP_API_SERVICE,
        useExisting:
            apiConfig.apiState === ModuleAPIState.LIVE
                ? LiveServices.SubgroupLiveAPIService
                : MockServices.SubgroupMockAPIService,
    },
    {
        provide: AbstractServices.SUBGROUP_ASSET_ASSIGNMENT_API_SERVICE,
        useExisting:
            apiConfig.apiState === ModuleAPIState.LIVE
                ? LiveServices.SubgroupAssetAssignmentLiveAPIService
                : MockServices.SubgroupAssetAssignmentMockAPIService
    },
    {
        provide: AbstractServices.SUBGROUP_ENDUSER_SUBSCRIPTION_API_SERVICE,
        useExisting:
            apiConfig.apiState === ModuleAPIState.LIVE
                ? LiveServices.SubgroupEnduserSubscriptionLiveAPIService
                : MockServices.SubgroupEnduserSubscriptionMockAPIService
    }
]
