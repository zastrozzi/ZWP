import { Injectable } from '@angular/core'
import { ZWPDebuggableInjectable } from '@zwp/platform.common'
import { Observable, tap } from 'rxjs'
import { CDPUsers } from '@zwp/cdp.users'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'LoggingInterceptor', options: { skipMethodDebugger: true } })
export class LoggingInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        console.log('Outgoing HTTP Request', request)
        return next.handle(request).pipe(
            tap((event) => {
                console.log('Incoming HTTP Response', event)
            })
        )
    }
}