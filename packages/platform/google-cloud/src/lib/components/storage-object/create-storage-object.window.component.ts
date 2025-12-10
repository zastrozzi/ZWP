import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ZWPWindowComponent, WINDOW_COMPONENT_DATA } from '@zwp/platform.layout'
import { State } from '../../+state'
import { Subscription, map, take, tap } from 'rxjs'
import { isNull, isUndefined, Nullable } from '@zwp/platform.common'

@ZWPWindowComponent('CreateStorageObjectWindowComponent')
@Component({
    selector: 'kgc-create-storage-object-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent >
            <div fxLayout="row" fxLayoutGap="20px" fxFlex="grow" zwpPadding="20" cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
                
                <form 
                    fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="10px" fxFlex="grow"
                    [formGroup]="createStorageObjectForm" (ngSubmit)="saveStorageObject()"
                >
                    <mat-form-field 
                        appearance="outline"
                        class="noHintFormField flexFormField noOutlineFormField" 
                        zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                    >
                        <input matInput formControlName="name" placeholder="Name" />
                    </mat-form-field>
                    <div
                        fxLayout="column"
                        fxLayoutGap="10px"
                        fxLayoutAlign="center center"
                        zwpFileUploadDragDrop
                        zwpCorners="4" zwpPadding="20 10 10 10"
                        (fileChangeEmitter)="onDragDropFileChange($event)"
                    >
                        <span zwpTextStyle="body1">{{this.file?.name ?? 'No file selected'}}</span>
                        <input [style.display]="'none'" type="file" name="file" id="file" (change)="onNativeFileInputChange($event)"/>
                        <label for="file">
                            <p>
                                <span
                                    zwpTextStyle="body1"
                                    zwpBackgroundColor="system-green"
                                    zwpColor="system-white"
                                    zwpPadding="10 16"
                                    [style.borderRadius]="'4px'"
                                    [style.cursor]="'pointer'"
                                    [style.marginRight]="'15px'"
                                    >Select your file</span
                                >
                                <span zwpTextStyle="body1"> or drop it here to upload</span>
                            </p>
                        </label>
                        <!-- <span zwpTextStyle="caption2" [style.opacity]="'0.7'">Storage Bucket: {{storageBucketId}}</span> -->
                    </div>
                    
                    <div fxFlex="grow"></div>
                    <zwp-md-button 
                        fxFlexAlign="end"
                        [label]="'Upload New Storage Object'" [icon]="'save'"
                        [disabled]="(remoteStateBusy$ | async) || createStorageObjectForm.invalid || fileIsNull"
                        (btnClick)="saveStorageObject()"
                    ></zwp-md-button>
                </form>
                
            </div>
        </zwp-window>
    `
})
export class CreateStorageObjectWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    private windowData = inject(WINDOW_COMPONENT_DATA) as { storageBucketId: Nullable<string> }
    private formBuilder = inject(FormBuilder)
    private storageObjectFacade = inject(State.Facades.GoogleCloudStorageObjectFacade)
    private readonly subscriptions = new Subscription()

    file: Nullable<File> = null
    fileExtension: Nullable<string> = null

    remoteState$ = this.storageObjectFacade.storageObjectRemoteState$
    remoteStateBusy$ = this.remoteState$.pipe(map(remoteState => remoteState.busy))
    remoteStateError$ = this.remoteState$.pipe(map(remoteState => remoteState.error))

    createStorageObjectForm = this.formBuilder.group({
        name: new FormControl<string>('', [Validators.required, Validators.minLength(1)])
    })

    ngOnInit() {
        
        console.log('CreateStorageObjectWindowComponent initialized')
    }

    ngOnDestroy() {
        console.log('CreateStorageObjectWindowComponent destroyed')
        this.subscriptions.unsubscribe()
    }

    __close() {
        this.subscriptions.unsubscribe()
        this.remove()
    }

    saveStorageObject() {
        const bucketId = this.storageBucketId
        if (!isNull(bucketId) && !isNull(this.file) && this.createStorageObjectForm.valid) {
            this.storageObjectFacade.uploadStorageObject(bucketId, 
                { name: this.storageObjectFormName?.value ?? '', file: this.file, predefinedAcl: 'publicRead' }
            )
            this.__close()
        }
    }

    get storageObjectFormName() {
        return this.createStorageObjectForm.get('name')
    }

    get fileIsNull() {
        return isNull(this.file)
    }

    get storageBucketId() { return this.windowData.storageBucketId }

    onDragDropFileChange(inputFile: File) {
        if (!isNull(this.file)) { this.clearFile() }
        this.file = inputFile
        this.fileExtension = this.file.type
        console.log('drop file extension', this.fileExtension)
        this.storageObjectFormName?.setValue(this.file.name)
        this.storageObjectFormName?.enable()
        this.createStorageObjectForm.markAsDirty()
        this.createStorageObjectForm.updateValueAndValidity()
    }

    onNativeFileInputChange(inputEvent: Event) {
        const inputTarget = inputEvent.target as HTMLInputElement
        if (isNull(inputTarget.files)) { return }
        const inputFile = inputTarget.files[0]
        this.onDragDropFileChange(inputFile)
    }

    clearFile() {
        this.file = null
        this.fileExtension = null
        this.storageObjectFormName?.reset()
        this.storageObjectFormName?.setValue(null)
        this.storageObjectFormName?.disable()
        this.createStorageObjectForm.markAsPristine()
        this.createStorageObjectForm.updateValueAndValidity()
    }
}