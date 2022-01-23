import { Injectable } from '@angular/core';
import { Store } from '../common/Store';
import { NotificationState } from './notification.state';

@Injectable()
export class NotificationStore extends Store<NotificationState> {
    constructor() {
        super({
            unread: 0
        });
    }
}