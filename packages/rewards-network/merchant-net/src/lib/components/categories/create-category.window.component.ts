import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { BaseWindowComponent, ZWPWindowComponent, WINDOW_COMPONENT_DATA } from '@zwp/platform.layout'
import { State } from '../../+state'
import { Subscription, map, take, tap } from 'rxjs'
import { Nullable, TransformEnumPipeSignature } from '@zwp/platform.common'
import { Model } from '../../model'

@ZWPWindowComponent('CreateCategoryWindowComponent')
@Component({
    selector: 'urnet-mnet-create-category-window',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <zwp-window #windowContent>
            <div fxLayout="row" fxLayoutGap="20px" fxFlex="grow" zwpPadding="20">
                <form 
                    fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="10px" fxFlex="grow"
                    [formGroup]="createCategoryForm"
                >
                    <div 
                        *ngIf="parentCategory$ | async as parentCategory"    
                        fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="10px" 
                        zwpCorners="4" zwpBackgroundColor="tertiary-system-fill" zwpPadding="10"
                    >
                        <span [zwpTextStyle]="'body1'" zwpColor="label">Parent Category:</span>
                        <span [zwpTextStyle]="'body1'" zwpColor="primary">{{parentCategory.name}}</span>
                    </div>
                
                    <mat-form-field 
                        appearance="outline"
                        class="noHintFormField flexFormField noOutlineFormField" 
                        zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                    >
                        <input matInput formControlName="name" placeholder="Name" cdkFocusInitial />
                    </mat-form-field>
                    <zwp-transform-enum-dropdown-input 
                        [enumInput]="createCategoryForm.controls.status" 
                        [transformSignature]="statusEnumSignature" 
                        placeholder="Status"
                    ></zwp-transform-enum-dropdown-input>
                    <mat-form-field 
                        appearance="outline"
                        class="noHintFormField flexFormField noOutlineFormField" 
                        zwpCorners="4" zwpBackgroundColor="tertiary-system-fill"
                    >
                        <input matInput formControlName="displayImageUrl" placeholder="Display Image URL" />
                    </mat-form-field>
                    <div fxFlex="grow"></div>
                    <zwp-md-button 
                        fxFlexAlign="end"
                        [label]="'Save New Category'" [icon]="'save'"
                        [disabled]="(remoteStateBusy$ | async) || createCategoryForm.invalid"
                        (btnClick)="saveCategory()"
                    ></zwp-md-button>
                </form>
            </div>
        </zwp-window>
    `
})
export class CreateCategoryWindowComponent extends BaseWindowComponent implements OnInit, OnDestroy {
    private windowData = inject(WINDOW_COMPONENT_DATA) as { categoryId: Nullable<string> }
    private categoryFacade = inject(State.Facades.CategoryFacade)
    private readonly subscriptions = new Subscription()

    remoteState$ = this.categoryFacade.categoryRemoteState$
    remoteStateBusy$ = this.remoteState$.pipe(map(remoteState => remoteState.busy))
    remoteStateError$ = this.remoteState$.pipe(map(remoteState => remoteState.error))

    parentCategory$ = this.categoryFacade.categoryById$(this.parentCategoryId ?? '')

    statusEnumSignature = Model.categoryStatusLabelPipeSignature

    createCategoryForm = new FormGroup({
        name: new FormControl<string>('', [Validators.required, Validators.minLength(1)]),
        status: new FormControl<Model.CategoryStatus | null>(Model.CategoryStatus.active),
        displayImageUrl: new FormControl<string | null>(null)
    })

    saveCategory() {
        if (this.createCategoryForm.valid) {
            this.categoryFacade.createCategory(
                this.parentCategoryId, 
                { 
                    name: this.createCategoryForm.value.name ?? '',
                    status: this.createCategoryForm.value.status ?? Model.CategoryStatus.active,
                    displayImageUrl: this.createCategoryForm.value.displayImageUrl ?? undefined
                }
            )
            this.__close()
        }
    }

    __close() {
        this.subscriptions.unsubscribe()
        this.remove()
    }

    get parentCategoryId() { return this.windowData.categoryId ?? null }

    ngOnInit() {
        const busySub = this.remoteStateBusy$.subscribe(busy => {
            if (busy) { this.createCategoryForm.disable() }
            else { this.createCategoryForm.enable() }
        })
        this.subscriptions.add(busySub)
    }

    ngOnDestroy() {
        console.log('CreateCategoryWindowComponent destroyed')
        this.subscriptions.unsubscribe()
    }
}