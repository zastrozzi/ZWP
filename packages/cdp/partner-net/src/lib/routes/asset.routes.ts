import { Routes } from '@angular/router'
import { INTERNAL_COMPONENTS } from '../components'

export const assetRoutes: Routes = [
    {
        path: 'assets',
        component: INTERNAL_COMPONENTS.ASSET_COMPONENTS.AssetPaginatedListComponent,
        data: {
            navTitle: 'Assets',
            navIcon: 'photo_library',
            leftNavPanelShown: true
        }
    }
]