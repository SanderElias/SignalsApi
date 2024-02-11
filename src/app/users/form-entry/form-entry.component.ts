import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  ViewContainerRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  model,
  runInInjectionContext,
  type ComponentRef,
} from '@angular/core';
import { matchEntryComponent } from './matchEntryComponent';

@Component({
  selector: 'app-form-entry',
  standalone: true,
  imports: [],
  template: ``,
  styleUrl: './form-entry.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormEntryComponent {
  #vc = inject(ViewContainerRef);
  #inj = inject(Injector);
  $name = input.required<string>();
  $value = model.required<unknown>();
  $inputs = computed(() => ({ $name: this.$name(), $value: this.$value }));

  constructor() {
    afterNextRender(() => {
      let comp: any;
      let cRef: ComponentRef<any> | undefined;
      runInInjectionContext(this.#inj, () => {
        effect(() => {
          matchEntryComponent(this.$name(), this.$value()).then((component) => {
            if (!component || comp === component) return; // only create if different
            this.#vc.clear(); // clear previous component
            comp = component;
            cRef = this.#vc.createComponent<any>(component, {
              index: 0, // always replace the first one
              injector: this.#inj, // use the same injector
            });
            cRef.setInput('$name', this.$name());
            cRef.setInput('$value', this.$value());
            cRef.changeDetectorRef.detectChanges(); // force change detection ??
            cRef.instance.$value.subscribe((value: any) => {
              this.$value.set(value);
            });
          });
        });
        effect(() => this.$name() && cRef?.setInput('$name', this.$name())); // update name
        effect(() => this.$value() && cRef?.setInput('$value', this.$value())); // update value
      });
    });
  }
}
