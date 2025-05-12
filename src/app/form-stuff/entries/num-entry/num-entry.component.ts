import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { SignalEntryComponent } from '../base-entry/base-entry.component';
import { ShowErrorComponent } from "../show-error/show-error.component";

@Component({
    selector: 'app-num-entry',
    template: `
    <label>
      <span>{{ $name() }}: <show-error /></span>
      <input
        type="number"
        [name]="$name()"
        [value]="$value()"
        (input)="$value.set($any($event).target?.valueAsNumber || 0)"
      />
    </label>
  `,
    styleUrl: './num-entry.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ShowErrorComponent]
})
export class NumEntryComponent extends SignalEntryComponent<number>{

}
