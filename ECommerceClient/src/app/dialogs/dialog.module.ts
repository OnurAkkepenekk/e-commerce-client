import { FileUploadModule } from './../services/common/file-upload/file-upload.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { BasketItemRemoveDialogComponent } from './basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingComplateDialogComponent } from './shopping-complate-dialog/shopping-complate-dialog.component';


@NgModule({
  declarations: [
    DeleteDialogComponent,
    SelectProductImageDialogComponent,
    BasketItemRemoveDialogComponent,
    ShoppingComplateDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule,MatCardModule,
    FileUploadModule    
  ]
})
export class DialogModule { }
