import { WebsocketConnection } from './WebsocketConnection';
import { io, Socket } from 'socket.io-client';

export interface SocketEvents {
    "show": string
}

export class SocketIoWebsocketConnection<T> extends WebsocketConnection<any> {
    socket: Socket | null = null;

    constructor(url: string) {
        super();
        this.socket = io(url);
        this.socket.on('connection', (socket: Socket) => {
            this.socket = socket;
        });
        this.socket.on('error', (e: Error) => {
            throw e;
        });
    }

    close(): void {
    }
}