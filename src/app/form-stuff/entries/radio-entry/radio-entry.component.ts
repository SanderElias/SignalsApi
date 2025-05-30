import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SignalEntryComponent } from '../base-entry/base-entry.component';
import { ShowErrorComponent } from '../show-error/show-error.component';

@Component({
  selector: 'radio-entry',
  imports: [ShowErrorComponent],
  template: `
    <fieldset>
      <legend>{{ $name() }} <show-error /></legend>
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
export class RadioEntryComponent<T> extends SignalEntryComponent<T> {
  $options = input.required<T[]>();
}
