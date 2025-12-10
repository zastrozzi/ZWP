
export interface WebsocketUnsubscriptionMessage<WebsocketDataType> {
    dataType: WebsocketDataType
    all: boolean
    id?: string
}
