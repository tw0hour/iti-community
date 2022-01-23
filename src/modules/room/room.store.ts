import { Injectable } from '@angular/core';
import { Store } from '../common/Store';
import { RoomState } from './room.state';

@Injectable()
export class RoomStore extends Store<RoomState> {
    constructor() {
        super({
            rooms: []
        });
    }
}