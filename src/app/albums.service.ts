import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  http = inject(HttpClient);
  url = 'https://jsonplaceholder.typicode.com/albums/';
  #$albums = signal([] as AlbumsList[]);
  $albums = this.#$albums.asReadonly();;

  constructor() {
    this.loadAlbums();
  }

  async loadAlbums() {
    const albums = await firstValueFrom(this.http.get<AlbumsList[]>(this.url));
    this.#$albums.set(albums);
  }
}

export interface AlbumsList {
  userId: number;
  id: number;
  title: string;
}
