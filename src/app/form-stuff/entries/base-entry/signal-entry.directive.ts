import { Directive } from '@angular/core';
import { SignalEntryService } from './signal-entry.service';

@Directive({
  providers: [SignalEntryService],
  standalone: true,
})
/**
 * helper directive to provide the service to the component
 * this is needed because you can't provide a service on a base class component
 */
export class SignalEntryDirective {}
