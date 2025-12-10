import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ZWPWindowComponent } from '@zwp/platform.layout'
import { State } from '../../+state'
import { Subscription, map, take, tap } from 'rxjs'

@ZWPWindowComponent('CreateStorageBucketWindowComponent')
@Component({
    selector: 'kgc-create-storage-bucket-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
            <div fxLayout="row" fxLayoutGap="20px" fxFlex="grow" zwpPadding="20">
                <form 
                    fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="10px" fxFlex="grow"
                    [formGroup]="createStorageBucketForm"
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
                        <input matInput formControlName="location" placeholder="Location" />
                    </mat-form-field>
                    
                    <div fxFlex="grow"></div>
                    <zwp-md-button 
                        fxFlexAlign="end"
                        [label]="'Save New Bucket'" [icon]="'save'"
                        [disabled]="(remoteStateBusy$ | async) || createStorageBucketForm.invalid"
                        (btnClick)="saveStorageBucket()"
                    ></zwp-md-button>
                </form>
            </div>
        </zwp-window>
    `
})
export class CreateStorageBucketWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    private storageBucketFacade = inject(State.Facades.GoogleCloudStorageBucketFacade)
    private readonly subscriptions = new Subscription()

    remoteState$ = this.storageBucketFacade.storageBucketRemoteState$
    remoteStateBusy$ = this.remoteState$.pipe(map(remoteState => remoteState.busy))
    remoteStateError$ = this.remoteState$.pipe(map(remoteState => remoteState.error))

    createStorageBucketForm = new FormGroup({
        name: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
        location: new FormControl<string>('')
    })

    saveStorageBucket() {
        if (this.createStorageBucketForm.valid) {
            this.storageBucketFacade.createStorageBucket({ 
                name: this.createStorageBucketForm.value.name ?? '',
                location: this.createStorageBucketForm.value.location ?? undefined
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
            if (busy) { this.createStorageBucketForm.disable() }
            else { this.createStorageBucketForm.enable() }
        })
        this.subscriptions.add(busySub)
    }

    ngOnDestroy() {
        console.log('CreateStorageBucketWindowComponent destroyed')
        this.subscriptions.unsubscribe()
    }
}