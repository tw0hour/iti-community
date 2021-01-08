import { Room } from "../room/room.model";
import { User } from "../user/user.model";

export type NotificationSubject =
    | 'post_liked'
    | 'room_created';

export interface AppNotification<TSubject extends NotificationSubject, TData extends object> {
    timestamp: number;
    subject: TSubject;
    unread: boolean;
    data: TData;
}

export type NewRoomNotification = AppNotification<'room_created', {
    user: User;
    room: Room;
}>;

export type PostLikedNotification = AppNotification<'post_liked', {
    user: User;
    postId: string;
}>

export type AnyNotification = NewRoomNotification | PostLikedNotification;
