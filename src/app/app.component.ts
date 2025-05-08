import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlbumsService } from './albums.service';
import { AlbumComponent } from './album/album.component';
import { SelectComponent } from './select/select.component';
import { SectionComponent } from './section/section.component';
import { MenuComponent } from "./menu/menu.component";

@Component({
    selector: 'app-root',
    template: `
    <header>
      <h1>Signal API sample</h1> <app-menu />
    </header>
    <main>
      <router-outlet />
    </main>
  `,
    styleUrl: './app.component.css',
    imports: [RouterOutlet, SectionComponent, MenuComponent]
})
export class AppComponent {}
