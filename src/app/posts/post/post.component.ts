import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { PostCrudService } from '../post.crud.service';
import { PostsListService } from '../post.list.service';
import { PostFormComponent } from './post-form/post-form.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [PostFormComponent],
  template: `
    @if ($result().loading) {
      <h4>loading...</h4>
    } @else {
      @if ($result().error) {
        <h4>error: {{ $error()?.message }}</h4>
      } @else {
        <h4>post id:{{ $postId() }}</h4>
        <p>Title: {{ $post()?.title }}</p>
        <p>content: {{ $post()?.body?.substring(0, 40) }}...</p>
        <post-form [$isNew]="$isNew()" />
      }
    }
  `,
  styleUrl: './post.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PostCrudService], // provide this service only for this component-tree
})
export class PostComponent {
  postService = inject(PostsListService);
  postCrudService = inject(PostCrudService);

  $postId = input<number>(0);
  $result = this.postCrudService.read(this.$postId);
  $loading = computed(() => this.$result().loading);
  $isNew = computed(() => {
    return this.$postId() === 0 || this.$result().error?.status === 404;
  });
  $error = computed(() => {
    const err = this.$result().error;
    // swallow the 404, as we are using it to determine if the post is new
    return err?.status === 404 ? undefined : err;
  });

  $post = this.postCrudService.$post;

  // constructor() {
  //   effect(() => {
  //     console.log('post id changed', this.$postId());
  //   });
  //   effect(() => {
  //     console.log('post data', this.$localCopy());
  //   });
  // }
}
