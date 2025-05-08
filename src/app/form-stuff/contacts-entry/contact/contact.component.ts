import {
  ChangeDetectionStrategy,
  Component,
  input,
  model
} from '@angular/core';
import { StringEntryComponent } from '../../entries/string-entry/string-entry.component';
import type { Contact } from '../../form-stuff.component';



@Component({
    selector: 'contact-entry',
    imports: [StringEntryComponent],
    template: `
    <fieldset>
      <string-entry
        [$name]="$name()+'.name'"
        [$value]="$value().name"
        ($valueChange)="update('name', $event)"
      />
      <string-entry
        [$name]="$name()+'.phone'"
        [$value]="$value().phone"
        ($valueChange)="update('phone', $event)"
      />
      <string-entry
        [$name]="$name()+'.email'"
        [$value]="$value().email"
        ($valueChange)="update('email', $event)"
      />
    </fieldset>
  `,
    styleUrl: './contact.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
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
