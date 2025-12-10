import { VATtype } from './vat.type';

export interface VATData {
    exempt: boolean,
    type: VATtype,
    rate: string
}