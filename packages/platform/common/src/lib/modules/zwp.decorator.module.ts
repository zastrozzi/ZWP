import { Injector, NgModule } from '@angular/core'

@NgModule({

})
export class ZWPDecoratorModule {
    static _injector: Injector

    constructor(injector: Injector) {
        // console.log('ZWPDecoratorModule.constructor()')
        ZWPDecoratorModule._injector = injector
    }
}