import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DateEntryComponent } from '../../form-stuff/entries/date-entry/date-entry.component';
import { FormEntryComponent } from '../../form-stuff/entries/form-entry/form-entry.component';
import { UserCrudService } from '../../user.crud.service';
import type { User } from '../../user-interface';
import { SpinnerComponent } from '../../utils/spinner/spinner.component';
import { flattenObject } from '../../utils/objects/flatten-object';

@Component({
    selector: 'app-user-form',
    template: `
    @if ($data().loading) {
      <app-spinner style="--spinner-size:250px" />
    } @else {
      <form (submit)="save($entries(), $event)">
        <button novalidate type="submit">Save</button>
        @for (entry of $entries(); track $index) {
          <app-form-entry [$name]="entry[0]" [($value)]="entry[1]" />
        }
        <app-date-entry [($value)]="bod" [$name]="'bod'" />
      </form>
    }
  `,
    styleUrl: './user-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UserCrudService],
    imports: [FormEntryComponent, DateEntryComponent, SpinnerComponent]
})
export class UserFormComponent {
  ucs = inject(UserCrudService);
  userId = input.required<number>();

  $data = this.ucs.read(this.userId);
  $user = computed(() => this.$data().data || {});
  $entries = computed(() => Object.entries(this.$user()));
  $busy = computed(() => this.$data().loading);
  bod = new Date();

  async save(entries: [string, any][], event: Event) {
    const saveData = Object.fromEntries(entries) as User;
    await this.ucs.update(saveData);
    const newData = flattenObject(saveData);
    const oldData = flattenObject(this.$user());
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


