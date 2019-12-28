import { CommonModule as AngularCommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '../common/module';
import { ActionComponent } from './action.component';
import { ValueComponent } from './value.component';

@NgModule({
  bootstrap: [ActionComponent],
  declarations: [ActionComponent, ValueComponent],
  imports: [
    AngularCommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
})
export class ActionModule {}
