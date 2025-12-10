import { OverlayRef } from '@angular/cdk/overlay'
import { UtilityDockPanelType } from '../enums'
import { ComponentRef } from '@angular/core'

export interface UtilityDockPanel {
    type: UtilityDockPanelType
    isExpanded: boolean
}

export interface UtilityDockPanelOverlayRef<C> {
    overlayRef?: OverlayRef
    componentRef?: ComponentRef<C>
}