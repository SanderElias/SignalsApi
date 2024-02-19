import { Injectable, effect, signal } from '@angular/core';

/**
 * a service to keep track of the related input element
 */

@Injectable()
export class SignalEntryService {
  /**
   * a reference to the related input element
   */
  readonly $relatedElement = signal<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
  >(null);
  readonly isPristine = signal(true);

  readonly setCustomValidity = (err: string | string[]) => {
    const elm = this.$relatedElement();
    if (elm) {
      const firstErr = Array.isArray(err) ? err[0] : err;
      elm.setCustomValidity(firstErr);
      elm.reportValidity();
    }
  };

  readonly clearError = () => {
    const elm = this.$relatedElement();
    if (elm) {
      elm.setCustomValidity('');
      elm.reportValidity();
    }
  };

  #pristineEffect = effect(() => {
    const elm = this.$relatedElement();
    if (!elm) return;
    elm.classList.add('pristine');
    const noLongerPristine = () => {
      this.isPristine.set(false);
      elm.classList.remove('pristine');
      elm.removeEventListener('input', noLongerPristine); // can only loose your virginity once
      this.#pristineEffect.destroy(); // no longer needed
    };
    // todo: decide if 'input' is the right event to listen to
    elm.addEventListener('input', noLongerPristine); // trigger on first input
  });
}
