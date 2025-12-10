import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import { Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class TilloDigitalCodeAPIService {
    abstract getDigitalCode(digitalCodeId: string): Observable<Model.DigitalGiftCodeResponse>
    abstract listDigitalCodes(
        storeCardId: Nullable<string>,
        pagination: Nullable<Partial<PaginatedQueryParams<Model.DigitalGiftCodeResponse>>>,
        filters: Nullable<Partial<Model.Filters.DigitalCodeFilters>>
    ): Observable<PaginatedResponse<Model.DigitalGiftCodeResponse>>
    abstract deleteDigitalCode(digitalCodeId: string): Observable<void>
    abstract checkDigitalCodeStatus(digitalCodeId: string): Observable<Model.DigitalGiftCodeResponse>
    abstract checkDigitalCodeBalance(digitalCodeId: string): Observable<Model.DigitalGiftCodeResponse>

    abstract cancelDigitalCode(digitalCodeId: string): Observable<Model.DigitalGiftCodeResponse>
    abstract cancelDigitalCodeURL(digitalCodeId: string): Observable<Model.DigitalGiftCodeResponse>
    abstract topupDigitalCode(digitalCodeId: string): Observable<Model.DigitalGiftCodeResponse>

    abstract checkStatusForReference(referenceId: string): Observable<Model.DigitalGiftCodeResponse>

    abstract orderDigitalCode(
        brandId: string,
        request: Model.OrderCodeRequest
    ): Observable<Model.DigitalGiftCodeResponse>
    abstract issueDigitalCode(
        brandId: string,
        request: Model.IssueCodeRequest
    ): Observable<Model.DigitalGiftCodeResponse>

    abstract issueDigitalCodeWithPersonlisation(
        brandId: Nullable<string>,
        request: Model.IssueCodeWithPersonalisationRequest
    ): Observable<Model.DigitalGiftCodeResponse>
    abstract issueDigitalCodeTilloFulfilment(
        brandId: Nullable<string>,
        request: Model.IssueCodeTilloFulfilmentRequest
    ): Observable<Model.DigitalGiftCodeResponse>
}

export const DIGITAL_CODE_API_SERVICE = new InjectionToken<TilloDigitalCodeAPIService>(
    'rewards-network.tillo.digital-code.api.service'
)
