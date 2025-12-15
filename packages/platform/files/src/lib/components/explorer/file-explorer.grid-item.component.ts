import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'
import { Model } from '../../model'

@Component({
    selector: 'zwp-file-explorer-grid-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            (dblclick)="handleDoubleClick($event, fileDataItem)"
            (click)="handleClick($event, fileDataItem.id)"
            fxLayout="column"
            fxLayoutAlign="center center"
            fxFlexFill
            fxLayoutGap="5px"
            [style.backgroundColor]="isSelected 
                    ? ('primary' | zwpColorTheme : { opacity: 0.3 })
                    : ('quaternary-system-fill' | zwpColorTheme)
            "
            zwpCorners="8"
            zwpPadding="10"
        >
            <div fxFlex="grow"></div>
            <mat-icon
                fxFlex="noshrink"
                [zwpTextStyle]="'title1'"
                [inline]="true"
                [style.height]="'auto'"
                [style.width]="'auto'"
                [style.color]="'primary' | zwpColorTheme"
            >
                {{ fileDataItem.isDir ? 'folder' : 'description' }}
            </mat-icon>
            <div fxFlex="grow"></div>
            <span
                fxFlex="noshrink"
                zwpTextStyle="body1"
                zwpDisableSelection
                [style.textAlign]="'center'"
                [style.textOverflow]="'ellipsis'"
                [style.whiteSpace]="'nowrap'"
                [style.overflow]="'hidden'"
                [style.color]="'label' | zwpColorTheme"
                [style.width]="'inherit'"
            >
                {{ fileDataItem.name }}
            </span>
        </div>
    `,
})
export class FileExplorerGridItemComponent {
    @Input() fileDataItem!: Model.FileDataItem
    @Input() isSelected = false
    @Output() doubleClicked = new EventEmitter<string>()
    @Output() clicked = new EventEmitter<string>()

    handleDoubleClick(event: MouseEvent | TouchEvent, item: Model.FileDataItem) {
        event.stopPropagation()
        if (item.isDir) {
            this.doubleClicked.emit(item.id)
        }
    }

    handleClick(event: MouseEvent | TouchEvent, id: string) {
        event.stopPropagation()
        this.clicked.emit(id)
    }
}
