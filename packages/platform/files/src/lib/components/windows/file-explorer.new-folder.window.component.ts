import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ContentChild, inject, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Nullable } from '@zwp/platform.common'
import { BaseWindowComponent, WINDOW_COMPONENT_DATA, ZWPWindowComponent } from '@zwp/platform.layout'
import { ZWPFileExplorerFacade } from '../../+state/facades/file-explorer.facade'
import { Subscription, timer } from 'rxjs'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatInput } from '@angular/material/input'

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
                        <input matInput #folderNameInput formControlName="name" placeholder="Folder Name" cdkFocusInitial/>
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
export class FileExplorerNewFolderWindowComponent extends BaseWindowComponent implements OnDestroy {
    @ViewChild(MatInput) folderNameInput!: MatInput

    private windowData = inject(WINDOW_COMPONENT_DATA) as {
        currentDirectoryId: Nullable<string>
    }

    private fileExplorerFacade = inject(ZWPFileExplorerFacade)
    private readonly subscriptions = new Subscription()

    createNewFolderForm = new FormGroup({
        name: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
    })

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
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
