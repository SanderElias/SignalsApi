import { Component, computed, inject, input, signal } from '@angular/core';
import { AlbumService } from '../album.service';

@Component({
    selector: 'app-album',
    imports: [],
    template: `
    @for (photo of $photos(); track photo) {
      <img [src]="'https://picsum.photos/id/'+photo+'/150'" width="150px" height="150px" />
    }
  `,
    styleUrl: './album.component.css'
})
export class AlbumComponent {
  private readonly album = inject(AlbumService);
  $albumId = input<number>();

  $photos = signal<number[]>([1, 2, 3, 8, 4, 5, 6]);
}
