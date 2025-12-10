import { Injectable } from '@angular/core'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { ZWPDebuggableInjectable } from '../decorators'
import { WebsocketSendMessage, WebsocketSubcriptionMessage } from '../model'

@Injectable({ providedIn: 'root' })
@ZWPDebuggableInjectable({ serviceName: 'ZWPWebSocketService', options: { skipMethodDebugger: true } })
export class ZWPWebSocketService {
    private socket$: WebSocketSubject<any> | undefined

    constructor() {
        // super('ZWPWebSocketService')
    }

    public connect(): WebSocketSubject<any> | undefined {
        return this.socket$
    }

    public connectToUrlWithData(url: string, clientId: string, additionalData: object): WebSocketSubject<any> {
        if (!this.socket$ || this.socket$.closed) {
            this.socket$ = webSocket({
                url: url,
                deserializer: async ({ data }) => {
                    return blobToJson(data).then((obj) => {
                        return obj
                    })
                }
            })
            const data = { clientId: clientId, data: { connect: true, ...additionalData } }
            this.socket$.next(data)
        }
        return this.socket$
    }

    public subscribeToWebsocket<WebsocketDataType>(message: WebsocketSendMessage<WebsocketSubcriptionMessage<WebsocketDataType>>) {
        this.socket$?.next(message)
    }

    public unsubscribeFromWebsocket<WebsocketDataType>(message: WebsocketSendMessage<WebsocketSubcriptionMessage<WebsocketDataType>>) {
        this.socket$?.next(message)
    }

    public dataUpdates$() {
        return this.connect()?.asObservable()
    }

    closeConnection() {
        this.connect()?.complete()
    }

    sendMessage(message: any) {
        this.socket$?.next(message)
    }
}

function blobToJson(blob: Blob) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
        const fr = new FileReader()
        fr.onload = () => {
            resolve(JSON.parse(fr.result as string))
        }
        fr.onerror = () => {
            reject(fr.error)
        }
        fr.readAsText(blob)
    })
}
