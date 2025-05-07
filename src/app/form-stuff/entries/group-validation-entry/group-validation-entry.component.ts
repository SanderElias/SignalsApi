import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignalEntryComponent } from '../base-entry/base-entry.component';
import { ShowErrorComponent } from '../show-error/show-error.component';

@Component({
  selector: 'group-validation-entry',
  standalone: true,
  template: ` <input type="text" [placeholder]="$name()" [name]="$name()" /> `,
  styleUrl: './group-validation-entry.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShowErrorComponent],
})
export class GroupValidationEntryComponent<
  T extends { },
> extends SignalEntryComponent<T> {}
