import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  computed,
  inject,
  input,
} from '@angular/core';
import { UserCrudService } from '../../user.crud.service';

@Component({
    selector: 'tr[\\$userId]',
    imports: [],
    template: `

    @if ($loading()) {
      <td colspan="3">Loading...</td>
    } @else {
      <td><button (click)="edit.emit($userId())">✏️</button></td>
      <td>{{ $user().data?.id }}</td>
      <td>{{ $user().data?.name }}</td>
    }
  `,
    styleUrl: './user-row.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UserCrudService]
})
export class UserRowComponent {
  us = inject(UserCrudService);
  $userId = input.required<number>();
  @Output() edit = new EventEmitter<number>();

  $dataResult = this.us.read(this.$userId);
  $user = computed(() => this.$dataResult());
  $loading = computed(() => this.$user().loading);
}

