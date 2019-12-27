import { Component, Input } from '@angular/core';

@Component({
  selector: 'action-value',
  styleUrls: ['./value.component.scss'],
  templateUrl: './value.component.html',
})
export class ValueComponent {
  @Input() value;

  copy() {
    navigator.clipboard.writeText(this.value);
  }
}
