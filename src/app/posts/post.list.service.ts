import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  WritableSignal,
  computed,
  inject,
  signal
} from '@angular/core';
import {
  firstValueFrom
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsListService {
  url = 'https://jsonplaceholder.typicode.com/posts' as const;
  http = inject(HttpClient);
  /**
   * this keeps a copy of the posts in memory.
   * So, it duplicates the state that is on the server.
   * That is only a good idea for low volume, low updated, data.
   */
  #postCache = signal(new Map<number, WritableSignal<Post>>(), {
    equal: (a, b) => false, // always update, allow mutable data
  });
  /** load the list of data after initialization, and put it in the cache. */
  #postProm = firstValueFrom(this.http.get<Post[]>(this.url)).then((posts) => {
    this.#postCache.update((cache) => {
      posts.forEach((post) => cache.set(+post.id, signal(post)));
      return cache;
    });
  });

  /** get an list of available Id's from the cache. */
  list = computed(() => [...this.#postCache().keys()]);

  delete = async (id: number) => {
    await this.#postProm;
    this.#postCache.update((cache) => {
      cache.delete(id);
      return cache;
    });
  };

  add = (post: Post) =>
    this.#postCache.update((cache) => {
      cache.set(post.id, signal(post));
      return cache;
    });

  /** generate a new id, the stupid way! */
  newId = (id = 0) =>
    computed(() =>
      this.list().reduce((id, next) => Math.max(id, next + 1), id),
    );
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
