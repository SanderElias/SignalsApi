import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject } from '@angular/core';
import { filter, map, of, switchMap } from 'rxjs';
import { asyncToSignal } from './asyncToSignal';
import { httpToDataResult } from './httpToDataResult';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  http = inject(HttpClient);
  url = (id: number) =>
    `https://jsonplaceholder.typicode.com/albums/${id}/photos`;

  /**
   * private Helper function to load the photos for a given album id
   * @param id to load
   * @returns observable with the photos
   */
  #load = (id: number | undefined) =>
    of(id).pipe(
      filter((id): id is number => !!(id && id > 0)),
      map((id) => this.url(id)),
      switchMap((url) => this.http.get<Photos[]>(url)),
      httpToDataResult(),
    );

  load = (id: Signal<number | undefined>) => asyncToSignal(id, this.#load);
}

export interface Photos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
