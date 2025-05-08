import { ChangeDetectionStrategy, Component, ElementRef, Injector, afterNextRender, inject, input, model, signal, computed, effect } from '@angular/core';
import { SignalEntryService } from './signal-entry.service';
import { SignalEntryDirective } from './signal-entry.directive';

@Component({
  standalone: true,
  template: `<p>do not use this component directly, extend from it</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [SignalEntryDirective],
})
export class SignalEntryComponent<T> {
  #elm = inject(ElementRef).nativeElement as HTMLElement;
  #ses = inject(SignalEntryService);
  #inj = inject(Injector);
  /**
   * Tne name of the input. Mandatory
   * must be unique within the form
   */
  readonly $name = input.required<string>();
  /**
   * a model that is kept in sync with the input value. mandatory
   */
  readonly $value = model.required<T>();
  readonly $validators = signal<ValidatorFn<T>[]>([]);

  readonly addValidator = (validator: ValidatorFn<T>) => {
    this.$validators.update((v) => [...v, validator]);
    return computed(() => validator(this.$value()));
  };

  done = afterNextRender(
    { read: async () => {
        let count = 50;
        const getInp = () => this.#elm.querySelector('input, select, textarea, fieldset') as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLFieldSetElement | null;
        let inp = getInp();
        while (inp == undefined && --count > 0) {
            await new Promise((r) => setTimeout(r, 25));
            inp = getInp();
        }
        if (!inp) {
            throw new Error(`[${this.#elm.tagName}] with name "${this.$name()}" could not locate an "fieldset", "input", "select", or "textarea" element
        for components extending SignalEntryComponent it is mandatory to have such an element in the template
        did you nest one inside an @if{} or @for{} block?`);
        }
        this.#ses.$relatedElement.set(inp);
        this.done.destroy(); // we only need to do this once!
    } },
    ,
  );

  dummy = effect(
    () => {
      const val = this.$value();
      const errors = this.$validators()
        .map((v) => v(val))
        .filter((r): r is string => r !== undefined);
      if (errors.length > 0) {
        this.#ses.setCustomValidity(errors);
      } else {
        this.#ses.clearError();
      }
      errors.length > 0 && console.log(this.$name(), errors.join(', '));
    },
    { allowSignalWrites: true },
  );
}

type ValidatorFn<T> = (value?: T) => string | undefined;
