import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core'
import { isNil, Nullable } from '@zwp/platform.common'
import { BaseWindowComponent, WINDOW_COMPONENT_DATA, ZWPWindowComponent } from '@zwp/platform.layout'
import { ZWPFileExplorerFacade } from '../../+state/facades/file-explorer.facade'
import { Subscription } from 'rxjs'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Model } from '../../model'

@ZWPWindowComponent('FileExplorerNewFileWindowComponent')
@Component({
    selector: 'zwp-file-explorer-new-file-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
            <div fxLayout="row" fxLayoutGap="20px" fxFlex="grow" zwpPadding="20">
                <form
                    fxLayout="column"
                    fxLayoutAlign="center stretch"
                    fxLayoutGap="10px"
                    fxFlex="grow"
                    [formGroup]="createNewFileForm"
                    (ngSubmit)="createNewFile()"
                >
                    <mat-form-field
                        appearance="outline"
                        class="noHintFormField flexFormField noOutlineFormField"
                        zwpCorners="4"
                        zwpBackgroundColor="tertiary-system-fill"
                    >
                        <input matInput formControlName="name" placeholder="File Name" cdkFocusInitial />
                    </mat-form-field>
                    <zwp-transform-enum-dropdown-input 
                        [enumInput]="createNewFileForm.controls.fileType" 
                        [transformSignature]="fileTypeEnumSignature" 
                        placeholder="File Type"
                    ></zwp-transform-enum-dropdown-input>
                    <div fxFlex="grow"></div>
                    <zwp-md-button
                        fxFlexAlign="end"
                        [label]="'Add New File'"
                        [icon]="'save'"
                        [disabled]="createNewFileForm.invalid"
                        (btnClick)="createNewFile()"
                    ></zwp-md-button>
                </form>
            </div>
        </zwp-window>
    `,
})
export class FileExplorerNewFileWindowComponent extends BaseWindowComponent implements OnDestroy {
    private windowData = inject(WINDOW_COMPONENT_DATA) as {
        currentDirectoryId: Nullable<string>
    }

    private fileExplorerFacade = inject(ZWPFileExplorerFacade)
    private readonly subscriptions = new Subscription()

    fileTypeEnumSignature = Model.fileExplorerFileTypeLabelPipeSignature

    createNewFileForm = new FormGroup({
        name: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
        fileType: new FormControl<Model.FileExplorerFileType | null>(null)
    })

    // ngOnInit() {
    //     // console.log('adding new file window')
    // }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    createNewFile() {
        if (this.createNewFileForm.valid) {
            const fileTypeValue = this.createNewFileForm.value.fileType
            const nameValue = this.createNewFileForm.value.name
            if (!isNil(fileTypeValue) && !isNil(nameValue)) {
                this.fileExplorerFacade.createNewFile(
                    this.windowData.currentDirectoryId,
                    nameValue,
                    fileTypeValue
                )
                this.remove()
            }
            
        }
    }
}
