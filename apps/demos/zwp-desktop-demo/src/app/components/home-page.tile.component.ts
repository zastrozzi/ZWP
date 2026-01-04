import { Component, Input } from '@angular/core'

@Component({
    selector: 'zwp-home-page-tile',
    template: `
        <div
            [zwpBackgroundColor]="backgroundColor"
            fxLayoutAlign="center center"
            fxLayout="column"
            zwpCorners="15"
            zwpPadding="20"
            fxFlexFill
        >
            <div fxFlex="grow"></div>
            <mat-icon
                fxFlex="noshrink"
                zwpTextStyle="title1"
                zwpFontSize="70"
                zwpLineHeight="70"
                [zwpColor]="color"
                [inline]="true"
                [style.height]="'auto'"
                [style.width]="'auto'"
                >{{iconName}}</mat-icon
            >
            <div fxFlex="grow"></div>
            <span
                fxFlexAlign="start"
                zwpTextStyle="subheadline"
                zwpFontWeight="500"
                [zwpColor]="color"
                >{{title}}</span
            >
        </div>
    `,
})
export class HomePageTileComponent {
    @Input() backgroundColor = "primary"
    @Input() color = "system-white"
    @Input() iconName = "widgets"
    @Input() title = "Title"
}
