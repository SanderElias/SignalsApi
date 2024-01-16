import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { firstValueFrom, switchMap, timer } from 'rxjs';
import { DataResult, asyncToSignal } from '../asyncToSignal';
import { httpToDataResult } from '../httpToDataResult';
import { Post, PostsListService } from './post.list.service';

@Injectable({ providedIn: 'root' })
export class PostCrudService {
  #http = inject(HttpClient);
  #postList = inject(PostsListService);
  #url = (id: number) => `https://jsonplaceholder.typicode.com/posts/${id}`;
  // internal signal to hold the data and loading/error state
  #$post = signal<DataResult<Post>>({ loading: true });

  // public signal to the component
  $post = computed(() => this.#$post().data);

  /** handle CRUD  */
  create = async (post: Post) => this.#putPostHandler(post, 'post');
  // note that read isn't async, as it returns the above signal.
  read = (postId: Signal<number>) =>
    asyncToSignal(postId, this.#useHttp, { signalToUse: this.#$post });
  update = async (post: Post) => this.#putPostHandler(post, 'put');
  delete = async (postId: number) => this.#deleteHandler(postId);

  /**
   * below are implementation details. When we go this route we will probably
   * add some helper functions to the library to make this easier.
   */

  #putPostHandler = async (post: Post, method: 'put' | 'post' = 'put') => {
    try {
      if (method === 'post') {
        // we are creating a new post so we need to generate a new id
        post.id = this.#postList.newId(post.id)();
      }
      await firstValueFrom(this.#http[method](this.#url(post.id), post));
    } catch (e) {
      // We need to handle this error in the calling component, as we need to inform the user
      throw new Error(`failed to save post ${post.id}`);
      // todo: decide if we want to put this error in the DataResultSignal?
      /**
       * if we do, we need to decide if we want to keep the old data, or empty it.
       * But I believe that is a decision for the component, not the service.
       */
    }
    if (method === 'post') {
      this.#postList.add(post); // add it to the list.
    }
    this.#$post.set({ loading: false, data: post });
    return true;
  };

  #deleteHandler = async (postId: number) => {
    const result = firstValueFrom(
      this.#http.delete<Post>(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
      ),
    )
      .then(() => true)
      .catch(() => false);
    if (!result) {
      throw new Error(`failed to delete post ${postId}`);
    }
    this.#postList.delete(postId);
    // todo: decide if we want to empty the data in DataResultSignal?
    return true;
  };
  // load data from backend using httpClient

  #useHttp = (id: number) =>
    timer(1000).pipe(
      // simulate a slow network
      switchMap(() => this.#http.get<Post>(this.#url(id))),
      httpToDataResult(),
    );
}
