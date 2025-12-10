import { CommonModule, NgOptimizedImage } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

export const COMMON_EXPORTABLE_ANGULAR_MODULES = [
    FlexLayoutModule, 
    HttpClientModule, 
    ReactiveFormsModule,
    NgOptimizedImage
]

export const COMMON_INTERNAL_ANGULAR_MODULES = [
    CommonModule, 
    RouterModule,
    BrowserAnimationsModule
]