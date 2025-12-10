import { makeTransformEnumPipeSignature } from '@zwp/platform.common'

export enum OfferWeekday {
    SUNDAY = "SUNDAY",
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY"
}

export enum OfferWeekdayLabel {
    SUNDAY = "Sunday",
    MONDAY = "Monday",
    TUESDAY = "Tuesday",
    WEDNESDAY = "Wednesday",
    THURSDAY = "Thursday",
    FRIDAY = "Friday",
    SATURDAY = "Saturday"
}

export enum OfferWeekdayShortLabel {
    SUNDAY = "Sun",
    MONDAY = "Mon",
    TUESDAY = "Tue",
    WEDNESDAY = "Wed",
    THURSDAY = "Thu",
    FRIDAY = "Fri",
    SATURDAY = "Sat"
}

export enum OfferWeekdayInitial {
    SUNDAY = "S",
    MONDAY = "M",
    TUESDAY = "T",
    WEDNESDAY = "W",
    THURSDAY = "T",
    FRIDAY = "F",
    SATURDAY = "S"
}

export const offerWeekdayOrdinal = (weekday: OfferWeekday): number => {
    switch (weekday) {
        case OfferWeekday.SUNDAY: return 0
        case OfferWeekday.MONDAY: return 1
        case OfferWeekday.TUESDAY: return 2
        case OfferWeekday.WEDNESDAY: return 3
        case OfferWeekday.THURSDAY: return 4
        case OfferWeekday.FRIDAY: return 5
        case OfferWeekday.SATURDAY: return 6
    }
}

export const offerWeekdaySort = (a: OfferWeekday, b: OfferWeekday): number => {
    return offerWeekdayOrdinal(a) - offerWeekdayOrdinal(b)
}

export const offerWeekdayLabelPipeSignature = makeTransformEnumPipeSignature(OfferWeekday, OfferWeekdayLabel)
export const offerWeekdayShortLabelPipeSignature = makeTransformEnumPipeSignature(OfferWeekday, OfferWeekdayShortLabel)
export const offerWeekdayInitialPipeSignature = makeTransformEnumPipeSignature(OfferWeekday, OfferWeekdayInitial)