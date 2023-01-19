import { RouterModule } from '@angular/router';
import { UpdatePasswordComponent } from './update-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: UpdatePasswordComponent }
    ])
  ]
})
export class UpdatePasswordModule { }
