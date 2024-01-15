import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav>
      <ul>
        <li><span>Menu</span><span>🔻</span></li>
        <li><a routerLink="/home">Home</a></li>
        <li><a routerLink="/posts">Posts</a></li>
        <li><a routerLink="/album/1">album-1</a></li>
        <li><a routerLink="/album/2">album-2</a></li>
      </ul>
    </nav>
  `,
  styleUrl: './menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

}
