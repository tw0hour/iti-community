import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Store } from '../common/Store';
import { FeedState } from './feed.state';

export class FeedStore extends Store<FeedState> {
    roomId$: Observable<string | undefined>;
    constructor() {
        super({
            posts: []
        });
        this.roomId$ = this.get(s => s.roomId).pipe(distinctUntilChanged());
    }
}
