import { BehaviorSubject, Observable } from 'rxjs';

export enum WebsocketConnectionState {
    CONNECTING,
    OPEN,
    CLOSING,
    CLOSED
}

export abstract class WebsocketConnection<T> {
    public readonly url: string;
    public readonly state: WebsocketConnectionState;

    constructor() {
    }

    protected newMessage(message: T) {
    }

    abstract close(): void;
}
