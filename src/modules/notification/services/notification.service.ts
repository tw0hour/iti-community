import { Injectable } from "@angular/core";
import { NotificationStore } from "../notification.store";

@Injectable()
export class NotificationService {
    constructor(private store: NotificationStore) {

    }

    markAsViewed() {
        this.store.mutate(s => {
            return {
                ...s,
                unread: 0
            };
        });
    }
}
