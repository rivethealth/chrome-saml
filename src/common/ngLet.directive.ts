import { Directive, Input } from '@angular/core';

@Directive({ exportAs: 'let', selector: '[ngLet]' })
export class NgLetDirective {
  @Input('ngLet') value: any;
}
