import { Component } from "@angular/core";

@Component({
    selector: 'zwp-home-page',
    template: `
    <div
        fxFlexFill
        zwpBackgroundColor="secondary-system-background"
        fxLayout="column"
        fxLayoutAlign="center center"
        fxLayoutGap="10px"
    >
        <span zwpTextStyle="title1" zwpColor="primary-label">ZWP Desktop Demo</span>
        <span zwpTextStyle="title2" zwpColor="label">Coming soon...</span>
    </div>
    `
})
export class HomePageComponent {

}
