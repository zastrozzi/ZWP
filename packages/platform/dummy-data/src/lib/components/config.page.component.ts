import { Component, ChangeDetectionStrategy, inject } from '@angular/core'
import { State } from '../+state'

@Component({
    selector: 'zwp-dummy-data-config-page',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            fxLayout="column"
            fxLayoutAlign="start start"
            fxLayoutGap="10px"
            zwpPadding="10"
            fxFlexFill
            [style.backgroundColor]="'system-background' | zwpColorTheme"
            zwpVScroll
        >
            <span [zwpTextStyle]="'subheadline'" zwpCorners="5" zwpPadding="8 12" zwpBackgroundColor="quaternary-system-fill" zwpColor="primary-label">Projects</span>
            <div fxLayout="row" fxLayoutAlign="center stretch" fxLayoutGap="10px">
                <zwp-md-button
                    label="Generate Projects"
                    icon="add"
                    textStyle="button1"
                    [iconTextStyle]="'subheadline'"
                    [labelColor]="'system-white' | zwpColorTheme"
                    [backgroundColor]="'system-green' | zwpColorTheme"
                    (btnClick)="generateProjects()"
                ></zwp-md-button>
                <zwp-md-button
                    label="Clear Projects"
                    icon="delete"
                    textStyle="button1"
                    [iconTextStyle]="'subheadline'"
                    [labelColor]="'system-white' | zwpColorTheme"
                    [backgroundColor]="'system-red' | zwpColorTheme"
                    (btnClick)="clearProjects()"
                ></zwp-md-button>
            </div>
        </div>
    `
})
export class ConfigPageComponent {
    private dummyDataFacade = inject(State.Facades.DummyDataFacade)
    
    generateProjects() {
        this.dummyDataFacade.generateProjects(100)
    }

    clearProjects() {
        this.dummyDataFacade.clearProjects()
    }
}