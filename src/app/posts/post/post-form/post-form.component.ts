import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input
} from '@angular/core';
import { PostCrudService } from '../../post.crud.service';
import { Post } from '../../post.list.service';

@Component({
  selector: 'post-form',
  standalone: true,
  imports: [],
  template: `
    <form #form (submit)="save(form, $event)">
      <label>
        <span>title</span>
        <input type="text" name="title" [value]="$post()?.title"
      /></label>
      <label>
        <span>content</span>
        <textarea name="body" [value]="$post()?.body"></textarea>
      </label>
      <button type="submit">{{ $isNew() ? 'create' : 'update' }}</button>
    </form>
  `,
  styleUrl: './post-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFormComponent {
  $isNew = input.required<Boolean>() // if true, we are creating a new post, else we are updating an existing one.

  // here we inject tje service. As its provided in the parent component, it will be the same instance.
  postCrudService = inject(PostCrudService);

  $post = this.postCrudService.$post;

  async save(form: HTMLFormElement, event: Event) {
    event.preventDefault();
    const { title, body } = form.elements as any;
    const newPost: Post = {
      id: this.$post()?.id || 0,
      userId: 0,
      title: title.value,
      body: body.value,
    };
    if (this.$isNew()) {
      // the console.log is just to show the error. but we should inform the user a bit better than that.
      // but it is here, because the responsibility for informing the user is here, and not in a service.
      await this.postCrudService.create(newPost).catch(a => console.log(a));
    } else {
      await this.postCrudService.update(newPost);
    }
  }
}
