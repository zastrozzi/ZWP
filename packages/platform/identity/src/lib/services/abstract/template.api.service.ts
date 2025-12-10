import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class TemplateAPIService {
    
}

export const SOME_API_SERVICE = new InjectionToken<TemplateAPIService>(
    'template.api.service'
)