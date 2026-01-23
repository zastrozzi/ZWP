import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { ZWPApplicationFacade } from '@zwp/platform.common'

@Component({
    selector: 'zwp-unified-search',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <ng-container *ngIf="currentScreenBreakpointSize$ | async as breakpointSize">
        <ng-container *ngIf="breakpointSize === 'SMALL' || breakpointSize === 'EXTRA_SMALL'">
            <div fxFlex="grow"></div>
            <zwp-md-icon-button
                    (btnClick)="presentSearchField()"
                    textStyle="headline"
                    icon="search"
                    [iconRotation]="0"
                    backgroundColor="#00000000"
                    [iconPadding]="5"
                    [iconColor]="'primary-label' | zwpColorTheme"
                ></zwp-md-icon-button>
        </ng-container>
        <ng-container *ngIf="breakpointSize !== 'SMALL' && breakpointSize !== 'EXTRA_SMALL'">
            <div fxFlex="10%"></div>
        <mat-form-field
            appearance="outline"
            fxFlex="grow"
            class="noHintFormField flexFormField noOutlineFormField"
            zwpCorners="4"
            zwpBackgroundColor="quaternary-system-fill"
        >
            <input
                matInput
                placeholder="Search for anything..."
                class="placeholderInheritColor"
                [zwpTextStyle]="'body1'"
                zwpColor="label"
            />
        </mat-form-field>
        <div fxFlex="10%"></div>
        </ng-container>
    
        </ng-container>
    `
})
export class UnifiedSearchComponent {
    private applicationFacade = inject(ZWPApplicationFacade)
    currentScreenBreakpointSize$ = this.applicationFacade.currentScreenBreakpointSize$

    presentSearchField() {
        return
    }
}