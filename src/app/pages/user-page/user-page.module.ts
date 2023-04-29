import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPageRoutingModule } from './user-page-routing.module';
import { UserPageComponent } from './user-page.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UpperCaseFormatPipe } from '../../shared/pipes/Uppercase-format.pipe';


@NgModule({
  declarations: [
    UserPageComponent,
    UpperCaseFormatPipe
  ],
  imports: [
    CommonModule,
    UserPageRoutingModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ]
})
export class UserPageModule { }
