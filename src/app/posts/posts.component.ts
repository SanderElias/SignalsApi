import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PostsListService } from './post.list.service';
import { PostComponent } from './post/post.component';

@Component({
    selector: 'app-posts',
    imports: [RouterOutlet, RouterLink, PostComponent],
    template: `
    <h3>Posts</h3>
    <a [routerLink]="['.', 0]">New</a>
    @for (postId of $postIds(); track postId) {
      <a (click)="open(postId)">{{ postId }}</a>
    }
    <div>
      <label>
        <input
          type="checkbox"
          [checked]="$useAside()"
          (change)="$useAside.set($any($event.target).checked)"
        />
        <span>Use an aside?</span>
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
    changeDetection: ChangeDetectionStrategy.OnPush
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
        return [...asides, id];
      });
    } else {
      this.router.navigateByUrl(`/posts/${id}`);
    }
  }

  constructor() {
    effect(() => {
      // remove any asides that are not in the list of postIds
      const postIds = this.$postIds();
      untracked(() =>
        // this is in an untracked block because want to update the aside without re-triggering this effect
        // it still marks the '$asides' signal as dirty, but it doesn't re-run the effect
        this.$asides.update((asides) => {
          const result = asides.filter((id) => postIds.includes(id));
          console.log({ result });
          return result;
        }),
      );
    });
  }
}
