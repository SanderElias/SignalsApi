import {
  Directive,
  effect,
  ElementRef,
  inject,
  Input, type ModelSignal
} from '@angular/core';


@Directive({
  selector: '[seSignal], (seSignal), [(seSignal)]',
  standalone: true,
})
export class SignalDirective {
  input = inject(ElementRef).nativeElement as HTMLInputElement;
  @Input() seSignal!: ModelSignal<string>;

  constructor() {
    effect(() => {
      if (this.input.value !== this.seSignal()) {
        this.input.value = this.seSignal();
      }
    });
    this.input.addEventListener('input', (ev:Event) => {
      this.seSignal.set(this.input.value);
      ev.stopPropagation();

    });
  }
}
