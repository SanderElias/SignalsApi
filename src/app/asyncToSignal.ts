import { HttpErrorResponse } from '@angular/common/http';
import {
  CreateComputedOptions,
  DestroyRef,
  Signal,
  WritableSignal,
  inject,
  isSignal,
  signal,
} from '@angular/core';
import { ToObservableOptions, toObservable } from '@angular/core/rxjs-interop';
import { Observable, of, switchMap } from 'rxjs';

// This is a work in progress. while ready for production,
// we might want to add more features, or even stray away from
// Angular injection. (which is now required for this to work)
// this could be done once [this](https://github.com/tc39/proposal-explicit-resource-management?tab=readme-ov-file)
// progresses to a more mature state.

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
  options: AsyncToSignalOptions<T> = {},
): Signal<DataResult<T>> {
  try {
    inject(DestroyRef).onDestroy(() => {
      unSub.unsubscribe();
    });
    const outputSignal =
      options.signalToUse ?? signal({ loading: true } as DataResult<T>);
    const startData: DataResult<T> =
      options.initialValue !== undefined
        ? { loading: false, data: options.initialValue }
        : { loading: true };
    const start = (
      isSignal(input) ? toObservable(input) : of(input)
    ) as Observable<I>;
    const unSub = start.pipe(switchMap(loader)).subscribe({
      next: (data) => outputSignal.set(data),
      error: (error) => outputSignal.set({ loading: false, error }),
      complete: () => undefined, // todo: decide if we want to handle completion
    });
    return outputSignal.asReadonly();
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

type AsyncToSignalOptions<T> = {
  initialValue?: T;
  signalToUse?: WritableSignal<DataResult<T>>;
} & CreateComputedOptions<T> &
  ToObservableOptions;

export interface DataResult<T> {
  loading: boolean;
  data?: T;
  error?: HttpErrorResponse;
}
