import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, switchMap, take } from "rxjs/operators";
import { HTTPMethod, ZWPFlexibleHttpParams, Nullable, Undefinable } from "../model";
import { createHTTPParams, HTTPHeaderFactory, isNull, isUndefined, makeHTTPHeaders } from '../utils'
import { ZWPDebuggableInjectable } from '../decorators/zwp.debuggable.decorator'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({serviceName: 'ZWPHTTPService', options: { skipMethodDebugger: true }})
export class ZWPHTTPService {
    constructor(private http: HttpClient) {
        // super('ZWPHTTPService', { skipMethodDebugger: true })
    }

    authedRequest<ReqType, ResType>(
        accessToken: Observable<Nullable<string>> | string,
        makeAuthHeader: (token: string) => HttpHeaders, 
        method: HTTPMethod, 
        url: string, 
        body: ReqType, 
        additionalHeaders: HttpHeaders | undefined = undefined,
        params: HttpParams | undefined = undefined,
        reportProgress: boolean = false,
        observeEvents: boolean = false
    ): Observable<ResType> {
        return (typeof accessToken === 'string' ? of(accessToken) : accessToken).pipe(
            take(1),
            switchMap((token) => {
                if (!token) {
                    return throwError(() => new Error('No Access Token'))
                }
                let headers = makeAuthHeader(token)
                if (!isUndefined(additionalHeaders)) {
                    additionalHeaders.keys().forEach((key) => { 
                        if (!isNull(additionalHeaders.get(key))) {
                            headers = headers.set(key, additionalHeaders.getAll(key) ?? [])
                        }
                    })
                }
                
                let options: {
                    //
                }
                if (reportProgress && observeEvents) {
                    options = { headers: headers, params: params, reportProgress: reportProgress, observe: 'events' }
                } else {
                    options = { headers: headers, params: params }
                }
                switch (method) {
                    case HTTPMethod.POST:
                        return this.http.post<ResType>(url, body, options).pipe(catchError(this.errorHandler))
                    case HTTPMethod.GET:
                        return this.http.get<ResType>(url, options).pipe(catchError(this.errorHandler))
                    case HTTPMethod.PATCH:
                        return this.http.patch<ResType>(url, body, options).pipe(catchError(this.errorHandler))
                    case HTTPMethod.PUT:
                        return this.http.put<ResType>(url, body, options).pipe(catchError(this.errorHandler))
                    case HTTPMethod.DELETE:
                        return this.http.delete<ResType>(url, { ...options, body: body }).pipe(catchError(this.errorHandler))
                }
            })
        )
    }

    authedRequestWithOptions<ReqType, ResType>(reqOptions: {
        accessToken: Observable<Nullable<string>> | string;
        makeAuthHeader: (token: string) => HttpHeaders;
        method: HTTPMethod;
        url: string;
        body: ReqType;
        additionalHeaders?: HttpHeaders;
        params?: HttpParams;
        reportProgress?: boolean;
        observeEvents?: boolean;
    }): Observable<ResType> {
        return this.authedRequest<ReqType, ResType>(
            reqOptions.accessToken,
            reqOptions.makeAuthHeader,
            reqOptions.method,
            reqOptions.url,
            reqOptions.body,
            reqOptions.additionalHeaders,
            reqOptions.params,
            reqOptions.reportProgress,
            reqOptions.observeEvents
        )
    }

    unauthedRequest<ReqType, ResType>(
        method: HTTPMethod,
        url: string,
        body: ReqType,
        additionalHeaders: HttpHeaders | undefined = undefined,
        params: HttpParams | undefined = undefined
    ): Observable<ResType> {
        const options = { headers: additionalHeaders, params: params }
        switch (method) {
            case HTTPMethod.POST:
                return this.http.post<ResType>(url, body, options).pipe(catchError(this.errorHandler))
            case HTTPMethod.GET:
                return this.http.get<ResType>(url, options).pipe(catchError(this.errorHandler))
            case HTTPMethod.PATCH:
                return this.http.patch<ResType>(url, body, options).pipe(catchError(this.errorHandler))
            case HTTPMethod.PUT:
                return this.http.put<ResType>(url, body, options).pipe(catchError(this.errorHandler))
            case HTTPMethod.DELETE:
                return this.http.delete<ResType>(url, options).pipe(catchError(this.errorHandler))
        }
    }

    request<ResType, ReqType = undefined>(
        method: HTTPMethod, 
        url: string, 
        body: ReqType, 
        headers: HttpHeaders | HTTPHeaderFactory = makeHTTPHeaders,
        params: Undefinable<ZWPFlexibleHttpParams> = undefined
    ): Observable<ResType> {
        const options = { headers: (headers instanceof HttpHeaders) ? headers : headers(), params: createHTTPParams(params) }
        switch (method) {
            case HTTPMethod.POST:
                return this.http.post<ResType>(url, body, options).pipe(catchError(this.errorHandler))
            case HTTPMethod.GET:
                return this.http.get<ResType>(url, options).pipe(catchError(this.errorHandler))
            case HTTPMethod.PATCH:
                return this.http.patch<ResType>(url, body, options).pipe(catchError(this.errorHandler))
            case HTTPMethod.PUT:
                return this.http.put<ResType>(url, body, options).pipe(catchError(this.errorHandler))
            case HTTPMethod.DELETE:
                return this.http.delete<ResType>(url, isUndefined(body) ? options : { ...options, body }).pipe(catchError(this.errorHandler))
        }
    }

    get<ResType>(
        url: string,
        headers: HttpHeaders | HTTPHeaderFactory = makeHTTPHeaders,
        params: Undefinable<ZWPFlexibleHttpParams> = undefined
    ): Observable<ResType> {
        return this.request<ResType, undefined>(HTTPMethod.GET, url, undefined, headers, params)
    }

    post<ResType, ReqType>(
        url: string,
        body: ReqType,
        headers: HttpHeaders | HTTPHeaderFactory = makeHTTPHeaders,
        params: Undefinable<ZWPFlexibleHttpParams> = undefined
    ): Observable<ResType> {
        return this.request<ResType, ReqType>(HTTPMethod.POST, url, body, headers, params)
    }

    put<ResType, ReqType>(
        url: string,
        body: ReqType,
        headers: HttpHeaders | HTTPHeaderFactory = makeHTTPHeaders,
        params: Undefinable<ZWPFlexibleHttpParams> = undefined
    ): Observable<ResType> {
        return this.request<ResType, ReqType>(HTTPMethod.PUT, url, body, headers, params)
    }

    patch<ResType, ReqType>(
        url: string,
        body: ReqType,
        headers: HttpHeaders | HTTPHeaderFactory = makeHTTPHeaders,
        params: Undefinable<ZWPFlexibleHttpParams> = undefined
    ): Observable<ResType> {
        return this.request<ResType, ReqType>(HTTPMethod.PATCH, url, body, headers, params)
    }

    delete<ResType, ReqType = undefined>(
        url: string,
        body: ReqType,
        headers: HttpHeaders | HTTPHeaderFactory = makeHTTPHeaders,
        params: Undefinable<ZWPFlexibleHttpParams> = undefined
    ): Observable<ResType> {
        return this.request<ResType, ReqType>(HTTPMethod.DELETE, url, body, headers, params)
    }

    private errorHandler(error: HttpErrorResponse) {
        // console.log('HTTP Error:', error)
        if (error.error.reason) return throwError(() => new Error(error.error.reason))
        return throwError(() => new Error(error.error))
    }
}