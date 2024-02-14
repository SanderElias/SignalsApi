import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  model,
} from '@angular/core';
import type { Contact } from '../../form-stuff.component';
import { StringEntryComponent } from '../../../users/form-entry/string-entry/string-entry.component';
import { encapsulateStyle } from '@angular/compiler';

@Component({
  selector: 'contact-entry',
  standalone: true,
  imports: [StringEntryComponent],
  template: `
    <fieldset>
      <string-entry
        [$name]="'Name'"
        [$value]="$value().name"
        ($valueChange)="update('name', $event)"
      />
      <string-entry
        [$name]="'Phone'"
        [$value]="$value().phone"
        ($valueChange)="update('phone', $event)"
      />
      <string-entry
        [$name]="'Email'"
        [$value]="$value().email"
        ($valueChange)="update('email', $event)"
      />
    </fieldset>
  `,
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactEntryComponent {
  $name = input.required<string>();
  $value = model.required<Contact>();

  update<F extends keyof Contact, V extends Contact[F]>(
    fieldName: F,
    value: V,
  ) {
    this.$value.set({ ...this.$value(), [fieldName]: value });
  }
}
