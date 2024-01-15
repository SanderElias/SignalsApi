import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject } from '@angular/core';
import { Observable, catchError, filter, firstValueFrom, map, of, startWith, switchMap } from 'rxjs';
import { DataResult, asyncToSignal } from './asyncToSignal';

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
      catchError((e) => {
        console.dir(e);
        return of(e); // return the error as data
      }),
      map((data) => {
        if (data instanceof Error) {
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
    ) as Observable<DataResult<Photos[]>>;

  load = (id: Signal<number | undefined>) => asyncToSignal(id, this.#load);
}








export interface Photos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
