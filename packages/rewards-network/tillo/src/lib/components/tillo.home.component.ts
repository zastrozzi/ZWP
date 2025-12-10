import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Model } from '../model'
import { FormControl } from '@angular/forms'

@Component({
    selector: 'rewards-network-tillo-home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div fxLayout="row" fxLayoutAlign="start stretch" fxFlexFill>
            <!-- <zwp-actioned-detail-panel panelWidth="0px">
                <ng-container detail>
                    <div
                        fxLayout="column"
                        fxLayoutAlign="start start"
                        zwpPadding="10"
                        fxLayoutGap="5px"
                        zwpCorners="5"
                        zwpBackgroundColor="quaternary-system-fill"
                    >
                        <span [zwpTextStyle]="'subheadline'" zwpColor="label">Tillo Management</span>
                        
                    </div>
                    <zwp-labelled-property
                        [label]="'Display Name'"
                        [property]="'Some Display Name'"
                    />
                </ng-container>
                    
                

                <ng-container actions>
                    <zwp-md-button
                        label="Open Ticket"
                        icon="message"
                        [iconTextStyle]="'subheadline'"
                        [backgroundColor]="'secondary-system-background' | zwpColorTheme"
                    ></zwp-md-button>
                </ng-container>
            </zwp-actioned-detail-panel>
            <zwp-divider [vertical]="true"></zwp-divider> -->
            <zwp-tabbed-nav-panel fxFlex="grow"></zwp-tabbed-nav-panel>
        </div>
    `
})
export class TilloHomeComponent {
    
}