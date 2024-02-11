import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';

@Component({
  selector: 'app-date-entry',
  standalone: true,
  imports: [DatePipe],
  template: `<label>
    <span>{{ $name() }}:</span>
    <input
      type="date"
      [value]="$value() | date: 'yyyy-MM-dd'"
      (input)="$value.set($any($event).target.valueAsDate)"
    />
  </label> `,
  styleUrl: './date-entry.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateEntryComponent {
  $name = input.required<string>();
  $value = model.required<Date>();
}
