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

@Component({
  selector: 'show-error',
  standalone: true,
  imports: [],
  template: `* {{ error() }}`,
  styleUrl: './show-error.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowErrorComponent {
  elm = inject(ElementRef).nativeElement as HTMLSpanElement;
  for = input.required<string>();
  error = signal('');

  constructor() {
    // wait for the next render to ensure the form is ready
    afterNextRender(() => {
      const form = this.elm.closest('form') as HTMLFormElement;
      const inp = form?.elements.namedItem(this.for()) as HTMLInputElement|null;
      if (!inp)
        throw new Error(
          `[show-error] could not find related field with "[name]="${this.for()}""`,
        );
      // hook up the input to the error signal
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
        this.elm.style.display = 'none';
      } else {
        this.elm.style.display = 'inline';
      }
    })
  }
}
