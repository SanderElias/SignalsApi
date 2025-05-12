import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignalEntryComponent } from '../base-entry/base-entry.component';

@Component({
  selector: 'group-validation-entry',
  template: ` <input type="text" [placeholder]="$name()" [name]="$name()" /> `,
  styleUrl: './group-validation-entry.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupValidationEntryComponent<
  T extends {},
> extends SignalEntryComponent<T> {}
