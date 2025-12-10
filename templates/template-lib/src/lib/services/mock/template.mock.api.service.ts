import { Injectable } from '@angular/core'
import { Model } from '../../model'
import {
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { TemplateAPIService } from '../abstract'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'TemplateMockAPIService',
    options: { skipMethodDebugger: true },
})
export class TemplateMockAPIService implements TemplateAPIService {
    
}