import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BootstrapFormControlsModule } from 'bootstrap-form-controls';
import { ConfirmDialogComponent } from './components/confirm/confirm-dialog/confirm-dialog.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProfilePictureUploaderComponent } from './components/uploaders/profile-picture-uploader/profile-picture-uploader.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PagerComponent } from './pager/pager.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BusinessSummaryModalComponent } from './components/modals/business-summary-modal/business-summary-modal.component';


@NgModule({
  declarations: [
    ConfirmDialogComponent,
    ProfilePictureUploaderComponent,
    PagerComponent,
    BusinessSummaryModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapFormControlsModule,
    ModalModule.forRoot(),
    FileUploadModule,
    PaginationModule.forRoot(),
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    BootstrapFormControlsModule,
    ConfirmDialogComponent,
    ModalModule,
    ProfilePictureUploaderComponent,
    FileUploadModule,
    PagerComponent,
    PaginationModule,
    BusinessSummaryModalComponent,
  ]
})
export class SharedModule { }
