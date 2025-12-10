// import { CommonModule } from "@angular/common";
// import { NgModule } from "@angular/core";
// import { ZWPCommonModule, ZWPNgrxPersistenceModule } from "@zwp/platform.common";
// import { EffectsModule } from "@ngrx/effects";
// import { StoreModule } from "@ngrx/store";
// import { PanelLayoutEffects } from "../+state/effects/panel-layout.effects";
// import { ZWPPanelLayoutFacade } from "../+state/facades";
// import { PANEL_LAYOUT_STATE_FEATURE_KEY } from "../+state/identifiers";
// import { panelLayoutReducer, persistentPanelLayout } from "../+state/reducers";
// import { LAYOUT_PANELS_EXPORTABLE_COMPONENTS } from "../components";
// import { MaterialPanelDisplayModePipe } from "../pipes";

// @NgModule({
//     imports: [
//         CommonModule,
//         ZWPCommonModule,
//         StoreModule.forFeature(PANEL_LAYOUT_STATE_FEATURE_KEY, panelLayoutReducer),
//         EffectsModule.forFeature([PanelLayoutEffects]),
//         // ZWPNgrxPersistenceModule.forFeature(PANEL_LAYOUT_STATE_FEATURE_KEY, persistentPanelLayout),
//     ],
//     declarations: [
//         ...LAYOUT_PANELS_EXPORTABLE_COMPONENTS,
//         MaterialPanelDisplayModePipe
//     ],
//     providers: [
//         ZWPPanelLayoutFacade
//     ],
//     exports: [
//         ...LAYOUT_PANELS_EXPORTABLE_COMPONENTS,
//         MaterialPanelDisplayModePipe
//     ]
// })
// export class ZWPPanelLayoutModule {}