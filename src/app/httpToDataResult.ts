import { DataResult } from './asyncToSignal';
import { HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  of,
  map,
  startWith,
  Observable
} from 'rxjs';

/**
 * Helper rxjs operator to convert an http observable to a DataResult
 * Takes an observable that returns a value<T> or an error and
 * returns an observable that returns a DataResult
 * @returns Observable<DataResult<T>>
 */
export const httpToDataResult = () => <T>(source: Observable<T>) => source.pipe(
  catchError((e) => of(e)), // move the error into the stream
  map((data) => {
    // create a DataResult from the data
    const result: DataResult<T> = { loading: false };
    if (data instanceof HttpErrorResponse || data instanceof Error) {
      result.error = data as HttpErrorResponse;
    } else {
      result.data = data;
    }
    return result;
  }),
  startWith({ loading: true } as DataResult<T>)
);
