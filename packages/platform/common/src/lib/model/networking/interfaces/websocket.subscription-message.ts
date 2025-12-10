import { WebsocketMessageType } from "../enums"

export interface WebsocketSubcriptionMessage<WebsocketDataType> {
    messageType: WebsocketMessageType
    dataType: WebsocketDataType
    all: boolean
    children: WebsocketDataType[]
    id?: string
}