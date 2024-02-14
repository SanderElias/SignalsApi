import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RadioEntryComponent } from './radio-entry/radio-entry.component';
import { ObjectEntryComponent } from '../users/form-entry/object-entry/object-entry.component';
import { StringEntryComponent } from "../users/form-entry/string-entry/string-entry.component";
import { ContactsEntryComponent } from './contacts-entry/contacts-entry.component';

const options =  ['address','company','contacts'] as const
type Options = typeof options[number]

@Component({
    selector: 'app-form-stuff',
    standalone: true,
    template: `
  <h3>Form Stuff</h3>
  <form>
    <string-entry [$name]="'test'" [($value)]="$test" />
    <radio-entry name="What to edit" [$options]="options" [($value)]="$selected" />
    @switch ($selected()) {
      @case ('address') { <object-entry [$name]="'adres'" [($value)]="$address" />}
      @case ('company') { <object-entry [$name]="'company'" [($value)]="$address" /> }
      @case ('contacts') { <contacts-entry [$name]="'contacts'" [($value)]="$contacts" />}
    }
  </form>
  `,
    styleUrl: './form-stuff.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RadioEntryComponent, ObjectEntryComponent, StringEntryComponent, ContactsEntryComponent]
})
export class FormStuffComponent {
  options = options as unknown as string[];
  $selected = signal<Options>('contacts')
  $test = signal('test')
  $address = signal({
    streetName: '',
    postalCode: '',
    city: '',
  })
  $company = signal({
    name: '',
    taxId: '',
  })
  $contacts = signal<Contact[]>([
    {
      name: 'Sander',
      phone: '(31) 6 123 456 78',
      email: 'dont@mail.me',
    }
  ])
}


export interface Contact {
  name:string;
  phone:string;
  email:string;
}
