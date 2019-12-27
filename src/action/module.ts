import { ContribNgLetModule } from '@angular-contrib/common';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionComponent } from './action.component';
import { ValueComponent } from './value.component';
import { CommonModule } from '../common/module';

@NgModule({
  bootstrap: [ActionComponent],
  declarations: [ActionComponent, ValueComponent],
  imports: [
    AngularCommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    ContribNgLetModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
  ],
})
export class ActionModule {}
