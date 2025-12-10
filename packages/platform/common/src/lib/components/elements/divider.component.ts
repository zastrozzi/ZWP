import { ChangeDetectionStrategy, Component, Input } from "@angular/core"

@Component({
    selector: 'zwp-divider',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div *ngIf="!vertical" fxFlexFill fxFlexAlign="stretch" [style.height]="'1px'" [zwpBackgroundColor]="colorTheme"></div>
        <div *ngIf="vertical" [style.width]="'1px'" fxFlexFill [zwpBackgroundColor]="colorTheme"></div>
        <!-- <mat-divider *ngIf="vertical === false" [style.borderTopColor]="'separator' | zwpColorTheme"></mat-divider> -->
        <!-- <mat-divider *ngIf="vertical === true" [vertical]="true" [style.height]="'100%'" [style.borderRightColor]="colorTheme | zwpColorTheme"></mat-divider> -->

        
    `
})
export class DividerComponent {
    @Input() vertical = false
    @Input() colorTheme = "separator"
}