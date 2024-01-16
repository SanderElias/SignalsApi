import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  Observable,
  catchError,
  firstValueFrom,
  map,
  of,
  startWith,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { DataResult, asyncToSignal } from '../asyncToSignal';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
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

  /** handle CRUD  */
  create = async (post: Post) => this.#putPostHandler(post, 'post');
  // note that read isn't async, as it returns a DataResult that includes loading state.
  read = (postId: Signal<number>) => asyncToSignal(postId, this.#useHttp);
  update = async (post: Post) => this.#putPostHandler(post, 'put');
  delete = async (postId: number) => this.#deleteHandler(postId);

  /** load data from local cache */
  load = (postId: Signal<number>) =>
    computed(() => this.#postCache().get(+postId())?.());

  /** generate a new id, the stupid way! */
  newId = (id = 0) =>
    computed(() =>
      this.list().reduce((id, next) => Math.max(id, next + 1), id),
    );

  /**
   * below are implementation details. When we go this route we will probably
   * add some helper functions to the library to make this easier.
   */

  #putPostHandler = async (post: Post, method: 'put' | 'post' = 'put') => {
    try {
      await firstValueFrom(this.http[method](`${this.url}/${post.id}`, post));
    } catch (e) {
      // We need to handle this error in the calling component, as we need to inform the user
      throw new Error(`failed to save post ${post.id}`);
    }
    // only update local cache if the server update was successful
    const cache = this.#postCache();
    const oldPost = cache.get(+post.id);
    if (oldPost) {
      oldPost.set(post);
    } else {
      this.#postCache.update((cache) => {
        cache.set(+post.id, signal(post));
        return cache;
      });
    }
    return true;
  };

  #deleteHandler = async (postId: number) => {
    const result = firstValueFrom(
      this.http.delete<Post>(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
      ),
    )
      .then(() => true)
      .catch(() => false);
    if (!result) {
      throw new Error(`failed to delete post ${postId}`);
    }
    this.#postCache.update((cache) => {
      cache.delete(postId);
      return cache;
    });
    return true;
  };

  // load date from backend using fetch
  #useFetch = async (id: number) => {
    try {
      const result = await fetch(`${this.url}/${id}`);
      const data = (await result.json()) as Post;
      console.log({ data });
      return data;
    } catch (e) {
      console.error(e);
      return {} as Post;
    }
  };

  // load data from backend using httpClient
  #useHttp = (id: number) =>
    timer(1000).pipe(
      // simulate a slow network
      switchMap(() => this.http.get<Post>(`${this.url}/${id}`)),
      catchError((e) => {
        console.dir(e);
        return of(e); // return the error as data
      }),
      map((data) => {
        if (data instanceof HttpErrorResponse || data instanceof Error) {
          return {
            loading: false,
            error: data
          };
        }
        return {
          loading: false,
          data,
        };
      }),
      startWith({loading:true}),
    ) as Observable<DataResult<Post>>;
}


export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
