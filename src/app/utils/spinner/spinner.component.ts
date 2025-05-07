import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  template: `<svg class="spinner" viewBox="0 0 50 50">
    <circle
      class="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke-width="5"
    ></circle>
  </svg>`,
  styleUrl: './spinner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
