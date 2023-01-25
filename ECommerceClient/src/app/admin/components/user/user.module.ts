import { RouterModule } from '@angular/router';
import { DeleteDirectiveModule } from './../../../directives/admin/delete.module';
import { DialogModule } from './../../../dialogs/dialog.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    UserComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule,
    DialogModule,
    DeleteDirectiveModule,
    RouterModule.forChild([
      { path: "", component: UserComponent }
    ]),
  ]
})
export class UserModule { }
