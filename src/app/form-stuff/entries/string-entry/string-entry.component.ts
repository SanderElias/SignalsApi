import {
  ChangeDetectionStrategy,
  Component,
  input,
  model
} from '@angular/core';
import { ShowErrorComponent } from '../show-error/show-error.component';
import { SignalEntryComponent } from '../base-entry/base-entry.component';

@Component({
    selector: 'string-entry',
    imports: [ShowErrorComponent],
    template: `<label>
    <span>{{ $name() }}:<show-error/></span>
    <input
      type="text"
      [name]="$name()"
      [value]="$value()"
      (input)="$value.set($any($event).target.value)"
      required
    />
  </label> `,
    styleUrl: './string-entry.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringEntryComponent extends SignalEntryComponent<string> {
}
