import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  input,
  signal
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
    effect(() => {
      const inp = this.#ses.$relatedElement();
      if (!inp) {
        return;
      }
      inp.addEventListener('input', () => {
        if (!inp.validity.valid) {
          this.error.set(inp.validationMessage || 'Invalid input')
        } else {
          this.error.set('')
        }
      })
    });

    effect(() => {
      if (this.error() === '') {
        this.#elm.style.display = 'none';
      } else {
        console.log('error is empty')
        this.#elm.style.display = 'inline';
      }
    })
  }
}
