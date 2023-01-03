import { FileUploadModule } from './../services/common/file-upload/file-upload.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule,MatCardModule,
    FileUploadModule    
  ]
})
export class DialogModule { }
