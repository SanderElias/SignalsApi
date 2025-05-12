import { HttpClient, httpResource } from '@angular/common/http';
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
  url = 'https://jsonplaceholder.typicode.com/albums/';

  albumsResource = httpResource<Album[]>(() => this.url);
  $albums = this.albumsResource.value;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}
