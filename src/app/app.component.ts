import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <h1>Signal API sample</h1>
      <app-menu />
    </header>
    <main>
      <router-outlet />
    </main>
  `,
  styleUrl: './app.component.css',
  imports: [RouterOutlet, MenuComponent],
})
export class AppComponent {}
