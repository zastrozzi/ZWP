import { ChangeDetectionStrategy, Component } from "@angular/core"
import { ZWPWindowComponent } from "../../decorators"
// import { WindowPosition } from "../../model"
import { BaseWindowComponent } from "./base-window.component"

@ZWPWindowComponent('ExampleWindowComponent')
@Component({
    selector: 'zwp-example-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
            <div fxLayout="column" fxLayoutAlign="center center" fxFlexFill>
                <span [zwpTextStyle]="'headline'" [style.color]="'label' | zwpColorTheme">Hi there!</span>
            </div>
            
        </zwp-window>
    `
})
export class ExampleWindowComponent extends BaseWindowComponent {
    constructor() {
        super()
    }

    // static override initialPosition: WindowPosition = {
    //     height: '500px', width: '60vw', left: 'calc(20vw + 0px)', top: 'calc(50vh - 250px)'
    // }

    

    // override ngOnChanges(changes: SimpleChanges): void {
    //     console.log(changes, 'got changes')
    //     this.windowEntity = changes['windowEntity'].currentValue
    // }
}