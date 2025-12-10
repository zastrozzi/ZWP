import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core'
import { CDPCommon } from '@zwp/cdp.common'
import { State } from '../../+state'
import { Model } from '../../model'

@Component({
    selector: 'kgc-file-upload-utility-panel',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            fxLayout="column"
            zwpBackgroundColor="system-background"
            zwpCorners="10 10 0 0"
            [style.border]="'1px solid'"
            [style.borderColor]="'separator' | zwpColorTheme"
            [style.maxHeight]="'50vh'"
        >
            <div fxLayout="row" fxLayoutAlign="space-between center" fxFlex="50px" zwpPadding="0 10 0 20">
                <span zwpTextStyle="body3" zwpColor="label">Uploads</span>
                <zwp-md-icon-button
                    (btnClick)="closeUtilityDockPanel()"
                    textStyle="headline"
                    icon="expand_more"
                    [iconPadding]="5"
                    backgroundColor="#00000000"
                    [iconColor]="'primary' | zwpColorTheme"
                    label="Close"
                ></zwp-md-icon-button>
            </div>

            <zwp-divider></zwp-divider>
            <div fxLayout="column" zwpCustomScroll [scrollDirection]="'vertical'" [scrollbarMode]="'custom'">
                <div fxLayout="column" fxLayoutGap="10px" zwpPadding="10">
                    <div
                        *ngFor="let upload of fileUploads$ | async; trackBy: identifyUpload"
                        fxLayout="row"
                        fxLayoutAlign="start center"
                        fxLayoutGap="10px"
                        zwpPadding="8px"
                        zwpCorners="5"
                        zwpBackgroundColor="quaternary-system-fill"
                    >
                        <mat-icon zwpColor="primary" zwpTextStyle="headline" zwpPadding="5">upload_file</mat-icon>
                        <div fxLayout="column" fxFlex="grow" fxLayoutGap="3px">
                            <div fxLayout="row" fxLayoutAlign="space-between baseline">
                                <span zwpTextStyle="body1">{{ upload.name }}</span>
                                <span zwpTextStyle="body2">{{
                                    upload.status | zwpTransformEnum : fileUploadStatusLabelPipeSignature
                                }}</span>
                            </div>
                            <div fxLayout="row" fxLayoutAlign="space-between baseline" zwpColor="secondary-label">
                                <span zwpTextStyle="caption1" zwpFontWeight="400">{{
                                    uploadSizeLabel(upload.size, upload.progress)
                                }}</span>
                                <span zwpTextStyle="caption1" zwpFontWeight="400">{{
                                    uploadProgressLabel(upload.progress)
                                }}</span>
                            </div>
                            <mat-progress-bar fxFlexOffset="5px" mode="determinate" [value]="upload.progress" />
                        </div>
                        <zwp-md-icon-button
                            (btnClick)="removeFileUpload(upload.id)"
                            textStyle="button2"
                            icon="close"
                            [iconPadding]="5"
                            backgroundColor="#00000000"
                            [iconColor]="'primary' | zwpColorTheme"
                            label="Remove Upload"
                        ></zwp-md-icon-button>
                    </div>
                    <ng-container *ngIf="fileUploadsIsEmpty$ | async">
                        <span fxFlexAlign="center" zwpTextStyle="body2" zwpColor="secondary-label"
                            >No File Uploads</span
                        >
                    </ng-container>
                </div>
            </div>
        </div>
    `,
})
export class FileUploadUtilityPanelComponent {
    private utilityDockFacade = inject(CDPCommon.State.Facades.CDPCommonUtilityDockFacade)
    private fileUploadFacade = inject(State.Facades.GoogleCloudFileUploadFacade)

    fileUploads$ = this.fileUploadFacade.fileUploads$
    fileUploadsIsEmpty$ = this.fileUploadFacade.fileUploadsIsEmpty$

    fileUploadStatusLabelPipeSignature = Model.Enums.fileUploadStatusLabelPipe

    uploadSizeLabel(size: number, progress: number): string {
        const totalSizeInMB = (size / 1024 / 1024).toPrecision(2)
        const currentSize = size * (progress / 100)
        const sizeInMB = (currentSize / 1024 / 1024).toPrecision(2)
        return `${sizeInMB}MB / ${totalSizeInMB}MB`
    }

    uploadProgressLabel(progress: number): string {
        return `${progress.toFixed(1)}%`
    }

    closeUtilityDockPanel() {
        this.utilityDockFacade.closeUtilityDockPanel(CDPCommon.Model.UtilityDockPanelType.uploads)
    }

    removeFileUpload(id: string) {
        this.fileUploadFacade.removeFileUpload(id)
    }

    identifyUpload(index: number, upload: Model.Common.FileUpload) {
        return upload.id
    }
}
