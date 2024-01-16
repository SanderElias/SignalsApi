import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  http = inject(HttpClient);
  url = 'https://jsonplaceholder.typicode.com/albums/';
  #$albums = signal([] as Album[]);
  $albums = this.#$albums.asReadonly();

  constructor() {
    this.loadAlbums();
  }

  async loadAlbums() {
    const albums = await firstValueFrom(this.http.get<Album[]>(this.url));
    this.#$albums.set(albums);
  }
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}
