import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { UserListService } from '../user.list.service';
import { UserRowComponent } from './user-row/user-row.component';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-users',
  standalone: true,
  template: `
    <h2>Users</h2>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>id</th>
          <th>name</th>
        </tr>
      </thead>
      <tbody>
        @for (userId of $list(); track $index) {
          <tr [$userId]="userId" (edit)="$selected.set(userId)"></tr>
        }
      </tbody>
    </table>
    @if ($selected() !== undefined) {
      <app-user-form [userId]="$selected()!"></app-user-form>
    }
  `,
  styleUrl: './users.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserRowComponent, UserFormComponent],
})
export class UsersComponent {
  uls = inject(UserListService);
  $list = this.uls.$userList;
  $selected = signal<number | undefined>(undefined);
}
