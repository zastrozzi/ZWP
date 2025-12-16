import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core'
import { Facades } from '../../+state/facades'
import { Model } from '../../model'
import { isNull, Nullable, ZWPRouterFacade } from '@zwp/platform.common'
import { ZWPWindowLayoutFacade } from '@zwp/platform.layout'

@Component({
    selector: 'zwp-file-explorer-navigation-controls',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            *ngIf="{
                currentDirectoryId: currentDirectoryId$ | async,
                parentDirectoryId: currentDirectoryParentDirectoryId$ | async,
                navigationButtonLabel: (currentDirectoryName$ | async) ?? 'Back',
                hasCurrentDirectory: (hasCurrentDirectory$ | async) ?? false,
                selectedItemIds: (selectedItemIds$ | async) ?? []
            } as fileExplorerNavControlsData"
            fxLayout="row"
            fxLayoutAlign="center stretch"
            fxLayoutGap="5px"
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
                materialType="flat"
                label="New..."
                icon="add_box"
                textStyle="button1"
                layoutGap="7px"
                [labelColor]="'primary' | zwpColorTheme"
                [matMenuTriggerFor]="newFileExplorerItemNavMenu"
                #newFileExplorerItemNavMenuTrigger="matMenuTrigger"
            ></zwp-md-button>
            <zwp-md-button
                *ngIf="fileExplorerNavControlsData.selectedItemIds.length > 0"
                materialType="flat"
                [label]="
                    'Delete ' +
                    fileExplorerNavControlsData.selectedItemIds.length +
                    (fileExplorerNavControlsData.selectedItemIds.length === 1 ? ' item' : ' items')
                "
                icon="delete"
                textStyle="button1"
                layoutGap="7px"
                [labelColor]="'destructive' | zwpColorTheme"
                (btnClick)="deleteItems(fileExplorerNavControlsData.selectedItemIds)"
            ></zwp-md-button>
            <mat-menu #newFileExplorerItemNavMenu="matMenu">
                <div
                    fxLayout="column"
                    fxLayoutAlign="center stretch"
                    fxLayoutGap="3px"
                    zwpBackgroundColor="tertiary-system-background"
                    [style.marginTop]="'-8px'"
                    [style.marginBottom]="'-8px'"
                    zwpPadding="5px"
                >
                    <zwp-md-button
                        (btnClick)="createRandomFile(fileExplorerNavControlsData.currentDirectoryId)"
                        materialType="flat"
                        layoutGap="7px"
                        label="New File"
                        textStyle="button1"
                        icon="description"
                        [labelColor]="'primary' | zwpColorTheme"
                        [backgroundColor]="'clear' | zwpColorTheme"
                        fxFlexAlign="stretch"
                        [padding]="'10 25 10 15'"
                    ></zwp-md-button>
                    <zwp-divider></zwp-divider>
                    <zwp-md-button
                        fxFlexAlign="stretch"
                        (btnClick)="onNewFolderClicked()"
                        materialType="flat"
                        layoutGap="7px"
                        label="New Folder"
                        textStyle="button1"
                        icon="folder"
                        [labelColor]="'primary' | zwpColorTheme"
                        [backgroundColor]="'clear' | zwpColorTheme"
                        [padding]="'10 25 10 15'"
                    ></zwp-md-button>
                    <zwp-divider></zwp-divider>
                    <zwp-md-button
                        fxFlexAlign="stretch"
                        (btnClick)="createRandomDirectory(fileExplorerNavControlsData.currentDirectoryId)"
                        materialType="flat"
                        layoutGap="7px"
                        label="New Random Folder"
                        textStyle="button1"
                        icon="folder"
                        [labelColor]="'primary' | zwpColorTheme"
                        [backgroundColor]="'clear' | zwpColorTheme"
                        [padding]="'10 25 10 15'"
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
    selectedItemIds$ = this.fileExplorerFacade.selectedItemIds$

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

    deleteItems(ids: string[]) {
        this.fileExplorerFacade.deleteFileExplorerItems(ids)
    }

    onNewFolderClicked() {
        this.fileExplorerFacade.presentNewFolderWindow()
    }
}
