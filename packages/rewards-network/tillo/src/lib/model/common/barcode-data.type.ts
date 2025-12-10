import { BarcodeType } from './barcode.type';

export interface BarcodeData {
    type: BarcodeType,
    string: string,
    url: string
}