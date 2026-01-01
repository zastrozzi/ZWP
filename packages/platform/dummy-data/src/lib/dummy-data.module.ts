import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { State } from './+state'

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        ...State.Facades.ALL
    ]
})
export class ZWPDummyDataModule {}
