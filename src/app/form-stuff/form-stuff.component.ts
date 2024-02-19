import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ObjectEntryComponent } from './entries/object-entry/object-entry.component';
import { RadioEntryComponent } from './entries/radio-entry/radio-entry.component';
import { StringEntryComponent } from './entries/string-entry/string-entry.component';
import { ContactsEntryComponent } from './contacts-entry/contacts-entry.component';

const options =  ['address','company','contacts'] as const
type Options = typeof options[number]

@Component({
    selector: 'app-form-stuff',
    standalone: true,
    template: `
  <h3>Form Stuff</h3>
  <form (submit)="save($event)">
    <button>save</button>
    <string-entry [$name]="'test'" [($value)]="$test" />
    <radio-entry [$name]="'What to edit'" [$options]="options" [($value)]="$selected" />
    @switch ($selected()) {
      @case ('address') { <object-entry [$name]="'adres'" [($value)]="$address" />}
      @case ('company') { <object-entry [$name]="'company'" [($value)]="$company" /> }
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
  $selected = signal<Options>('company')
  $test = signal('test')
  $address = signal({
    streetName: '',
    postalCode: '',
    city: '',
  })
  $company = signal({
    name: 'comp',
    taxId: '1234',
  })
  $contacts = signal<Contact[]>([
    {
      name: 'Sander',
      phone: '(31) 6 123 456 78',
      email: 'dont@mail.me',
    }
  ])

  save(ev:SubmitEvent,){
    console.log('form submitted', ev)
    const form=ev.target as HTMLFormElement
    new FormData(form).forEach((v,k)=>console.log(k,v))
    // console.log('form data',data)
    ev.preventDefault()
  }
}


export interface Contact {
  name:string;
  phone:string;
  email:string;
}
