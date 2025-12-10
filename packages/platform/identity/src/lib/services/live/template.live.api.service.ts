import { Injectable, inject } from '@angular/core'
import { Model } from '../../model'
import {
    HTTPMethod,
    isNull,
    ZWPDebuggableInjectable,
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
    serialisePaginatedQueryParams,
} from '@zwp/platform.common'
import { Observable, throwError } from 'rxjs'
import { TemplateAPIService } from '../abstract'
import { APIRoutes } from '../../api-routes'
import { TEMPLATE_API_CONFIG } from '../../config'
import { Facades } from '../../+state/facades'
import { PlatformAuth } from '@zwp/platform.auth'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({
    serviceName: 'TemplateLiveAPIService',
    options: { skipMethodDebugger: true },
})
export class TemplateLiveAPIService
    extends PlatformAuth.AuthedAPIService
    implements TemplateAPIService
{
    private config = inject(TEMPLATE_API_CONFIG)
}