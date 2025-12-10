import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { ZWPDeleteConfirmationData, ZWPDeleteConfirmationResult } from '../../model'
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog'

@Component({
    selector: 'zwp-delete-confirmation-dialog',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            fxLayout="column"
            fxLayoutAlign="center stretch"
            fxFlex="grow"
            zwpBackgroundColor="system-background"
            zwpCorners="10"
            class="mat-elevation-z4"
        >
            <div
                fxLayout="row"
                fxFlex="50px"
                fxLayoutGap="5px"
                fxLayoutAlign="start center"
                zwpPadding="0 15"
            >
                <mat-icon
                    fxFlex="noshrink"
                    [style.fontSize]="'20px'"
                    [style.width]="'20px'"
                    [style.height]="'20px'"
                    zwpColor="system-red"
                >delete</mat-icon
                >
                <div
                    fxLayout="column"
                    fxFlexAlign="stretch"
                    fxLayoutAlign="center start"
                    fxFlexOffset="5px"
                    fxFlex="grow"
                >
                    <span
                        [zwpTextStyle]="'subheadline'"
                        zwpColor="label"
                        >{{ data.title }}</span
                    >
                </div>
            </div>
            <div
                fxLayout="row"
                fxFlex="2px"
                zwpBackgroundColor="system-red"
            ></div>
            <span [zwpTextStyle]="'body1'" zwpPadding="30 20">{{ data.message }}</span>
            <div fxLayout="row" fxFlexAlign="end" fxLayoutAlign="center stretch" fxLayoutGap="10px" zwpPadding="10">
                <zwp-md-button
                    [label]="data.cancelButtonLabel"
                    [backgroundColor]="'system-gray3' | zwpColorTheme"
                    [labelColor]="'system-white' | zwpColorTheme"
                    (btnClick)="cancel()"
                ></zwp-md-button>
                <zwp-md-button
                    [label]="data.confirmButtonLabel"
                    [backgroundColor]="'destructive' | zwpColorTheme"
                    [labelColor]="'system-white' | zwpColorTheme"
                    (btnClick)="confirm()"
                ></zwp-md-button>
                <zwp-md-button
                    *ngIf="data.hasPermanentDelete"
                    [label]="data.confirmPermanentButtonLabel"
                    [backgroundColor]="'destructive' | zwpColorTheme"
                    [labelColor]="'system-white' | zwpColorTheme"
                    (btnClick)="confirmPermanent()"
                ></zwp-md-button>
            </div>
        </div>
    `,
})
export class DeleteConfirmationDialogComponent {
    readonly dialogRef: DialogRef<ZWPDeleteConfirmationResult, DeleteConfirmationDialogComponent> = inject(
        DialogRef<ZWPDeleteConfirmationResult, DeleteConfirmationDialogComponent>
    )
    readonly data = inject<ZWPDeleteConfirmationData>(DIALOG_DATA)

    cancel() {
        this.dialogRef.close(ZWPDeleteConfirmationResult.CANCEL)
    }

    confirm() {
        this.dialogRef.close(ZWPDeleteConfirmationResult.CONFIRM)
    }

    confirmPermanent() {
        this.dialogRef.close(ZWPDeleteConfirmationResult.CONFIRM_PERMANENT)
    }
}
