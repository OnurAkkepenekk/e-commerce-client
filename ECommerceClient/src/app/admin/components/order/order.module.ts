import { DeleteDirectiveModule } from './../../../directives/admin/delete.module';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    OrderComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatPaginatorModule,
    DialogModule, FileUploadModule,
    RouterModule.forChild([
      { path: "", component: OrderComponent }
    ]),
    DeleteDirectiveModule
  ]
})
export class OrderModule { }
