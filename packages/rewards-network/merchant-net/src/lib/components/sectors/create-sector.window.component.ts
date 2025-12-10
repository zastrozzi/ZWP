import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ZWPWindowComponent, WINDOW_COMPONENT_DATA } from '@zwp/platform.layout'
import { State } from '../../+state'
import { Subscription, map, take, tap } from 'rxjs'
import { Nullable, TransformEnumPipeSignature } from '@zwp/platform.common'
import { Model } from '../../model'

@ZWPWindowComponent('CreateSectorWindowComponent')
@Component({
    selector: 'urnet-mnet-create-sector-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
            <div fxLayout="row" fxLayoutGap="20px" fxFlex="grow" zwpPadding="20">
                <form 
                    fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="10px" fxFlex="grow"
                    [formGroup]="createSectorForm"
                >
                    <div 
                        *ngIf="parentSector$ | async as parentSector"    
                        fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="10px" 
                        zwpCorners="4" zwpBackgroundColor="tertiary-system-fill" zwpPadding="10"
                    >
                        <span [zwpTextStyle]="'body1'" zwpColor="label">Parent Sector:</span>
                        <span [zwpTextStyle]="'body1'" zwpColor="primary">{{parentSector.name}}</span>
                    </div>
                
                    <mat-form-field 
                        appearance="outline"
                        class="noHintFormField flexFormField noOutlineFormField" 
                        zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                    >
                        <input matInput formControlName="name" placeholder="Name" cdkFocusInitial />
                    </mat-form-field>
                    <zwp-transform-enum-dropdown-input 
                        [enumInput]="createSectorForm.controls.status" 
                        [transformSignature]="statusEnumSignature" 
                        placeholder="Status"
                    ></zwp-transform-enum-dropdown-input>
                    <mat-form-field 
                        appearance="outline"
                        class="noHintFormField flexFormField noOutlineFormField" 
                        zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                    >
                        <input matInput formControlName="displayImageUrl" placeholder="Display Image URL" />
                    </mat-form-field>
                    <div fxFlex="grow"></div>
                    <zwp-md-button 
                        fxFlexAlign="end"
                        [label]="'Save New Sector'" [icon]="'save'"
                        [disabled]="(remoteStateBusy$ | async) || createSectorForm.invalid"
                        (btnClick)="saveSector()"
                    ></zwp-md-button>
                </form>
            </div>
        </zwp-window>
    `
})
export class CreateSectorWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    private windowData = inject(WINDOW_COMPONENT_DATA) as { sectorId: Nullable<string> }
    private sectorFacade = inject(State.Facades.SectorFacade)
    private readonly subscriptions = new Subscription()

    remoteState$ = this.sectorFacade.sectorRemoteState$
    remoteStateBusy$ = this.remoteState$.pipe(map(remoteState => remoteState.busy))
    remoteStateError$ = this.remoteState$.pipe(map(remoteState => remoteState.error))

    parentSector$ = this.sectorFacade.sectorById$(this.parentSectorId ?? '')

    statusEnumSignature = Model.sectorStatusLabelPipeSignature

    createSectorForm = new FormGroup({
        name: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
        status: new FormControl<Model.SectorStatus | null>(Model.SectorStatus.active),
        displayImageUrl: new FormControl<string | null>(null)
    })

    saveSector() {
        if (this.createSectorForm.valid) {
            this.sectorFacade.createSector(
                this.parentSectorId, 
                { 
                    name: this.createSectorForm.value.name ?? '',
                    status: this.createSectorForm.value.status ?? Model.SectorStatus.active,
                    displayImageUrl: this.createSectorForm.value.displayImageUrl ?? undefined
                }
            )
            this.__close()
        }
    }

    __close() {
        this.subscriptions.unsubscribe()
        this.remove()
    }

    get parentSectorId() { return this.windowData.sectorId ?? null }

    ngOnInit() {
        const busySub = this.remoteStateBusy$.subscribe(busy => {
            if (busy) { this.createSectorForm.disable() }
            else { this.createSectorForm.enable() }
        })
        this.subscriptions.add(busySub)
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }
}