import { ISO6391Localisation } from '@zwp/platform.common';

export interface FulfilmentParameters {
    toName: string,
    toEmail: string,
    fromName: string,
    fromEmail: string,
    subject: string,
    language: ISO6391Localisation,
    customerId: string,
    toFirstName: string,
    toLastName: string
}