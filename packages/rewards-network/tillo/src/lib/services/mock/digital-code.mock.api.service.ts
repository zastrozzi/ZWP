import { Injectable } from '@angular/core'
import { Model } from '../../model'
import { ZWPDebuggableInjectable, Nullable, PaginatedQueryParams, PaginatedResponse } from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { TilloDigitalCodeAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'TilloDigitalCodeMockAPIService', options: { skipMethodDebugger: true } })
export class TilloDigitalCodeMockAPIService implements TilloDigitalCodeAPIService {
    getDigitalCode(
        _digitalCodeId: string
    ): Observable<Model.DigitalGiftCodeResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }

    listDigitalCodes(
        _storeCardId: Nullable<string>,
        _pagination: Nullable<Partial<PaginatedQueryParams<Model.DigitalGiftCodeResponse>>>,
        _filters: Nullable<Partial<Model.Filters.DigitalCodeFilters>>
    ): Observable<PaginatedResponse<Model.DigitalGiftCodeResponse>> {
        return throwError(() => new Error('Method not implemented.'))
    }

    deleteDigitalCode(
        _digitalCodeId: string
    ): Observable<void> {
        return throwError(() => new Error('Method not implemented.'))
    }

    checkDigitalCodeStatus(_digitalCodeId: string): Observable<Model.DigitalGiftCodeResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }

    checkDigitalCodeBalance(_digitalCodeId: string): Observable<Model.DigitalGiftCodeResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }

    cancelDigitalCode(_digitalCodeId: string): Observable<Model.DigitalGiftCodeResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }

    cancelDigitalCodeURL(_digitalCodeId: string): Observable<Model.DigitalGiftCodeResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }

    topupDigitalCode(_digitalCodeId: string): Observable<Model.DigitalGiftCodeResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }

    checkStatusForReference(_referenceId: string): Observable<Model.DigitalGiftCodeResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }

    orderDigitalCode(
        _brandId: string,
        _request: Model.OrderCodeRequest
    ): Observable<Model.DigitalGiftCodeResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }

    issueDigitalCode(
        _brandId: string,
        _request: Model.IssueCodeRequest
    ): Observable<Model.DigitalGiftCodeResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }

    issueDigitalCodeWithPersonlisation(
        _brandId: Nullable<string>,
        _request: Model.IssueCodeWithPersonalisationRequest
    ): Observable<Model.DigitalGiftCodeResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }

    issueDigitalCodeTilloFulfilment(
        _brandId: Nullable<string>,
        _request: Model.IssueCodeTilloFulfilmentRequest
    ): Observable<Model.DigitalGiftCodeResponse> {
        return throwError(() => new Error('Method not implemented.'))
    }
}
