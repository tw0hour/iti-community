import { Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { Socket } from 'socket.io-client';

export class WebSocketTopic<T> {
    public readonly topic: string;
    public readonly message$: Observable<T>;

    private readonly _subject: Subject<T>;

    constructor(topic: string, io: Socket) {
        this.topic = topic;
        this._subject = new Subject<T>();
        this.message$ = this._subject.asObservable().pipe(share());
        
        io.on(topic, (messsage: T) => {
            this.publish(messsage);
        });
    }

    protected publish(message: T) {
        this._subject.next(message);
    }
}