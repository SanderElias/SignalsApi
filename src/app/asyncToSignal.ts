import { Signal, WritableSignal, isSignal } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';


/**
 *
 * @param input Signal, promise or observable with the value to feed to the loader function
 * @param loader Function that takes the input value and returns a promise or observable with the result
 * @param {initialValue} Optional initial value for the signal. Defaults to undefined
 * @returns
 */
export function asyncToSignal<I, T>(
  input: Signal<I> | WritableSignal<I> | Promise<I> | Observable<I> | I,
  loader: (start: I) => Observable<T> | Promise<T>,
  { initialValue }: { initialValue?: T } = {},
): Signal<T> {
  const start = (
    isSignal(input) ? toObservable(input) : of(input)
  ) as Observable<I>;
  return toSignal(start.pipe(switchMap(loader)), {
    initialValue: initialValue as T,
  });
}
