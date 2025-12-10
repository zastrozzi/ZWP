import { CreateOfferWindowComponent } from './create-offer.window.component'
import { OfferListComponent } from './offer.list.component'
import { OfferWeekdaySelectionInputComponent } from './offer-weekday.selection.input.component'
import { OfferWeekdayGroupComponent } from './offer-weekday.group.component'
import { OfferDetailRouteComponent } from './offer.detail-route.component'

export * from './offer.list.component'

export const OFFER_COMPONENTS = {
    OfferListComponent,
    OfferDetailRouteComponent,
    CreateOfferWindowComponent,
    OfferWeekdaySelectionInputComponent,
    OfferWeekdayGroupComponent,
    
    ALL: [
        OfferListComponent,
        OfferDetailRouteComponent,
        CreateOfferWindowComponent,
        OfferWeekdaySelectionInputComponent,
        OfferWeekdayGroupComponent
    ]
}