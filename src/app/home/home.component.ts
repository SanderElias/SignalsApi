import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionComponent } from '../section/section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <app-section />
    <app-section />
  `,
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionComponent],
})
export class HomeComponent {}
