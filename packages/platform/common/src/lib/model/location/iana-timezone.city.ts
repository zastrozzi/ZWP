import { ZWPIANATimezone } from './iana.timezone'

export const ZWPIANATimezoneCity = (timezone: ZWPIANATimezone): string => {
    const timezoneParts = timezone.split('/')
    return timezoneParts.length > 0 ? timezoneParts[timezoneParts.length - 1] : timezone
}