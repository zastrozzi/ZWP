import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core'
import { isUndefined } from '../utils'

@Directive({
    selector: '[zwpFileUploadDragDrop]'
})
export class FileUploadDragDropDirective {
    @Input() dropDisabled = false
    @Input() hoverBackgroundColor = '#ace1af'
    @Input() backgroundColor = '#efefef'
    @Output() fileChangeEmitter: EventEmitter<File> = new EventEmitter()

    @HostBinding('style.background') private currentBackgroundColor = this.backgroundColor

    @HostListener('dragover', ['$event']) public onDragOver(event: MouseEvent | TouchEvent) {
        event.preventDefault()
        event.stopPropagation()
        if (!this.dropDisabled) {
            this.currentBackgroundColor = this.hoverBackgroundColor
        }
    }

    @HostListener('dragleave', ['$event']) public onDragLeave(event: MouseEvent | TouchEvent) {
        event.preventDefault()
        event.stopPropagation()
        if (!this.dropDisabled) {
            this.currentBackgroundColor = this.backgroundColor
        }
    }

    @HostListener('drop', ['$event']) public onDrop(event: DragEvent) {
        event.preventDefault()
        event.stopPropagation()
        if (!this.dropDisabled) {
            this.currentBackgroundColor = this.backgroundColor
            const file = event.dataTransfer?.files[0]
            if (!isUndefined(file)) {
                this.fileChangeEmitter.emit(file)
            }
        }
    }
}