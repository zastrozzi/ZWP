import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    inject,
    Input,
    OnDestroy,
    Output,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core'
import { GeometryPoint, Nilable, Nullable } from '../../model'
import { isNil, isUndefined } from '../../utils'
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import { ZWPThemingFacade } from '../../+state/facades'
import { filter, Subscription } from 'rxjs'

@Component({
    selector: 'zwp-popup-editable-property',
    changeDetection: ChangeDetectionStrategy.Default,
    template: `
        <div fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="5px" zwpPadding="5px"
                zwpCorners="5"
                [zwpBackgroundColor]="backgroundColor">
            <div
                [fxLayout]="layout"
                fxLayoutAlign="space-between stretch"
                fxLayoutGap="5px"
                zwpPadding="0px 3px"
                zwpCorners="5"
                fxFlex="grow"
            >
                <span [zwpTextStyle]="textStyle" [zwpColor]="labelColor">{{ label }}</span>
                <ng-container [ngSwitch]="propertyIsNil">
                    <span
                        *ngSwitchCase="true"
                        [zwpTextStyle]="textStyle"
                        [zwpColor]="propertyColor"
                        [style.overflowWrap]="'break-word'"
                        [style.opacity]="0.5"
                        >Empty</span
                    >
                    <ng-container *ngSwitchCase="false" [ngSwitch]="isArray">
                        <span
                            *ngSwitchCase="false"
                            [zwpTextStyle]="textStyle"
                            [zwpColor]="propertyColor"
                            [style.overflowWrap]="'break-word'"
                            >{{ property }}</span
                        >
                        <div *ngSwitchCase="true" [fxLayout]="layoutOpposite" fxLayoutGap="10px">
                            <span
                                *ngFor="let item of property"
                                [zwpTextStyle]="textStyle"
                                [zwpColor]="propertyColor"
                                [style.overflowWrap]="'break-word'"
                                >{{ item }}</span
                            >
                        </div>
                    </ng-container>
                </ng-container>
            </div>
            <zwp-md-icon-button
                (btnClick)="presentEditPopup($event)"
                textStyle="button1"
                icon="edit"
                [iconRotation]="0"
                backgroundColor="#00000000"
                [iconPadding]="5"
                [iconColor]="'system-gray' | zwpColorTheme"
            ></zwp-md-icon-button>
        </div>
    `
})
export class PopupEditablePropertyComponent implements OnDestroy {
    @Input() label = 'Label'
    @Input() property: Nilable<string | string[]> = 'Property'
    @Input() backgroundColor = 'quaternary-system-fill'
    @Input() labelColor = 'label'
    @Input() propertyColor = 'primary-label'
    @Input() textStyle = 'body1'
    @Input() layout: 'row wrap' | 'column' = 'row wrap'
    @Input() dismissOnEnter = true
    @Input() dismissOnClickOutside = true
    @Output() popupDismissed = new EventEmitter<void>()

    @ContentChild('editPopup') editPopupTemplate?: TemplateRef<unknown>

    private overlayRef?: OverlayRef
    private overlay = inject(Overlay)
    private viewContainerRef = inject(ViewContainerRef)
    private themingFacade = inject(ZWPThemingFacade)
    private cd = inject(ChangeDetectorRef)

    private subscriptions = new Subscription()

    get isArray(): boolean {
        return Array.isArray(this.property)
    }

    get layoutOpposite(): 'row wrap' | 'column' {
        return this.layout === 'row wrap' ? 'column' : 'row wrap'
    }

    get propertyIsNil(): boolean {
        return isNil(this.property)
    }

    async presentEditPopup(event: any) {
        const triggerPoint: GeometryPoint = { x: event.clientX, y: event.clientY }
        if (isUndefined(this.editPopupTemplate)) {
            console.warn('No edit popup template')
            return
        }

        if (isUndefined(this.overlayRef)) {
            const overlayConfig = new OverlayConfig({
                hasBackdrop: true,
                panelClass: 'zwp-popup-overlay-panel-shadow',
                backdropClass: 'mat-overlay-transparent-backdrop',
                // width: position.width,
                // height: position.height,
                positionStrategy: this.overlay
                    .position()
                    .flexibleConnectedTo(triggerPoint)
                    .withGrowAfterOpen()
                    .withPositions([
                        {
                            originX: 'start',
                            overlayX: 'end',
                            originY: 'center',
                            overlayY: 'center',
                        },
                    ]),
            })
            this.overlayRef = this.overlay.create(overlayConfig)
            if (this.dismissOnClickOutside) {
                const backdropDismissSub = this.overlayRef.backdropClick().subscribe(() => this.close())
                this.subscriptions.add(backdropDismissSub)
            }
            if (this.dismissOnEnter) {
                const enterSub = this.overlayRef.keydownEvents()
                    .pipe(
                        filter(event => event.key === 'Enter')
                    )
                    .subscribe((ev) => {
                        ev.preventDefault()
                        this.close()
                    })

                this.subscriptions.add(enterSub)
            }
            
        }

        const portal = new TemplatePortal(this.editPopupTemplate, this.viewContainerRef)
        this.overlayRef.attach(portal)
    }

    close() {
        this.overlayRef?.detach()
        this.popupDismissed.emit()
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }
}
