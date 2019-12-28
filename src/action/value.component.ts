import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'action-value',
  styleUrls: ['./value.component.scss'],
  templateUrl: './value.component.html',
})
export class ValueComponent {
  constructor(private readonly snackBar: MatSnackBar) {}

  @Input() value;

  copy() {
    navigator.clipboard.writeText(this.value);
    this.snackBar.open('Copied to clipboard', undefined, { duration: 1000 });
  }
}
