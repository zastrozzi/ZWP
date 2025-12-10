import { HMRCHomeComponent } from './hmrc-home.component'
import * as OCCUPATION_COMPONENTS from './occupations'
import * as INDUSTRY_COMPONENTS from './industries'

export const INTERNAL_COMPONENTS = {
    HMRCHomeComponent,
    OCCUPATION_COMPONENTS,
    INDUSTRY_COMPONENTS,
    
    ALL: [
        HMRCHomeComponent,
        OCCUPATION_COMPONENTS.OccupationListComponent,
        OCCUPATION_COMPONENTS.CreateOccupationWindowComponent,
        INDUSTRY_COMPONENTS.IndustryListComponent
    ]
}

export * from './hmrc-home.component'
export * from './occupations'
export * from './industries'