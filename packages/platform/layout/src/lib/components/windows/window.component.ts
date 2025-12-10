import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop'
import {
    Component,
    Directive,
    TemplateRef,
    ViewContainerRef,
    Input,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    inject,
    OnDestroy,
    OnInit,
    AfterContentInit,
    SimpleChanges,
    OnChanges,
    AfterViewChecked,
    ChangeDetectorRef,
    AfterViewInit,
    ContentChild,
} from '@angular/core'
import { ZWPThemingFacade, Nullable } from '@zwp/platform.common'
import { ResizeEvent, WindowEntity, WINDOW_OVERLAY_STYLES } from '../../model'
import { ZWPWindowLayoutFacade } from '../../+state/facades'
import { Subscription } from 'rxjs'
// import { BaseWindowComponent } from "./base-window.component";

@Component({
    selector: 'zwp-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <ng-container *ngIf="entity$ | async as entity">
            <!-- <ng-container *ngIf="darkMode$ | async as darkMode"> -->
        <div
            [class]="
                darkMode
                    ? 'zwp-window-overlay-panel-dark'
                    : 'zwp-window-overlay-panel-light'
            "
            fxLayout="column"
            fxLayoutAlign="start stretch"
            zwpResizable
            [style.borderRadius]="'10px'"
            [style.border]="
                darkMode
                    ? '1px solid' + ('system-fill' | zwpColorTheme)
                    : '0px'
            "
            [style.overflow]="'hidden'"
            [style.position]="'relative'"
            [style.width]="entity.position.width"
            [style.height]="entity.position.height"
            [enableGhostResize]="true"
            (resizeEnd)="onResizeWindow($event)"
            (resizeStart)="onResizeStart()"
            cdkDrag
            (cdkDragStarted)="this.onDragStart($event)"
            (cdkDragEnded)="this.onDragEnd($event)"
        >
            <div
                [style.position]="'absolute'"
                [style.height]="'10px'"
                [style.top]="'0'"
                [style.width]="'100%'"
                zwpResizeHandle
                [resizeEdges]="{ top: true }"
                [style.cursor]="'row-resize'"
            ></div>
            <div
                [style.position]="'absolute'"
                [style.height]="'10px'"
                [style.bottom]="'0'"
                [style.width]="'100%'"
                zwpResizeHandle
                [resizeEdges]="{ bottom: true }"
                [style.cursor]="'row-resize'"
            ></div>
            <div
                [style.position]="'absolute'"
                [style.width]="'10px'"
                [style.left]="'0'"
                [style.height]="'100%'"
                zwpResizeHandle
                [resizeEdges]="{ left: true }"
                [style.cursor]="'col-resize'"
            ></div>
            <div
                [style.position]="'absolute'"
                [style.width]="'10px'"
                [style.right]="'0'"
                [style.height]="'100%'"
                zwpResizeHandle
                [resizeEdges]="{ right: true }"
                [style.cursor]="'col-resize'"
            ></div>
            <div
                cdkDragHandle
                fxLayout="row"
                fxFlex="50px"
                [style.height]="'50px'"
                fxLayoutGap="5px"
                fxLayoutAlign="start center"
                [style.paddingLeft]="'20px'"
                [style.paddingRight]="'10px'"
                zwpBackgroundColor="system-background"
            >
                <mat-icon
                    fxFlex="noshrink"
                    [style.fontSize]="'20px'"
                    [style.width]="'20px'"
                    [style.height]="'20px'"
                    [style.color]="
                        entity.themeColor !== undefined
                            ? (entity.themeColor
                              | zwpColorTheme
                                  : { lightness: darkMode ? 650 : 480 }
                                )
                            : entity.color
                    "
                    >{{ entity.icon }}</mat-icon
                >
                <div
                    fxLayout="column"
                    fxFlexAlign="stretch"
                    fxLayoutAlign="center start"
                    fxFlexOffset="5px"
                    (click)="onFocus()"
                    fxFlex="grow"
                >
                    <span
                        [zwpTextStyle]="'subheadline'"
                        [style.color]="'label' | zwpColorTheme"
                        >{{ entity.label }}</span
                    >
                </div>
                <div
                    fxFlex="noshrink"
                    [style.cursor]="'pointer'"
                    (click)="onMinimise()"
                    fxLayout="column"
                    fxLayoutAlign="center center"
                    [style.height]="'30px'"
                    [style.width]="'30px'"
                    zwpCorners="4"
                    zwpBackgroundColor="quaternary-system-fill"
                >
                    <mat-icon
                        [style.fontSize]="'22px'"
                        [style.width]="'22px'"
                        [style.height]="'auto'"
                        [style.color]="
                            entity.themeColor !== undefined
                                ? (entity.themeColor
                                  | zwpColorTheme
                                      : { lightness: darkMode ? 650 : 480 }
                                    )
                                : entity.color
                        "
                        >minimize</mat-icon
                    >
                </div>
                <div
                    fxFlex="noshrink"
                    [style.cursor]="'pointer'"
                    (click)="onRemove()"
                    fxLayout="column"
                    fxLayoutAlign="center center"
                    [style.height]="'30px'"
                    [style.width]="'30px'"
                    zwpCorners="4"
                    zwpBackgroundColor="quaternary-system-fill"
                >
                    <mat-icon
                        [style.fontSize]="'22px'"
                        [style.width]="'22px'"
                        [style.height]="'auto'"
                        [style.color]="
                            entity.themeColor !== undefined
                                ? (entity.themeColor
                                  | zwpColorTheme
                                      : { lightness: darkMode ? 650 : 480 }
                                    )
                                : entity.color
                        "
                        >close</mat-icon
                    >
                </div>
            </div>
            <div
                fxLayout="row"
                fxFlex="2px"
                [style.backgroundColor]="
                    entity.themeColor !== undefined
                        ? (entity.themeColor!
                          | zwpColorTheme
                              : { lightness: darkMode ? 650 : 480 }
                        )
                        : entity.color
                "
            ></div>

            <div
                fxLayout="column" fxLayoutAlign="start stretch" fxFlex="grow"
                zwpVScroll
                zwpBackgroundColor="system-background"
            >
                <ng-content></ng-content>
            </div>
            <div *ngIf="windowFooter as windowFooterTemplate" fxLayout="column" fxLayoutAlign="start stretch" fxFlex="55px">
                <div
                    fxLayout="row"
                    fxFlex="1px"
                    [style.backgroundColor]="
                        entity.themeColor !== undefined
                            ? (entity.themeColor!
                            | zwpColorTheme
                                : { lightness: darkMode ? 650 : 480 }
                            )
                            : entity.color
                    "
                ></div>
                <div
                    fxLayout="row" fxLayoutAlign="end center" fxFlex="grow"
                    zwpBackgroundColor="system-background" zwpPadding="10"
                >
                    <ng-container [ngTemplateOutlet]="windowFooterTemplate"></ng-container>
                </div>
                
            </div>
        </div>
        <!-- </ng-container> -->
        </ng-container>
    `,
    styles: [WINDOW_OVERLAY_STYLES],
})
export class WindowComponent implements OnDestroy {
    @Input() windowId = ''
    @ContentChild('windowFooter') windowFooter: Nullable<TemplateRef<any>> = null


    private vcRef = inject(ViewContainerRef)
    private themingFacade = inject(ZWPThemingFacade)
    private windowLayoutFacade = inject(ZWPWindowLayoutFacade)
    private changeDetectorRef = inject(ChangeDetectorRef)

    comp = (this.vcRef as any)._hostLView[8] as any
    darkMode$ = this.themingFacade.darkMode$
    entity$ = this.windowLayoutFacade.getWindowById$(this.windowId)

    darkMode = false
    hasInitialised = false
    isResizing = false

    private subscriptions = new Subscription()

    initialise() {
        this.entity$ = this.windowLayoutFacade.getWindowById$(this.windowId)
        
        this.subscriptions.add(this.darkMode$.subscribe((darkMode) => {
            this.darkMode = darkMode
            // this.changeDetectorRef.detectChanges()
        }))
        this.changeDetectorRef.detectChanges()
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    onRemove() {
        this.comp.remove()
    }
    onFocus() {
        this.comp.focus()
    }
    onMinimise() {
        this.comp.minimise()
    }
    onDragStart(event: CdkDragStart) {
        this.comp.onDragStarted(event)
    }
    onDragEnd(event: CdkDragEnd) {
        if (!this.isResizing) {
            this.comp.onDragEnded(event)
        }
        event.source._dragRef.reset()
    }

    onResizeStart() {
        this.isResizing = true
    }

    onResizeWindow(event: ResizeEvent) {
        this.comp.onResizeWindow(event)
        this.isResizing = false
    }
}

@Directive({
    selector: '[zwpWindow]',
})
export class WindowDirective {
    // compRef: ComponentRef<WindowComponent> | undefined

    constructor(
        private vcRef: ViewContainerRef,
        private templateRef: TemplateRef<any>
    ) {}
}
