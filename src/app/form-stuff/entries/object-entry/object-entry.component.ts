import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect
} from '@angular/core';
import { SignalEntryComponent } from '../base-entry/base-entry.component';
import { FormEntryComponent } from '../form-entry/form-entry.component';
import { GroupValidationEntryComponent } from '../group-validation-entry/group-validation-entry.component';
import { ShowErrorComponent } from "../show-error/show-error.component";

@Component({
    selector: 'object-entry',
    template: `
    <fieldset>
      <legend>{{ $name() }} <show-error/></legend>
      @for (entry of $entries(); track $index) {
        <app-form-entry
          [$name]="entry.name"
          [$value]="entry.value"
          ($valueChange)="update(entry.field, $event)"
        />
      }
    </fieldset>
  `,
    styleUrl: './object-entry.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormEntryComponent, GroupValidationEntryComponent, ShowErrorComponent]
})
export class ObjectEntryComponent<
  T extends Record<string, any>,
> extends SignalEntryComponent<T> {
  $entries = computed(() =>
    (Object.entries(this.$value()) as Entries<T>).map(([name, value]) => ({
      name: `${this.$name()}.${String(name)}`,
      field: name,
      value,
    })),
  );

  /** send updates up the chain. */
  update<K extends keyof T, V extends T[K]>(name: K, value: V) {
    this.$value.update((v) => ({ ...v, [name]: value }));
  }

  constructor() {
    super();
    /** workaround for angular bug */
    effect(() => this.$value());
  }
}

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
