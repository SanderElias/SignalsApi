import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

@Component({
  selector: 'app-num-entry',
  standalone: true,
  imports: [],
  template: `
    <label>
      <span>{{ $name() }}:</span>
      <input
        type="number"
        [name]="$name()"
        [value]="$value()"
        (input)="$value.set($any($event).target?.valueAsNumber || 0)"
      />
    </label>
  `,
  styleUrl: './num-entry.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumEntryComponent {
  $name = input.required<string>();
  $value = model.required<number>();
}
