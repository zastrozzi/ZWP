import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ZWPWindowComponent } from '@zwp/platform.layout'
import { EIM32712OccupationFacade } from '../../+state/facades'
import { Subscription, map, take, tap } from 'rxjs'
import { Model } from '../../model'
import { EIM32712Industry } from '../../model/enums'
import { allEnumCases } from '@zwp/platform.common'

@ZWPWindowComponent('CreateOccupationWindowComponent')
@Component({
    selector: 'ukgov-hmrc-create-occupation-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
        
                <div fxLayout="row" fxLayoutGap="20px" fxFlex="grow"
                    zwpPadding="20"
                >
            <form 
                fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="10px" fxFlex="grow"
                [formGroup]="createOccupationForm"
            >
                <mat-form-field 
                    appearance="outline"
                    class="noHintFormField flexFormField noOutlineFormField" 
                    zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                >
                    <input matInput formControlName="name" placeholder="Name" cdkFocusInitial />
                </mat-form-field>

                <mat-form-field 
                    appearance="outline"
                    class="noHintFormField flexFormField noOutlineFormField" 
                    zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                >
                    <mat-select formControlName="industry" [panelClass]="getHigherWindowZIndexClass()">
                        <mat-option *ngFor="let industry of allIndustries" [value]="industry">{{ industry | zwpTransformEnum: industryLabelPipeSignature }}</mat-option>
                    </mat-select>
                </mat-form-field>
                <mat-form-field 
                    appearance="outline"
                    class="noHintFormField flexFormField noOutlineFormField" 
                    zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                >
                    <input matInput currencyMask formControlName="deduction" [options]="{ prefix: '£', thousands: ',', decimal: '.' }" />
                </mat-form-field>
                <div fxFlex="grow"></div>
                <zwp-md-button 
                    fxFlexAlign="end"
                    [label]="'Save New Deduction'" [icon]="'person_add'"
                    [disabled]="(remoteStateBusy$ | async) || createOccupationForm.invalid"
                    (btnClick)="saveOccupation()"
                ></zwp-md-button>
            </form>
        </div>
        </zwp-window>
    `
})
export class CreateOccupationWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    private occupationFacade = inject(EIM32712OccupationFacade)
    private readonly subscriptions = new Subscription()

    allIndustries = allEnumCases(Model.EIM32712Industry)
    industryLabelPipeSignature = { input: Model.EIM32712Industry, output: Model.EIM32712IndustryLabel }
    industryIconPipeSignature = { input: Model.EIM32712Industry, output: Model.EIM32712IndustryIcon }

    remoteState$ = this.occupationFacade.occupationRemoteState$
    remoteStateBusy$ = this.remoteState$.pipe(map(remoteState => remoteState.busy))
    remoteStateError$ = this.remoteState$.pipe(map(remoteState => remoteState.error))

    createOccupationForm = new FormGroup({
        name: new FormControl<string>('', [Validators.required]),
        deduction: new FormControl<number>(0, [Validators.required]),
        industry: new FormControl<Model.EIM32712Industry>(EIM32712Industry.Agriculture, [Validators.required])
    })

    saveOccupation() {
        if (this.createOccupationForm.valid) {
            const name = this.createOccupationForm.value.name ?? ''
            const deduction = (this.createOccupationForm.value.deduction ?? 0) * 100
            const industry = this.createOccupationForm.value.industry ?? EIM32712Industry.Agriculture
            this.occupationFacade.createOccupation({ name, deduction, industry })
            this.__close()
        }
    }

    getHigherWindowZIndexClass(): string {
        // if (this.windowEntity) {
            return this._windowLayoutFacade.getHigherWindowZIndexClass(this.windowId)
        // } else {
            // return 'zwp-unknown-z-index'
        // }
    }

    __close() {
        this.subscriptions.unsubscribe()
        this.remove()
    }

    ngOnInit() {
        const busySub = this.remoteStateBusy$.subscribe(busy => {
            if (busy) { this.createOccupationForm.disable() }
            else { this.createOccupationForm.enable() }
        })
        this.subscriptions.add(busySub)
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }
}