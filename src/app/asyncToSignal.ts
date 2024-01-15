import { HttpErrorResponse } from '@angular/common/http';
import { Signal, WritableSignal, isSignal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  Observable,
  of,
  startWith,
  switchMap,
  take
} from 'rxjs';

/**
 *
 * @param input Signal, promise or observable with the value to feed to the loader function
 * @param loader Function that takes the input value and returns a promise or observable with the result
 * @param {initialValue} Optional initial value for the signal. Defaults to undefined
 * @returns
 */
export function asyncToSignal<I, T>(
  input: Signal<I> | WritableSignal<I>,
  loader: (start: I) => Observable<DataResult<T>> | Promise<DataResult<T>>,
  { initialValue }: { initialValue?: T } = {},
): Signal<DataResult<T>> {
  const startData: DataResult<T> =
    initialValue !== undefined
      ? { loading: false, data: initialValue }
      : { loading: true };
  try {
    const start = (
      isSignal(input) ? toObservable(input) : of(input)
    ) as Observable<I>;
    return toSignal(
      start.pipe(switchMap(loader)),
      {
        initialValue: startData,
      },
    );
  } catch (e) {
    const { message } = e as Error;
    if (message.startsWith('NG0203')) {
      throw new Error(
        'asyncToSignal: Must be run inside the injection context',
      );
    } else {
      throw e;
    }
  }
}

export interface DataResult<T> {
  loading: boolean;
  data?: T;
  error?: HttpErrorResponse;
}
