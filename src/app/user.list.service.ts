import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from './user-interface';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  #http = inject(HttpClient);
  #$userList = signal([] as number[]);
  $userList = this.#$userList.asReadonly();

  loadList = async () => {
    const data = await firstValueFrom(
      this.#http.get<User[]>('https://jsonplaceholder.typicode.com/users'),
    );
    this.#$userList.set(data.map((user) => +user.id));
  };

  constructor() {
    this.loadList();
  }
}


