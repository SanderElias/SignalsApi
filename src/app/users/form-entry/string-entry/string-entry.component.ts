import {
  ChangeDetectionStrategy,
  Component,
  input,
  model
} from '@angular/core';
import { ShowErrorComponent } from '../show-error/show-error.component';

@Component({
  selector: 'string-entry',
  standalone: true,
  imports: [ShowErrorComponent],
  template: `<label>
    <span>{{ $name() }}:<show-error [for]="$name()"/></span>
    <input
      type="text"
      [name]="$name()"
      [value]="$value()"
      (input)="$value.set($any($event).target.value)"
      required
    />
  </label> `,
  styleUrl: './string-entry.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StringEntryComponent {
  $name = input.required<string>();
  $value = model.required<string>();
}
