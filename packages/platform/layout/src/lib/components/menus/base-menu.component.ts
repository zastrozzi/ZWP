import { ChangeDetectionStrategy, Component, inject, Input } from "@angular/core";
import { isNil } from "@zwp/platform.common";
import { ZWPMenuLayoutFacade } from "../../+state/facades";
import { MenuRef } from "../../model/menus/menu.ref";

@Component({
    selector: 'zwp-base-menu',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: ``
})
export abstract class BaseMenuComponent {
    @Input() menuId!: string

    _menuLayoutFacade: ZWPMenuLayoutFacade

    // _menuOverlayData: BehaviorSubject<any | null> = new BehaviorSubject(null)

    constructor() {
        this._menuLayoutFacade = inject(ZWPMenuLayoutFacade)
    }

    // ngOnChanges(changes: SimpleChanges): void {
    //     if (changes['menuOverlayData']) {
    //         // this._menuOverlayData.next(changes['menuOverlayData'].currentValue)
    //     }

    //     if (changes['menuRef']) {
    //         this.menuRef = changes['menuRef'].currentValue
    //     }
    // }

    close() {
        this._menuLayoutFacade.closeMenu(this.menuId)
    }
}