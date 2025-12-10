import { A11yModule } from "@angular/cdk/a11y";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkTreeModule } from '@angular/cdk/tree'

export const COMMON_EXPORTABLE_CDK_MODULES = [
    A11yModule, 
    ClipboardModule, 
    DragDropModule, 
    OverlayModule, 
    PortalModule, 
    ScrollingModule,
    CdkTreeModule
]