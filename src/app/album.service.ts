import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Signal, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { asyncToSignal, type DataResult } from './asyncToSignal';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  http = inject(HttpClient);
  url = (id: number) =>
    `https://jsonplaceholder.typicode.com/albums/${id}/photos`;
  picUrl = (id: number) => `https://picsum.photos/id/${id}/150`;

  #load = async (id: number | undefined): Promise<DataResult<string[]>> => {
    if (id === undefined) {
      return {
        loading: false,
        error: new HttpErrorResponse({ error: 'no id' }),
      };
    }
    const url = this.url(id);
    try {
      const photos = await firstValueFrom(this.http.get<Photos[]>(url));
      return { loading: false, data: photos.map((p) => this.picUrl(p.id)) };
    } catch (e) {
      return { loading: false, error: e as HttpErrorResponse };
    }
  };

  load = (id: Signal<number | undefined>) => asyncToSignal(id, this.#load);
}

export interface Photos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
