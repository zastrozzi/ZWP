import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ZWPDebuggableInjectable } from '@zwp/platform.common'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'ZWPSnackbarService', options: { skipMethodDebugger: true } })
export class ZWPSnackbarService {
    constructor(private snackbar: MatSnackBar) {
        // super('SnackbarService', { skipMethodDebugger: true })
    }

    showSnackbar(message: string, duration: number) {
        this.snackbar.open(message, 'Close', {
            duration,
            horizontalPosition: 'end',
            verticalPosition: 'top'
        })
    }
}