import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core'
import { Nullable } from '@zwp/platform.common'
import { BaseWindowComponent, WINDOW_COMPONENT_DATA, ZWPWindowComponent } from '@zwp/platform.layout'
import { ZWPFileExplorerFacade } from '../../+state/facades/file-explorer.facade'
import { Subscription } from 'rxjs'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@ZWPWindowComponent('FileExplorerNewFolderWindowComponent')
@Component({
    selector: 'zwp-file-explorer-new-folder-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
            <div fxLayout="row" fxLayoutGap="20px" fxFlex="grow" zwpPadding="20">
                <form
                    fxLayout="column"
                    fxLayoutAlign="center stretch"
                    fxLayoutGap="10px"
                    fxFlex="grow"
                    [formGroup]="createNewFolderForm"
                    (ngSubmit)="createNewFolder()"
                >
                    <mat-form-field
                        appearance="outline"
                        class="noHintFormField flexFormField noOutlineFormField"
                        zwpCorners="4"
                        zwpBackgroundColor="tertiary-system-fill"
                    >
                        <input matInput formControlName="name" placeholder="Folder Name" cdkFocusInitial />
                    </mat-form-field>
                    <div fxFlex="grow"></div>
                    <zwp-md-button
                        fxFlexAlign="end"
                        [label]="'Add New Folder'"
                        [icon]="'save'"
                        [disabled]="createNewFolderForm.invalid"
                        (btnClick)="createNewFolder()"
                    ></zwp-md-button>
                </form>
            </div>
        </zwp-window>
    `,
})
export class FileExplorerNewFolderWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    private windowData = inject(WINDOW_COMPONENT_DATA) as {
        currentDirectoryId: Nullable<string>
    }

    private fileExplorerFacade = inject(ZWPFileExplorerFacade)
    private readonly subscriptions = new Subscription()

    createNewFolderForm = new FormGroup({
        name: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
    })

    ngOnInit() {
        console.log('adding new folder window')
    }

    ngOnDestroy(): void {
        console.log('destroying new folder window')
    }

    createNewFolder() {
        if (this.createNewFolderForm.valid) {
            this.fileExplorerFacade.createNewDirectory(
                this.windowData.currentDirectoryId,
                this.createNewFolderForm.value.name ?? ''
            )
            this.remove()
        }
    }
}
