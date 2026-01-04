import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ZWPWindowComponent } from '@zwp/platform.layout'
import { State } from '../../+state'
import { Subscription, map, take, tap } from 'rxjs'
import { Model } from '../../model'
import { coerceNumber } from '@zwp/platform.common'

@ZWPWindowComponent('PlatformDummyDataCreateProjectWindowComponent')
@Component({
    selector: 'zwp-dummy-data-create-project-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
            <div fxLayout="row" fxLayoutGap="20px" fxFlex="grow" zwpPadding="20">
                <form 
                    fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="10px" fxFlex="grow"
                    [formGroup]="createProjectForm"
                >
                    <mat-form-field 
                        appearance="outline"
                        class="noHintFormField flexFormField noOutlineFormField" 
                        zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                    >
                        <input matInput formControlName="name" placeholder="Name" cdkFocusInitial />
                    </mat-form-field>
                    <zwp-chip-grid-input
                        [enumInput]="createProjectForm.controls.status"
                        [transformSignature]="statusEnumLabel"
                        [textStyle]="'button1'"
                    ></zwp-chip-grid-input>
                    <mat-form-field 
                        appearance="outline"
                        class="noHintFormField flexFormField noOutlineFormField" 
                        zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                    >
                        <input matInput formControlName="description" placeholder="Description" />
                    </mat-form-field>
                    <mat-form-field 
                        appearance="outline"
                        class="noHintFormField flexFormField noOutlineFormField" 
                        zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                    >
                    <input matInput formControlName="budget" placeholder="Budget"/>
                    </mat-form-field>
                    <div fxLayout="row" fxLayoutGap="10px">
                        <mat-form-field 
                            fxFlex="grow"
                            appearance="outline"
                            class="noHintFormField flexFormField noOutlineFormField" 
                            zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                        >
                            <input matInput formControlName="startDate" placeholder="Start Date" [matDatepicker]="startDatePicker"/>
                            <mat-datepicker-toggle matIconSuffix [for]="startDatePicker"></mat-datepicker-toggle>
                            <mat-datepicker #startDatePicker panelClass="zwp-window-overlay-zindex-10"></mat-datepicker>
                        </mat-form-field>
                        <mat-form-field 
                            fxFlex="grow"
                            appearance="outline"
                            class="noHintFormField flexFormField noOutlineFormField" 
                            zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                        >
                            <input matInput formControlName="endDate" placeholder="End Date" [matDatepicker]="endDatePicker"/>
                            <mat-datepicker-toggle matIconSuffix [for]="endDatePicker"></mat-datepicker-toggle>
                            <mat-datepicker #endDatePicker panelClass="zwp-window-overlay-zindex-10"></mat-datepicker>
                        </mat-form-field>
                        
                    </div>
                    
                    
                    <div fxFlex="grow"></div>
                    <zwp-md-button 
                        fxFlexAlign="end"
                        [label]="'Save New Project'" [icon]="'save'"
                        [disabled]="(remoteStateBusy$ | async) || createProjectForm.invalid"
                        (btnClick)="saveProject()"
                    ></zwp-md-button>
                </form>
            </div>
        </zwp-window>
    `
})
export class PlatformDummyDataCreateProjectWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    private projectFacade = inject(State.Facades.PlatformDummyDataProjectFacade)
    private readonly subscriptions = new Subscription()

    remoteState$ = this.projectFacade.projectRemoteState$
    remoteStateBusy$ = this.remoteState$.pipe(map(remoteState => remoteState.busy))
    remoteStateError$ = this.remoteState$.pipe(map(remoteState => remoteState.error))

    statusEnumLabel = Model.projectStatusLabelPipeSignature

    createProjectForm = new FormGroup({
        name: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
        description: new FormControl<string>(''),
        status: new FormControl<Model.ProjectStatus | null>(null, [Validators.required]),
        startDate: new FormControl<Date | null>(null, [Validators.required]),
        endDate: new FormControl<Date | null>(null, [Validators.required]),
        budget: new FormControl<number | null>(null)
    })

    saveProject() {
        if (this.createProjectForm.valid) {
            this.projectFacade.createProject({ 
                name: this.createProjectForm.value.name ?? '',
                description: this.createProjectForm.value.description ?? undefined,
                status: this.createProjectForm.value.status ?? Model.ProjectStatus.draft,
                startDate: (this.createProjectForm.value.startDate ?? new Date()).toISOString() as unknown as Date,
                endDate: (this.createProjectForm.value.endDate ?? new Date()).toISOString() as unknown as Date,
                budget: this.createProjectForm.value.budget ? coerceNumber(this.createProjectForm.value.budget) : undefined
            })
            this.__close()
        }
    }

    __close() {
        this.subscriptions.unsubscribe()
        this.remove()
    }

    ngOnInit() {
        const busySub = this.remoteStateBusy$.subscribe(busy => {
            if (busy) { this.createProjectForm.disable() }
            else { this.createProjectForm.enable() }
        })
        this.subscriptions.add(busySub)
    }

    ngOnDestroy() {
        // console.log('PlatformDummyDataCreateProjectWindowComponent destroyed')
        this.subscriptions.unsubscribe()
    }
}