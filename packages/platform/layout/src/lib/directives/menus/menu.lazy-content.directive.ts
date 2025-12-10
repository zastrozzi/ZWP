import {DomPortalOutlet, TemplatePortal} from '@angular/cdk/portal';
import {DOCUMENT} from '@angular/common';
import {
  ApplicationRef,
  ChangeDetectorRef,
  Directive,
  Inject,
  InjectionToken,
  Injector,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {Subject} from 'rxjs';

export const MENU_LAZY_CONTENT = new InjectionToken<MenuLazyContentDirective>('zwp.layout.MenuLazyContent')

@Directive()
export abstract class _MenuLazyContentBase implements OnDestroy {
    private _portal: TemplatePortal<any> | undefined
    private _outlet: DomPortalOutlet | undefined

    readonly _attached = new Subject<void>()

    constructor(
        template: TemplateRef<any>,
        // componentFactoryResolver: ComponentFactoryResolver,
        appRef: ApplicationRef,
        injector: Injector,
        viewContainerRef: ViewContainerRef,
        document: any,
        changeDetectorRef: ChangeDetectorRef
    )

    constructor(
        private _template: TemplateRef<any>,
        // private _componentFactoryResolver: ComponentFactoryResolver,
        private _appRef: ApplicationRef,
        private _injector: Injector,
        private _viewContainerRef: ViewContainerRef,
        @Inject(DOCUMENT) private _document: any,
        private _changeDetectorRef?: ChangeDetectorRef
    ) {}

    attach(context: any = {}) {
        if (!this._portal) {
            this._portal = new TemplatePortal(this._template, this._viewContainerRef)
        }
      
        this.detach()

        if (!this._outlet) {
            this._outlet = new DomPortalOutlet(
                this._document.createElement('div'),
                undefined,
                this._appRef,
                this._injector
            )
        }

        const element: HTMLElement = this._template?.elementRef.nativeElement
        element.parentNode?.insertBefore(this._outlet.outletElement, element)
        this._changeDetectorRef?.markForCheck()
        this._portal.attach(this._outlet, context)
        this._attached.next()
    }

    detach() {
        if (this._portal?.isAttached) {
            this._portal.detach()
        }
    }
    
    ngOnDestroy() {
        if (this._outlet) {
            this._outlet.dispose()
        }
    }
}

@Directive({
    selector: 'ng-template[zwpMenuLazyContent]',
    providers: [{provide: MENU_LAZY_CONTENT, useExisting: MenuLazyContentDirective}]
})
export class MenuLazyContentDirective extends _MenuLazyContentBase {}