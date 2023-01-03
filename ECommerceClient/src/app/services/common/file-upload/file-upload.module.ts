import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadDialogComponent } from './../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogModule } from './../../../dialogs/dialog.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [
    FileUploadComponent,
    FileUploadDialogComponent
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    MatDialogModule, MatButtonModule
  ],
  exports: [
    FileUploadComponent
  ]
})
export class FileUploadModule {
  
}
