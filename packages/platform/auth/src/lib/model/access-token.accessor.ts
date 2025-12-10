import { Injectable, InjectionToken } from "@angular/core";
import { Nullable } from "@zwp/platform.common";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export abstract class AccessTokenAccessor {
    abstract getAccessToken(): Observable<Nullable<string>>
}

export const ACCESS_TOKEN_ACCESSOR = new InjectionToken<AccessTokenAccessor>('platform.auth.access-token.accessor')