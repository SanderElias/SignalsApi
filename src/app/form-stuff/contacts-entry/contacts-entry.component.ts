import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import type { Contact } from '../form-stuff.component';
import { ContactEntryComponent } from './contact/contact.component';

@Component({
  selector: 'contacts-entry',
  standalone: true,
  imports: [ContactEntryComponent],
  template: `
  <fieldset>
    <legend>Contacts</legend>
    <button type="button" (click)="add()">Add</button>
    @for (contact of $value(); track $index) {
      <contact-entry [$name]="'contact'" [$value]="contact" />
    }
  </fieldset>
  `,
  styleUrl: './contacts-entry.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsEntryComponent {
  $name = input.required<string>();
  $value = model.required<Contact[]>();

  add() {
    this.$value.set([...this.$value(), { name: '', phone: '', email: '' }]);
  }
}
