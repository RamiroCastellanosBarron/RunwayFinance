import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BootstrapFormControlsModule } from 'bootstrap-form-controls';
import { ConfirmDialogComponent } from './components/confirm/confirm-dialog/confirm-dialog.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProfilePictureUploaderComponent } from './components/uploaders/profile-picture-uploader/profile-picture-uploader.component';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [
    ConfirmDialogComponent,
    ProfilePictureUploaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapFormControlsModule,
    ModalModule.forRoot(),
    FileUploadModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    BootstrapFormControlsModule,
    ConfirmDialogComponent,
    ModalModule,
    ProfilePictureUploaderComponent,
    FileUploadModule,
  ]
})
export class SharedModule { }
