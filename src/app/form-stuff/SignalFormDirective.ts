import { Directive, ElementRef, afterNextRender, inject } from '@angular/core';

@Directive({
  selector: 'form',
  standalone: true,
})
export class SignalFormDirective {
  form = inject(ElementRef).nativeElement as HTMLFormElement;

  dummy = afterNextRender(() => {
    const form = this.form;
    //prevent the browser from showing default error bubble / hint
    // form.addEventListener('invalid', (e) => e.preventDefault(), true);
  });
}
