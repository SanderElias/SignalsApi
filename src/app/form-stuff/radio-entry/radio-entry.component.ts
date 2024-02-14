import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  model,
} from '@angular/core';
import { ShowErrorComponent } from '../../users/form-entry/show-error/show-error.component';

@Component({
  selector: 'radio-entry',
  standalone: true,
  imports: [ShowErrorComponent],
  template: `
    <fieldset>
      <legend>{{ $name() }}</legend>
      @for (option of $options(); track $index) {
        <label>
          <input
          type="radio"
          [name]="$name()"
          [value]="option"
          [checked]="$value() === option"
          (input)="$value.set($any($event).target.value)"
          required
          />
          <span>{{ option }}:</span>
        </label>
      }

    </fieldset>
  `,
  styleUrl: './radio-entry.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioEntryComponent<T> {
  $name = input.required<string>({alias: 'name'});
  $options = input.required<T[]>();
  $value = model.required<T>();

}
