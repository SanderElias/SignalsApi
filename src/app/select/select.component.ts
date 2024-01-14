import { Component, Input, WritableSignal, inject } from '@angular/core';
import { AlbumsService } from '../albums.service';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  template: ` <select
    name="album"
    id="album"
    (input)="$selected.set($any($event.target).value)"
  >
    <option value="0">No Selection made</option>
    @for (album of $albums(); track album.id) {
      <option value="{{ album.id }}">{{ album.title }}</option>
    }
  </select>`,
  styleUrl: './select.component.css',
})
export class SelectComponent {
  $albums = inject(AlbumsService).$albums;

  // TODO: replce with `model` once implemented
  @Input() $selected!: WritableSignal<number>;
}
