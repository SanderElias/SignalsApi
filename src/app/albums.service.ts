import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * This is a sample of a service that loads cache-able data from a server.
 * It fetched the data on initialization, and keeps it in memory.
 * When you have this situation, you can use this service as a template.
 */
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
