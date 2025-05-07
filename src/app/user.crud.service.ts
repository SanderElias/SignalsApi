import { Injectable, inject, signal, type Signal } from '@angular/core';
import type { User } from './user-interface';
import { asyncToSignal, type DataResult } from './asyncToSignal';
import { HttpClient } from '@angular/common/http';
import { httpToDataResult } from './httpToDataResult';
import { delay } from 'rxjs';

/**
 * Provide this service in the top component where you
 * need to load the user. This service will load the user
 */
@Injectable()
export class UserCrudService {
  $http = inject(HttpClient);
  #$user = signal<DataResult<User>>({ loading: true });
  $user = this.#$user.asReadonly();

  read = (id: Signal<number>) =>
    asyncToSignal(id, this.#loadUser, { signalToUse: this.#$user });

  update = async (user: User) => {
    this.#$user.set({ loading: true });
    await new Promise((resolve) => setTimeout(resolve, 2000)); // mimic saving to backend
    // here I update the user with the results of a real backend. In this case, I just return the same user
    // remember that the result can also be an error, the thing calling this method should handle that!
    this.#$user.set({ loading: false, data: user });
  }

  #loadUser = (id: number) =>
    this.$http
      .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
      .pipe(
        httpToDataResult());
}
