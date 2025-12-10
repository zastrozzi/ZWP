import { InjectionToken } from "@angular/core";
import { MenuPositionHorizontal, MenuPositionVertical } from "./menu.position";

export const MENU_REF = new InjectionToken<MenuRef>('zwp.layout.MenuRef')

export interface MenuRef {
    horizontalPosition: MenuPositionHorizontal
    verticalPosition: MenuPositionVertical
    // overlapTrigger: boolean
    // templateRef: TemplateRef<any>
    // readonly close: EventEmitter<MenuClose>
    componentName: string
    parentId?: string
    // direction?: Direction
    // focusFirstItem: (origin?: FocusOrigin) => void
    // resetActiveItem: () => void
    // setPositionClasses?: (horizontal: MenuPositionHorizontal, vertical: MenuPositionVertical) => void
    // setElevation?(depth: number): void
    // setElevation?: (depth: number) => void
    // lazyContent?: MenuLazyContent
    // backdropClass?: string
    // overlayPanelClass?: string | string[]
    // hasBackdrop?: boolean
    refId?: string
}