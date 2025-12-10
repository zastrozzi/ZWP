import { Injectable, InjectionToken } from '@angular/core'
import { Model } from '../../model'
import {
    Nullable,
    PaginatedQueryParams,
    PaginatedResponse,
} from '@zwp/platform.common'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export abstract class ProgrammeAPIService {
    abstract refreshProgrammes(parentID:Nullable<string>, parentType:Nullable<string>):Observable<void>
    abstract getProgramme(programmeID:Nullable<string>, parentID: Nullable<string>, parentType: Nullable<string>): Observable<Model.ProgrammeResponse>
    abstract listProgrammes(
        programmeID:Nullable<string>,
        parentID: Nullable<string>,
        parentType:Nullable<string>
    ): Observable<PaginatedResponse<Model.ProgrammeResponse>>
    abstract deleteProgramme(programmeID:string, parentID: string, parentType:Nullable<string>): Observable<void>

    
}

export const ACCOUNT_API_SERVICE = new InjectionToken<ProgrammeAPIService>(
    'rewards-network.affiliate-window.programme.api.service'
)