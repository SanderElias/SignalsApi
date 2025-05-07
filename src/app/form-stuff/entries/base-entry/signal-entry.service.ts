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
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement| HTMLFieldSetElement | null
  >(null);
  readonly #isPristine = signal(true);

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

  readonly markDirty = () => {
    const elm = this.$relatedElement();
    if (elm) {
      elm.classList.remove('pristine');
      this.#isPristine.set(false);
      this.#pristineEffect?.destroy();
      this.#pristineEffect = undefined;
    }
  };

  #pristineEffect? = effect(
    () => {
      const elm = this.$relatedElement();
      if (!elm) return;
      elm.classList.add('pristine');
      const noLongerPristine = () => {
        elm.removeEventListener('input', noLongerPristine); // can only loose your virginity once
        this.markDirty();
      };
      // todo: decide if 'input' is the right event to listen to
      elm.addEventListener('input', noLongerPristine); // trigger on first input
    },
    {
      allowSignalWrites: true,
    },
  );
}
