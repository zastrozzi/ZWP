import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'zwp-file-browser-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    template: `
        <div fxLayout="column" fxLayoutAlign="start stretch" fxFlexFill [style.backgroundColor]="'system-background' | zwpColorTheme">
            <zwp-file-explorer fxFlex="grow"></zwp-file-explorer>
        </div>
        
    `
})
export class FileBrowserPageComponent {

}
