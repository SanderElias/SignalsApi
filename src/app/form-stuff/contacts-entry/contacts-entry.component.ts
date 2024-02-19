import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import type { Contact } from '../form-stuff.component';
import { ContactEntryComponent } from './contact/contact.component';
import { SignalEntryComponent } from '../entries/base-entry/base-entry.component';
import { ShowErrorComponent } from '../entries/show-error/show-error.component';
import { GroupValidationEntryComponent } from "../entries/group-validation-entry/group-validation-entry.component";

@Component({
    selector: 'contacts-entry',
    standalone: true,
    template: `
    <fieldset>
      <legend>Contacts <show-error /></legend>
      <group-validation-entry [$name]="$name()" [$value]="$value" />
      <button type="button" (click)="add()">Add Contact</button>
      @for (contact of $value(); track $index) {
        <contact-entry
          [$name]="'contact[' + $index + ']'"
          [$value]="contact"
          ($valueChange)="update($event, $index)"
        />
      }
    </fieldset>
  `,
    styleUrl: './contacts-entry.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ContactEntryComponent, ShowErrorComponent, GroupValidationEntryComponent]
})
export class ContactsEntryComponent extends SignalEntryComponent<Contact[]> {
  add() {
    this.$value.set([...this.$value(), { name: '', phone: '', email: '' }]);
  }

  $atLeastTwo = this.addValidator((contacts) =>
    contacts && contacts?.length === 2 ? undefined : '2 contacts are required',
  );

  update = (contact: Contact, index: number) => {
    const newContacts = [...this.$value()];
    newContacts[index] = contact;
    this.$value.set(newContacts);
  };
}
