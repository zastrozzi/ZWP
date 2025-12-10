import { Component } from "@angular/core";


@Component({
    selector: 'zwp-some-component',
    template: `
        <mat-icon [style.color]="'accent' | zwpColorTheme">home</mat-icon>
    `
})
export class SomeComponent {

}