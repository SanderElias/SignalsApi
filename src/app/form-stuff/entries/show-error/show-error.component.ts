import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { SignalEntryService } from '../base-entry/signal-entry.service';

@Component({
  selector: 'show-error',
  standalone: true,
  imports: [],
  template: `* {{ error() }}`,
  styleUrl: './show-error.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowErrorComponent {
  #ses = inject(SignalEntryService);
  #elm = inject(ElementRef).nativeElement as HTMLSpanElement;

  error = signal('');

  constructor() {
    let org:
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
      | HTMLFieldSetElement
      | undefined;
    effect(() => {
      const inp = this.#ses.$relatedElement();
      if (!inp || inp === org) {
        // prevent double or premature binding
        return;
      }
      org = inp;
      // prevent default validation message title/tooltip
      inp.addEventListener('invalid', (e) => e.preventDefault(), true);
      inp.addEventListener('change', (e) => {
        console.log('change', inp.validity.valid);
        if (inp.validity.valid) {
          this.error.set('');
        } else {
          this.error.set(inp.validationMessage || 'Invalid input');
        }
      });
    });

    effect(() => {
      if (this.error() === '') {
        this.#elm.style.display = 'none';
      } else {
        this.#elm.style.display = 'inline';
      }
    });
  }
}

