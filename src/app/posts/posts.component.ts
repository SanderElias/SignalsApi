import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PostsListService } from './post.list.service';
import { PostComponent } from './post/post.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterOutlet, RouterLink, PostComponent],
  template: `
    <h3>Posts</h3>
    <a [routerLink]="['.', 0]">New</a>
    @for (postId of $postIds(); track postId) {
      <a (click)="open(postId)">{{ postId }}</a>
    }
    <div>
      <label>
        <span>Use a ne aside?</span>
        <input
          type="checkbox"
          [checked]="$useAside()"
          (change)="$useAside.set($any($event.target).checked)"
        />
      </label>
    </div>
    <hr />
    <div id="grid">
      <section>
        <router-outlet />
      </section>
      @for (id of $asides(); track id) {
        <aside>
          <app-post [$postId]="id" />
        </aside>
      }
    </div>
  `,
  styleUrl: './posts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent {
  postListService = inject(PostsListService);
  router = inject(Router);
  $asides = signal([] as number[]);

  $useAside = signal(false);

  $postIds = this.postListService.list;

  open(id: number) {
    if (this.$useAside()) {
      this.$asides.update((asides) => {
        return [...asides,id];
      });
    } else {
      this.router.navigateByUrl(`/posts/${id}`);
    }
  }
}
