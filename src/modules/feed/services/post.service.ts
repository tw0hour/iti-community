import { Injectable } from '@angular/core';
import { PageModel } from 'src/modules/common/Pagination';
import { FeedStore } from 'src/modules/feed/feed.store';
import { UserStore } from 'src/modules/user/user.store';
import { Post, PostData } from '../post.model';
import { PostCommands } from './post.commands';
import { PostMapper } from './post.mapper';
import { PostQueries } from './post.queries';

@Injectable()
export class PostService {
    constructor(private commands: PostCommands,
        private queries: PostQueries,
        private userStore: UserStore,
        private mapper: PostMapper,
        private store: FeedStore) {
    }

    async create(roomId: string, message: string, file?: File): Promise<PostData> {
        const post = await this.commands.create(roomId, message, file);
        return {
            id: post.id,
            likes: 0,
            roomId,
            comments: [],
            createdAt: new Date().toISOString(),
            createdBy: this.userStore.value.user!,
            liked: false,
            message
        }
    }

    async fetch(roomId: string, page: PageModel): Promise<void> {
        const pageResult = await this.queries.getLast(roomId, page);
        this.store.mutate(state => {
            return {
                ...state,
                posts: pageResult.data.map(d => this.mapper.map(d))
            }
        });
    }

    like(post: Post) {
      // appeler la méthode like sur PostCommands
      this.commands.like(post.roomId, post.id);
    }
}
