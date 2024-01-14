import {
  Component,
  Signal,
  computed,
  effect,
  inject,
  input,
  isSignal,
  signal,
} from '@angular/core';
import { AlbumService, Photos } from '../album.service';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [],
  template: `
    @for (photo of $photos(); track photo.id) {
      <img src="{{ photo.thumbnailUrl }}" width="150px" height="150px" />
    }
  `,
  styleUrl: './album.component.css',
})
export class AlbumComponent {
  private readonly album = inject(AlbumService);
  $albumId = input<number>();


  $photos = this.album.load(this.$albumId);


}
