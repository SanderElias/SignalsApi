import {
  ChangeDetectionStrategy,
  Component,
  input,
  model
} from '@angular/core';

@Component({
  selector: 'app-string-entry',
  standalone: true,
  template: `<label>
    <span>{{ $name() }}:</span>
    <input
      type="text"
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
