import { Component, computed, inject, input } from '@angular/core';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album',
  imports: [],
  template: `
    @for (photo of $photos(); track photo) {
      <img
        [src]="photo"
        width="150px"
        height="150px"
      />
    }
  `,
  styleUrl: './album.component.css',
})
export class AlbumComponent {
  private readonly album = inject(AlbumService);
  $albumId = input<number>();

  photoResult = this.album.load(this.$albumId);

  $photos = computed(() => {
    const r = this.photoResult();
    if (r.loading) return [];
    if (r.error) return [];
    return r.data;
  });
}
