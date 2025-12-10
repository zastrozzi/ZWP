import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, inject, Input, OnInit, Output } from '@angular/core'
import { EventEmitter, Directive, TemplateRef } from '@angular/core'
import { BehaviorSubject, filter, fromEvent, map, Subject, switchMap, take } from 'rxjs'
import { UntilDestroy, untilDestroyed } from '../../utils'
import { EditModeDirective, ViewModeDirective } from '../../directives'
import { Nilable } from '../../model'

@UntilDestroy()
@Component({
    selector: 'zwp-editable-property',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<ng-container *ngTemplateOutlet="currentView$ | async"></ng-container>`
})
export class EditablePropertyComponent implements OnInit {
    @Input() label = 'Label'
    @Input() property: Nilable<string> = 'Property'
    @Input() backgroundColor = 'quaternary-system-fill'
    @Input() labelColor = 'label'
    @Input() propertyColor = 'primary'
    @Input() textStyle = 'body1'
    @Input() layout: 'row' | 'column' = 'row'
    @Output() update = new EventEmitter()
    @ContentChild(ViewModeDirective) viewModeTpl!: ViewModeDirective
    @ContentChild(EditModeDirective) editModeTpl!: EditModeDirective
    
    constructor(private host: ElementRef) {}

    mode = new BehaviorSubject<'view' | 'edit'>('view')
    mode$ = this.mode.asObservable()
    editMode = new Subject()
    editMode$ = this.editMode.asObservable()

    currentView$ = this.mode$.pipe(
        map((mode) => {
            if (mode === 'view') {
                return this.viewModeTpl.tpl
            } else {
                return this.editModeTpl.tpl
            }
        })
    )

    ngOnInit() {
        this.viewModeHandler()
        this.editModeHandler()
    }

    private get element() {
        return this.host.nativeElement
    }

    private viewModeHandler() {
        fromEvent(this.element, 'dblclick')
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.mode.next('edit')
                this.editMode.next(true)
            })
    }

    private editModeHandler() {
        const clickOutside$ = fromEvent(document, 'click').pipe(
            filter(({ target }) => this.element.contains(target) === false),
            take(1)
        )

        this.editMode$
            .pipe(
                switchMap(() => clickOutside$),
                untilDestroyed(this)
            )
            .subscribe((event) => {
                this.update.next(null)
                this.mode.next('view')
            })
    }
}
