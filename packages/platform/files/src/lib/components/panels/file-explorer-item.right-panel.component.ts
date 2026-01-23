import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { RIGHT_PANEL_COMPONENT_DATA, ZWPRightPanelComponent } from '@zwp/platform.layout'
import { Model } from '../../model'
import { Facades } from '../../+state/facades'
import { FormControl, FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'
import { isNull, isUndefined } from '@zwp/platform.common'

@ZWPRightPanelComponent('FileExplorerItemRightPanelComponent')
@Component({
    selector: 'zwp-file-explorer-item-right-panel',
    changeDetection: ChangeDetectionStrategy.Default,
    template: `
        <div fxFlexFill [style.overflow]="'hidden'">
            <div fxLayout="column" fxFlex="grow" *ngIf="{fileDataItem : fileDataItem$ | async, childCount: childFileDataItemsCount$ | async} as liveData">
                <div zwpCustomScroll [scrollDirection]="'vertical'" [scrollbarMode]="'custom'" fxFlex="grow">
                    <div
                        fxLayout="column"
                        fxLayoutGap="5px"
                        zwpPadding="5"
                        [formGroup]="updateFileDataForm"
                        fxFlex="grow"
                    >
                        <zwp-popup-editable-property label="Name" [property]="updateFileDataForm.controls.name.value" (popupDismissed)="checkForm()">
                            <ng-template #editPopup>
                                <div
                                    fxLayout="row"
                                    zwpBackgroundColor="system-background"
                                    zwpPadding="4"
                                    zwpCorners="8"
                                    zwpBoxShadow
                                    cdkTrapFocus cdkTrapFocusAutoCapture
                                >
                                    <mat-form-field
                                        fxFlex="grow"
                                        appearance="outline"
                                        class="noHintFormField flexFormField noOutlineFormField"
                                        zwpCorners="4"
                                        zwpBackgroundColor="tertiary-system-fill"
                                    >
                                        <input matInput formControlName="name" placeholder="Name" />
                                    </mat-form-field>
                                </div>
                            </ng-template>
                        </zwp-popup-editable-property>
                        <zwp-labelled-property
                            [label]="'Type'"
                            [property]="liveData.fileDataItem?.isDir ? 'Folder' : (liveData.fileDataItem?.fileType | zwpTransformEnum: fileTypePipe)"
                        />
                        <zwp-labelled-property
                            *ngIf="liveData.fileDataItem?.isDir"
                            [label]="'Subitems'"
                            [property]="'' + liveData.childCount"
                        />
                        <zwp-labelled-property
                            [label]="'Created At'"
                            [property]="liveData.fileDataItem?.createdAt | date : 'yyyy/MM/dd HH:mm:ss'"
                        />
                        <zwp-labelled-property
                            [label]="'Updated At'"
                            [property]="liveData.fileDataItem?.updatedAt | date : 'yyyy/MM/dd HH:mm:ss'"
                        />
                    </div>
                </div>
                <zwp-divider></zwp-divider>
                <div fxLayout="row" fxLayoutAlign="end center" zwpPadding="5" fxLayoutGap="5px">
                    <zwp-md-button
                        materialType="flat"
                        [label]="'Discard Changes'"
                        [icon]="'cancel'"
                        [labelColor]="'destructive' | zwpColorTheme"
                        [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                        [disabled]="updateFileDataForm.untouched"
                        (btnClick)="discardChanges()"
                    />
                    <zwp-md-button
                        [label]="'Update Item'"
                        [icon]="'save'"
                        [labelColor]="'primary-label' | zwpColorTheme"
                        [backgroundColor]="'quaternary-system-fill' | zwpColorTheme"
                        [disabled]="updateFileDataForm.untouched || updateFileDataForm.invalid"
                        (btnClick)="saveFileData()"
                    />
                </div>
            </div>
        </div>
    `,
})
export class FileExplorerItemRightPanelComponent implements OnInit, OnDestroy {
    componentData = inject(RIGHT_PANEL_COMPONENT_DATA) as Model.FileDataItem
    private fileExplorerFacade = inject(Facades.ZWPFileExplorerFacade)
    private readonly subscriptions = new Subscription()

    fileTypePipe = Model.fileExplorerFileTypeLabelPipeSignature

    fileDataItem$ = this.fileExplorerFacade.fileDataItemById$(this.componentData.id)
    childFileDataItemsCount$ = this.fileExplorerFacade.childFileDataItemsCount$(this.componentData.id)

    updateFileDataForm = new FormGroup({
        name: new FormControl<string>(''),
    })

    nameFormControl = new FormControl<string>('')

    ngOnInit(): void {
        const fileDataItemUpdateSub = this.fileDataItem$.subscribe((item) => {
            if (!isUndefined(item)) {
                this.updateFileDataForm.patchValue(item)
                this.updateFileDataForm.markAsUntouched()
            }
        })
        this.subscriptions.add(fileDataItemUpdateSub)
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe()
    }

    saveFileData() {
        if (this.updateFileDataForm.valid) {
            const update: Partial<Model.FileDataItem> = {
                name: this.updateFileDataForm.controls.name.value ?? undefined,
            }

            this.fileExplorerFacade.updateFileData(this.componentData.id, update)
        }
    }

    async discardChanges() {
        const previousFileData = await this.fileExplorerFacade.getFileDataItem(this.componentData.id)
        if (!isNull(previousFileData)) {
            this.updateFileDataForm.patchValue(previousFileData)
            this.updateFileDataForm.markAsUntouched()
        }
    }

    checkForm() {
        this.updateFileDataForm.markAsTouched()
    }
}
