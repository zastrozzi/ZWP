import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { createNamespacedFeatureKey, ZWPCommonModule } from '@zwp/platform.common'
// import { FLOWS_EXPORTABLE_COMPONENTS } from './components'
// import { FLOWS_EXPORTABLE_DIRECTIVES } from './directives'
import { Identifiers } from './+state/identifiers'
import { flowContainerReducer } from './+state/reducers'
import { provideState } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
// import { FlowContainerEffects, FlowNodeEffects } from './+state/effects'
import { 
    FLOW_CONTAINER_API_SERVICE, 
    // FLOW_NODE_API_SERVICE, 
    FlowContainerLiveAPIService, 
    FlowContainerMockAPIService, 
    // FlowNodeLiveAPIService, 
    // FlowNodeMockAPIService 
} from './services'

@NgModule({
    imports: [
        CommonModule,
        ZWPCommonModule
    ],
    declarations: [
        // ...FLOWS_EXPORTABLE_COMPONENTS
    ],
    providers: [
        // provideState(FLOW_PROMPT_STATE_FEATURE_KEY, flowPromptReducer),
        provideState(
            createNamespacedFeatureKey(
                Identifiers.FLOWS_ACTION_IDENTIFIER,
                Identifiers.FLOW_CONTAINER_STATE_FEATURE_KEY
            ), flowContainerReducer),
        // provideState(FLOW_NODE_STATE_FEATURE_KEY, flowNodeReducer),
        // provideEffects([FlowContainerEffects, FlowNodeEffects])
    ],
    exports: [
        // ...FLOWS_EXPORTABLE_COMPONENTS
    ]
})
export class ZWPFlowsModule {
    static live(): ModuleWithProviders<ZWPFlowsModule> {

        return {
            ngModule: ZWPFlowsModule,
            providers: [
                { provide: FLOW_CONTAINER_API_SERVICE, useExisting: FlowContainerLiveAPIService },
                // { provide: FLOW_NODE_API_SERVICE, useExisting: FlowNodeLiveAPIService }
            ]
        }
    }

    static mock(): ModuleWithProviders<ZWPFlowsModule> {

        return {
            ngModule: ZWPFlowsModule,
            providers: [
                { provide: FLOW_CONTAINER_API_SERVICE, useExisting: FlowContainerMockAPIService },
                // { provide: FLOW_NODE_API_SERVICE, useExisting: FlowNodeMockAPIService }
            ]
        }
    }
}
