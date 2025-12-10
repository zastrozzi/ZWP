import { BrandAssets } from '../enums/brand.assets';
import { BarcodeType } from '../common/barcode.type';
import { RedemptionMethod } from '../common/redemption-method.type';

export interface BrandInformationDetails {
    assets: BrandAssets,
    barcode: BarcodeType,
    description: string,    
    balanceEnquiryUrl: string,
    faqUrl: string,
    expiry: string,
    redemptionInstructionsUrl: string,
    redemptionMethods: RedemptionMethod[],
    termsAndConditionsCopy: string,
    termsAndConditionsUrl: string,
    websiteUrl: string
}