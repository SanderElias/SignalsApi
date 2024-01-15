import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h3>Posts</h3>
    <a [routerLink]="['.',0]">New</a>
    @for (postId of postIds(); track postId) {
      <a [routerLink]="['.',postId]">{{ postId }}</a>
    }
    <router-outlet />
  `,
  styleUrl: './posts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent {
  ps = inject(PostsService);
  postIds = this.ps.list
  // postIds = Array.from({ length: 30 }, (_, i) => i + 1);
}
