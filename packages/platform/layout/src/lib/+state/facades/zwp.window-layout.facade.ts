import { ComponentType } from "@angular/cdk/portal";
import { inject, Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
// import { ExampleOverlayComponent, ExampleOverlayComponentTwo } from "../../components/example-overlay.component";
// import { WindowEntity, WindowOverlayDragDistance } from "../../model";
import { WindowLayoutActions } from "../actions";
import { WindowLayoutSelectors } from "../selectors";
import { v4 } from 'uuid'
import { GeometryEdges, GeometryPoint, ZWPDebuggableInjectable } from "@zwp/platform.common";
import { WindowEntity } from "../../model";
import { ZWPWindowOverlayService } from "../../services";

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPWindowLayoutFacade', options: { skipMethodDebugger: true } })
export class ZWPWindowLayoutFacade {
    private store = inject(Store)
    private windowOverlayService = inject(ZWPWindowOverlayService)
    allWindows$ = this.store.pipe(select(WindowLayoutSelectors.allWindows))

    private sampleWindows: Partial<WindowEntity>[] = [
        { label: 'First Window', icon: 'person', color: '#555', themeColor: 'system-teal', componentName: 'ExampleWindowComponent' },
        { label: 'Second Window', icon: 'house', color: '#555', themeColor: 'system-yellow', componentName: 'ExampleWindowComponent' },
        { label: 'Third Window', icon: 'build', color: '#555', themeColor: 'system-orange', componentName: 'ExampleWindowComponent' },
        { label: 'Fourth Window', icon: 'description', color: '#555', themeColor: 'system-orange', componentName: 'ExampleWindowComponent' },
        { label: 'Fifth Window', icon: 'error', color: '#555', themeColor: 'system-indigo', componentName: 'ExampleWindowComponent' },
        { label: 'Sixth Window', icon: 'person', color: '#555', themeColor: 'system-blue', componentName: 'ExampleWindowComponent' },
        { label: 'Seventh Window', icon: 'house', color: '#555', themeColor: 'system-purple', componentName: 'ExampleWindowComponent' },
        { label: 'Eigth Window', icon: 'build', color: '#555', themeColor: 'system-indigo', componentName: 'ExampleWindowComponent' },
        { label: 'Ninth Window', icon: 'description', color: '#555', themeColor: 'system-pink', componentName: 'ExampleWindowComponent' },
        { label: 'Tenth Window', icon: 'error', color: '#555', themeColor: 'system-orange', componentName: 'ExampleWindowComponent' },
        { label: 'Eleventh Window', icon: 'person', color: '#555', themeColor: 'system-teal', componentName: 'ExampleWindowComponent' },
        { label: 'Twelfth Window', icon: 'house', color: '#555', themeColor: 'system-indigo', componentName: 'ExampleWindowComponent' },
        { label: 'Thirteenth Window', icon: 'build', color: '#555', themeColor: 'system-green', componentName: 'ExampleWindowComponent' },
        { label: 'Fourteenth Window', icon: 'description', color: '#555', themeColor: 'system-blue', componentName: 'ExampleWindowComponent' },
        { label: 'Fifteenth Window', icon: 'error', color: '#555', themeColor: 'system-indigo', componentName: 'ExampleWindowComponent' }
    ]

    private windowTypes: ComponentType<any>[] = []

    getWindowById$ = (id: string) => this.store.pipe(select(WindowLayoutSelectors.getWindowById(id)))

    addWindow(newWindow: Partial<WindowEntity>) {
        if (newWindow.componentName === undefined) { throw new Error('Component name must be defined') }
        let initialPosition = newWindow.position ?? { top: 'calc(25vh + 0px)', left: 'calc(25vw + 0px)', width: '50vw', height: '50vh'}
        initialPosition = this.windowOverlayService.normaliseWindowPosition(initialPosition)
        const fullWindow: WindowEntity = {
            id: newWindow.id ?? v4(), 
            label: newWindow.label ?? 'New Window Label', 
            icon: newWindow.icon ?? 'web_asset', 
            color: newWindow.color, 
            themeColor: newWindow.themeColor ?? 'primary',
            isExpanded: (newWindow.isExpanded === undefined) ? true : newWindow.isExpanded, 
            componentName: newWindow.componentName,
            position: initialPosition,
            data: newWindow.data ?? {}
        }
        this.store.dispatch(WindowLayoutActions.createRequest({ windowEntity: fullWindow }))
    }

    expandWindow(windowId: string) {
        this.windowOverlayService.expandWindowOverlay(windowId)
        this.store.dispatch(WindowLayoutActions.expand({id: windowId}))
    }

    minimiseWindow(windowId: string) {
        this.windowOverlayService.minimiseWindowOverlay(windowId)
        this.store.dispatch(WindowLayoutActions.minimise({ id: windowId }))
    }

    focusWindow(windowId: string) {
        this.windowOverlayService.focusWindowOverlay(windowId)
    }

    getWindowZIndex(windowEntity: WindowEntity) {
        return this.windowOverlayService.getWindowOverlayZIndex(windowEntity.id)
    }

    getHigherWindowZIndexClass(windowId: string): string {
        return this.windowOverlayService.getHigherWindowOverlayZIndexClassForId(windowId)
    }

    removeWindow(id: string) {
        this.windowOverlayService.removeWindowOverlay(id)
        this.store.dispatch(WindowLayoutActions.remove({id: id}))
    }

    removeAllWindows() {
        this.windowOverlayService.removeAllWindowOverlays()
        this.store.dispatch(WindowLayoutActions.removeAll())
    }

    renameWindow(id: string, label: string) {
        this.store.dispatch(WindowLayoutActions.update({id, windowEntityUpdate:{label}}))
    }

    updatePositionFromDragDistance(windowId: string, distance: GeometryPoint) {
        const newPosition = this.windowOverlayService.calculateNewWindowOverlayPositionFromDrag(windowId, distance)
        if (newPosition === undefined) { return }
        this.store.dispatch(WindowLayoutActions.updatePositionRequest({ windowId, position: newPosition }))
    }

    updatePositionFromResizeEdges(windowId: string, edges: GeometryEdges) {
        const newPosition = this.windowOverlayService.calculateNewWindowOverlayPositionFromResize(windowId, edges)
        if (newPosition === undefined) { return }
        this.store.dispatch(WindowLayoutActions.updatePositionRequest({ windowId, position: newPosition }))
    }

    registerWindowTypes(windowTypes: ComponentType<any>[]) {
        this.windowTypes.push(...windowTypes)
    }

    addRandomWindow() {
        const getRandomSampleWindow = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]
        const partialWindow: Partial<WindowEntity> = getRandomSampleWindow(this.sampleWindows)
        // let componentString = partialWindow.component!.toString()
        // let componentTypeFunc = new Function(componentString)
        // console.error(partialWindow.component!.name, 'name')
        const fullWindow: WindowEntity = {
            id: partialWindow.id ?? v4(), 
            label: partialWindow.label ?? 'New Window Label', 
            icon: partialWindow.icon ?? 'web_asset', 
            color: partialWindow.color, 
            themeColor: partialWindow.themeColor,
            isExpanded: (partialWindow.isExpanded === undefined) ? true : partialWindow.isExpanded, 
            // component: partialWindow.component!,
            componentName: partialWindow.componentName ?? 'ExampleWindowComponent',
            position: { top: 'calc(25vh + 0px)', left: 'calc(25vw + 0px)', width: '50vw', height: '50vh'}, 
            data: partialWindow.data ?? {}
        }
        this.addWindow(fullWindow)
    }
    
    

}
