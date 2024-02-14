import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { UserCrudService } from '../../user.crud.service';
import { FormEntryComponent } from '../form-entry/form-entry.component';
import { JsonPipe } from '@angular/common';
import { DateEntryComponent } from '../form-entry/date-entry/date-entry.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormEntryComponent, DateEntryComponent],
  template: `
    <form (submit)="save($entries(), $event)" novalidate>
      <button type="submit">Save</button>
      @for (entry of $entries(); track $index) {
        <app-form-entry [$name]="entry[0]" [($value)]="entry[1]" />
      }
      <app-date-entry [($value)]="bod" [$name]="'bod'" />
    </form>
  `,
  styleUrl: './user-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserCrudService],
})
export class UserFormComponent {
  ucs = inject(UserCrudService);
  userId = input.required<number>();

  $data = this.ucs.read(this.userId);
  $user = computed(() => this.$data().data || {});
  $entries = computed(() => Object.entries(this.$user()));
  bod = new Date()

  save(entries: [string, any][], event: Event) {
    const newData = flattenObj(Object.fromEntries(entries));
    const oldData = flattenObj(this.$user());
    for (let key in newData) {
      if (newData[key] !== oldData[key]) {
        console.log(
          `updated ${key} from "${oldData[key]}" to "${newData[key]}" `,
        );
      }
    }

    event.preventDefault();
  }
}

function flattenObj(
  obj: Record<string, any>,
  parent = '',
  res = {} as Record<string, any>,
) {
  for (let key in obj) {
    let propName = parent ? parent + '.' + key : key;
    if (typeof obj[key] === 'object') {
      flattenObj(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
}
