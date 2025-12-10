import { MediumButtonComponent, MediumIconButtonComponent } from "./buttons"
import { COLOR_EXPORTABLE_COMPONENTS, ColorCanvasComponent, ColorCollectionComponent, ColorPaletteComponent, ColorPickerComponent, ColorPickerContentComponent, ColorPickerInputDirective, ColorSliderComponent, ColorToggleComponent } from './color'
import { DeleteConfirmationDialogComponent } from './dialogs'
import { COMMON_ELEMENTS_EXPORTABLE_COMPONENTS } from "./elements"
import { ZWPTransformEnumDropdownInputComponent, ZWPFilterChipInputComponent, ZWPChipGridInputComponent } from './input'

export * from './buttons'
export * from './color'
export * from './elements'
export * from './input'
export * from './dialogs'

export const COMMON_EXPORTABLE_COMPONENTS = [
    MediumButtonComponent,
    MediumIconButtonComponent,
    ZWPFilterChipInputComponent,
    ZWPTransformEnumDropdownInputComponent,
    ZWPChipGridInputComponent,
    DeleteConfirmationDialogComponent,
    ...COMMON_ELEMENTS_EXPORTABLE_COMPONENTS,
    ColorCanvasComponent,
        ColorCollectionComponent,
        ColorPickerInputDirective,
        ColorPaletteComponent,
        ColorPickerComponent,
        ColorPickerContentComponent,
        ColorSliderComponent,
        ColorToggleComponent
]