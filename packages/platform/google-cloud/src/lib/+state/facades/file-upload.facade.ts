import { inject, Injectable } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { ZWPDebuggableInjectable, Nullable } from '@zwp/platform.common'
import { FileUploadLocalActions } from '../actions'
import { Selectors } from '../selectors'
import { Model } from '../../model'

@Injectable()
@ZWPDebuggableInjectable({ serviceName: 'GoogleCloudFileUploadFacade', options: { skipMethodDebugger: true } })
export class GoogleCloudFileUploadFacade {
    private store = inject(Store)

    fileUploads$ = this.store.pipe(select(Selectors.FileUploadSelectors.selectAllFileUploads))
    fileUploadsIsEmpty$ = this.store.pipe(select(Selectors.FileUploadSelectors.selectFileUploadsIsEmpty))
    selectedFileUpload$ = this.store.pipe(select(Selectors.FileUploadSelectors.selectedFileUpload))
    selectedFileUploadId$ = this.store.pipe(select(Selectors.FileUploadSelectors.selectSelectedFileUploadId))
    fileUploadById$ = (id: string) => this.store.pipe(select(Selectors.FileUploadSelectors.selectFileUploadById(id)))

    createFileUpload(fileUpload: Model.Common.FileUpload) {
        return this.store.dispatch(FileUploadLocalActions.createFileUpload({ fileUpload }))
    }

    removeFileUpload(fileUploadId: string) {
        return this.store.dispatch(FileUploadLocalActions.deleteFileUpload({ fileUploadId }))
    }
}