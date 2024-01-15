import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Post, PostsService } from '../posts.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  template: `
    <hr />
    @if ($loading()) {
      <h4>loading...</h4>
    } @else {
      @if ($error()) {
        <h4>error: {{ $error()?.message }}</h4>
      } @else {
        <h4>post id:{{ $postId() }}</h4>
        <p>Title: {{ $originalPost()?.title }}</p>
        <p>content: {{ $originalPost()?.body?.substring(0, 40) }}...</p>
        <form #form (submit)="save(form, $event)">
          <label>
            <span>title</span>
            <input type="text" name="title" [value]="$localCopy().title"
          /></label>
          <label>
            <span>content</span>
            <textarea name="body" [value]="$localCopy().body"></textarea>
          </label>
          <button type="submit">{{ $isNew() ? 'create' : 'update' }}</button>
        </form>
      }
    }
  `,
  styleUrl: './post.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  ps = inject(PostsService);
  $postId = input(0);
  $result = this.ps.read(this.$postId);
  $originalPost = computed(() => this.$result().data);
  $loading = computed(() => this.$result().loading);

  $isNew = computed(() => {
    return this.$postId() === 0 || this.$result().error?.status === 404;
  });

  $error = computed(
    () => {
      const err = this.$result().error;
      // swallow the 404, as we are using it to determine if the post is new
      return err?.status === 404 ? undefined : err;
    },
  );

  $localCopy = computed(() => {
    const post = this.$result().data;
    const copy = {
      id: post?.id ?? this.ps.newId(this.$postId()),
      title: post?.title ?? '',
      body: post?.body ?? '',
    };
    return copy;
  });

  save(form: HTMLFormElement, event: Event) {
    event.preventDefault();
    const { title, body } = form.elements as any;
    this.ps.update({
      ...this.$localCopy(),
      title: title.value,
      body: body.value,
    } as Post);
    return false;
  }

  constructor() {
    effect(() => {
      console.log('post id changed', this.$postId());
    });
    effect(() => {
      console.log('post data', this.$localCopy());
    });
  }
}
