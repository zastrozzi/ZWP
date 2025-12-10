import { Dialog, DialogRef } from '@angular/cdk/dialog'
import { inject, Injectable } from '@angular/core'
import { defaultZWPDeleteConfirmationData, isNull, ZWPDebuggableInjectable, ZWPDeleteConfirmationResult, Nullable } from '@zwp/platform.common'
import { DeleteConfirmationDialogComponent, ZWPDeleteConfirmationData } from '@zwp/platform.common'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPPopupLayoutFacade', options: { skipMethodDebugger: true } })
export class ZWPPopupLayoutFacade {
    private dialog = inject(Dialog)

    launchDeleteConfirmationDialog(
        dialogData: Partial<ZWPDeleteConfirmationData>,
        onConfirm: Nullable<() => void> = null,
        onConfirmPermanent: Nullable<() => void> = null,
        onCancel: Nullable<() => void> = null
    ) {
        const completeDialogData: ZWPDeleteConfirmationData = {
            ...defaultZWPDeleteConfirmationData,
            ...dialogData,
            hasPermanentDelete: !isNull(onConfirmPermanent)
        }
        
        const dialogRef: DialogRef<ZWPDeleteConfirmationResult, DeleteConfirmationDialogComponent> = this.dialog.open(
            DeleteConfirmationDialogComponent,
            {
                data: completeDialogData,
                minWidth: '400px',
                maxWidth: '80vw'
            }
        )
        // const dialogRef = this.dialog.open<
        //     DeleteConfirmationDialogComponent,
        //     ZWPDeleteConfirmationData,
        //     ZWPDeleteConfirmationResult
        // >(DeleteConfirmationDialogComponent, {
        //     data: completeDialogData,
        // })
        dialogRef.closed.subscribe((result) => {
            switch (result) {
                case ZWPDeleteConfirmationResult.CANCEL:
                    if (!isNull(onCancel)) { onCancel() }
                    break
                case ZWPDeleteConfirmationResult.CONFIRM:
                    if (!isNull(onConfirm)) { onConfirm() }
                    break
                case ZWPDeleteConfirmationResult.CONFIRM_PERMANENT:
                    if (!isNull(onConfirmPermanent)) { onConfirmPermanent() }
                    else if (!isNull(onConfirm)) { onConfirm() }
                    break
            }
        })
    }
}
