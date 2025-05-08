import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlbumComponent } from '../album/album.component';
import { SelectComponent } from '../select/select.component';

@Component({
    selector: 'app-section',
    template: `
    <app-select [$selected]="selected" />
    <app-album [$albumId]="selected()" />
  `,
    styleUrl: './section.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SelectComponent, AlbumComponent]
})
export class SectionComponent {
  selected = signal(0);
}
