import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core'
import { Facades } from '../../+state/facades'
import { Model } from '../../model'
import { isNull, Nullable } from '@zwp/platform.common'

@Component({
    selector: 'zwp-file-explorer-navigation-controls',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            *ngIf="
            { 
                currentDirectoryId: currentDirectoryId$ | async,
                parentDirectoryId: currentDirectoryParentDirectoryId$ | async,
                navigationButtonLabel: (currentDirectoryName$ | async) ?? 'Back',
                hasCurrentDirectory: (hasCurrentDirectory$ | async) ?? false
            } as fileExplorerNavControlsData" 
            fxLayout="row" fxLayoutAlign="center stretch" fxLayoutGap="5px"
        >
            <zwp-md-button
                (btnClick)="navigateDirectory(fileExplorerNavControlsData.parentDirectoryId)"
                materialType="flat"
                fxFlexAlign="center"
                layoutGap="7px"
                [label]="fileExplorerNavControlsData.navigationButtonLabel"
                [textStyle]="'button1'"
                icon="arrow_back"
                [labelColor]="'primary' | zwpColorTheme"
                [disabled]="!fileExplorerNavControlsData.hasCurrentDirectory"
            ></zwp-md-button>
            <zwp-md-button
                (btnClick)="createRandomFile(fileExplorerNavControlsData.currentDirectoryId)"
                materialType="flat"
                layoutGap="7px"
                label="New File"
                textStyle="button1"
                icon="description"
                [labelColor]="'primary' | zwpColorTheme"
                fxFlexAlign="center"
            ></zwp-md-button>
            <zwp-md-button
                fxFlexAlign="center"
                (btnClick)="createRandomDirectory(fileExplorerNavControlsData.currentDirectoryId)"
                materialType="flat"
                layoutGap="7px"
                label="New Folder"
                textStyle="button1"
                icon="folder"
                [labelColor]="'primary' | zwpColorTheme"
            ></zwp-md-button>
            <mat-menu #newFileExplorerItemNavMenu="matMenu">
            <div
                fxLayout="column"
                fxLayoutAlign="center stretch"
                fxLayoutGap="8px"
                zwpBackgroundColor="tertiary-system-background"
                [style.marginTop]="'-8px'"
                [style.marginBottom]="'-8px'"
                zwpPadding="10px"
            >
                <zwp-md-button
                    (btnClick)="createRandomFile(fileExplorerNavControlsData.currentDirectoryId)"
                    materialType="flat"
                    layoutGap="7px"
                    label="New File"
                    textStyle="button1"
                    icon="description"
                    [labelColor]="'primary' | zwpColorTheme"
                    fxFlexAlign="center"
                ></zwp-md-button>
                <zwp-md-button
                    fxFlexAlign="center"
                    (btnClick)="createRandomDirectory(fileExplorerNavControlsData.currentDirectoryId)"
                    materialType="flat"
                    layoutGap="7px"
                    label="New Folder"
                    textStyle="button1"
                    icon="folder"
                    [labelColor]="'primary' | zwpColorTheme"
                ></zwp-md-button>
            </div>
        </mat-menu>
        </div>
    `,
})
export class FileExplorerNavigationControlsComponent {
    @Input() buttonBackgroundColorTheme = 'clear'
    @Input() buttonSelectedColorTheme = 'primary'
    @Input() buttonUnselectedColorTheme = 'tertiary-label'

    private fileExplorerFacade = inject(Facades.ZWPFileExplorerFacade)

    currentDirectoryId$ = this.fileExplorerFacade.currentDirectoryId$
    currentDirectoryParentDirectoryId$ = this.fileExplorerFacade.currentDirectoryParentDirectoryId$
    currentDirectoryName$ = this.fileExplorerFacade.currentDirectoryName$
    hasCurrentDirectory$ = this.fileExplorerFacade.hasCurrentDirectory$

    navigateDirectory(id: Nullable<string>) {
        this.fileExplorerFacade.navigateDirectory(id)
    }
    createRandomDirectory(parentId: Nullable<string>) {
        isNull(parentId)
        ? this.fileExplorerFacade.createRandomFileData(true)
        : this.fileExplorerFacade.createRandomFileDataInDirectory(parentId, true)
    }
    createRandomFile(parentId: Nullable<string>) {
        isNull(parentId)
        ? this.fileExplorerFacade.createRandomFileData(false)
        : this.fileExplorerFacade.createRandomFileDataInDirectory(parentId, false)
    }
}
