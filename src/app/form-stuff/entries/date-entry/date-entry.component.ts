import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { SignalEntryComponent } from '../base-entry/base-entry.component';
import { ShowErrorComponent } from "../show-error/show-error.component";

@Component({
    selector: 'app-date-entry',
    standalone: true,
    template: `<label>
    <span>{{ $name() }}: <show-error /></span>
    <input
      type="date"
      [name]="$name()"
      [value]="$value() | date: 'yyyy-MM-dd'"
      (input)="$value.set($any($event).target.valueAsDate)"
    />
  </label> `,
    styleUrl: './date-entry.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DatePipe, ShowErrorComponent]
})
export class DateEntryComponent extends SignalEntryComponent<Date>{
}
