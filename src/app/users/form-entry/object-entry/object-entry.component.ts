import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  signal,
} from '@angular/core';
import { FormEntryComponent } from '../form-entry.component';

@Component({
  selector: 'app-object-entry',
  standalone: true,
  imports: [FormEntryComponent],
  template: `
    <fieldset>
      <legend>{{ $name() }}</legend>
      @for (entry of $entries(); track $index) {
        <app-form-entry
          [$name]="entry.name"
          [$value]="entry.value"
          ($valueChange)="update(entry.name, $event)"
        />
      }
    </fieldset>
  `,
  styleUrl: './object-entry.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectEntryComponent {
  $name = input.required<string>();
  $value = model.required<Object>();

  $entries = computed(() =>
    Object.entries(this.$value()).map(([name, value]) => ({
      name,
      value,
    })),
  );

  /** send updates up the chain. */
  update(name: string, value: any) {
    this.$value.set({ ...this.$value(), [name]: value });
  }

  constructor() {
    /** workaround for angular bug */
    effect(() => this.$value());
  }
}
